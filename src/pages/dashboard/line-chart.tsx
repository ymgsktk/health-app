import React, { useEffect,useState,useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import { Radar, Line } from 'react-chartjs-2';
import MainLayout from '../mainlayout';
import './dashboard.css'
import { setDateLine, setDateRadar , setNutLine, setNutRadar, setWeekLine} from '../../store/redux_action';
import {store} from '../../store/redux_store';
import './dashboard.css'
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
import { date_barReducer } from "../../store/redux_reducer";

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
        pointBackgroundColor: string;
        pointBorderColor: string;
        pointHoverBackgroundColor: string;
        pointHoverBorderColor: string;
        fill: boolean;
    }[];
  };

const Linechart = () => {
  const dispatch = useDispatch();
  const sumnutrition = useSelector((state: AppState) => state.sum_nut)
  const nutritionItems = useSelector((state: AppState) => state.nutrition);
  //const selectNut_radar = useSelector((state: AppState) => state.nut_radar);
  const selectDate_radar = useSelector((state: AppState) => state.date_radar);
  const selectNut_line = useSelector((state: AppState) => state.nut_line);
  const selectDate_line = useSelector((state: AppState) => state.date_line);
  let filteredItems = []


  //const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getWeekRange = (date: Date): { startDate: Date; endDate: Date } => {
    const startOfWeek = date.getDate() - date.getDay();
    const startDate = new Date(date);
    startDate.setDate(startOfWeek);
    const endDate = new Date(date);
    endDate.setDate(startOfWeek + 7);
    return { startDate, endDate };
  };

  const handleWeekChange = (date: Date | null) => {
    if (date) {
      dispatch(setDateLine(format(date, "yyyy/MM/dd")));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setNutLine(e.target.value));
  };

  const [lineData, setLineData] = useState<LineChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        pointBackgroundColor: '',
        pointBorderColor: '',
        pointHoverBackgroundColor: '',
        pointHoverBorderColor: '',
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
      if (selectDate_line) {
        const { startDate, endDate } = getWeekRange(new Date(selectDate_line.date_line));
        console.log(startDate, endDate)
        return sumnutrition.filter(item => {
          const itemDate = new Date(item.date);         
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      return [];
    };
    filteredItems = getFilteredItems();
    if(filteredItems.length > 0){
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weeklyData = new Array(7).fill(0);
      filteredItems.forEach((item: any) => {
        const date = new Date(item.date);  
        const dayIndex = date.getDay();    
        weeklyData[dayIndex] += item[selectNut_line.nut_line] / 100; 
    });
      if(selectNut_line.nut_line === 'calories'){
        setLineData({
          labels:weekDays,
          datasets: [
                {
                  label: selectNut_line.nut_line.charAt(0).toUpperCase() + selectNut_line.nut_line.slice(1),
                  data: weeklyData,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  pointBackgroundColor: 'rgb(255, 99, 132)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: '#3a3a3a',
                  fill: true,
                },
          ]
        });
      }else if(selectNut_line.nut_line === 'protein'){
        setLineData({
          labels:weekDays,
          datasets: [
                {
                  label: selectNut_line.nut_line.charAt(0).toUpperCase() + selectNut_line.nut_line.slice(1),
                  data: weeklyData,
                  borderColor: '#2167ff',
                  backgroundColor: '#5a8dfb86',
                  pointBackgroundColor: '#568bff',
                  pointBorderColor: '#ffffff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: '#939393',
                  fill: true,
                },
          ]
        });
      }else if(selectNut_line.nut_line === 'fat'){
        setLineData({
          labels:weekDays,
          datasets: [
                {
                  label: selectNut_line.nut_line.charAt(0).toUpperCase() + selectNut_line.nut_line.slice(1),
                  data: weeklyData,
                  borderColor: '#31b62a',
                  backgroundColor: '#8aff848f',
                  pointBackgroundColor: '#31b62a',
                  pointBorderColor: '#ffffff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: '#939393',
                  fill: true,
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
                pointBackgroundColor: 'rgb(142, 142, 142)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#939393',
                fill: false,
              },
        ]
      });
    };

    const stepSize = selectNut_line.nut_line === 'calories' ? 100 : 10;

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
  }, [selectDate_line,selectNut_line, nutritionItems]);

  


  return (
    <div className="input-chart">
      <div className="inputs">
        <div className='input-back'>
          <div className='dash-date'>
              <label className='dashdate'>週：</label>
              <DatePicker
                selected={new Date(selectDate_line.date_line)}
                onChange={handleWeekChange}
                dateFormat="yyyy/MM/dd"
                //showWeekNumbers
                filterDate={(date: Date) => date.getDay() === 0} 
                customInput={
                  <input 
                    className="select-kind"
                    type="text"
                    value={
                      new Date(selectDate_line.date_line)
                        ? `第${Math.ceil((new Date(selectDate_line.date_line).getDate() - 1) / 7) + 1}週目 (${format(new Date(selectDate_line.date_line), "yyyy/MM/dd")})`
                        : ""
                    }
                  />
                }
              />
          </div>
          <div className='dash-nutri'>
              <label className='dashnutri'>栄養：</label>
              <select  className='select-kind' onChange={handleSelectChange} value={selectNut_line.nut_line}>
                {selectNut_line.nut_line === '' && <option value="">選択してください</option>}
                <option value="calories">calorie</option>
                <option value="protein">protein</option>
                <option value="fat">fat</option>
              </select>
          </div>   
        </div>
      </div>
      <div className='radar-chart'>
        <Line data={lineData} className="radarchart"/>
      </div>
    </div>
  );
};

export default Linechart;
