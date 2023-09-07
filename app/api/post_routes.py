from random import randint
from datetime import datetime
from flask import Blueprint, request, jsonify
from ..forms.post_form import PostForm
from ..forms.media_form import MediaForm
from ..models import Post, User, Community, Media, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages, authenticate
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3, ALLOWED_EXTENSIONS


post_routes = Blueprint("posts", __name__)

#Show ALL POst
@post_routes.route("/all")
def all_posts():
  '''
  get all posts
  '''
  all_posts = Post.query.order_by(Post.post_date.desc()).all()
  response_posts = [post.to_dict() for post in all_posts]
  print(response_posts)
  return {"posts": response_posts }

#Get all current user post
@post_routes.route("/current")
@login_required
def current_posts():
  '''
  get all posts of current user
  '''
  all_posts = Post.query.filter_by(user_id=current_user.id).order_by(Post.post_date.desc()).all()
  response_posts = [post.to_dict() for post in all_posts]
  return {"posts": response_posts }

#Get Post from all communities that the user joined
@post_routes.route("/community")
@login_required
def community_posts():
    '''
    get all posts from communities that the current user has joined
    '''
    joined_communities_ids = [community.id for community in current_user.communities_joined]
    community_posts = Post.query.filter(Post.community_id.in_(joined_communities_ids)).order_by(Post.post_date.desc()).all()
    response_posts = [post.to_dict() for post in community_posts]

    return {"posts": response_posts}

#Get post from Specific community
@post_routes.route("/community/<int:community_id>")
def get_community_posts(community_id):
    try:
        community = Community.query.get(community_id)  # Retrieve the community using the provided ID
        if not community:
            return jsonify({"error": "Community not found"}), 404

        community_posts = Post.query.filter_by(community_id=community_id).order_by(Post.post_date.desc()).all()
        response_posts = [post.to_dict() for post in community_posts]

        return jsonify({"community": community.to_dict(), "posts": response_posts})
    except Exception as e:
        return jsonify({"error": "An error occurred"}), 500


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
      title = form.data["title"],
      content = form.data["content"],
      users = current_user,
      community_id=request.json.get("community_id"),
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
    updated_community_id = request.json.get("community_id")
    post_to_update.community_id = updated_community_id
    updated_title = request.json.get("title")

    if post_to_update.users.id != current_user.id:
      return jsonify({'error': 'You are not authorized to delete this post'}), 401

    if not post_to_update:
      return {"errors": f"post with id {id} does not exist"}
    post_to_update.user = current_user
    post_to_update.content = form.data["content"]
    post_to_update.title = updated_title
    # post_to_update.post_date = date.today()
    db.session.commit()
    return {"updatedPost": post_to_update.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def delete_post(post_id):
    '''
    delete a post
    '''
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    if current_user.id != post.user_id:
        return jsonify({'error': 'You are not authorized to delete this post'}), 401

    db.session.delete(post)
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

@post_routes.route("/search")
def search_posts():
  '''
  get all posts
  '''
  # get the parameters from the routes
  # all_posts = Post.query.order_by(Post.post_date.desc()).all()
  keyword = request.args.get('keyword');
  print(keyword)
  if not keyword:
        return "Please provide a keyword for search."

  search_posts = Post.query.filter(
        (Post.content.like(f"%{keyword}%"))
    ).all()
  response_posts = [post.to_dict() for post in search_posts]
  print(response_posts)
  return {"posts": response_posts }

