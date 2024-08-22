import { Post } from '../interface/post';

//インターフェイス
export interface UserState {
  email: string;
  password: string;
  token: string | null;
}

export interface PostsState {
  posts: Post[];
}

export interface MenuState {
  menu1: boolean;
  menu2: boolean;
}

export interface ModalState {
  isOpen: boolean;
  content?: any;
}

//初期状態
export const initialPostState: PostsState = {
  posts: [],
};

export const initialUserState: UserState = {
  email: '',
  password: '',
  token: null,
};

export const initialMenuState: MenuState = {
  menu1: false,
  menu2: false,
};

export const initialModalState: ModalState = {
  isOpen: false,
  content: null
};

//アクション
export type Action =
  | { type: 'SET_USER_INFO'; payload: { email: string; password: string } }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'TOGGLE_MENU'; payload: keyof MenuState }
  | { type: 'TOGGLE_MODAL'; payload: boolean };

export const toggleModal = (isOpen: boolean, content?: any) => ({
    type: 'TOGGLE_MODAL',
    payload: isOpen,
  });

export const toggleMenu = (menu: string) => ({
    type: 'TOGGLE_MENU',
    payload: menu,
  });
  