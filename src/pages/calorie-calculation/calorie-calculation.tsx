import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../mainlayout';
import { AppState } from '../../store/redux_store';
import { setSelectedFoodCategory } from '../../store/redux_action';
import "./calorie-calculation.css";

type FoodItem = {
    id: number;
    date: string;
    foodType: string;
    amount: number;
    calories: number;
    protein: number;
    fat: number;
  };

const CalorieCalculation: React.FC = () => {
    const dispatch = useDispatch();
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [selectedFood, setSelectedFood] = useState('');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState<number>(0);
    const [totalsByDate, setTotalsByDate] = useState<{ [key: string]: { calories: number, protein: number, fat: number } }>({});
    const [nutritionSummary, setNutritionSummary] = useState<{ [key: string]: { calories: number, protein: number, fat: number } }>({});

    const { selectedCategory, foodData } = useSelector((state: AppState) => state.selectfoodtype);

    useEffect(() => {
        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) {
            dispatch(setSelectedFoodCategory(savedCategory));
        }else {
            dispatch(setSelectedFoodCategory('')); 
        }
        const savedset_addtable = localStorage.getItem('caloriecalculation-addtable');
        const savedset_setdate = localStorage.getItem('caloriecalculation-setdate');
        const savedTotalsByDate = localStorage.getItem('totalsByDate');

        if(savedset_addtable){
            setFoodItems(JSON.parse(savedset_addtable))
        }

        if (savedTotalsByDate) {
            setTotalsByDate(JSON.parse(savedTotalsByDate));
        }
        if(savedset_setdate){
            setDate(savedset_setdate)
        }else {
            setDate(new Date().toISOString().slice(0, 10));
        }

    }, [dispatch]);

    useEffect(() => {
        const summary: { [key: string]: { calories: number, protein: number, fat: number } } = {};

        foodItems.forEach(item => {
            if (!summary[item.date]) {
                summary[item.date] = { calories: 0, protein: 0, fat: 0 };
            }
            summary[item.date].calories += item.calories;
            summary[item.date].protein += item.protein;
            summary[item.date].fat += item.fat;
        });

        setNutritionSummary(summary);
    }, [foodItems]);
  
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCategory = e.target.value;
        dispatch(setSelectedFoodCategory(selectCategory));
        localStorage.setItem('selectedCategory', selectCategory);
    };

      const filteredFood = foodData.filter(food => food.type === selectedCategory);

      const handleAddToTable = () => {
        const selectedFoodItem = filteredFood.find(food => food.id === parseInt(selectedFood));
        if (!selectedFoodItem) return;
    
        const newItem = {
            id: Date.now(),
            date: date,
            foodType: selectedFoodItem.title,
            amount: amount,
            calories: selectedFoodItem.calorie * amount,
            protein: selectedFoodItem.protein * amount,
            fat: selectedFoodItem.fat * amount
        };
        setFoodItems(prevFoodItems => {
            const updatedFoodItems = [...prevFoodItems, newItem];
            localStorage.setItem('caloriecalculation-addtable', JSON.stringify(updatedFoodItems));
            localStorage.setItem('caloriecalculation-setdate', date);
    
            const newTotalsByDate = updatedFoodItems.reduce((acc, item) => {
                if (!acc[item.date]) {
                    acc[item.date] = { calories: 0, protein: 0, fat: 0 };
                }
                acc[item.date].calories += item.calories / 100;
                acc[item.date].protein += item.protein / 100;
                acc[item.date].fat += item.fat / 100;
                return acc;
            }, {} as { [key: string]: { calories: number, protein: number, fat: number } });
    
            setTotalsByDate(newTotalsByDate);
            localStorage.setItem('totalsByDate', JSON.stringify(newTotalsByDate));
    
            return updatedFoodItems;
        });
    };
    

    const handledeleteToTable = (id: number) => {
        setFoodItems(prevFoodItems => {
            const updatedFoodItems = prevFoodItems.filter(item => item.id !== id);
            localStorage.setItem('caloriecalculation-addtable', JSON.stringify(updatedFoodItems));
    
            const newTotalsByDate = updatedFoodItems.reduce((acc, item) => {
                if (!acc[item.date]) {
                    acc[item.date] = { calories: 0, protein: 0, fat: 0 };
                }
                acc[item.date].calories += item.calories / 100;
                acc[item.date].protein += item.protein / 100;
                acc[item.date].fat += item.fat / 100;
                return acc;
            }, {} as { [key: string]: { calories: number, protein: number, fat: number } });
    
            setTotalsByDate(newTotalsByDate);
            localStorage.setItem('totalsByDate', JSON.stringify(newTotalsByDate));
    
            return updatedFoodItems;
        });
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
                {foodItems.map((item) => (
                    <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.foodType}</td>
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
                            {Object.keys(totalsByDate).map(date => {
                                const totals = totalsByDate[date] || { calories: 0, protein: 0, fat: 0 };
                                return (
                                    <tr key={date}>
                                        <td>{date}</td>
                                        <td>{totals.calories}cal</td>
                                        <td>{totals.protein}g</td>
                                        <td>{totals.fat}g</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
    </MainLayout>
  );
};

export default CalorieCalculation;