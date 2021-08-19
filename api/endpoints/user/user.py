from flask import Blueprint, request, jsonify

from models.models import (
    RelUserFavProject,
    RelUserInProject,
    db,
    UserModel,
    RelUserLanguage,
    RelUserTopic,
)

user_api = Blueprint("user_api", __name__)


@user_api.route("/getUserData", methods=("GET",))
def getUserData():
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


@user_api.route("/deleteUser", methods=("DELETE",))
def deleteUser():
    body = request.get_json()
    username = str(body["username"])
    error = None

    if not username:
        error = "Missing Data"

    user = UserModel.query.filter_by(username=username).first()
    if user is None:
        error = f"User {username} does not exist"

    if error is None:
        RelUserInProject.query.filter_by(username=username).delete()
        RelUserFavProject.query.filter_by(username=username).delete()
        RelUserLanguage.query.filter_by(username=username).delete()
        RelUserTopic.query.filter_by(username=username).delete()
        UserModel.query.filter_by(username=username).delete()
        db.session.commit()
        message = f"User {username} deleted"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
