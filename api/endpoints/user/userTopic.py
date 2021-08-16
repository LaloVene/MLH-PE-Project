from flask import Blueprint, request, jsonify

from models.models import db, RelUserTopic, TopicModel

userTopic_api = Blueprint("userTopic_api", __name__)


@userTopic_api.route("/addUserTopic", methods=("POST",))
def addUserTopic():
    body = request.get_json()
    username = str(body["username"])
    topic = str(body["topic"])
    error = None

    if not username or not topic:
        error = "Missing Data"
    if TopicModel.query.filter_by(name=topic).first() is None:
        error = f"Topic {topic} does not exist"
    if (
        RelUserTopic.query.filter_by(username=username, topicName=topic).first()
        is not None
    ):
        error = f"User {username} already has topic {topic}"

    if error is None:
        add_topic = RelUserTopic(username, topic)
        db.session.add(add_topic)
        db.session.commit()
        message = f"User {topic} added to user {username} successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@userTopic_api.route("/getUserTopics", methods=("POST",))
def getUserTopics():
    body = request.get_json()
    username = str(body["username"])
    error = None

    if not username:
        error = "Missing Data"

    if error is None:
        response = RelUserTopic.query.filter_by(username=username).all()
        topics = []
        for item in response:
            topics.append({"id": item.id, "name": item.topicName})
        return jsonify({"topics": topics}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@userTopic_api.route("/deleteUserTopic", methods=("DELETE",))
def deleteUserTopic():
    body = request.get_json()
    username = str(body["username"])
    topic = str(body["topic"])
    error = None

    if not username:
        error = "Missing Data"

    if (
        RelUserTopic.query.filter_by(topicName=topic, username=username).first()
        is None
    ):
        error = f"Topic not in user with username {username}"

    if error is None:
        RelUserTopic.query.filter_by(topicName=topic, username=username).delete()
        db.session.commit()
        message = f"Topic {topic} removed from user with username {username}"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
