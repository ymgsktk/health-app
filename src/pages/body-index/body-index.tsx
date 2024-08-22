// src/pages/body-index/body-index.tsx
import  React ,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import MainLayout from '../mainlayout';
import { fetchrecommend } from '../../API/apidata-post';
import { Menu } from '../../interface/post';
import './body-index.css'

const BodyIndex: React.FC = () => {
  const dispatch = useDispatch();
  const { height, weight, bmi, bmicalculated } = useSelector((state: AppState) => state.bmi);
  const [error, setError] = useState<string | null>(null);
  const [recommendMenus, setRecommendMenus] = React.useState<Menu[]>([]);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_HEIGHT', payload: Number(e.target.value) });
    setError(null); 
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_WEIGHT', payload: Number(e.target.value) });
    setError(null); 
  };

  const handleCalculateBMI = async () => {
    if (!height || !weight) {
      setError('身長と体重を入力してください');
      return;
    }
    dispatch({ type: 'CALCULATE_BMI' });
  };
  useEffect(() => {
    const fetchData = async () => {
      if (bmi !== null) {
        try {
          const menus = await fetchrecommend(bmi);
          setRecommendMenus(menus);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [bmi]); 


  return (
    <MainLayout>
    <div className='main-content'>
        <h1 className='BMI-title'>BMI計算</h1>
        <div className='input-fields'>
            <div className='height-con'>
                <label htmlFor="height">身長 (cm):</label>
                <input
                id="height"
                type="number"
                value={height == 0 ? '' : height}
                onChange={handleHeightChange}
                />
            </div>
            <div className='weight-con'>
                <label htmlFor="weight">体重 (kg):</label>
                <input
                id="weight"
                type="number"
                value={weight == 0 ? '' : weight}
                onChange={handleWeightChange}
                step="0.1"
                />
            </div>
            <button className='cal-button' onClick={handleCalculateBMI}>計算</button>
            <div className='bmi-result-box'>
                <h2 className='BMI'>BMI: {bmi !== null ? bmi.toFixed(2) : ''}</h2>
            </div>
        </div>
        {error && <p className='error-message'>{error}</p>}
        {bmicalculated && recommendMenus.length > 0 && (
          <div className='recommend-menus'>
            <h1 className='recommend-title'>BMIに基づいたおすすめメニュー</h1>
            {recommendMenus.map((menu) => (
              <div key={menu.id} className='menu'>
                <img src={menu.imageUrl} alt={menu.title} className='recommend-img'/>
                <div className='des'>
                    <h2>{menu.title}</h2>
                    <p className='menu-des'>{menu.description}</p>
                    <button className='detail-button'>詳細</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
    </MainLayout>
  );
};

export default BodyIndex;