import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function Bar ({ title, xData, yData, styler }) {
  const domRef = useRef()

  const chartInit = () => {
    var myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData,
        },
      ],
    })
  }

  useEffect(() => {
    chartInit()
  }, [])

  return (
    <div>
      {/* 准备一个挂载结点 */}
      <div ref={domRef} style={styler}></div>
    </div>
  )
}

export default Bar
