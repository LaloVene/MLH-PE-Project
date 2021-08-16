from flask import Blueprint, request, jsonify

from models.models import UserModel, RelUserLanguage, RelUserTopic

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
