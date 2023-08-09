
from flask import Blueprint
from ..models import Media, db
from flask_login import login_required
from .AWS_helpers import remove_file_from_s3


media_routes = Blueprint("medias", __name__)

# delete a media
@media_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_media(id):
  media_to_delete = Media.query.get(id)
  file_delete = remove_file_from_s3(media_to_delete.media_url)
  if file_delete is True:
    db.session.delete(media_to_delete)
    db.session.commit()
    return {"message": "Successfully deleted!"}
  return {"message": "deletion failed"}
