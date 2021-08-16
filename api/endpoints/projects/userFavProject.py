from flask import Blueprint, jsonify, request

from models.models import (
    db,
    UserModel,
    ProjectModel,
    RelUserFavProject,
)

userFavProject_api = Blueprint("userFavProject_api", __name__)


@userFavProject_api.route("/addUserFavProject", methods=("POST",))
def addUserFavProject():
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
        error = (
            f"User {username} already has as favorite the project with id {projectId}"
        )

    if error is None:
        add_user = RelUserFavProject(username, projectId)
        db.session.add(add_user)
        db.session.commit()
        message = f"User {username} added to favorites the project with id {projectId} successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@userFavProject_api.route("/getUsersFavProject", methods=("POST",))
def getUsersFavProject():
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


@userFavProject_api.route("/deleteUserFavProject", methods=("DELETE",))
def deleteUserFavProject():
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
