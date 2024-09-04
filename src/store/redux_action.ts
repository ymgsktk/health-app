import { Post } from '../interface/post';
import { material } from '../API/apidata';
import { format } from 'date-fns';

//インターフェイス
export interface UserState {
  username: string;
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
  foodtype: string;
  date: string;
  title: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
}

export interface SumNutritionState{
  id: string;
  date: string;
  amount: number;
  calories: number;
  protein: number;
  fat: number;
}

export interface SelectNutradarChart{
  nut_rader: string;
}

export interface DateradarChart{
  date_rader: string;
}

export interface SelectNutlineChart{
  nut_line: string;
}

export interface DatelineChart{
  date_line: string;
}

export interface SelectNutbarChart{
  nut_bar: string;
}

export interface DatebarChart{
  date_bar: string;
}


export interface WeeklineChart{
  week_line: string;
}

//初期状態
export const initialPostState: PostsState = {
  posts: [],
};

export const initialUserState: UserState = {
  username: '',
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

export const initialNutritionState: NutritionState[] = [];

export const initialSumNutritionState: SumNutritionState[] = [];

export const initialNutRadarChartState: SelectNutradarChart = {
  nut_rader: "",
}

const currentDate = format(new Date(), "yyyy/MM/dd");
export const initialDateRadarChartState: DateradarChart = {
  date_rader: currentDate,
}
export const initialNutLineChartState: SelectNutlineChart = {
  nut_line: "",
}

export const initialDateLineChartState: DatelineChart = {
  date_line: currentDate,
}

export const initialNutBarChartState: SelectNutbarChart = {
  nut_bar: "",
}

export const initialDateBarChartState: DatebarChart = {
  date_bar: currentDate,
}

export const initialWeekLineChartState: WeeklineChart = {
  week_line: "",
}


//アクション
export type Action =
  | { type: 'SET_USER_INFO'; payload: { username: string; password: string } }
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
  | { type: 'UPDATE_NUTRITION'; payload: NutritionState }  
  | { type: 'ADD_NUTRITION_ITEM'; payload: NutritionState }  
  | { type: 'SUM_NUTRITION_ITEM' ; payload: SumNutritionState}
  | { type: 'REMOVE_NUTRITION' ; payload: number}
  | { type: 'RESET_NUTRITION'}
  | { type: 'NUT_RADAR_CHART' ; payload: string}
  | { type: 'DATE_RADAR_CHART' ; payload: string}
  | { type: 'NUT_LINE_CHART' ; payload: string}
  | { type: 'DATE_LINE_CHART' ; payload: string}
  | { type: 'NUT_BAR_CHART' ; payload: string}
  | { type: 'DATE_BAR_CHART' ; payload: string}
  | { type: 'WEEK_LINE_CHART' ; payload: string}
  




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

export const updateNutrition = (nutrition: NutritionState[]) => ({
  type: 'UPDATE_NUTRITION',
  payload: nutrition,
});

export const SumNutrition = (Sumnutrition: SumNutritionState[]) => ({
  type: 'SUM_NUTRITION_ITEM',
  payload: Sumnutrition,
});
  
export const addNutritionItem = (nutrition: NutritionState) => ({
  type: 'ADD_NUTRITION_ITEM',
  payload: nutrition,
});
  
export const removeNutrition = (id: number) => ({
  type: 'REMOVE_NUTRITION',
  payload: id,
});
export const resetNutrition = () => ({
  type: 'RESET_NUTRITION'
});

export const setNutRadar = (nut: string) => ({
  type: 'NUT_RADAR_CHART',
  payload: nut,
});

export const setDateRadar = (date: string) => ({
  type: 'DATE_RADAR_CHART',
  payload: date,
});

export const setNutLine = (nut: string) => ({
  type: 'NUT_LINE_CHART',
  payload: nut,
});

export const setDateLine = (date: string) => ({
  type: 'DATE_LINE_CHART',
  payload: date,
});

export const setNutBar = (nut: string) => ({
  type: 'NUT_BAR_CHART',
  payload: nut,
});

export const setDateBar = (date: string) => ({
  type: 'DATE_BAR_CHART',
  payload: date,
});

export const setWeekLine = (week: string) => ({
  type: 'DATE_RADAR_CHART',
  payload: week,
});