from random import randint
from datetime import datetime
from flask import Blueprint, request, jsonify
# from ..forms.post_form import PostForm
# from ..forms.media_form import MediaForm
from ..models import Post, User, Media, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3, ALLOWED_EXTENSIONS


post_routes = Blueprint("posts", __name__)

@post_routes.route("/all")
def all_posts():
  '''
  get all posts
  '''
  all_posts = Post.query.order_by(Post.post_date.desc()).all()
  response_posts = [post.to_dict() for post in all_posts]
  print(response_posts)
  return {"posts": response_posts }


@post_routes.route("/current")
@login_required
def current_posts():
  '''
  get all posts of current user
  '''
  all_posts = Post.query.filter_by(user_id=current_user.id).order_by(Post.post_date.desc()).all()
  response_posts = [post.to_dict() for post in all_posts]
  return {"posts": response_posts }


@post_routes.route("/following")
@login_required
def following_posts():
  '''
  get all posts from users that the current user is following
  '''
  following_users_ids = [user.id for user in current_user.following]
  following_posts = Post.query.filter(Post.user_id.in_(following_users_ids)).order_by(Post.post_date.desc()).all()
  response_posts = [post.to_dict() for post in following_posts]

  return {"posts": response_posts}


@post_routes.route("/<int:id>")
def get_post_by_id(id):
  '''
  get a specific post by id
  '''
  one_post = Post.query.get(id)
  return {"post": one_post.to_dict()}


@post_routes.route("", methods=["POST"])
@login_required
def add_post():
  '''
  create a new post
  '''
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  formatted_date = datetime.now()
  datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

  if form.validate_on_submit():
    new_post = Post(
      content = form.data["content"],
      users = current_user,
      post_date = datetime_formatted
    )

    db.session.add(new_post)
    db.session.commit()
    return {"posts": new_post.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_post(id):
  '''
  update a new post
  '''
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    post_to_update = Post.query.get(id)

    if post_to_update.users.id != current_user.id:
      return jsonify({'error': 'You are not authorized to delete this post'}), 401

    if not post_to_update:
      return {"errors": f"post with id {id} does not exist"}
    post_to_update.user = current_user
    post_to_update.content = form.data["content"]
    # post_to_update.post_date = date.today()
    db.session.commit()
    return {"updatedPost": post_to_update.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
  '''
  delete a post
  '''
  post_to_delete = Post.query.get(id)
  if post_to_delete.users.id != current_user.id:
    return jsonify({'error': 'You are not authorized to delete this post'}), 401

  db.session.delete(post_to_delete)
  db.session.commit()
  return {"message": "Successfully deleted!"}

@post_routes.route("/<int:id>/medias", methods=["POST"])
@login_required
def add_media(id):
  '''
  add a media to a post
  '''
  form = MediaForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    post1 = Post.query.get(id)
    image = form.data["media_file"]
    image.filename = get_unique_filename(image.filename)
    print(image)
    upload = upload_file_to_s3(image)
    print(upload)

    if "url" not in upload:
      return {"error": "upload failed!"}

    if upload["url"].endswith("mp4"):
      media_type = "video"
    elif upload["url"].endswith("gif"):
      media_type = "gif"
    else: media_type = "image"

    new_media = Media(
      posts = post1,
      media_url = upload["url"],
      media_type = media_type
    )

    db.session.add(new_media)
    db.session.commit()
    return {"Media": new_media.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
