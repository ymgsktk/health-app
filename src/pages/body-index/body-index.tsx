// src/pages/body-index/body-index.tsx
import  React ,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import MainLayout from '../mainlayout';
import { fetchrecommend } from '../../API/apidata-post';
import { Menu } from '../../interface/post';
import { toggleModal } from '../../store/redux_action';
import ModalComponent from './modal';
import {store} from '../../store/redux_store';
import './body-index.css'

const BodyIndex: React.FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const { height, weight, bmi, bmicalculated } = useSelector((state: AppState) => state.bmi);
  const [recommendMenus, setRecommendMenus] = React.useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

    console.log('現在のReduxの状態:', store.getState());
  useEffect(() => {
    const savedHeight = localStorage.getItem('height');
    const savedWeight = localStorage.getItem('weight');
    const savedBMI = localStorage.getItem('bmi');
    const savedMenus = localStorage.getItem('recommendMenus');

    if (savedHeight) {
      dispatch({ type: 'SET_HEIGHT', payload: Number(savedHeight) });
    }
    if (savedWeight) {
      dispatch({ type: 'SET_WEIGHT', payload: Number(savedWeight) });
    }
    if (savedBMI) {
      dispatch({ type: 'CALCULATE_BMI', payload: Number(savedBMI) });
    }
    if (savedMenus) {
      setRecommendMenus(JSON.parse(savedMenus));
    }
  }, [dispatch]);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    dispatch({ type: 'SET_HEIGHT', payload: newHeight });
    localStorage.setItem('height', newHeight.toString());
    setError(null); 
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(e.target.value);
    dispatch({ type: 'SET_WEIGHT', payload: newWeight });
    localStorage.setItem('weight', newWeight.toString());
    setError(null); 
  };

  const handleCalculateBMI = async () => {
    if (!height || !weight) {
      setError('身長と体重を入力してください');
      return;
    }
    dispatch({ type: 'CALCULATE_BMI' });
    if (bmi !== null) {
        localStorage.setItem('bmi', bmi.toString());
      }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (bmi !== null) {
        try {
          const menus = await fetchrecommend(bmi);
          localStorage.setItem('recommendMenus', JSON.stringify(menus));
          setRecommendMenus(menus);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [bmi]); 

  const handlePostClick = (menu: Menu) => {
    setSelectedMenu(menu)
    dispatch(toggleModal(true));
  };


  return (
    <MainLayout>
    <div className='main-content'>
        <h1 className='BMI-title'>BMI計算</h1>
        <div className='input-fields'>
            <div className='height-con'>
                <label htmlFor="height">身長 (cm):</label>
                <input
                className='input-height'
                id="height"
                type="number"
                value={height == 0 ? '' : height}
                onChange={handleHeightChange}
                />
            </div>
            <div className='weight-con'>
                <label htmlFor="weight">体重 (kg):</label>
                <input
                className='input-height'
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
                    <button className='detail-button' onClick={() => handlePostClick(menu)}>詳細</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ModalComponent menu={selectedMenu} />
    </div>
    </MainLayout>
  );
};

export default BodyIndex;