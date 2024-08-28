import { DateradarChart, initialDateRadarChartState, initialUserState, UserState} from './redux_action';
import {initialPostState, PostsState} from './redux_action';
import {initialMenuState, MenuState} from './redux_action';
import { initialModalState, ModalState } from './redux_action';
import { initialBMIState, BMIState } from './redux_action';
import { initialBMRState, BMRState } from './redux_action';
import { initialFoodState, FoodState } from './redux_action';
import { initialNutritionState, NutritionState } from './redux_action';
import { initialNutRadarChartState, SelectNutradarChart } from './redux_action';
import { initialWeekLineChartState, WeeklineChart } from './redux_action';
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

export const bmiReducer = (state= initialBMIState, action: Action): BMIState => {
  switch (action.type) {
    case 'SET_HEIGHT':
      return { ...state, height: action.payload };
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'CALCULATE_BMI':
      const heightInMeters = state.height / 100;
      const bmi = state.weight / (heightInMeters * heightInMeters);
      return { ...state, bmi, bmicalculated: true };
    default:
      return state;
  }
};

export const bmrReducer = (state = initialBMRState, action: Action): BMRState => {
  switch (action.type) {
    case 'SET_HEIGHT-BMR':
      return { ...state, height: action.payload };
    case 'SET_WEIGHT-BMR':
      return { ...state, weight: action.payload };
    case 'SET_AGE-BMR':
      return { ...state, age: action.payload};
    case 'SET_GENDER-BMR':
      return { ...state, gender: action.payload};
    case 'SET_LEVEL-BMR':
      return { ...state, level: action.payload }
    case 'CALCULATE_BMR':
      const { height, weight, age, gender, level } = state;
        console.log(height, weight, age, gender)
        let bmr = null;
        let bmrcalculated = false;
        
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
          bmrcalculated = true;
        } else if (gender === 'female') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
          bmrcalculated = true;
        }
        console.log(bmr)
        if(bmr !== null){
          switch(level){
            case "level1":
              bmr = bmr * 1.2;
              break;
            case "level2":
              bmr = bmr * 1.4;
              break;
            case "level3":
              bmr = bmr * 1.6;
              break;
            case "level4":
              bmr = bmr * 1.8;
              break;
            case "level5":
              bmr = bmr * 1.9;
              break;
            default:
              break;
          }
        }else{
          console.log('bmr is null')
        }
        return {
          ...state,
          bmr,
          bmrcalculated: true,
        };

    case 'RESET_BMR':
      return initialBMRState;

    default:
      return state;
  }
};

export const foodReducer = (state = initialFoodState, action: Action): FoodState => {
  switch (action.type) {
    case 'SELECT_FOOD_TYPE':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};


export const nutritionReducer = (state: NutritionState[] = initialNutritionState, action: Action & { payload?: any }): NutritionState[] => {
  switch (action.type) {
    case 'UPDATE_NUTRITION': {
      return action.payload;
    }
    case 'ADD_NUTRITION_ITEM': {
      return [
        ...state,
        action.payload
      ];
    }
    case 'REMOVE_NUTRITION':
      return state.filter((item) => item.id !== action.payload);
    case 'RESET_NUTRITION':
      return []
    default:
      return state;
    
    
  }
};

export const nut_radarReducer = (state = initialNutRadarChartState, action: any):  SelectNutradarChart => {
  switch (action.type) {
    case 'NUT_RADAR_CHART':
      return { ...state, nut_rader: action.payload };
    default:
      return state;
  }
};

export const date_radarReducer = (state = initialDateRadarChartState, action: any):  DateradarChart => {
  switch (action.type) {
    case 'DATE_RADAR_CHART':
      return { ...state, date_rader: action.payload };
    default:
      return state;
  }
};

export const week_lineReducer = (state = initialWeekLineChartState, action: any):  WeeklineChart => {
  switch (action.type) {
    case 'DATE_RADAR_CHART':
      return { ...state, week_line: action.payload };
    default:
      return state;
  }
};