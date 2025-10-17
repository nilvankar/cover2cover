from app.extension import db, login_manager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from app.extension import db

class Writer(db.Model):
    __tablename__ = 'writers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    languages = db.Column(db.String(100))
    notable_for = db.Column(db.String(255))

    def __repr__(self):
        return f"<Writer {self.name}>"

"""
INSERT INTO writers (name, languages, notable_for) VALUES
('Rabindranath Tagore', 'Bengali, English', 'Poet, Nobel laureate'),
('Munshi Premchand', 'Hindi, Urdu', 'Fiction, social realism'),
('R. K. Narayan', 'English', 'Malgudi Days, fiction'),
('Salman Rushdie', 'English', 'Midnight’s Children'),
('Arundhati Roy', 'English', 'The God of Small Things'),
('Vikram Seth', 'English', 'A Suitable Boy'),
('Ruskin Bond', 'English', 'Children’s and nature stories'),
('Jhumpa Lahiri', 'English', 'Diaspora fiction'),
('Amitav Ghosh', 'English', 'Historical fiction'),
('Chetan Bhagat', 'English', 'Contemporary fiction'),
('Anita Desai', 'English', 'Psychological fiction'),
('Khushwant Singh', 'English, Punjabi', 'Satire, history'),
('Amrita Pritam', 'Punjabi, Hindi', 'Poet, feminist writer'),
('Yashpal', 'Hindi', 'Revolutionary, novelist'),
('Harivansh Rai Bachchan', 'Hindi', 'Poet, Madhushala'),
('Mahadevi Varma', 'Hindi', 'Chhayavad poet, feminist'),
('Jaishankar Prasad', 'Hindi', 'Poet, playwright'),
('Suryakant Tripathi Nirala', 'Hindi', 'Poet, modernist'),
('Sumitranandan Pant', 'Hindi', 'Romantic poet'),
('Ramdhari Singh Dinkar', 'Hindi', 'Nationalist poet'),
('Krishna Sobti', 'Hindi', 'Novelist, modern literature'),
('Dharamvir Bharati', 'Hindi', 'Playwright, novelist'),
('Neelam Saxena Chandra', 'Hindi, English', 'Poet, author'),
('Vinita Agrawal', 'English', 'Poet, contemporary literature'),
('Hansda Sowvendra Shekhar', 'English, Regional', 'Tribal literature'),
('Satyajit Ray', 'Bengali, English', 'Filmmaker, writer'),
('Mahasweta Devi', 'Bengali', 'Activist, writer'),
('Bibhutibhushan Bandopadhyay', 'Bengali', 'Pather Panchali'),
('Sarat Chandra Chattopadhyay', 'Bengali', 'Devdas, novels'),
('Girish Karnad', 'Kannada', 'Playwright, actor'),
('U. R. Ananthamurthy', 'Kannada', 'Samskara, novelist'),
('O. V. Vijayan', 'Malayalam, English', 'Philosophical fiction'),
('M. T. Vasudevan Nair', 'Malayalam', 'Screenwriter, novelist'),
('Perumal Murugan', 'Tamil', 'Contemporary fiction'),
('Ismat Chughtai', 'Urdu, Hindi', 'Feminist, short stories'),
('Saadat Hasan Manto', 'Urdu, English', 'Partition stories'),
('Qurratulain Hyder', 'Urdu, English', 'Aag Ka Darya'),
('Subhadra Kumari Chauhan', 'Hindi', 'Poet, nationalism'),
('Maithili Sharan Gupt', 'Hindi', 'Epic poet'),
('Gopinath Mohanty', 'Odia', 'Regional fiction'),
('S. L. Bhyrappa', 'Kannada', 'Philosophical novels'),
('Fakir Mohan Senapati', 'Odia', 'Satire, early fiction'),
('Parichay Mitra', 'Bengali', 'Short stories'),
('Rajendra Yadav', 'Hindi', 'Editor, novelist'),
('Mannu Bhandari', 'Hindi', 'Modern literature'),
('Kiran Desai', 'English', 'The Inheritance of Loss'),
('Shashi Tharoor', 'English', 'Essays, novels'),
('Devdutt Pattanaik', 'English', 'Mythology, religion'),
('Ashwin Sanghi', 'English', 'Mythological thrillers'),
('Preeti Shenoy', 'English', 'Romance, fiction');

"""