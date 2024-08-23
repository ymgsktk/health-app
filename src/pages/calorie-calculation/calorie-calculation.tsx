import React, { useState } from 'react';
import MainLayout from '../mainlayout';

type FoodItem = {
    date: string;
    foodType: string;
    amount: number;
    calories: number;
  };

const CalorieCalculation: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [selectedFood, setSelectedFood] = useState<string>('鶏肉');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState<number>(1);
    const [calories, setCalories] = useState<number>(0);
  
    const foodData = [
      { type: '鶏肉', unit: '100g', calories: 239 },
      { type: '卵', unit: '100g (2個)', calories: 155.1 },
      { type: 'マグロ', unit: '100g', calories: 129.8 },
    ];
  
    const handleAddToTable = () => {
      const selectedFoodItem = foodData.find(food => food.type === selectedFood);
      if (!selectedFoodItem) return;
  
      setFoodItems([
        ...foodItems,
        {
          date: date,
          foodType: selectedFood,
          amount: amount,
          calories: selectedFoodItem.calories * amount,
        },
      ]);
    };
  return (
    <MainLayout>
    <div className="calorie-tracker-container">
        <h2>カロリー計算</h2>
        <div className='option-calorie'>
          <label>種類を選ぶ</label>
          <select 
            value={selectedFood} 
            onChange={e => setSelectedFood(e.target.value)}
          >
            {foodData.map(food => (
              <option key={food.type} value={food.type}>{food.type}</option>
            ))}
          </select>
        </div>
        <div className='calorie-table'>
            <table className="food-table">
                <thead>
                    <tr>
                        <th>Food</th>
                                <th>Serving</th>
                                <th>Calories</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Arrowroot</td>
                                <td>1 piece (33 g)</td>
                                <td>21 cal</td>
                            </tr>
                            <tr>
                                <td>Artichoke</td>
                                <td>1 piece (128 g)</td>
                                <td>56 cal</td>
                            </tr>
                            <tr>
                                <td>Asparagus</td>
                                <td>1 piece, small (12 g)</td>
                                <td>2 cal</td>
                            </tr>
                            <tr>
                                <td>Asparagus, cooked</td>
                                <td>1 portion (125 g)</td>
                                <td>19 cal</td>
                            </tr>
                            <tr>
                                <td>Azuki Beans</td>
                                <td>1 portion (60 g)</td>
                                <td>217 cal</td>
                            </tr>
                            <tr>
                                <td>Baked Beans</td>
                                <td>1 cup (253 g)</td>
                                <td>266 cal</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

      <div className="form-section">
        <div>
          <label>日付</label>
          <input 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
        </div>
        <div>
          <label>食品</label>
          <select 
            value={selectedFood} 
            onChange={e => setSelectedFood(e.target.value)}
          >
            {foodData.map(food => (
              <option key={food.type} value={food.type}>{food.type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>量</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>
        <button onClick={handleAddToTable}>テーブルに追加</button>
      </div>

      <table className="calorie-table">
        <thead>
          <tr>
            <th>#</th>
            <th>日付</th>
            <th>食品</th>
            <th>量</th>
            <th>カロリー</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.foodType}</td>
              <td>{item.amount}</td>
              <td>{item.calories}</td>
              <td>
                <button>編集</button>
                <button>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </MainLayout>
  );
};

export default CalorieCalculation;