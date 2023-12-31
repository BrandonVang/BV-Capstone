from flask.cli import AppGroup
from .users import seed_users, undo_users
from .post_seed import seed_posts, undo_posts
from .comments_seeds import seed_comments, undo_comments
from .media import seed_medias, undo_medias
from .likes import seed_likes, undo_likes
from .dislike import seed_dislikes, undo_dislikes
from .user_community import seed_user_community, undo_user_community
from .community_seeder import seed_community, undo_community
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_user_community()
        undo_medias()
        undo_likes()
        undo_dislikes()
        undo_comments()
        undo_posts()
        undo_community()
        undo_users()
    seed_users()
    seed_community()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_dislikes()
    seed_medias()
    seed_user_community()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_user_community()
    undo_medias()
    undo_likes()
    undo_dislikes()
    undo_comments()
    undo_posts()
    undo_community()
    undo_users()
    # Add other undo functions here
