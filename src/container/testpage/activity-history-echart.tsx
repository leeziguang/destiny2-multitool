import EChartsReact from "echarts-for-react"
import React from "react"
import { activityStore } from "src/stores/activities"
interface ActivityHistoryEChartProps {
  activityMode: number;
  numberOfActivities: number;
}
export const ActivityHistoryEChart = (props:ActivityHistoryEChartProps) => {
  const { activityMode, numberOfActivities } = props;
  const { completed, period, ...activityDetailLists} = activityStore.activityDetails[activityMode];
  
  const series:any = []
  const labelOption = {
    show: false,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c} {name|{a}}',
    rich: {
      name: {}
    },
  }
  Object.keys(activityDetailLists).forEach((key:string) => {
    series.push({
      name: `${key.toUpperCase()}`,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: activityDetailLists[key].slice(0, numberOfActivities)
    },)
  })
  
  console.log(series)
  const option = {
    title: {
      text: `Strike details from ${period[0]} to ${period[numberOfActivities-1]}`,
      padding: [40, 512],
    },
    grid: {
      containLabel: true,
    },
    legend: {
      data: Object.keys(activityDetailLists).map((key:string) => key.toUpperCase())
    },
    xAxis: [
      {
        color: '#00000073',
        fontSize: 12,
        type: 'category',
        boundaryGap: false,
        data: period.slice(0, numberOfActivities),
        axisLabel: {
          // rotate: 90,
          margin: 12
        },
      }
    ],
    yAxis: [
      {
        color: '#00000073',
        fontSize: 12,
        type: 'value',
        axisLabel: {
          margin: 80,
        }
      }
    ],
    series: series
  }
  return (
    <div style={{width: '90vw', height: '600px'}}>
      <EChartsReact option={option} style={{height:'600px'}}/>
    </div>
  )
}