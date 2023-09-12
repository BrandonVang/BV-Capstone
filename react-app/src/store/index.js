import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postsReducer from './post';
import mediaReducer from './media';
import likesReducer from './like';
import commentsReducer from './comment'
import communityReducer from './community';
import dislikesReducer from './dislike';

const rootReducer = combineReducers({
  session,
  posts:postsReducer,
  likes: likesReducer,
  dislikes: dislikesReducer,
  media: mediaReducer,
  comments: commentsReducer,
  communities: communityReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
