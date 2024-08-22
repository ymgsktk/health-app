import {initialUserState, UserState} from './redux_action';
import {initialPostState, PostsState} from './redux_action';
import {initialMenuState, MenuState} from './redux_action';
import { initialModalState, ModalState } from './redux_action';
import {Action} from './redux_action';


export const postsReducer = (state = initialPostState, action: Action): PostsState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export const userReducer = (state = initialUserState, action: Action): UserState => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, email: action.payload.email, password: action.payload.password };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const menuReducer = (state = initialMenuState, action: Action): MenuState => {
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

export const modalReducer = (state = initialModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};