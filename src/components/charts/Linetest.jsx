import * as React from 'react';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import { lineElementClasses, 
markElementClasses, 
axisClasses,
chartsGridClasses } from '@mui/x-charts';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartContainer } from '@mui/x-charts/ChartContainer';

export default function Linetest({ height, projectedData, actualData }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  return (
    <div className="w-[600px] md:w-full">

      {/* Combined Line Chart for Projected and Actual Sales */}
      <div className="w-full">
        <LineChart
  height={300}
  series={[
    { 
      data: projectedData, 
      id: 'pvId', 
      color: '#45598d' 
    },
    { 
      data: actualData, 
      id: 'uvId', 
      color: '#45bdea',
      area: true,  // Turn this series into an area chart
      fillOpacity: 1,
      fill: "url(#gradientUv)",  // Apply the gradient fill
    },
  ]}
  xAxis={[{ scaleType: 'point', data: months, grid: true }]}
  grid={{ vertical: true }}
  sx={{
    [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
      strokeWidth: 2,
    },
    [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
      fill: '#fff',
      scale: '0.0',
    },
    [`& .${markElementClasses.highlighted}`]: {
      stroke: 'none',
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
    [`& .${areaElementClasses.root}`]: {
            fill: 'url(#gradientUv)',
          },
  }}
>
  {/* Defining the gradient for the area chart */}
  <defs>
    <linearGradient id="gradientUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#45bdea" stopOpacity={0.6} />
      <stop offset="100%" stopColor="#45bdea" stopOpacity={0} />
    </linearGradient>
  </defs>
</LineChart>

      </div>
    </div>
  );
}
