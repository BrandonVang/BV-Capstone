from flask import Blueprint, jsonify, request
from app.models import Dislike, db
from .auth_routes import authenticate
from flask_login import login_required,current_user

dislike_routes = Blueprint('dislikes', __name__)

@dislike_routes.route('/<int:post_id>',methods=['GET'])
def get_post_likes(post_id):
    '''
    get post's likes
    '''
    post_dislikes = Dislike.query.filter_by(post_id=post_id).all()
    response_post_dislikes=[dislike.to_dict() for dislike in post_dislikes]
    return {"dislikes":response_post_dislikes}

@dislike_routes.route('/users/<int:user_id>',methods=['GET'])
def get_specific_user_likes(user_id):
    '''
    get specific user likes
    '''
    user_dislikes = Dislike.query.filter_by(user_id=user_id).all()
    response_user_dislikes=[dislike.to_dict() for dislike in user_dislikes]
    return {"dislikes":response_user_dislikes}

@dislike_routes.route('/users/current',methods=['GET'])
@login_required
def get_user_likes():
    '''
    get users likes
    '''
    user_dislikes = Dislike.query.filter_by(user_id=current_user.id).all()
    response_user_dislikes=[dislike.to_dict() for dislike in user_dislikes]
    return {"dislikes":response_user_dislikes}

@dislike_routes.route('/<int:post_id>/likes',methods=['POST'])
@login_required
def add_like(post_id):
    '''
    add likes
    '''
    auth = authenticate()
    if 'errors' in auth:
        return auth

    already_disliked = Dislike.query.filter_by(post_id=post_id, user_id=auth['id']).first()
    if already_disliked:
        return {'error':'You already liked this post'}

    new_dislike = Dislike(user_id=auth['id'], post_id=post_id)
    db.session.add(new_dislike)
    db.session.commit()
    return new_dislike.to_dict()

@dislike_routes.route('/<int:likeid>',methods=['DELETE'])
@login_required
def remove_like(dislikeid):
    '''
    unlike
    '''
    dislike_delete = Dislike.query.get(dislikeid)

    if dislike_delete.users.id != current_user.id:
        return jsonify({'error': 'You are not authorized to unlike'}), 401

    db.session.delete(dislike_delete)
    db.session.commit()
    return {"message": "DisLike Successfully deleted"}
