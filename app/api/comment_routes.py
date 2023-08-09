from flask import Blueprint, request, jsonify, redirect
from ..models import db, Comment
from .auth_routes import authenticate
from datetime import datetime

comment_routes = Blueprint("comment", __name__)


# Route to view all comments on a specific post
@comment_routes.route('/<int:post_id>', methods=['GET'])
def view_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.post_date.desc()).all()

    return {"comments": [comment.to_dict() for comment in comments]}


# Route to add a comment to a specific post
@comment_routes.route('/<int:post_id>/new', methods=['POST'])
def add_comment(post_id):

    auth_response = authenticate()
    if 'errors' in auth_response:
        return auth_response

    data = request.get_json()

    if 'content' not in data:
        return {'error': 'Content not provided'}

    formatted_date = datetime.now()
    datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

    content = data['content']
    comment = Comment(content=content, post_id=post_id, user_id=auth_response['id'], post_date = datetime_formatted)
    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()

# Route to update a specific comment on a post
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.get_json()

    if 'content' not in data:
        return jsonify({'error': 'Content not provided'}), 400

    # Check if the current user is the owner of the comment
    auth_response = authenticate()
    if 'errors' in auth_response or auth_response['id'] != comment.user_id:
        return jsonify({'error': 'You are not authorized to update this comment'}), 401

    content = data['content']
    comment.content = content
    db.session.commit()

    # Redirect back to see all comments
    return comment.to_dict()


# Route to delete a specific comment from a post
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)

    auth_response = authenticate()
    if 'errors' in auth_response or auth_response['id'] != comment.user_id:
        return jsonify({'error': 'You are not authorized to delete this comment'}), 401

    db.session.delete(comment)
    db.session.commit()

    return {'message': 'Comment deleted successfully'}, 200
