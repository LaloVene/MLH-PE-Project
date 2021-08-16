from flask import Blueprint, jsonify, request

from models.models import (
    db,
    UserModel,
    ProjectModel,
    RelUserInProject,
)

userInProject_api = Blueprint("userInProject_api", __name__)


@userInProject_api.route("/addUserInProject", methods=("POST",))
def addUserInProject():
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
        RelUserInProject.query.filter_by(username=username, projectId=projectId).first()
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


@userInProject_api.route("/getUsersInProject", methods=("POST",))
def getUsersInProject():
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


@userInProject_api.route("/deleteUserInProject", methods=("DELETE",))
def deleteUserInProject():
    body = request.get_json()
    projectId = str(body["projectId"])
    username = str(body["username"])
    error = None

    if not projectId:
        error = "Missing Data"
    if (
        RelUserInProject.query.filter_by(username=username, projectId=projectId).first()
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
