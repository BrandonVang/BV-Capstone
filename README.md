# Bluedit <Social-Media-Forum-Service>


## Introduction

Bluedit is a Reddit replica. is a platform where users can make posts, engage in discussion through comments,  and share specific topics related to the community. 



## Link To Website

https://bv-capstone-bluedit.onrender.com/


##Feature List


## 1. New account creation, log in, log out, and guest/demo log in

* Users can sign up, log in, and log out.
* Users can use a demo login to try the site.
* Users can't use certain features without logging in (like posting, commenting, liking, and following).
* Logged in users are directed to their profile page which displays their posts and details.
* Logged out users are directed to a landing page showcasing trending or recent posts.

## 2. Posts

* Users can create, update, and delete posts.
* Posts can contain text or images.
* Each post displays its author, content, timestamp, and associated likes.
* Users can navigate to a detailed view of a post which includes its comments.
* The main feed displays posts from all users or just from those a user follows, by changing tab.

## 3. Comments

* Users can comment on any post.
* Users can update or delete their own comments.
* Each comment displays its author and content.
* Comments are displayed beneath the post they are associated with.

## 4. Likes

* Users can like and dislike posts.
* Each post displays a count of its likes.


## 5. Community

* Users can join and unjoin other communities.
* Users have a drop-down menu of the community they have joined under Home
* User can go to that specific community and display feeds only for that community


## 6. (Bonus Search Filter)

* Filter out posts on what is submitted

## 7. (Bonus Notifications)

* Notify the user when a new post is made on the community they joined

##Database Schema

![schema](https://github.com/BrandonVang/BV-Capstone/assets/126208956/75e11d89-4518-4d5e-a3d1-ff3ba992eaa7)


## API Documentation

## Authentication

* Users can check if they're authenticated.
  - `GET api/auth`

* Users can log in.
  - `POST api/auth/login`

* Users can log out.
  - `POST api/auth/login`

* Users can sign up.
  - `POST api/auth/signup`

* An unauthorized endpoint to handle authentication failures.
  - `POST api/auth/unauthorized`

---

## Session

* Users can view all users.
  - `GET api/posts`

* Users can retrieve a specific user by their ID.
  - `GET api/users/<id>`

---

## Posts

* Users can view all posts.
  - `GET api/posts/all`

* Users can retrieve all posts created by the current logged-in user.

  - `GET api/posts/current`

* Users can retrieve a specific post by its ID.

  - `GET api/posts/<post_id>`

* Users can create a post.
  - `POST api/posts`

* Users can update a specific post by its ID.
  - `PUT api/posts/<post_id>`

* Users can delete a specific post by its ID.
  - `DELETE api/posts/<post_id>`

* Users can add media to a specific post by its ID.
  - `POST api/posts/<post_id>/medias`

* Users can delete a specific media by its ID.
  - `DELETE api/medias/<id>`

---

## Comments

* Users can retrieve all comments for a specific post.
  - `GET api/comments/<post_id>`

* Users can add a comment to a specific post.
  - `POST api/comments/<post_id>/new`

* Users can update a specific comment on a post.
  - `PUT api/comments/<comment_id>`

* Users can delete a specific comment from a post.
  - `DELETE api/comments/<comment_id>`



## Likes

* Users can retrieve all dislikes given by the currently logged-in user.
  - `GET api/likes/users/current/dislikes`

* Users can retrieve all likes given by the currently logged-in user.
  - `GET api/likes/users/current/likes`

* Users can like a specific post.
  - `POST api/likes/<post_id>/likes`

* Users can unlike a specific post.
  - `DELETE api/likes/<like_id>`

---

## Community

* Logged-in users can retrieve a list of communities they have joined.
  - `GET api/follows/following`

* Logged-in users can join a community.
  - `POST api/follows/<user_id>`

* Logged-in users can leave a community.
  - `DELETE api/follows/<user_id>`
 
## React Components

./About/ ./Footer/ ./auth/ ./CreateMedia/ ./CreatePost/ ./EditPostForum/ ./DeleteIndex/ ./FilterPost/ ./Icons/ ./Joined/ ./PostIndex/ ./Likes/ ./LoginFormPage/ ./LoginFormModal/ ./Navigation/ ./SignupFormPage/ ./OpenModalButton/ ./SignupFormModal/ ./PostDetail/

##Redux Store

```store = {
  session: {},
  posts: {
     allPosts: {},
     currentPost:{},
     singlePost: {},
  },

  comments: {
   
    post: {
     postData
    },
    user: {
     userData
    },
  },
communities: {
   allCommunities: {},
   userCommunities: {}
}

likes: {
     postLikes: [],
    userLikes: [],
   },
};```


##Techology

Flas/ React/ Redux/ sqlAclhemy/ postgreSQL/ AWS S3

##Development Challenges:

- Community post-filtering
      - Redux**: Maintaining the redux store and updating it once a new community post is added or deleted


## Profiles
BrandonVang;
LinkedIn: 'https://www.linkedin.com/in/brandon-vang-a80518171/',
GitHub: 'https://github.com/BrandonVang',
email: 'vang.brandon94@gmail.com',
