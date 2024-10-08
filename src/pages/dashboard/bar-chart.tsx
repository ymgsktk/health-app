import React, { useEffect,useState,useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth,format } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import { Radar, Line, Bar } from 'react-chartjs-2';
import MainLayout from '../mainlayout';
import './dashboard.css'
import { setDateLine, setDateRadar , setNutLine, setNutRadar, setWeekLine, setDateBar,setNutBar} from '../../store/redux_action';
import {store} from '../../store/redux_store';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  CategoryScale,
  LineElement,
  BarElement,
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
  BarElement,
  CategoryScale,
  LinearScale, 
  Title,
  Tooltip,
  Legend,
  Filler
);
interface BarChartData {
  labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
  };


const Barchart = () => {
    const dispatch = useDispatch();
    const selectNut_bar = useSelector((state: AppState) => state.nut_bar);
    const selectDate_bar = useSelector((state: AppState) => state.date_bar);
    const sumnutrition = useSelector((state: AppState) => state.sum_nut);
    const nutritionItems = useSelector((state: AppState) => state.nutrition);


    const [barData, setBarData] = useState<BarChartData>({
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderColor: '',
          backgroundColor: '',
        },
      ],
    });
    
      const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '栄養摂取量の統計',
            font: {
              size: 15, 
            },
        },
        
        },
        scales: {
        x: {
            stacked: false,
            categoryPercentage: 0.6, // 棒グラフの幅
            barPercentage: 0.8, // 棒グラフの間隔
        },
        y: {
            beginAtZero: true,
        },
        },
    };

    useEffect(() => {
      /*const getinitialItems = () => {
        if (selectDate_bar) {
          const startDate = new Date(selectDate_bar.date_bar);
          startDate.setDate(1);  
          const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); 
      
          const daysInMonth = endDate.getDate();
          const weeksInMonth: number[][] = [];
      
          let currentWeek: number[] = [];
          
          for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
            const dayOfWeek = currentDate.getDay();  
    
            currentWeek.push(0);
            if (dayOfWeek === 6 || day === daysInMonth) {
              weeksInMonth.push(currentWeek);
              currentWeek = [];
            }
          }
          return weeksInMonth;
        }
        return [];
      };*/
      const getFilteredItems = () => {
        return sumnutrition.filter(item => {
          const startDate = new Date(selectDate_bar.date_bar);
          startDate.setDate(1);  
          const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); 
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
        const getmatchItems = () => {
          const year = new Date(selectDate_bar.date_bar).getFullYear();
          const month =new Date(selectDate_bar.date_bar).getMonth()+1;
          filteredItems.forEach(item => {       
          let day = new Date(item.date).getDate();

          const firstDayOfMonth = startOfMonth(new Date(year, month - 1)); 
          const weekday = format(firstDayOfMonth, 'EEEE');//選択された月の初日が何曜日か("Sunday"など)で出力
          let vertical = Math.floor(day % 7)
          let horizontal = Math.floor(day / 7)
 

          switch(weekday){
            case("Sunday"):{
              if (vertical === 0){
                vertical = 7
                horizontal -= 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical-1][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical-1][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical-1][horizontal]= item.fat/100
              }
              break
            }
            case("Monday"):{
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical][horizontal]= item.fat/100
              }
              break
            }
            case("Tuesday"):{
              if(vertical=6){
                vertical -= 7
                horizontal += 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical+1][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical+1][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical+1][horizontal]= item.fat/100
              }
              break
            }
            case("Wednesday"):{
              if(vertical>=5){
                vertical -= 7
                horizontal += 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical+2][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical+2][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical+2][horizontal]= item.fat/100
              }
              break
            }
            case("Thursday"):{
              if(vertical>=4){
                vertical -= 7
                horizontal += 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical+3][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical+3][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical+3][horizontal]= item.fat/100
              }
              break
            }
            case("Friday"):{
              if(vertical>=3){
                vertical -= 7
                horizontal += 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical+4][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical+4][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical+4][horizontal]= item.fat/100
              }
              break
            }
            case("Saturday"):{
              if(vertical>=2){
                vertical -= 7
                horizontal += 1
              }
              if(selectNut_bar.nut_bar === 'calories'){
                allItems[vertical+5][horizontal]= item.calories/100
              }else if (selectNut_bar.nut_bar === 'protein'){
                allItems[vertical+5][horizontal]= item.protein/100
              }else if(selectNut_bar.nut_bar === 'fat'){
                allItems[vertical+5][horizontal]= item.fat/100
              }
              break
            }
            default:
              break
          }
        })

        /*filteredItems.forEach(item => {
          const itemDate = new Date(format(item.date, "yyyy/MM/dd"));         
          const weekNumber = Math.floor((itemDate.getDate() - 1) / 7);           
          const dayOfWeek = itemDate.getDay();  
        
          
          if (initialItems[weekNumber] && initialItems[weekNumber][dayOfWeek] !== undefined) {
            initialItems[weekNumber][dayOfWeek] = item.calories/100;
            return initialItems
          }
        });*/
      }

      const getWeekOfMonth = (date: Date): number => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfMonth = date.getDate();
        const adjustedDate = dayOfMonth + firstDayOfMonth.getDay(); 
        return Math.ceil(adjustedDate / 7); 
      };

      let initialItems1 = [0,0,0,0,0]
      let initialItems2 = [0,0,0,0,0]
      let initialItems3 = [0,0,0,0,0]
      let initialItems4 = [0,0,0,0,0]
      let initialItems5 = [0,0,0,0,0]
      let initialItems6 = [0,0,0,0,0]
      let initialItems7 = [0,0,0,0,0]

      let allItems = [initialItems1,initialItems2,initialItems3,initialItems4,initialItems5,initialItems6,initialItems7]

    /*const initialItems1 = [1,8,15,22,29]
      const initialItems2 = [2,9,16,23,30]
      const initialItems3 = [3,10,17,24,31]
      const initialItems4 = [4,11,18,25,32]
      const initialItems5 = [5,12,19,26,33]
      const initialItems6 = [6,13,20,27,34]
      const initialItems7 = [7,14,21,28,35]*/

      const filteredItems = getFilteredItems();
      const matching = getmatchItems();
      
        
      const weeklyItems: { [key: number]: any[] } = {}; 

      filteredItems.forEach((item: any) => {
        const date = new Date(item.date);
        const weekOfMonth = getWeekOfMonth(date); 
        
        if (!weeklyItems[weekOfMonth]) {
          weeklyItems[weekOfMonth] = []; 
        }      
        weeklyItems[weekOfMonth].push(item.calories/100); 

      }
      );

        if(selectNut_bar.nut_bar === 'calories'){
          /*for (let weekIndex = 0; weekIndex < initialItems.length; weekIndex++) {
            const weekData = initialItems[weekIndex];
          
            for (let dayIndex = 0; dayIndex < weekData.length; dayIndex++) {
              datasets.push({
                label: `週${weekIndex + 1} 日${dayIndex + 1}の ${selectNut_bar.nut_bar.charAt(0).toUpperCase() + selectNut_bar.nut_bar.slice(1)}`,
                data: [weekData[dayIndex]], 
                borderColor: 'rgb(255, 99, 132)', 
                backgroundColor: 'rgba(255, 99, 132, 0.2)', 
              });
            }
          }*/
          setBarData({
            labels: ["1週目", "2週目", "3週目", "4週目", "5週目"],
            datasets: [
              {
                label: 'Sunday',
                data: initialItems1.map((weekdata) =>{
                  const week = weekdata
              
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(255, 0,0)',
              },
              {
                label: 'Monday',
                data: initialItems2.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(255, 187, 0)',
              },
              {
                label: 'Tuesday',
                data: initialItems3.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(255, 0,255)',
              },
              {
                label: 'Wednesday',
                data: initialItems4.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(0, 115,0)',
              },
              {
                label: 'Thursday',
                data: initialItems5.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(88, 88, 88)',
              },
              {
                label: 'Friday',
                data: initialItems6.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(131, 0, 183)',
              },
              {
                label: 'Saturday',
                data: initialItems7.map((weekdata) =>{
                  const week = weekdata
                  return week;
                }),
                borderColor: '',
                backgroundColor: 'rgb(0, 0,255)',
              },
              
            ],
          });
      }else if(selectNut_bar.nut_bar === 'protein'){
        setBarData({
          labels: ["1週目", "2週目", "3週目", "4週目", "5週目"],
          datasets: [
            {
              label: 'Sunday',
              data: initialItems1.map((weekdata) =>{
                const week = weekdata
            
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 0,0)',
            },
            {
              label: 'Monday',
              data: initialItems2.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 187, 0)',
            },
            {
              label: 'Tuesday',
              data: initialItems3.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 0,255)',
            },
            {
              label: 'Wednesday',
              data: initialItems4.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(0, 115,0)',
            },
            {
              label: 'Thursday',
              data: initialItems5.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(88, 88, 88)',
            },
            {
              label: 'Friday',
              data: initialItems6.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(131, 0, 183)',
            },
            {
              label: 'Saturday',
              data: initialItems7.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(0, 0,255)',
            },
            
          ],
        });
      }else if(selectNut_bar.nut_bar === 'fat'){
        setBarData({
          labels: ["1週目", "2週目", "3週目", "4週目", "5週目"],
          datasets: [
            {
              label: 'Sunday',
              data: initialItems1.map((weekdata) =>{
                const week = weekdata
            
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 0,0)',
            },
            {
              label: 'Monday',
              data: initialItems2.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 187, 0)',
            },
            {
              label: 'Tuesday',
              data: initialItems3.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(255, 0,255)',
            },
            {
              label: 'Wednesday',
              data: initialItems4.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(0, 115,0)',
            },
            {
              label: 'Thursday',
              data: initialItems5.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(88, 88, 88)',
            },
            {
              label: 'Friday',
              data: initialItems6.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(131, 0, 183)',
            },
            {
              label: 'Saturday',
              data: initialItems7.map((weekdata) =>{
                const week = weekdata
                return week;
              }),
              borderColor: '',
              backgroundColor: 'rgb(0, 0,255)',
            },
            
          ],
        });
      }else{
        setBarData({
          labels:["","","","","","",""],
          datasets: [
                {
                  label: 'Nodata',
                  data: [0,0,0,0,0,0,0],
                  borderColor: '',
                  backgroundColor: '',
                },
          ]
        });
      };

  
      const options = ({
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
    }, [selectDate_bar,selectNut_bar, nutritionItems]);
  
      
    const handleMonthChange = (date: Date | null) => {
        if (date) {
          dispatch(setDateBar(format(date, "yyyy/MM/dd")));
        }
      };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setNutBar(e.target.value));
      };

    /*const handleMonthChange = (date: Date | null) => {
        if (date) {
          //dispatch(setDateBar(format(date, "yyyy/MM/dd")));
        }
      };*/
    return (
      <div className="input-chart">
        <div className="inputs">
          <div className='input-back'>
            <div className='dash-date'>
              <label className='dashdate'>月：</label>
                <DatePicker
                selected={new Date(selectDate_bar.date_bar)}
                onChange={handleMonthChange}
                dateFormat="yyyy/MM/dd"
                className="select-kind"
                showMonthYearPicker
                showFullMonthYearPicker
                placeholderText="Select a month"
                />
                </div>
              <div className='dash-nutri'>
                  <label className='dashnutri'>栄養：</label>
                  <select  className='select-kind' onChange={handleSelectChange} value={selectNut_bar.nut_bar}>
                    {selectNut_bar.nut_bar === '' && <option value="">選択してください</option>}
                    <option value="calories">calorie</option>
                    <option value="protein">protein</option>
                    <option value="fat">fat</option>
                  </select>
              </div> 
              </div>
              </div>
        <div className='radar-chart'>
            <Bar data={barData} options={options} className="radarchart"/>
        </div>
    </div>
    );
};

export default Barchart;
