from flask import Blueprint

from models.models import UserModel

health_api = Blueprint('health_api', __name__)

@health_api.route("/health")
def check_health():
    has_lalo = UserModel.query.filter_by(username="lalo").first()
    return f"Works, has_lalo: {'yes' if has_lalo is not None else 'no'} users", 200
