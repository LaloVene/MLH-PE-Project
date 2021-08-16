from flask import Blueprint, jsonify, request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os

message_api = Blueprint("message_api", __name__)


@message_api.route("/sendmessage", methods=("POST",))
def sendMessage():
    body = request.get_json()
    title = str(body["title"])
    html = str(body["message"])
    sender = str(body["sender"])
    receiver = str(body["receiver"])
    error = None

    if not title or not html or not sender or not receiver:
        error = "Missing Data"
        return jsonify({"status": "bad", "error": error}), 400

    else:
        me = os.getenv("MAIL_USERNAME")
        my_password = os.getenv("MAIL_PASSWORD")
        you = receiver

        msg = MIMEMultipart("alternative")
        msg["Subject"] = "[DevUp Message From: " + sender + "] " + title
        msg["From"] = me
        msg["To"] = you

        html = "<html><body><p>" + html + "</p></body></html>"
        part2 = MIMEText(html, "html")

        msg.attach(part2)
        s = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        s.login(me, my_password)

        s.sendmail(me, you, msg.as_string())
        s.quit()
        return jsonify({"status": "ok"}), 200
