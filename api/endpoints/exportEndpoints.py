from flask import Blueprint

# Other
from endpoints.health.health import health_api
from endpoints.auth.auth import auth_api
from endpoints.filldb.filldb import fillDb_api
from endpoints.message.message import message_api

# General
from endpoints.topic.topic import topic_api
from endpoints.language.language import language_api

# User
from endpoints.user.user import user_api
from endpoints.user.userTopic import userTopic_api
from endpoints.user.userLanguage import userLanguage_api

# Project
from endpoints.projects.projects import projects_api
from endpoints.projects.userInProject import userInProject_api
from endpoints.projects.userFavProject import userFavProject_api
from endpoints.projects.topicProject import topicProject_api
from endpoints.projects.languageProject import languageProject_api

exportEndpoints = Blueprint("exportEndpoints", __name__, url_prefix="/api")

# Other
exportEndpoints.register_blueprint(auth_api)
exportEndpoints.register_blueprint(health_api)
exportEndpoints.register_blueprint(fillDb_api)
exportEndpoints.register_blueprint(message_api)

# General
exportEndpoints.register_blueprint(topic_api)
exportEndpoints.register_blueprint(language_api)

# User
exportEndpoints.register_blueprint(user_api)
exportEndpoints.register_blueprint(userTopic_api)
exportEndpoints.register_blueprint(userLanguage_api)

# Projects
exportEndpoints.register_blueprint(projects_api)
exportEndpoints.register_blueprint(userInProject_api)
exportEndpoints.register_blueprint(userFavProject_api)
exportEndpoints.register_blueprint(topicProject_api)
exportEndpoints.register_blueprint(languageProject_api)
