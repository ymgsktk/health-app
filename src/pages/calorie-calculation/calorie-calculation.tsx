import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../mainlayout';
import { AppState } from '../../store/redux_store';
import { NutritionState, updateNutrition, addNutritionItem, removeNutrition, setSelectedFoodCategory, SumNutrition} from '../../store/redux_action';
import "./calorie-calculation.css";
import { title } from 'process';
import {store} from '../../store/redux_store';
import { v4 as uuidv4 } from 'uuid';

type FoodItem = {
    id: number;
    foodtype: string;
    date: string;
    title: string;
    amount: number;
    calories: number;
    protein: number;
    fat: number;
  };

type Summary = {
    id: string;
    date: string;
    amount: number;
    calories: number;
    protein: number;
    fat: number;
}

const CalorieCalculation: React.FC = () => {
    const dispatch = useDispatch();
    const nutritionItems = useSelector((state: AppState) => state.nutrition);
    let nutritionSummaries = useSelector((state: AppState) => state.sum_nut)
    console.log('nutrition', nutritionItems)
    console.log('現在のReduxの状態:', store.getState());
    const { selectedCategory, foodData } = useSelector((state: AppState) => state.food);


    const [selectedFood, setSelectedFood] = useState('');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState<number>(0);
   // const [totalsByDate, setTotalsByDate] = useState<{ [key: string]: { calories: number, protein: number, fat: number } }>({});
   // const [nutritionSummary, setNutritionSummary] = useState<{ [key: string]: { calories: number, protein: number, fat: number } }>({});

/*
    useEffect(() => {
        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) {
            dispatch(setSelectedFoodCategory(savedCategory));
        } else {
            dispatch(setSelectedFoodCategory(''));
        }

        const savedDate = localStorage.getItem('caloriecalculation-setdate');
        if (savedDate) {
            setDate(savedDate);
        } else {
            setDate(new Date().toISOString().slice(0, 10));
        }

        const savedTotalsByDate = localStorage.getItem('nutritionSummaries');
        if (savedTotalsByDate) {
            //setTotalsByDate(JSON.parse(savedTotalsByDate));
        }

        const savedNutritionItems = localStorage.getItem('nutritionItems');
        if (savedNutritionItems) {
            const parsedItems: NutritionState[] = JSON.parse(savedNutritionItems);
            dispatch(updateNutrition(parsedItems)); // Update state with new data
        }

    }, [dispatch]);

    useEffect(() => {
        const storedSummaries = localStorage.getItem('nutritionSummaries');
        if (storedSummaries) {
          setNutritionSummary(JSON.parse(storedSummaries));
        }
      }, []);

    useEffect(() => {
        if (nutritionItems.length > 0) {
            localStorage.setItem('nutritionItems', JSON.stringify(nutritionItems));
        }
    }, [nutritionItems]);
*/
    useEffect(() => {
        const summaryMap: { [key: string]: { calories: number, protein: number, fat: number } } = {};

        nutritionItems.forEach(item => {
            if (!summaryMap[item.date]) {
                summaryMap[item.date] = { calories: 0, protein: 0, fat: 0 };
            }
            summaryMap[item.date].calories += item.calories;
            summaryMap[item.date].protein += item.protein;
            summaryMap[item.date].fat += item.fat;
        });

        const summaries: Summary[] = Object.entries(summaryMap).map(([date, { calories, protein, fat }]) => ({
            id: uuidv4(),
            date,
            amount: 0, 
            calories,
            protein,
            fat,
        }));

        dispatch(SumNutrition(summaries));
       // localStorage.setItem('nutritionSummaries', JSON.stringify(summaries));
        console.log('現在のReduxの状態最新!!:', store.getState());
    }, [nutritionItems, dispatch]);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCategory = e.target.value;
        dispatch(setSelectedFoodCategory(selectCategory));
       // localStorage.setItem('selectedCategory', selectCategory);
    };

    const filteredFood = foodData.filter(food => food.type === selectedCategory);

    const handleAddToTable = () => {
        const selectedFoodItem = filteredFood.find(food => food.id === parseInt(selectedFood));
        if (!selectedFoodItem || amount <= 0) return;

        const newFoodItem: FoodItem = {
            id: Date.now(),  
            foodtype: selectedFoodItem.type,
            date: date,
            title: selectedFoodItem.title,
            amount: amount,
            calories: (selectedFoodItem.calorie * amount),
            protein: (selectedFoodItem.protein * amount),
            fat: (selectedFoodItem.fat * amount),
        };
        dispatch(addNutritionItem(newFoodItem));
    };

    const handledeleteToTable = (id: number) => {
        dispatch(removeNutrition(id));
    };

    

  return (
    <MainLayout>
    <div className="calorie-tracker-container">
        <div className='opt-table'>
            <h2 className='calorie-title'>摂取カロリー計算</h2>
            <div className='option-calorie'>
                <label className='select-kind-lit'>種類を選択
                </label>
                <select className='select-kind' value={selectedCategory} onChange={handleTypeChange}>
                    {selectedCategory === '' && <option value="">選択してください</option>}
                    <option value="meat">Meat</option>
                    <option value="egg">Egg</option>
                    <option value="fish">Fish</option>
                    <option value="milk and cheese">Milk and Cheese</option>
                    <option value="vegetable">Vegetable</option>
                 </select>
                 <label className='select-kind-lit2'>(栄養は100gあたりの量)
                </label>
            </div>

            <table className="food-tables">
                <thead>
                <tr>
                    <th id='table-foodname'>Food</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Fat</th>
                </tr>
                </thead>
                <tbody>
                {filteredFood.map(food => (
                    <tr key={food.id}>
                    <td>{food.title}</td>
                    <td>{food.calorie} cal</td>
                    <td>{food.protein} g</td>
                    <td>{food.fat} g</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className='form-table'>
            <div className="form-div">
                <div className='date-div'>
                    <label className='lavel'>日付：</label>
                    <input 
                        id='date'
                        className='select-kind'
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                    />
                </div>
                <div className='food-name'>
                    <label className='lavel'>食品：</label>
                    <select 
                        className='select-kind'
                        value={selectedFood} 
                        onChange={e => setSelectedFood(e.target.value)}
                    >
                        {<option value="">選択してください</option>}
                        {filteredFood.map(food => (
                        <option key={food.id} value={food.id}>{food.title}</option>
                        
                        ))}
                    </select>
                </div>
                <div className='amount-div'>
                    <label className='lavel'>量：</label>
                    <input 
                        id = "amount"
                        className='select-kind'
                        type="number" 
                        value={amount == 0 ? '' : amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className='add-button-div'>
                    <button className='add-button' onClick={handleAddToTable}>テーブルに追加</button>
                </div>
            </div>

            <table className="food-tables">
                <thead>
                <tr>
                    <th id='date'>日付</th>
                    <th id='food'>食品</th>
                    <th id='amount'>量</th>
                    <th id='calorie'>カロリー</th>
                    <th id='protein'>タンパク質</th>
                    <th id='fat'>脂質</th>
                    <th id='action'>操作</th>
                </tr>
                </thead>
                <tbody>
                {nutritionItems.map((item) => (
                    <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.title}</td>
                    <td>{item.amount}g</td>
                    <td>{(item.calories/100).toFixed(2)}cal</td>
                    <td>{(item.protein/100).toFixed(2)}g</td>
                    <td>{(item.fat/100).toFixed(2)}g</td>
                    <td className='td-button'>
                        <div className='edit'>
                            <button className='edit-button'>編集</button>
                        </div>
                        <div className='delete'>
                            <button className='delete-button' onClick={() => handledeleteToTable(item.id)}>削除</button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="total-nutrition">
                    <h2 className='total-nut-title'>日付ごとの栄養素合計</h2>
                    <table className="food-tables">
                        <thead>
                            <tr>
                                <th className='date'>日付</th>
                                <th className='calorie'>カロリー</th>
                                <th className='protein'>タンパク質</th>
                                <th className='fat'>脂質</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritionSummaries.map((item) => (
                                <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{((item.calories) / 100).toFixed(1)}cal</td>
                                <td>{((item.protein) / 100).toFixed(1)}g</td>
                                <td>{((item.fat) / 100).toFixed(1)}g</td>
                                </tr>
                            ))}
                            </tbody>
                    </table>
                </div>
        </div>
    </div>
    </MainLayout>
  );
};

export default CalorieCalculation;