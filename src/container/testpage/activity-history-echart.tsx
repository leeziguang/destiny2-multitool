import EChartsReact from "echarts-for-react"
import React from "react"
import { activityStore } from "src/stores/activities"
interface ActivityHistoryEChartProps {
  activityMode: number;
}
export const ActivityHistoryEChart = (props:ActivityHistoryEChartProps) => {
  const { activityMode } = props;
  const activityDetailLists = activityStore.activityDetails[activityMode];
  const option = {
    title: {
      text: `Strike details from ${activityDetailLists.period[0]} to ${activityDetailLists.period[activityDetailLists.period.length-1]}`,
      padding: [16, 0],
    },
    grid: {
      left: '1%',
      right: '4%',
      containLabel: true,
    },
    xAxis: [
      {
        color: '#00000073',
        fontSize: 12,
        type: 'category',
        boundaryGap: false,
        data: activityDetailLists.period,
        axisLabel: {
          rotate: 90
        },
      }
    ],
    yAxis: [
      {
        color: '#00000073',
        fontSize: 12,
        type: 'value',
      }
    ],
    series: [{
      name: "Kills",
      type: 'bar',
      data: activityDetailLists.kills
    }]
  }
  return (
    <div style={{width: '90vw', height: '600px'}}>
      <EChartsReact option={option}/>
    </div>
  )
}