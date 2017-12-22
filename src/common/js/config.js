// 折线图配置

export function lineOption(title, xData, data) {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/> ' + title + ' {c}',
      padding: 10,
      textStyle: {
        fontSize: '12',
        align: 'center'
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '3%'
    },
    xAxis: {
      type: 'category',
      show: false,
      data: xData
    },
    yAxis: {
      type: 'log',
      show: false,
      name: 'y'
    },
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: data
      }
    ],
    color: ['#4587ff']
  }
  return option
}

// 左边饼图option
export function leftPieOption(data) {
  let option = {
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              lineHeight: '20'
            },
            formatter: function(a) {
              return ((a.value / data.total) * 100).toFixed(1) + '% \n' + a.name
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
{value: data.pay, name: '购买占比'},
{value: data.total - data.pay, name: '未购买占比'}
        ]
      }
    ],
    color: ['#6a75ff', '#b9d2ff']
  }
  return option
}

export function rightPieOption(data, total) {
  let option = {
    tooltip: {
      trigger: 'item',
      padding: 10,
      textStyle: {
        align: 'center'
      },
      formatter: function(a) {
        return `${a.name}<br/>人数 ${a.value}<br/>占比 ${((a.value / total) * 100).toFixed(2)}%`
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: data
      }
    ],
    color: ['#fb8696', '#fdcc8c', '#8a9ceb', '#67d5a2']
  }
  return option
}