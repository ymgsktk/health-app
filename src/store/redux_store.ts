import { createStore, combineReducers } from 'redux';
import { userReducer } from './redux_authReducer';
import { postsReducer } from './redux_postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
