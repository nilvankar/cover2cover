# app/books_routes.py
from flask import Blueprint, request, jsonify, current_app
import requests
import os
from urllib.parse import quote_plus
from app.models import Writer
from app.extension import db
books_bp = Blueprint("books_bp", __name__)

GOOGLE_BASE = "https://www.googleapis.com/books/v1/volumes"
API_KEY = os.environ.get("GOOGLE_BOOKS_API_KEY")  # optional

def google_get(params):
    if API_KEY:
        params['key'] = API_KEY
    res = requests.get(GOOGLE_BASE, params=params, timeout=10)
    res.raise_for_status()
    return res.json()

# Helper to run multiple pages and collect items (max up to 120 results)
def fetch_items(q, max_total=120):
    items = []
    start = 0
    per_page = 40  # Google allows up to 40
    while start < max_total:
        params = {"q": q, "maxResults": per_page, "startIndex": start}
        data = google_get(params)
        page_items = data.get("items", [])
        items.extend(page_items)
        if len(page_items) < per_page:
            break
        start += per_page
    return items


# 1) Get authors list by search query (q) — returns unique author names
@books_bp.route("/api/books/authors", methods=["GET"])
def get_authors():
    """
    GET /api/books/authors
    returns: { status, authors: [ "Rabindranath Tagore", "Munshi Premchand", ... ] }

    Use this to populate dropdowns on the frontend.
    """
    try:
        authors = db.session.query(Writer.name).order_by(Writer.name.asc()).all()
        author_names = [a[0] for a in authors]

        return jsonify({
            "status": "success",
            "authors": author_names
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# 2) Get titles by author
@books_bp.route("/api/books/titles", methods=["GET"])
def get_titles_by_author():
    """
    GET /api/books/titles?author=William%20Shakespeare
    returns unique titles by the author
    """
    author = request.args.get("author", "").strip()
    if not author:
        return jsonify({"status": "error", "message": "author param required"}), 400

    try:
        query = f'inauthor:"{quote_plus(author)}"'
        items = fetch_items(query, max_total=120)
        titles = []
        seen = set()
        for it in items:
            info = it.get("volumeInfo", {})
            title = (info.get("title") or "").strip()
            if title and title.lower() not in seen:
                seen.add(title.lower())
                titles.append(title)
                if len(titles) >= 100:
                    break

        return jsonify({"status": "success", "titles": titles})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# 3) Get available languages for a chosen author+title
@books_bp.route("/api/books/languages", methods=["GET"])
def get_languages():
    """
    GET /api/books/languages?author=...&title=...
    returns list of unique language codes (e.g. en, es, fr)
    """
    author = request.args.get("author", "").strip()
    title = request.args.get("title", "").strip()
    if not author or not title:
        return jsonify({"status": "error", "message": "author and title params required"}), 400

    try:
        query = f'inauthor:"{quote_plus(author)}"+intitle:"{quote_plus(title)}"'
        items = fetch_items(query, max_total=120)

        langs = []
        seen = set()
        for it in items:
            info = it.get("volumeInfo", {})
            lang = (info.get("language") or "").strip()
            if lang and lang.lower() not in seen:
                seen.add(lang.lower())
                langs.append(lang)
        # map language codes to friendly names optionally (frontend can do this)
        return jsonify({"status": "success", "languages": langs})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# 4) Final filter: return volumes that match author, title, and language
@books_bp.route("/api/books/filter", methods=["GET"])
def filter_books():
    """
    GET /api/books/filter?author=...&title=...&lang=en
    returns volume info list
    """
    author = request.args.get("author", "").strip()
    title = request.args.get("title", "").strip()
    lang = request.args.get("lang", "").strip()

    if not author or not title or not lang:
        return jsonify({"status": "error", "message": "author, title and lang params required"}), 400

    try:
        query = f'inauthor:"{quote_plus(author)}"+intitle:"{quote_plus(title)}"'
        # include langRestrict for filtering
        params = {"q": query, "langRestrict": lang, "maxResults": 40}
        if API_KEY:
            params['key'] = API_KEY
        res = requests.get(GOOGLE_BASE, params=params, timeout=10)
        res.raise_for_status()
        data = res.json()
        vols = []
        for it in data.get("items", []):
            info = it.get("volumeInfo", {})
            vols.append({
                "title": info.get("title"),
                "authors": info.get("authors"),
                "language": info.get("language"),
                "thumbnail": info.get("imageLinks", {}).get("thumbnail"),
                "description": info.get("description"),
                "infoLink": info.get("infoLink"),
                "publisher": info.get("publisher"),
                "publishedDate": info.get("publishedDate")
            })
        return jsonify({"status": "success", "count": len(vols), "books": vols})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 5) What's New — Get latest trending or newly published books for a language
@books_bp.route("/api/books/whats_new", methods=["GET"])
def get_whats_new():
    """
    GET /api/books/whats_new?lang=en
    Fetches the latest trending books filtered by language.
    """
    lang = request.args.get("lang", "en").strip()
    try:
        params = {
            "q": "subject:fiction",  # can be changed to any category
            "orderBy": "newest",
            "langRestrict": lang,
            "maxResults": 20
        }
        res = requests.get(GOOGLE_BASE, params=params, timeout=10)
        res.raise_for_status()
        data = res.json()

        books = []
        for item in data.get("items", []):
            info = item.get("volumeInfo", {})
            books.append({
                "title": info.get("title"),
                "authors": info.get("authors"),
                "description": info.get("description"),
                "thumbnail": info.get("imageLinks", {}).get("thumbnail"),
                "publishedDate": info.get("publishedDate"),
                "language": info.get("language"),
                "infoLink": info.get("infoLink")
            })

        return jsonify({"status": "success", "count": len(books), "data": books})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
