import os
from flask import ( Flask , request, jsonify )
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from datetime import datetime
import json

# import smtplib
from werkzeug.security import check_password_hash, generate_password_hash

# Database
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import time

load_dotenv()
app = Flask(__name__, static_folder='../build', static_url_path='/')

app.secret_key = "development key"

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}".format(
    user=os.getenv("POSTGRES_USER"),
    passwd=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=5432,
    table=os.getenv("POSTGRES_DB"),
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class UserModel(db.Model):
    __tablename__ = "users"

    username = db.Column(db.String(), primary_key=True)
    password = db.Column(db.String())
    name = db.Column(db.String())
    email = db.Column(db.String())
    github = db.Column(db.String())

    def __init__(self, username, password, name, email, github):
        self.username = username
        self.password = password
        self.name = name
        self.email = email
        self.github = github

    def __repr__(self):
        return f"<User {self.username}>"

class LanguageModel(db.Model):
    __tablename__ = "language"

    name = db.Column(db.String(), primary_key=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Language {self.name}>"
class RelUserLanguage(db.Model):
    __tablename__ = "relUserLanguage"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String())
    langName = db.Column(db.String())

    def __init__(self, username, langName):
        self.username = username
        self.langName = langName

    def __repr__(self):
        return f"<RelUserLanguage {self.langName}>"


@app.errorhandler(404)
def not_found(e):
    return 'Not found'

@app.route('/')
def index():
    return 'Im here'

@app.route("/api/register", methods=("POST",))
def register():
    try:
        body = request.get_json()
        username = str(body['username'])
        password = str(body['password'])
        name = str(body['name'])
        email = str(body['email'])
        github = str(body['github'])
        error = None

        if (not username or not password or not name or not email or not github):
            error = "Missing Data"
            return jsonify({"status": "1"}), 400
        elif UserModel.query.filter_by(username=username).first() is not None:
            error = f"User {username} is already registered"

        if error is None:
            new_user = UserModel(username, generate_password_hash(password), name, email, github)
            db.session.add(new_user)
            db.session.commit()
            message = f"User {username} created successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "message": "missing or invalid data", "error": error}), 400

    except:
        return jsonify({"status": "bad", "message": "missing or invalid data"}), 400


@app.route("/api/login", methods=("POST",))
def login():
    try:
        body = request.get_json()
        username = str(body['username'])
        password = str(body['password'])
        error = None
        user = UserModel.query.filter_by(username=username).first()

        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user.password, password):
            error = "Incorrect password."

        if error is None:
            return jsonify({"status": "ok"}), 200
        else:
            return jsonify({"status": "error", "error": error}), 418

    except:
        return jsonify({"status": "bad", "message": "missing or invalid data"}), 400

@app.route('/api/addLanguage', methods=("POST",))
def addLanguage():
    try:
        body = request.get_json()
        username = str(body['username'])
        language = str(body['language'])
        error = None

        if not username or not language:
            error = "Missing Data"

        if error is None:
            add_language = RelUserLanguage(username, language)
            db.session.add(add_language)
            db.session.commit()
            message = f"User {language} added to user {username} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "message": "missing or invalid data", "error": error}), 400

    except:
        return jsonify({"status": "bad", "message": "missing or invalid data"}), 400

@app.route('/api/getUserLanguages', methods=("POST",))
def getUserLanguages():
    body = request.get_json()
    username = str(body['username'])
    error = None

    if not username:
        error = "Missing Data"

    if error is None:
        languages = RelUserLanguage.query.filter_by(username=username).all()
        return jsonify(json_list = languages)
    else:
        return jsonify({"status": "bad", "message": "missing or invalid data", "error": error}), 400

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

# Health: For testing
@app.route("/health")
def check_health():
    has_lalo = UserModel.query.filter_by(username="lalo").first()
    return f"Works, has_lalo: {'yes' if has_lalo is not None else 'no'} users", 200