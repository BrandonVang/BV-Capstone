from flask import Blueprint, request, jsonify, redirect
from ..models import db, user_communities, User, Community
from .auth_routes import authenticate
from flask_login import login_required,current_user
from datetime import datetime

communities_routes = Blueprint("community", __name__)

@communities_routes.route('/', methods=['GET'])
def get_all_communities():
    '''
    get all communities
    '''
    communities = Community.query.all()
    response_communities = [community.to_dict() for community in communities]
    return jsonify(response_communities)
    #  return {"community":response_communities}

@communities_routes.route('/joined', methods=['GET'])
@login_required
def get_logged_in_user_communities_joined():
    '''
    get all communities that the current user follows
    '''
    user = User.query.get(current_user.id)
    following_communities = user.communities_joined
    response_following_communities = [community.to_dict() for community in following_communities]
    return jsonify(response_following_communities)
    #  return {"community":response_following_communities}




@communities_routes.route('/<int:community_id>', methods=['POST'])
@login_required
def add_following(community_id):
    '''
    follow a community
    '''
    community = Community.query.get(community_id)

    if community in current_user.communities_joined:
        return jsonify({'error': "You are already a member of this community"}), 400

    current_user.communities_joined.append(community)
    db.session.commit()

    return {'res': f"You have joined the {community.name} community"}


@communities_routes.route('/<int:community_id>', methods=['DELETE'])
@login_required
def unfollowing(community_id):
    '''
    unfollow a community
    '''
    community = Community.query.get(community_id)

    if not community:
        return {"error": ["Community not found"]}, 404
    if community not in current_user.communities_joined:
        return "You are not a member of this community"

    current_user.communities_joined.remove(community)
    db.session.commit()

    return {'res': f"You have left the {community.name} community"}
