import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses, chartsGridClasses } from '@mui/x-charts';
import { dataset } from './dataset';



export default function BarTest({height, title, data: sampleData}) {
  const valueFormatter = (value) => `${value}`;
  
  const chartSetting = {
    series: [{ dataKey: 'col', valueFormatter, color: 'rgba(6, 34, 103, 0.9)' }],
    height,
    sx: {
      backgroundColor: '#fff', 
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
      [`& .${axisClasses.tick}`]: {
        display: 'none', // This will hide the axis ticks
      },
      [`& .${axisClasses.line}`]: {
        display: 'none', // This will hide the axis lines
      },
      [`& .${chartsGridClasses.line}`]: { 
        strokeDasharray: '5 3', 
        strokeWidth: 2 
      },
      '& .MuiBar-root': {
        // minHeight: '800px',
        backgroundColor: 'purple', 
        transition: 'background-color 0.3s ease', 
      '&:hover': {
        backgroundColor: '#ff9800', 
      }
      },
    },
  };
  return (
    <div className="overflow-x-auto w-[1000px] md:w-full">
       <div className="w-[1000px] md:w-full py-3 flex gap-5 md:ps-[30px] items-center">
        <h1 className="font-bold text-sm md:text-lg">{title}</h1>
        <div className="flex-1 md:gap-3 gap-2 flex items-center justify-end med:pe-5 text-[10px] md:text-[12px]">
            <div className="flex items-center gap-1">
                <input type="radio" name="level" />
                <label htmlFor="">Previous year</label>
            </div>
            <div className="flex items-center gap-1">
                <input type="radio" name="level" />
                <label htmlFor="">Current level</label>
            </div>
            <select className="outline-none border py-1 px-2 rounded-xl" name="" id="">
                <option value="">This month</option>
            </select>
        </div>
      </div>
      <BarChart
        dataset={sampleData}
        xAxis={[
          { scaleType: 'band', dataKey: 'row', tickPlacement: 'middle', tickLabelPlacement: 'middle' },
        ]}
        yAxis={[
          { grid: true }, // Add gridlines on the Y-axis (horizontal gridlines)
        ]}
        grid={{ horizontal: true }}
        {...chartSetting}
      />
    </div>
  );
}

