from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime

db = SQLAlchemy()

# --------------- USER MODEL------------------


class UserModel(db.Model):
    __tablename__ = "users"

    username = db.Column(db.String(), primary_key=True)
    password = db.Column(db.String())
    name = db.Column(db.String())
    email = db.Column(db.String())
    github = db.Column(db.String())
    reset_token = db.Column(db.String(), default=str(uuid4()))

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