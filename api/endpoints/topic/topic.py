from flask import Blueprint, request, jsonify

from models.models import db, TopicModel

topic_api = Blueprint("topic_api", __name__)


@topic_api.route("/addTopic", methods=("POST",))
def addTopic():
    body = request.get_json()
    topic = str(body["topic"])
    error = None

    if not topic:
        error = "Missing Data"
    if TopicModel.query.filter_by(name=topic).first() is not None:
        error = f"Topic {topic} already exists"

    if error is None:
        add_topic = TopicModel(topic)
        db.session.add(add_topic)
        db.session.commit()
        message = f"Added topic {topic} successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@topic_api.route("/getTopics", methods=("GET",))
def getTopics():
    response = TopicModel.query.all()
    topics = []
    for item in response:
        topics.append({"name": item.name})
    return jsonify({"topics": topics}), 200


@topic_api.route("/deleteTopic", methods=("DELETE",))
def deleteTopic():
    body = request.get_json()
    topic = str(body["topic"])
    error = None

    if not topic:
        error = "Missing Data"
    if TopicModel.query.filter_by(name=topic).first() is None:
        error = f"No topic {topic}"

    if error is None:
        TopicModel.query.filter_by(name=topic).delete()
        db.session.commit()
        message = f"topic with name {topic} removed"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
