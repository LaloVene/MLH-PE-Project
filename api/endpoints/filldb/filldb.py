from flask import Blueprint

from models.models import db, UserModel, LanguageModel, TopicModel, ProjectModel

fillDb_api = Blueprint("fillDb_api", __name__)


@fillDb_api.route("/filldb")
def filldb():
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


@fillDb_api.route("/fillusers")
def fillusers():
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


@fillDb_api.route("/fillprojects")
def fillprojects():
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
