import { createStore, combineReducers } from 'redux';
import { } from './redux_action';
import { postsReducer, userReducer, menuReducer, modalReducer } from './redux_reducer';

// rootReducerにmenuReducerを追加
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  menu: menuReducer,  // ここに追加
  modal: modalReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
