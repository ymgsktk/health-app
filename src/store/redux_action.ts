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

export interface BMIState {
  height: number;
  weight: number;
  bmi: number | null;
  bmicalculated: boolean;
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

export const initialBMIState: BMIState = {
  height: 0,
  weight: 0,
  bmi: null,
  bmicalculated: false,
};

//アクション
export type Action =
  | { type: 'SET_USER_INFO'; payload: { email: string; password: string } }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'TOGGLE_MENU'; payload: keyof MenuState }
  | { type: 'TOGGLE_MODAL'; payload: boolean }
  | { type: 'SET_HEIGHT'; payload: number }
  | { type: 'SET_WEIGHT'; payload: number }
  | { type: 'CALCULATE_BMI'; payload:boolean };

export const toggleModal = (isOpen: boolean, content?: any) => ({
    type: 'TOGGLE_MODAL',
    payload: isOpen,
  });

export const toggleMenu = (menu: string) => ({
    type: 'TOGGLE_MENU',
    payload: menu,
  });
  