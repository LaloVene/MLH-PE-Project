import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from datetime import datetime
from flask_cors import CORS
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jwt
import smtplib
from uuid import uuid4

# import smtplib
from werkzeug.security import check_password_hash, generate_password_hash

# Database
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail

import time

load_dotenv()
app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)
app.config["MAIL_SERVER"] = "smtp.mailtrap.io"
app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False


mail = Mail(app)
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


@app.route("/api/sendmessage", methods=("POST",))
def sendMessage():

    body = request.get_json()
    title = str(body["title"])
    html = str(body["message"])
    sender = str(body["sender"])
    receiver = str(body["receiver"])
    error = None

    if not title or not html or not sender or not receiver:
        error = "Missing Data"
        return jsonify({"status": "bad", "error": error}), 400

    else:
        me = os.getenv("MAIL_USERNAME")
        my_password = os.getenv("MAIL_PASSWORD")
        you = receiver

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "[DevUp Message From: " + sender + "] " + title
        msg["From"] = me
        msg["To"] = you

        html = "<html><body><p>" + html + "</p></body></html>"
        part2 = MIMEText(html, "html")

        msg.attach(part2)
        s = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        s.login(me, my_password)

        s.sendmail(me, you, msg.as_string())
        s.quit()
        return jsonify({"status": "ok"}), 200


# --------------- USER MODEL------------------


class UserModel(db.Model):
    __tablename__ = "users"

    username = db.Column(db.String(), primary_key=True)
    password = db.Column(db.String())
    name = db.Column(db.String())
    email = db.Column(db.String())
    github = db.Column(db.String())
    reset_token = db.Column(db.String())

    def __init__(self, username, password, name, email, github):
        self.username = username
        self.password = password
        self.name = name
        self.email = email
        self.github = github

    def __repr__(self):
        return f"<User {self.username}>"

    def serialize(self):
        return {
            "username": self.username,
            "password": self.password,
            "name": self.name,
            "email": self.email,
            "github": self.github,
        }


# --------------- LANGUAGE MODEL------------------


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
        return f"<RelUserLanguage {self.username} {self.langName}>"


# --------------- TOPIC MODEL------------------


class TopicModel(db.Model):
    __tablename__ = "topic"

    name = db.Column(db.String(), primary_key=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Topic {self.name}>"


class RelUserTopic(db.Model):
    __tablename__ = "relUserTopic"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String())
    topicName = db.Column(db.String())

    def __init__(self, username, topicName):
        self.username = username
        self.topicName = topicName

    def __repr__(self):
        return f"<RelUserTopic {self.username} {self.topicName}>"


# --------------- PROJECT MODEL------------------


class ProjectModel(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    title = db.Column(db.String())
    description = db.Column(db.Text())
    url = db.Column(db.String())
    owner = db.Column(db.String())
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, description, url, owner):
        self.title = title
        self.description = description
        self.url = url
        self.owner = owner

    def __repr__(self):
        return f"<Project {self.title}>"


class RelUserInProject(db.Model):
    __tablename__ = "relUserInProject"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String())
    projectId = db.Column(db.Integer())

    def __init__(self, username, projectId):
        self.username = username
        self.projectId = projectId

    def __repr__(self):
        return f"<RelUserInProject {self.username} {self.projectId}>"


class RelUserFavProject(db.Model):
    __tablename__ = "relUserFavProject"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.String())
    projectId = db.Column(db.Integer())

    def __init__(self, username, projectId):
        self.username = username
        self.projectId = projectId

    def __repr__(self):
        return f"<RelUserFavProject {self.username} {self.projectId}>"


class RelProjectLanguage(db.Model):
    __tablename__ = "relProjectLanguage"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    language = db.Column(db.String())
    projectId = db.Column(db.Integer())

    def __init__(self, language, projectId):
        self.language = language
        self.projectId = projectId

    def __repr__(self):
        return f"<RelProjectLanguage {self.language} {self.projectId}>"


class RelProjectTopic(db.Model):
    __tablename__ = "relProjectTopic"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    topic = db.Column(db.String())
    projectId = db.Column(db.Integer())

    def __init__(self, topic, projectId):
        self.topic = topic
        self.projectId = projectId

    def __repr__(self):
        return f"<RelProjectTopic {self.topic} {self.projectId}>"


@app.errorhandler(404)
def not_found(e):
    return "Not found"


@app.route("/")
def index():
    return "Im here"


# ------------ LOGIN ##############


@app.route("/api/register", methods=("POST",))
def register():
    try:
        body = request.get_json()
        username = str(body["username"])
        password = str(body["password"])
        name = str(body["name"])
        email = str(body["email"])
        github = str(body["github"])
        error = None

        if not username or not password or not name or not email or not github:
            error = "Missing Data"
            return jsonify({"status": "1"}), 400
        if UserModel.query.filter_by(username=username).first() is not None:
            error = f"User {username} is already registered"

        if error is None:
            new_user = UserModel(
                username, generate_password_hash(password), name, email, github
            )
            db.session.add(new_user)
            db.session.commit()
            message = f"User {username} created successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/login", methods=("POST",))
def login():
    # try:
    body = request.get_json()
    username = str(body["username"])
    password = str(body["password"])
    error = None
    user = UserModel.query.filter_by(username=username).first()

    if user is None:
        error = "Incorrect username."
    if not check_password_hash(user.password, password):
        error = "Incorrect password."

    if error is None:
        token = jwt.encode({"username": username}, "TOKEN_SEED", algorithm="HS256")
        return jsonify({"status": "ok", "token": token}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 418

    # except:
    #     return jsonify({"status": "bad", "error": "missing or invalid data"}), 400

@app.route("/api/requestReset", methods=("POST",))
def request_password_reset():
    try:
        body = request.get_json()
        username = str(body["username"])
        error = None

        if not username:
            error = "Missing Data"
            return jsonify({"status": "1"}), 400
        user = UserModel.query.filter_by(username=username).first()
        if user is None:
            error = f"User {username} does not exists"

        if error is None:
            token = str(uuid4())
            user.reset_token = token
            db.session.commit()
            me = os.getenv("MAIL_USERNAME")
            my_password = os.getenv("MAIL_PASSWORD")
            you = user.email

            msg = MIMEMultipart("alternative")
            msg["Subject"] = "Password Reset"
            msg["From"] = me
            msg["To"] = you

            url = f"http://localhost:8100/reset/{username}?token={token}"

            html = f"<html><body><a>{url}</a></body></html>"
            part2 = MIMEText(html, "html")

            msg.attach(part2)
            s = smtplib.SMTP_SSL("smtp.gmail.com", 465)
            s.login(me, my_password)

            s.sendmail(me, you, msg.as_string())
            s.quit()
            message = f"User {username} request password change successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400

@app.route("/api/resetPassword", methods=("POST",))
def reset_password():
    body = request.get_json()
    username = str(body["username"])
    password = str(body["password"])
    token = str(body["token"])
    error = None

    if not username or not password or not token:
        error = "Missing Data"
        return jsonify({"status": "1"}), 400
    user = UserModel.query.filter_by(username=username).first()
    if user is None:
        error = f"User {username} does not exists"
    if token != user.reset_token:
        error = "Invalid Token"
    if error is None:
        token = str(uuid4())
        user.reset_token = token
        user.password = generate_password_hash(password)
        db.session.commit()
        message = f"User {username} changed password successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400

# ------------ USER DATA ##############
@app.route("/api/getUserData", methods=("GET",))
def getUserData():
    # try:
    username = request.args.get("username")
    error = None

    if not username:
        error = "Missing Data"
    if UserModel.query.filter_by(username=username).first() is None:
        error = "Username does not exist"

    if error is None:
        response = UserModel.query.filter_by(username=username).first()
        userDic = response.serialize()
        userData = {
            "username": userDic["username"],
            "name": userDic["name"],
            "email": userDic["email"],
            "github": userDic["github"],
        }
        response = RelUserLanguage.query.filter_by(username=username).all()
        languages = []
        for item in response:
            languages.append({"id": item.id, "name": item.langName})
        userData["languages"] = languages
        response = RelUserTopic.query.filter_by(username=username).all()
        topics = []
        for item in response:
            topics.append({"id": item.id, "name": item.topicName})
        userData["topics"] = topics
        return jsonify({"userData": userData}), 200
    else:
        return jsonify({"status": "bad", "error": error, "username": username}), 400
    # except:
    #     return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ TOPICS ##############


@app.route("/api/addTopic", methods=("POST",))
def addTopic():
    try:
        body = request.get_json()
        topic = str(body["topic"])
        error = None

        if not topic:
            error = "Missing Data"
        if TopicModel.query.filter_by(name=topic).first() is not None:
            error = f"Topic {topic} already exists"

        if error is None:
            add_topic = TopicModel(topic)
            db.session.add(add_topic)
            db.session.commit()
            message = f"Added topic {topic} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getTopics", methods=("GET",))
def getTopics():
    try:
        response = TopicModel.query.all()
        topics = []
        for item in response:
            topics.append({"name": item.name})
        return jsonify({"topics": topics}), 200
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteTopic", methods=("DELETE",))
def deleteTopic():
    try:
        body = request.get_json()
        topic = str(body["topic"])
        error = None

        if not topic:
            error = "Missing Data"
        if TopicModel.query.filter_by(name=topic).first() is None:
            error = f"No topic {topic}"

        if error is None:
            TopicModel.query.filter_by(name=topic).delete()
            db.session.commit()
            message = f"topic with name {topic} removed"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ USER TOPICS ##############


@app.route("/api/addUserTopic", methods=("POST",))
def addUserTopic():
    try:
        body = request.get_json()
        username = str(body["username"])
        topic = str(body["topic"])
        error = None

        if not username or not topic:
            error = "Missing Data"
        if TopicModel.query.filter_by(name=topic).first() is None:
            error = f"Topic {topic} does not exist"
        if (
            RelUserTopic.query.filter_by(username=username, topicName=topic).first()
            is not None
        ):
            error = f"User {username} already has topic {topic}"

        if error is None:
            add_topic = RelUserTopic(username, topic)
            db.session.add(add_topic)
            db.session.commit()
            message = f"User {topic} added to user {username} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getUserTopics", methods=("POST",))
def getUserTopics():
    try:
        body = request.get_json()
        username = str(body["username"])
        error = None

        if not username:
            error = "Missing Data"

        if error is None:
            response = RelUserTopic.query.filter_by(username=username).all()
            topics = []
            for item in response:
                topics.append({"id": item.id, "name": item.topicName})
            return jsonify({"topics": topics}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteUserTopic", methods=("DELETE",))
def deleteUserTopic():
    try:
        body = request.get_json()
        id = str(body["id"])
        error = None

        if not id:
            error = "Missing Data"
        if RelUserTopic.query.filter_by(id=id).first() is None:
            error = f"User have no topic with id {id}"

        if error is None:
            RelUserTopic.query.filter_by(id=id).delete()
            db.session.commit()
            message = f"Topic with id {id} removed"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ LANGUAGES ##############


@app.route("/api/addLanguage", methods=("POST",))
def addLanguage():
    try:
        body = request.get_json()
        language = str(body["language"])
        error = None

        if not language:
            error = "Missing Data"
        if LanguageModel.query.filter_by(name=language).first() is not None:
            error = f"Language {language} already exists"

        if error is None:
            add_language = LanguageModel(language)
            db.session.add(add_language)
            db.session.commit()
            message = f"Added Language {language} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getLanguages", methods=("GET",))
def getLanguages():
    try:
        response = LanguageModel.query.all()
        languages = []
        for item in response:
            languages.append({"name": item.name})
        return jsonify({"languages": languages}), 200
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteLanguage", methods=("DELETE",))
def deleteLanguage():
    try:
        body = request.get_json()
        language = str(body["language"])
        error = None

        if not language:
            error = "Missing Data"
        if LanguageModel.query.filter_by(name=language).first() is None:
            error = f"No language {language}"

        if error is None:
            LanguageModel.query.filter_by(name=language).delete()
            db.session.commit()
            message = f"Language with name {language} removed"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ USER LANGUAGES ##############


@app.route("/api/addUserLanguage", methods=("POST",))
def addUserLanguage():
    try:
        body = request.get_json()
        username = str(body["username"])
        language = str(body["language"])
        error = None

        if not username or not language:
            error = "Missing Data"
        if LanguageModel.query.filter_by(name=language).first() is None:
            error = f"Language {language} does not exist"
        if (
            RelUserLanguage.query.filter_by(
                username=username, langName=language
            ).first()
            is not None
        ):
            error = f"User {username} already has language {language}"

        if error is None:
            add_language = RelUserLanguage(username, language)
            db.session.add(add_language)
            db.session.commit()
            message = f"User {language} added to user {username} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getUserLanguages", methods=("POST",))
def getUserLanguages():
    try:
        body = request.get_json()
        username = str(body["username"])
        error = None

        if not username:
            error = "Missing Data"

        if error is None:
            response = RelUserLanguage.query.filter_by(username=username).all()
            languages = []
            for item in response:
                languages.append({"id": item.id, "name": item.langName})
            return jsonify({"languages": languages}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteUserLanguage", methods=("DELETE",))
def deleteUserLanguage():
    try:
        body = request.get_json()
        id = str(body["id"])
        error = None

        if not id:
            error = "Missing Data"
        if RelUserLanguage.query.filter_by(id=id).first() is None:
            error = f"User have no language with id {id}"

        if error is None:
            RelUserLanguage.query.filter_by(id=id).delete()
            db.session.commit()
            message = f"Language with id {id} removed"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ PROJECTS ##############


@app.route("/api/addProject", methods=("POST",))
def addProject():
    try:
        body = request.get_json()
        title = str(body["title"])
        description = str(body["description"])
        url = str(body["url"])
        owner = str(body["owner"])
        error = None

        if not title or not description or not url or not owner:
            error = "Missing Data"
        if UserModel.query.filter_by(username=owner).first() is None:
            error = f"User {owner} does not exist"

        if error is None:
            add_project = ProjectModel(title, description, url, owner)
            db.session.add(add_project)
            db.session.commit()
            message = f"Added Project {title} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/editProject", methods=("PUT",))
def editProject():
    try:
        body = request.get_json()
        projectId = str(body["id"])
        title = str(body["title"])
        description = str(body["description"])
        url = str(body["url"])
        error = None

        if not title or not description or not url or not projectId:
            error = "Missing Data"
        project = ProjectModel.query.filter_by(id=projectId).first()
        if project is None:
            error = f"Project {projectId} does not exist"

        if error is None:
            project.title = title
            project.description = description
            project.url = url
            db.session.commit()
            message = f"Edited Project {title} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getProjects", methods=("GET",))
def getProjects():
    # try:
    searchterm = request.args.get("searchterm")
    topic = request.args.get("topic")
    language = request.args.get("language")

    # Query for projects using inputs as a filter
    # If searchterm and topic and language
    if searchterm and topic and language:
        # join ProjectModel, RelProjectTopic and RelProjectLanguage on projectId
        # where ProjectModel.id == RelProjectTopic.projectId
        # and RelProjectTopic.projectId == RelProjectLanguage.projectId
        # and query for projects that match the search term and topic and language
        # and return the results
        response = (
            ProjectModel.query.join(
                RelProjectTopic, ProjectModel.id == RelProjectTopic.projectId
            )
            .join(
                RelProjectLanguage,
                RelProjectLanguage.projectId == RelProjectTopic.projectId,
            )
            .filter(
                ProjectModel.title.ilike(f"%{searchterm}%"),
                RelProjectTopic.topic == topic,
                RelProjectLanguage.language == language,
            )
            .all()
        )
    # If searchterm and topic
    elif searchterm and topic:
        # join ProjectModel, RelProjectTopic on projectId
        # where ProjectModel.id == RelProjectTopic.projectId
        # and RelProjectTopic.topicId == topic
        # and query for projects that match the search term and topic
        # and return the results
        response = (
            ProjectModel.query.join(
                RelProjectTopic, ProjectModel.id == RelProjectTopic.projectId
            )
            .filter(
                ProjectModel.title.ilike(f"%{searchterm}%"),
                RelProjectTopic.topic == topic,
            )
            .all()
        )
    # If searchterm and language
    elif searchterm and language:
        # join ProjectModel, RelProjectLanguage on projectId
        # where ProjectModel.id == RelProjectLanguage.projectId
        # and RelProjectLanguage.languageId == language
        # and query for projects that match the search term and language
        # and return the results
        response = (
            ProjectModel.query.join(
                RelProjectLanguage, ProjectModel.id == RelProjectLanguage.projectId
            )
            .filter(
                ProjectModel.title.ilike(f"%{searchterm}%"),
                RelProjectLanguage.language == language,
            )
            .all()
        )
    # If topic and language
    elif topic and language:
        # join ProjectModel, RelProjectLanguage on projectId
        # where ProjectModel.id == RelProjectLanguage.projectId
        # and RelProjectLanguage.languageId == language
        # and query for projects that match the topic and language
        # and return the results
        response = (
            ProjectModel.query.join(
                RelProjectLanguage, ProjectModel.id == RelProjectLanguage.projectId
            )
            .filter(RelProjectLanguage.language == language)
            .all()
        )
    # If searchterm
    elif searchterm:
        # join ProjectModel and query for projects that match the search term
        response = ProjectModel.query.filter(
            ProjectModel.title.ilike("%" + searchterm + "%")
        ).all()
    # If topic
    elif topic:
        # join ProjectModel and RelProjectTopic and query for projects that match the topic
        response = (
            ProjectModel.query.join(
                RelProjectTopic, ProjectModel.id == RelProjectTopic.projectId
            )
            .filter(RelProjectTopic.topic.ilike("%" + topic + "%"))
            .all()
        )
    # If language
    elif language:
        # join ProjectModel and RelProjectLanguage
        # where ProjectModel.id == RelProjectLanguage.projectId and
        # query for projects that match the language
        response = (
            ProjectModel.query.join(
                RelProjectLanguage, ProjectModel.id == RelProjectLanguage.projectId
            )
            .filter(RelProjectLanguage.language.ilike("%" + language + "%"))
            .all()
        )
    # If no search term
    else:
        # Query for all projects
        response = ProjectModel.query.all()
    projects = []
    for item in response:
        projects.append(
            {
                "id": item.id,
                "owner": item.owner,
                "title": item.title,
                "description": item.description,
                "url": item.url,
                "date": item.date,
            }
        )
    return jsonify({"projects": projects}), 200
    # except:
    #     return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteProject", methods=("DELETE",))
def deleteProject():
    try:
        body = request.get_json()
        id = str(body["id"])
        owner = str(body["owner"])
        error = None

        if not id:
            error = "Missing Data"
        if ProjectModel.query.filter_by(id=id, owner=owner).first() is None:
            error = f"No project with id {id} or {owner} is not the owner"

        if error is None:
            ProjectModel.query.filter_by(id=id).delete()
            RelUserInProject.query.filter_by(projectId=id).delete()
            RelUserFavProject.query.filter_by(projectId=id).delete()
            RelProjectTopic.query.filter_by(projectId=id).delete()
            RelProjectLanguage.query.filter_by(projectId=id).delete()
            db.session.commit()
            message = f"Project with id {id} removed"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ USER IN PROJECTS ##############


@app.route("/api/addUserInProject", methods=("POST",))
def addUserInProject():
    try:
        body = request.get_json()
        username = str(body["username"])
        projectId = str(body["projectId"])
        error = None

        if not username or not projectId:
            error = "Missing Data"
        if UserModel.query.filter_by(username=username).first() is None:
            error = f"User {username} does not exist"
        if ProjectModel.query.filter_by(id=projectId).first() is None:
            error = f"Project with id {projectId} does not exist"
        if (
            RelUserInProject.query.filter_by(
                username=username, projectId=projectId
            ).first()
            is not None
        ):
            error = f"User {username} is already part of project with id {projectId}"

        if error is None:
            add_user = RelUserInProject(username, projectId)
            db.session.add(add_user)
            db.session.commit()
            message = f"User {username} added to project {projectId} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getUsersInProject", methods=("POST",))
def getUsersInProject():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        error = None

        if not projectId:
            error = "Missing Data"

        if error is None:
            response = RelUserInProject.query.filter_by(projectId=projectId).all()
            users = []
            for item in response:
                users.append({"username": item.username})
            return jsonify({"users": users}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteUserInProject", methods=("DELETE",))
def deleteUserInProject():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        username = str(body["username"])
        error = None

        if not projectId:
            error = "Missing Data"
        if (
            RelUserInProject.query.filter_by(
                username=username, projectId=projectId
            ).first()
            is None
        ):
            error = f"User is not in project with id {projectId}"

        if error is None:
            RelUserInProject.query.filter_by(
                username=username, projectId=projectId
            ).delete()
            db.session.commit()
            message = (
                f"User {username} was removed from project with id {projectId} removed"
            )
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ USER FAVORITE PROJECTS ##############


@app.route("/api/addUserFavProject", methods=("POST",))
def addUserFavProject():
    try:
        body = request.get_json()
        username = str(body["username"])
        projectId = str(body["projectId"])
        error = None

        if not username or not projectId:
            error = "Missing Data"
        if UserModel.query.filter_by(username=username).first() is None:
            error = f"User {username} does not exist"
        if ProjectModel.query.filter_by(id=projectId).first() is None:
            error = f"Project with id {projectId} does not exist"
        if (
            RelUserFavProject.query.filter_by(
                username=username, projectId=projectId
            ).first()
            is not None
        ):
            error = f"User {username} already has as favorite the project with id {projectId}"

        if error is None:
            add_user = RelUserFavProject(username, projectId)
            db.session.add(add_user)
            db.session.commit()
            message = f"User {username} added to favorites the project with id {projectId} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getUsersFavProject", methods=("POST",))
def getUsersFavProject():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        error = None

        if not projectId:
            error = "Missing Data"

        if error is None:
            response = RelUserFavProject.query.filter_by(projectId=projectId).all()
            users = []
            for item in response:
                users.append({"username": item.username})
            return jsonify({"users": users}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteUserFavProject", methods=("DELETE",))
def deleteUserFavProject():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        username = str(body["username"])
        error = None

        if not projectId:
            error = "Missing Data"
        if (
            RelUserFavProject.query.filter_by(
                username=username, projectId=projectId
            ).first()
            is None
        ):
            error = f"User does not have as favorite the project with id {projectId}"

        if error is None:
            RelUserFavProject.query.filter_by(
                username=username, projectId=projectId
            ).delete()
            db.session.commit()
            message = f"User {username} had removed from favorites the project with id {projectId}"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ TOPIC PROJECTS ##############


@app.route("/api/addProjectTopic", methods=("POST",))
def addProjectTopic():
    try:
        body = request.get_json()
        topic = str(body["topic"])
        projectId = str(body["projectId"])
        error = None

        if not topic or not projectId:
            error = "Missing Data"
        if TopicModel.query.filter_by(name=topic).first() is None:
            error = f"Topic {topic} does not exist"
        if ProjectModel.query.filter_by(id=projectId).first() is None:
            error = f"Project with id {projectId} does not exist"
        if (
            RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).first()
            is not None
        ):
            error = f"Topic {topic} already is in the project with id {projectId}"

        if error is None:
            add_topic = RelProjectTopic(topic, projectId)
            db.session.add(add_topic)
            db.session.commit()
            message = (
                f"Topic {topic} added to the project with id {projectId} successfully"
            )
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getProjectTopics", methods=("POST",))
def getProjectTopics():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        error = None

        if not projectId:
            error = "Missing Data"

        if error is None:
            response = RelProjectTopic.query.filter_by(projectId=projectId).all()
            topics = []
            for item in response:
                topics.append({"topic": item.topic})
            return jsonify({"topics": topics}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteProjectTopic", methods=("DELETE",))
def deleteProjectTopic():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        topic = str(body["topic"])
        error = None

        if not projectId:
            error = "Missing Data"
        if (
            RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).first()
            is None
        ):
            error = f"Topic not in project with id {projectId}"

        if error is None:
            RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).delete()
            db.session.commit()
            message = f"Topic {topic} removed from the project with id {projectId}"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ LANGUAGE PROJECTS ##############


@app.route("/api/addProjectLanguage", methods=("POST",))
def addProjectLanguage():
    try:
        body = request.get_json()
        language = str(body["language"])
        projectId = str(body["projectId"])
        error = None

        if not language or not projectId:
            error = "Missing Data"
        if LanguageModel.query.filter_by(name=language).first() is None:
            error = f"Language {language} does not exist"
        if ProjectModel.query.filter_by(id=projectId).first() is None:
            error = f"Project with id {projectId} does not exist"
        if (
            RelProjectLanguage.query.filter_by(
                language=language, projectId=projectId
            ).first()
            is not None
        ):
            error = f"Language {language} already is in the project with id {projectId}"

        if error is None:
            add_language = RelProjectLanguage(language, projectId)
            db.session.add(add_language)
            db.session.commit()
            message = f"Language {language} added to the project with id {projectId} successfully"
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/getProjectLanguages", methods=("POST",))
def getProjectLanguages():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        error = None

        if not projectId:
            error = "Missing Data"

        if error is None:
            response = RelProjectLanguage.query.filter_by(projectId=projectId).all()
            languages = []
            for item in response:
                languages.append({"language": item.language})
            return jsonify({"languages": languages}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400
    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


@app.route("/api/deleteProjectLanguage", methods=("DELETE",))
def deleteProjectLanguage():
    try:
        body = request.get_json()
        projectId = str(body["projectId"])
        language = str(body["language"])
        error = None

        if not projectId:
            error = "Missing Data"
        if (
            RelProjectLanguage.query.filter_by(
                language=language, projectId=projectId
            ).first()
            is None
        ):
            error = f"Language not in project with id {projectId}"

        if error is None:
            RelProjectLanguage.query.filter_by(
                language=language, projectId=projectId
            ).delete()
            db.session.commit()
            message = (
                f"Language {language} removed from the project with id {projectId}"
            )
            return jsonify({"status": "ok", "message": message}), 200
        else:
            return jsonify({"status": "bad", "error": error}), 400

    except:  # noqa: E722
        return jsonify({"status": "bad", "error": "missing or invalid data"}), 400


# ------------ FILL DB ##############


@app.route("/api/filldb")
def filldb():
    try:
        languages = [
            "Python",
            "Java",
            "C++",
            "C",
            "PHP",
            "JavaScript",
            "Ruby",
            "Go",
            "C#",
            "Scala",
            "Perl",
            "R",
            "Shell",
            "Objective-C",
            "Haskell",
            "Matlab",
            "Groovy",
            "Racket",
            "F#",
            "Pascal",
            "Visual Basic",
            "Visual Basic .NET",
            "D",
            "Assembly",
            "Fortran",
            "PL/SQL",
            "PL/I",
            "PL/pgSQL",
        ]
        topics = [
            "Web Development",
            "Machine Learning",
            "Data Science",
            "Deep Learning",
            "Neural Networks",
            "Computer Graphics",
            "Computer Vision",
            "Computer Networking",
            "Computer Security",
            "Computer Architecture",
            "Computer Software Engineering",
            "Information Retrieval",
            "Information System",
            "Information Management",
            "Information Technology",
            "Software Engineering",
            "Software Testing",
            "Production Engineer",
            "Database",
        ]
        for language in languages:
            add_language = LanguageModel(language)
            db.session.add(add_language)

        for topic in topics:
            add_topic = TopicModel(topic)
            db.session.add(add_topic)

        db.session.commit()
        return "db filled"
    except:  # noqa: E722
        return "db not filled"


@app.route("/api/fillusers")
def fillusers():
    try:
        users = [
            {
                "username": "test",
                "password": "12345678",
                "name": "test person",
                "email": "something@email.com",
                "github": "http://www.github.com",
            },
            {
                "username": "test2",
                "password": "12345678",
                "name": "test person 2",
                "email": "something@email.com",
                "github": "http://www.github.com",
            },
            {
                "username": "test3",
                "password": "12345678",
                "name": "test person 3",
                "email": "something@email.com",
                "github": "http://www.github.com",
            },
        ]
        for user in users:
            add_user = UserModel(
                user["username"],
                user["password"],
                user["name"],
                user["email"],
                user["github"],
            )
            db.session.add(add_user)
        db.session.commit()
        return "db filled"
    except:  # noqa: E722
        return "db not filled"


@app.route("/api/fillprojects")
def fillprojects():
    try:
        projects = [
            {
                "name": "Test Project",
                "description": "This is a test project",
                "url": "http://www.testproject.com",
                "owner": "test",
            },
            {
                "name": "Test Project 2",
                "description": "This is a test project 2",
                "url": "http://www.testproject2.com",
                "owner": "test2",
            },
            {
                "name": "Test Project 3",
                "description": "This is a test project 3",
                "url": "http://www.testproject2.com",
                "owner": "test3",
            },
        ]
        for project in projects:
            add_project = ProjectModel(
                project["name"],
                project["description"],
                project["url"],
                project["owner"],
            )
            db.session.add(add_project)
        db.session.commit()
        return "db filled"
    except:  # noqa: E722
        return "db not filled"


@app.route("/api/time")
def get_current_time():
    return {"time": time.time()}


# Health: For testing


@app.route("/api/health")
def check_health():
    has_lalo = UserModel.query.filter_by(username="lalo").first()
    return f"Works, has_lalo: {'yes' if has_lalo is not None else 'no'} users", 200
