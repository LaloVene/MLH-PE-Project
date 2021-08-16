from flask import Blueprint, jsonify, request

from models.models import (
    db,
    UserModel,
    ProjectModel,
    RelProjectLanguage,
    RelProjectTopic,
    RelUserInProject,
    RelUserFavProject,
)

projects_api = Blueprint("projects_api", __name__)


@projects_api.route("/addProject", methods=("POST",))
def addProject():
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


@projects_api.route("/editProject", methods=("PUT",))
def editProject():
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


@projects_api.route("/getProjects", methods=("GET",))
def getProjects():
    searchterm = request.args.get("searchterm")
    topic = request.args.get("topic")
    language = request.args.get("language")

    # Query for projects using inputs as a filter
    if searchterm and topic and language:
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
    elif searchterm and topic:
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
    elif searchterm and language:
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
    elif topic and language:
        response = (
            ProjectModel.query.join(
                RelProjectLanguage, ProjectModel.id == RelProjectLanguage.projectId
            )
            .filter(RelProjectLanguage.language == language)
            .all()
        )
    elif searchterm:
        response = ProjectModel.query.filter(
            ProjectModel.title.ilike("%" + searchterm + "%")
        ).all()
    elif topic:
        response = (
            ProjectModel.query.join(
                RelProjectTopic, ProjectModel.id == RelProjectTopic.projectId
            )
            .filter(RelProjectTopic.topic.ilike("%" + topic + "%"))
            .all()
        )
    elif language:
        response = (
            ProjectModel.query.join(
                RelProjectLanguage, ProjectModel.id == RelProjectLanguage.projectId
            )
            .filter(RelProjectLanguage.language.ilike("%" + language + "%"))
            .all()
        )
    else:
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


@projects_api.route("/deleteProject", methods=("DELETE",))
def deleteProject():
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
