import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import { Radar } from 'react-chartjs-2';
import MainLayout from '../mainlayout';
import { updateNutrition } from '../../store/redux_action';
import {store} from '../../store/redux_store';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
  }[];
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

    console.log('現在のReduxの状態:', store.getState());
  const nutritionItems = useSelector((state: AppState) => state.nutrition);
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Calories',
        data: [],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  });


  useEffect(() => {

      const labels = nutritionItems.map((item: any) => item.title); 
      const caloriesData = nutritionItems.map((item: any) => item.calories/100); 

      setData({
        labels:labels,
        datasets: [
          {
            label: 'Calories',
            data: caloriesData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }
        ]
      });
  }, [dispatch]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Calories Visualization'
      }
    },
    scales: {
      r: {
        min: 0,  
        ticks: {
          stepSize: 100, 
        },
      },
    },
  
  };

  return (
    <MainLayout>
      <div>
        <h1>Dashboard Page</h1>
        <p>Welcome to the dashboard.</p>
        <div className='date-div'>
          <label className='label'>日付：</label>
          <input id='date' className='select-kind' type="date" />
        </div>
        <div className='radar-chart'>
          <Radar data={data} options={options} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
