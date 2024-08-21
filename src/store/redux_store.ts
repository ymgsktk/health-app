import { createStore, combineReducers } from 'redux';
import { userReducer } from './redux_authReducer';
import { postsReducer } from './redux_postReducer';

interface MenuState {
  menu1: boolean;
  menu2: boolean;
}


// サイドメニューの初期状態
const initialMenuState: MenuState = {
  menu1: false,
  menu2: false,
};

type MenuAction = { type: 'TOGGLE_MENU'; payload: keyof MenuState };

// サイドメニュー用のreducer
export const menuReducer = (state = initialMenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
};

// rootReducerにmenuReducerを追加
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  menu: menuReducer,  // ここに追加
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
