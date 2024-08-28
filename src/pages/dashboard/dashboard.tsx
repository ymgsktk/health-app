import React, { useEffect, useState,useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import { Radar, Line } from 'react-chartjs-2';
import MainLayout from '../mainlayout';
import './dashboard.css'
import { setDateRadar , setNutRadar, setWeekLine} from '../../store/redux_action';
import {store} from '../../store/redux_store';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem, 
  TooltipModel 
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

interface RadarChartData {
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

interface LineChartData {
  labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    }[];
  };

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  console.log('現在のReduxの状態:', store.getState());
  const nutritionItems = useSelector((state: AppState) => state.nutrition);
  const selectNut_radar = useSelector((state: AppState) => state.nut_radar);
  const selectDate_radar = useSelector((state: AppState) => state.date_radar);

  const selectedWeek = useSelector((state: AppState) => state.week_line.week_line);
  const storedDates = useSelector((state: AppState) => state.nutrition.map(item => item.date));
  console.log(storedDates)

  const [radardata, setRadarData] = useState<RadarChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: true,
        backgroundColor: '',
        borderColor: '',
        pointBackgroundColor: '',
        pointBorderColor: '',
        pointHoverBackgroundColor: '',
        pointHoverBorderColor: ''
      }
    ]
  });

  const [lineData, setLineData] = useState<LineChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        fill: false,
      },
    ],
  });

  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'radar'>) {
            return context.label + ': ' + context.raw; 
          },
        },
        bodyFont: {
          size: 14, 
        },
      },
    },
    scales: {
      r: {
        min: 0,
        ticks: {
          stepSize: 100,
          font: {
            size: 14,
          },
        },
      },
    },
  });


  useEffect(() => {
    const filteredItems = nutritionItems.filter((item: any) => item.date === selectDate_radar.date_rader);

    if(filteredItems.length > 0){
      const labels = filteredItems.map((item: any) => item.title); 
      let Data = filteredItems.map((item: any) => item[selectNut_radar.nut_rader]/100); 
      if(selectNut_radar.nut_rader === 'calories'){
        setRadarData({
          labels:labels,
          datasets: [
            {
              label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
              data: Data,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3a3a3a'
            },
          ]
        });
      }else if(selectNut_radar.nut_rader === 'protein'){
        setRadarData({
          labels:labels,
          datasets: [
            {
              label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
              data: Data,
              fill: true,
              backgroundColor: '#5a8dfb86',
              borderColor: '#2167ff',
              pointBackgroundColor: '#568bff',
              pointBorderColor: '#ffffff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#939393'
            },
          ]
        });
      }else if(selectNut_radar.nut_rader === 'fat'){
        setRadarData({
          labels:labels,
          datasets: [
            {
              label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
              data: Data,
              fill: true,
              backgroundColor: '#8aff848f',
              borderColor: '#31b62a',
              pointBackgroundColor: '#31b62a',
              pointBorderColor: '#ffffff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#939393'
            },
          ]
        });
      }
    }else{
      setRadarData({
        labels: ["","","","","","",""],
        datasets: [
          {
            label: "Nodata",
            data: [0,0,0,0,0,0,0],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(142, 142, 142)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#939393'
          },
        ]
      });
    };

    const stepSize = selectNut_radar.nut_rader === 'calories' ? 100 : 10;

    setOptions({
      ...options,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: 'Radar-Chart',
          font: {
            size: 24, 
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<'radar'>) {
              return context.label + ': ' + context.raw;
            },
          },
          bodyFont: {
            size: 20, 
          },
        },
      },
      scales: {
        r: {
          min: 0,
          ticks: {
            stepSize: stepSize,
            font: {
              size: 14, 
            },
          },
        },

      },
      
      
    });
  }, [selectDate_radar,selectNut_radar, nutritionItems]);

  
  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setNutRadar(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRadar(e.target.value));
  };

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setWeekLine(e.target.value));
  };

  return (
    <MainLayout>
        <div className='all-content'>
        <h1 className='title'>ダッシュボード</h1>
              <div className='input-chart'>
                <div className='inputs'>
                  <div className='input-back'>
                  <div className='dash-date'>
                    <label className='dashdate'>日付：</label>
                    <input  className='select-kind' type="date" value={selectDate_radar.date_rader || ''} onChange={handleDateChange}/>
                  </div>
                  <div className='dash-nutri'>
                    <label className='dashnutri'>栄養：</label>
                    <select  className='select-kind' onChange={handleSelectChange} value={selectNut_radar.nut_rader}>
                      {selectNut_radar.nut_rader === '' && <option value="">選択してください</option>}
                      <option value="calories">calorie</option>
                      <option value="protein">protein</option>
                      <option value="fat">fat</option>
                    </select>
                  </div>
                  </div>
                </div>
                <div className='radar-chart'>
                  <Radar data={radardata} options={options} className='radarchart'/>
                </div>   
              </div>  

               
        </div>
    </MainLayout>
  );
};

export default Dashboard;
