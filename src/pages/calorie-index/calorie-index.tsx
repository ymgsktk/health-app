import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import MainLayout from '../mainlayout';
import './calorie-index.css';
import {store} from '../../store/redux_store';

const CalorieIndex: React.FC = () => {
  const dispatch = useDispatch();

    console.log('現在のReduxの状態:', store.getState());
  const { height, weight, age, gender, level, bmr, bmrcalculated } = useSelector((state: AppState) => state.bmr);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const savedHeight = localStorage.getItem('height-bmr');
    const savedWeight = localStorage.getItem('weight-bmr');
    const savedAge = localStorage.getItem('age-bmr');
    const savedGender = localStorage.getItem('gender-bmr');
    const savedLevel = localStorage.getItem('level-bmr');
    const savedBMR = localStorage.getItem('bmr');

    if (savedHeight) {
      dispatch({ type: 'SET_HEIGHT-BMR', payload: Number(savedHeight) });
    }
    if (savedWeight) {
      dispatch({ type: 'SET_WEIGHT-BMR', payload: Number(savedWeight) });
    }
    if (savedAge) {
      dispatch({ type: 'SET_AGE-BMR', payload: Number(savedAge) });
    }
    if (savedGender) {
      dispatch({ type: 'SET_GENDER-BMR', payload: savedGender });
    }
    if (savedLevel) {
      dispatch({ type: 'SET_LEVEL-BMR', payload: savedLevel });
    }
    if (savedBMR) {
      dispatch({ type: 'CALCULATE_BMR', payload: Number(savedBMR) });
    }
  }, [dispatch]);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    dispatch({ type: 'SET_HEIGHT-BMR', payload: newHeight });
    localStorage.setItem('height-bmr', newHeight.toString());
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(e.target.value);
    dispatch({ type: 'SET_WEIGHT-BMR', payload: newWeight });
    localStorage.setItem('weight-bmr', newWeight.toString());
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = Number(e.target.value);
    dispatch({ type: 'SET_AGE-BMR', payload: newAge });
    localStorage.setItem('age-bmr', newAge.toString());
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = e.target.value;
    dispatch({ type: 'SET_GENDER-BMR', payload: selectedGender });
    localStorage.setItem('gender-bmr', selectedGender);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = e.target.value;
    dispatch({ type: 'SET_LEVEL-BMR', payload: selectedLevel });
    localStorage.setItem('level-bmr', selectedLevel);
  };

  const handleCalculateBMR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !age) {
      setError('値を全て入力してください');
      return;
    }
    dispatch({ type: 'CALCULATE_BMR', payload: true });
    setError(null);
  };

  const handleResetBMR = () => {
    dispatch({ type: 'RESET_BMR' });
    setError(null);
    localStorage.removeItem('age-bmr');
    localStorage.removeItem('height-bmr');
    localStorage.removeItem('weight-bmr');
    localStorage.removeItem('level-bmr');
    localStorage.removeItem('gender-bmr');
  };

  return (
    <MainLayout>
      <div className='page'>
        <h1 className='title'>カロリー指数（BMR）の計算</h1>
        <div className="calculator-container">
          <form className="form-section">
            <div className="input-group">
              <label>年齢</label>
              <input type="number" value={age == 0 ? '' : age} placeholder="20" onChange={handleAgeChange} />
            </div>
            <div className="input-group">
              <label>性別</label>
              <select value={gender || ''} onChange={handleGenderChange}>
              <option value="">選択してください</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div className="input-group">
              <label>身長 (cm)</label>
              <input type="number" value={height == 0 ? '' : height} placeholder="170" onChange={handleHeightChange} />
            </div>
            <div className="input-group">
              <label>体重 (kg)</label>
              <input type="number" value={weight == 0 ? '' : weight} placeholder="60" onChange={handleWeightChange} />
            </div>
            <div className='cal-reset-button'>
              <button type="submit" className="submit-btn" onClick={handleCalculateBMR}>計算</button>
              <button type="reset" className="reset-btn" onClick={handleResetBMR}>リセット</button>
              <div className='error-mes'>
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </form>
          <div className="exercise-level">
            <label>運動レベル</label>
            <select value={level || ''} onChange={handleLevelChange}>
            <option value="">選択してください</option>
              <option value="level1">Level1:ほとんどしない</option>
              <option value="level2">Level2:1~3回/週</option>
              <option value="level3">Level3:4~5回/週</option>
              <option value="level4">Level4:6~7回/週</option>
              <option value="level5">Level5:それ以上</option>
            </select>
          </div>
        </div>

        <div className="results-section">
          <div className="calculation-result">
            <h3 className='cal-title'>結果: {bmrcalculated ? `${bmr} Calories/日` : '0 Calories/日'}</h3>
          </div>
          <div className="suggestions">
            <div className="suggestion">
              <h4>体重-0.25kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 0.85).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
            <div className="suggestion">
              <h4>体重-0.5kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 0.7).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
            <div className="suggestion">
              <h4>体重-1kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 0.41).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
            <div className="suggestion">
              <h4>体重+0.25kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 1.15).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
            <div className="suggestion">
              <h4>体重+0.5kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 1.30).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
            <div className="suggestion">
              <h4>体重+1kgを目標</h4>
              <p>{bmrcalculated && bmr !== null ? `${(bmr * 1.59).toFixed(2)} Calories/日` : '0 Calories/日'}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalorieIndex;
