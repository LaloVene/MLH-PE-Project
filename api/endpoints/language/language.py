from flask import Blueprint, request, jsonify

from models.models import db, LanguageModel

language_api = Blueprint("language_api", __name__)


@language_api.route("/addLanguage", methods=("POST",))
def addLanguage():
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


@language_api.route("/getLanguages", methods=("GET",))
def getLanguages():
    response = LanguageModel.query.all()
    languages = []
    for item in response:
        languages.append({"name": item.name})
    return jsonify({"languages": languages}), 200


@language_api.route("/deleteLanguage", methods=("DELETE",))
def deleteLanguage():
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
