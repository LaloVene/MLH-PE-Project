from flask import Blueprint, request, jsonify

from models.models import db, LanguageModel, RelUserLanguage

userLanguage_api = Blueprint("userLanguage_api", __name__)


@userLanguage_api.route("/addUserLanguage", methods=("POST",))
def addUserLanguage():
    body = request.get_json()
    username = str(body["username"])
    language = str(body["language"])
    error = None

    if not username or not language:
        error = "Missing Data"
    if LanguageModel.query.filter_by(name=language).first() is None:
        error = f"Language {language} does not exist"
    if (
        RelUserLanguage.query.filter_by(username=username, langName=language).first()
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


@userLanguage_api.route("/getUserLanguages", methods=("POST",))
def getUserLanguages():
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


@userLanguage_api.route("/deleteUserLanguage", methods=("DELETE",))
def deleteUserLanguage():
    body = request.get_json()
    username = str(body["username"])
    language = str(body["language"])
    error = None

    if not username:
        error = "Missing Data"

    if (
        RelUserLanguage.query.filter_by(langName=language, username=username).first()
        is None
    ):
        error = f"Language not in user with username {username}"

    if error is None:
        RelUserLanguage.query.filter_by(langName=language, username=username).delete()
        db.session.commit()
        message = f"Language {language} removed from user with username {username}"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
