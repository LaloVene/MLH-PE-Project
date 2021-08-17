from flask import Blueprint, jsonify, request

from models.models import db, ProjectModel, RelProjectLanguage, LanguageModel

languageProject_api = Blueprint("languageProject_api", __name__)


@languageProject_api.route("/addProjectLanguage", methods=("POST",))
def addProjectLanguage():
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
        message = (
            f"Language {language} added to the project with id {projectId} successfully"
        )
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@languageProject_api.route("/getProjectLanguages", methods=("POST",))
def getProjectLanguages():
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


@languageProject_api.route("/deleteProjectLanguage", methods=("DELETE",))
def deleteProjectLanguage():
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
        message = f"Language {language} removed from the project with id {projectId}"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
