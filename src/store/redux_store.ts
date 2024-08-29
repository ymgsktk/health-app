import { createStore, combineReducers } from 'redux';
import { } from './redux_action';
import { postsReducer, userReducer, menuReducer, modalReducer, bmiReducer, bmrReducer, foodReducer, nutritionReducer, nut_radarReducer ,date_radarReducer,week_lineReducer,SumnutritionReducer, nut_lineReducer, date_lineReducer, date_barReducer, nut_barReducer} from './redux_reducer';

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
  sum_nut: SumnutritionReducer,
  nut_radar: nut_radarReducer,
  date_radar: date_radarReducer,
  nut_line: nut_lineReducer,
  date_line: date_lineReducer,
  nut_bar: nut_barReducer,
  date_bar: date_barReducer,
  week_line: week_lineReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);