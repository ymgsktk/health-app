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
  };

const CalorieCalculation: React.FC = () => {
    const dispatch = useDispatch();
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [selectedFood, setSelectedFood] = useState('');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState<number>(0);
    const [calories, setCalories] = useState<number>(0);
    const { selectedCategory, foodData } = useSelector((state: AppState) => state.selectfoodtype);

    useEffect(() => {
        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) {
            dispatch(setSelectedFoodCategory(savedCategory));
        }else {
            dispatch(setSelectedFoodCategory('')); 
        }
    }, [dispatch]);
  
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCategory = e.target.value;
        dispatch(setSelectedFoodCategory(selectCategory));
        localStorage.setItem('selectedCategory', selectCategory);
      };

      const filteredFood = foodData.filter(food => food.type === selectedCategory);

      const handleAddToTable = () => {
        const selectedFoodItem = filteredFood.find(food => food.id === parseInt(selectedFood));
        if (!selectedFoodItem) return;
    
        setFoodItems([
          ...foodItems,
          {
            id: Date.now(),
            date: date,
            foodType: selectedFoodItem.title,
            amount: amount,
            calories: selectedFoodItem.calorie * amount,
          },
        ]);
      };
    
      const handledeleteToTable = (id:number) => {
        const updatedFoodItems = foodItems.filter(item => item.id !== id);
        setFoodItems(updatedFoodItems);
      }

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
                    <th id=''>操作</th>
                </tr>
                </thead>
                <tbody>
                {foodItems.map((item) => (
                    <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.foodType}</td>
                    <td>{item.amount}g</td>
                    <td>{item.calories/100}cal</td>
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
        </div>
    </div>
    </MainLayout>
  );
};

export default CalorieCalculation;