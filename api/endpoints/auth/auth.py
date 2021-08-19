from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from uuid import uuid4
import smtplib
import jwt
import os

from models.models import db, UserModel

auth_api = Blueprint("auth_api", __name__)


@auth_api.route("/register", methods=("POST",))
def register():
    body = request.get_json()
    username = str(body["username"])
    password = str(body["password"])
    name = str(body["name"])
    email = str(body["email"])
    github = str(body["github"])
    error = None

    if not username or not password or not name or not email or not github:
        error = "Missing Data"
        return jsonify({"status": "1"}), 400
    if UserModel.query.filter_by(username=username).first() is not None:
        error = f"User {username} is already registered"

    if error is None:
        new_user = UserModel(
            username, generate_password_hash(password), name, email, github
        )
        db.session.add(new_user)
        db.session.commit()
        message = f"User {username} created successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@auth_api.route("/login", methods=("POST",))
def login():
    body = request.get_json()
    username = str(body["username"])
    password = str(body["password"])
    error = None
    user = UserModel.query.filter_by(username=username).first()

    if user is None:
        error = "Incorrect username."
    if user and not check_password_hash(user.password, password):
        error = "Incorrect password."

    if error is None:
        token = jwt.encode({"username": username}, "TOKEN_SEED", algorithm="HS256")
        return jsonify({"status": "ok", "token": token}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 418


@auth_api.route("/requestReset", methods=("POST",))
def request_password_reset():
    body = request.get_json()
    username = str(body["username"])
    error = None

    if not username:
        error = "Missing Data"
        return jsonify({"status": "1"}), 400
    user = UserModel.query.filter_by(username=username).first()
    if user is None:
        error = f"User {username} does not exists"

    if error is None:
        token = str(uuid4())
        user.reset_token = token
        db.session.commit()
        me = os.getenv("MAIL_USERNAME")
        my_password = os.getenv("MAIL_PASSWORD")
        you = user.email

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Password Reset"
        msg["From"] = me
        msg["To"] = you

        url = f"https://dev-up.tech/reset/{username}?token={token}"

        html = f'<html><body><p>\
            Go to this URL to reset your password.\
            If you did not request this, just ignore it.\
            </p></br><a href="{url}">Reset Password</a></body></html>'
        part2 = MIMEText(html, "html")

        msg.attach(part2)
        s = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        s.login(me, my_password)

        s.sendmail(me, you, msg.as_string())
        s.quit()
        message = f"User {username} request password change successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400


@auth_api.route("/resetPassword", methods=("POST",))
def reset_password():
    body = request.get_json()
    username = str(body["username"])
    password = str(body["password"])
    token = str(body["token"])
    error = None

    if not username or not password or not token:
        error = "Missing Data"
        return jsonify({"status": "1"}), 400
    user = UserModel.query.filter_by(username=username).first()
    if user is None:
        error = f"User {username} does not exists"
    if token != user.reset_token:
        error = "Invalid Token"
    if error is None:
        token = str(uuid4())
        user.reset_token = token
        user.password = generate_password_hash(password)
        db.session.commit()
        message = f"User {username} changed password successfully"
        return jsonify({"status": "ok", "message": message}), 200
    else:
        return jsonify({"status": "bad", "error": error}), 400
