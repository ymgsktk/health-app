import React, { useEffect,useState,useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
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
  CategoryScale,
  LineElement,
  LinearScale,
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
  CategoryScale,
  LinearScale, 
  Title,
  Tooltip,
  Legend,
  Filler
);

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

const Linechart = () => {
  const dispatch = useDispatch();
  const nutritionItems = useSelector((state: AppState) => state.nutrition);
  const selectNut_radar = useSelector((state: AppState) => state.nut_radar);
  const selectDate_radar = useSelector((state: AppState) => state.date_radar);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getWeekRange = (date: Date): { startDate: Date; endDate: Date } => {
    const startOfWeek = date.getDate() - date.getDay();
    const startDate = new Date(date);
    startDate.setDate(startOfWeek);
    const endDate = new Date(date);
    endDate.setDate(startOfWeek + 6);
    return { startDate, endDate };
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setNutRadar(e.target.value));
  };

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
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  });

  useEffect(() => {
    const getFilteredItems = () => {
      if (selectedDate) {
        const { startDate, endDate } = getWeekRange(selectedDate);
        return nutritionItems.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      return [];
    };
    const filteredItems = getFilteredItems();
    if(filteredItems.length > 0){
      const labels = filteredItems.map((item: any) => item.title); 
      let Data = filteredItems.map((item: any) => item[selectNut_radar.nut_rader]/100); 
      if(selectNut_radar.nut_rader === 'calories'){
        setLineData({
          labels:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          datasets: [
                {
                  label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
                  data: Data,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: '',
                  fill: false,
                },
          ]
        });
      }else if(selectNut_radar.nut_rader === 'protein'){
        setLineData({
          labels:labels,
          datasets: [
                {
                  label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
                  data: Data,
                  borderColor: '#2167ff',
                  backgroundColor: '',
                  fill: false,
                },
          ]
        });
      }else if(selectNut_radar.nut_rader === 'fat'){
        setLineData({
          labels:labels,
          datasets: [
                {
                  label: selectNut_radar.nut_rader.charAt(0).toUpperCase() + selectNut_radar.nut_rader.slice(1),
                  data: Data,
                  borderColor: '#31b62a',
                  backgroundColor: '',
                  fill: false,
                },
          ]
        });
      }
    }else{
      setLineData({
        labels:["","","","","","",""],
        datasets: [
              {
                label: 'Nodata',
                data: [0,0,0,0,0,0,0],
                borderColor: '',
                backgroundColor: '',
                fill: false,
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
        x: {
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 14,
            },
          },
        },

      },
      
      
    });
  }, [selectDate_radar,selectNut_radar, nutritionItems]);

  


  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        showWeekNumbers
        filterDate={(date: Date) => date.getDay() === 0} 
        customInput={
          <input 
            type="text"
            value={
              selectedDate
                ? `第${Math.ceil((selectedDate.getDate() - 1) / 7) + 1}週目 (${format(selectedDate, "yyyy/MM/dd")})`
                : ""
            }
          />
        }
      />
      <label className='dashnutri'>栄養：</label>
                    <select  className='select-kind' onChange={handleSelectChange} value={selectNut_radar.nut_rader}>
                      {selectNut_radar.nut_rader === '' && <option value="">選択してください</option>}
                      <option value="calories">calorie</option>
                      <option value="protein">protein</option>
                      <option value="fat">fat</option>
                    </select>
      <Line data={lineData}/>
    </div>
  );
};

export default Linechart;
