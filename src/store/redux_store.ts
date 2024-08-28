import { createStore, combineReducers } from 'redux';
import { } from './redux_action';
import { postsReducer, userReducer, menuReducer, modalReducer, bmiReducer, bmrReducer, foodReducer, nutritionReducer} from './redux_reducer';

// rootReducerにmenuReducerを追加
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  menu: menuReducer,  
  modal: modalReducer,
  bmi: bmiReducer,
  bmicalculated: bmiReducer,
  bmr: bmrReducer,
  bmrcalculated: bmrReducer,
  food: foodReducer,
  nutrition: nutritionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);