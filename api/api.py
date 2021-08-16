import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_mail import Mail

# Database and endpoints
from flask_migrate import Migrate
from models.models import db
from endpoints.exportEndpoints import exportEndpoints

load_dotenv()
app = Flask(__name__, static_folder="../build", static_url_path="/")
app.register_blueprint(exportEndpoints)

CORS(app)

app.config["MAIL_SERVER"] = "smtp.mailtrap.io"
app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False


mail = Mail(app)
app.secret_key = "development key"

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}".format(
    user=os.getenv("POSTGRES_USER"),
    passwd=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=5432,
    table=os.getenv("POSTGRES_DB"),
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.errorhandler(404)
def not_found(e):
    return "Not found"


@app.route("/")
def index():
    return "Im here"
