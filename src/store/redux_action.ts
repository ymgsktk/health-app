import { Post } from '../interface/post';
import { material } from '../API/apidata'

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

export interface BMRState{
  height: number;
  weight: number;
  age: number;
  gender: string | null;
  level: string | null;
  bmr: number | null;
  bmrcalculated: boolean;
}

export interface FoodState{
  selectedCategory: string;
  foodData: Array<{
    id: number;
    title: string;
    calorie: number;
    protein: number;
    fat: number;
    type: string;
  }>
}

export interface NutritionState{
  id: number;
  date: string;
  foodType: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
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

export  const initialBMRState: BMRState = {
  height: 0,
  weight: 0,
  age: 0,
  gender: "",
  level: "",
  bmr: null,
  bmrcalculated: false,
}

export const initialFoodState: FoodState = {
  selectedCategory: "vegetable",
  foodData : material,
}

export const initialNutritionState: NutritionState ={
  id: 0,
  date: '',
  foodType: '',
  amount: 0,
  calories: 0,
  protein: 0,
  fat: 0,
}

//アクション
export type Action =
  | { type: 'SET_USER_INFO'; payload: { email: string; password: string } }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'TOGGLE_MENU'; payload: keyof MenuState }
  | { type: 'TOGGLE_MODAL'; payload: boolean }
  | { type: 'SET_HEIGHT'; payload: number }
  | { type: 'SET_WEIGHT'; payload: number }
  | { type: 'SET_HEIGHT-BMR'; payload: number }
  | { type: 'SET_WEIGHT-BMR'; payload: number }
  | { type: 'SET_AGE-BMR'; payload: number }
  | { type: 'SET_LEVEL-BMR'; payload: string }
  | { type: 'SET_GENDER-BMR'; payload: string }
  | { type: 'CALCULATE_BMI'; payload:boolean }
  | { type: 'CALCULATE_BMR'; payload:boolean }
  | { type: 'RESET_BMR'; payload:boolean }
  | { type: 'SELECT_FOOD_TYPE'; payload:string }
  | { type: 'SET_NUTRITION'; payload:NutritionState }
  | { type: 'RESET_NUTRITION'; payload:NutritionState }



export const toggleModal = (isOpen: boolean, content?: any) => ({
    type: 'TOGGLE_MODAL',
    payload: isOpen,
  });

export const toggleMenu = (menu: string) => ({
    type: 'TOGGLE_MENU',
    payload: menu,
  });
  
export const setSelectedFoodCategory = (category: string) => ({
    type: 'SELECT_FOOD_TYPE',
    payload: category,
  });