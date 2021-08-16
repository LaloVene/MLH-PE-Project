from flask import Blueprint, jsonify, request

from models.models import (
    db,
    TopicModel,
    ProjectModel,
    RelProjectTopic,
)

topicProject_api = Blueprint("topicProject_api", __name__)


@topicProject_api.route("/addProjectTopic", methods=("POST",))
def addProjectTopic():
    body = request.get_json()
    topic = str(body["topic"])
    projectId = str(body["projectId"])
    error = None

    if not topic or not projectId:
        error = "Missing Data"
    if TopicModel.query.filter_by(name=topic).first() is None:
        error = f"Topic {topic} does not exist"
    if ProjectModel.query.filter_by(id=projectId).first() is None:
        error = f"Project with id {projectId} does not exist"
    if (
        RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).first()
        is not None
    ):
        error = f"Topic {topic} already is in the project with id {projectId}"

    if error is None:
        add_topic = RelProjectTopic(topic, projectId)
        db.session.add(add_topic)
        db.session.commit()
        message = f"Topic {topic} added to the project with id {projectId} successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@topicProject_api.route("/getProjectTopics", methods=("POST",))
def getProjectTopics():
    body = request.get_json()
    projectId = str(body["projectId"])
    error = None

    if not projectId:
        error = "Missing Data"

    if error is None:
        response = RelProjectTopic.query.filter_by(projectId=projectId).all()
        topics = []
        for item in response:
            topics.append({"topic": item.topic})
        return jsonify({"topics": topics}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@topicProject_api.route("/deleteProjectTopic", methods=("DELETE",))
def deleteProjectTopic():
    body = request.get_json()
    projectId = str(body["projectId"])
    topic = str(body["topic"])
    error = None

    if not projectId:
        error = "Missing Data"
    if (
        RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).first()
        is None
    ):
        error = f"Topic not in project with id {projectId}"

    if error is None:
        RelProjectTopic.query.filter_by(topic=topic, projectId=projectId).delete()
        db.session.commit()
        message = f"Topic {topic} removed from the project with id {projectId}"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
