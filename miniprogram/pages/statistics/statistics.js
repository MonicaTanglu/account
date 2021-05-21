// pages/statistics/statistics.js
import * as echarts from '../../components/ec-canvas/echarts.min.js'
const app = getApp()
var chartLine;
var lineOptions;
var chartPie;
var chartOptions;

function setLineChartOptions(lineXaxisData, lineOutputData, lineInputData) {
  let option = {
    legend: {
      data: ['支出', '收入']
    },
    xAxis: {
      type: 'category',
      data: lineXaxisData
    },
    // tooltip: {
    //   show: true,
    //   trigger: 'axis'
    // },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '支出',
      type: 'line',
      data: lineOutputData,
      lineStyle: {
        color: '#FF2712'
      }
    }, {
      name: '收入',
      type: 'line',
      data: lineInputData,
      lineStyle: {
        color: '#66B032'
      }
    }]
  }
  return option
}

function setPieChartOptions(data) {
  let option = {
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: data
    }]

  }
  return option
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    output: 0,
    input: 0,
    inputObj: {},
    outputObj: {},
    inputDayObj: {},
    outputDayObj: {},
    timeObj: {
      year: null,
      month: null
    },
    lineXaxisData: [],
    lineInputData: [],
    lineOutputData: [],
    records: [],
    pieData: [],
    ecLine: {
      onInit: function (canvas, width, height, dpr) {
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chartLine);
        // let options = setLineChartOptions(this.data.lineXaxisData)
        // chart.setOption();
        if (lineOptions) chartLine.setOption(lineOptions)
        // return chartLine
      }
    },
    ecPie: {
      onInit: function (canvas, width, height, dpr) {
        chartPie = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chartPie);
        if (chartOptions) chartPie.setOption(chartOptions)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getLineData(year, month) {
    let day = 30
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        day = 31
        break
      case 2:
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) day = 29
        else day = 28
        break
      case 4:
      case 6:
      case 9:
      case 11:
        day = 30
        break
      default:
        break
    }
    let i = 1
    this.data.lineXaxisData = []
    while (day > 0) {
      day--
      this.data.lineXaxisData.push(i)
      if (this.data.outputDayObj[day]) {
        this.data.lineOutputData.push(this.data.outputDayObj[day])
      } else this.data.lineOutputData.push(0)

      if (this.data.inputDayObj[day]) {
        this.data.lineInputData.push(this.data.inputDayObj[day])
      } else this.data.lineInputData.push(0)
        ++i
    }
    let option = setLineChartOptions(this.data.lineXaxisData, this.data.lineOutputData, this.data.lineInputData)
    if (chartLine) {
      chartLine.setOption(option)
    } else {
      lineOptions = option
    }

  },
  getCalcMoney() {
    let records = app.globalData.records
    if (!records) return
    if (!records[this.data.timeObj.year]) return
    if (!records[this.data.timeObj.year][this.data.timeObj.month]) return
    this.data.records = records[this.data.timeObj.year][this.data.timeObj.month]
    for (let key in records[this.data.timeObj.year][this.data.timeObj.month]) {
      for (let item of records[this.data.timeObj.year][this.data.timeObj.month][key]) {
        if (item.type === '1') {
          // 按类别 支出总金额
          if (this.data.outputObj[item.text]) this.data.outputObj[item.text]['money'] += item.money
          else {
            this.data.outputObj[item.text] = {}
            this.data.outputObj[item.text]['money'] = item.money
          }
          // 按天 支出总金额
          if (this.data.outputDayObj[item.time]) this.data.outputDayObj[item.time] += item.money
          else this.data.outputDayObj[item.time] = item.money
          // 计算支出总金额
          this.data.output += item.money
        } else {
          // 按类别 收入总金额
          if (this.data.inputObj[item.text]) this.data.inputObj[item.text]['money'] += item.money
          else {
            this.data.inputObj[item.text] = {}
            this.data.inputObj[item.text]['money'] = item.money
          }

          // 按天 收入总金额
          if (this.data.inputDayObj[item.time]) this.data.inputDayObj[item.time] += item.money
          else this.data.inputDayObj[item.time] = item.money
          // 计算收入总金额
          this.data.input += item.money
        }
      }
    }
    for (let key in this.data.inputObj) {
      this.data.inputObj[key]['percent'] = ((this.data.inputObj[key]['money'] * 100) / this.data.input).toFixed(2)
    }
    this.data.pieData = []
    for (let key in this.data.outputObj) {
      this.data.pieData.push({
        name: key,
        value: this.data.outputObj[key]['money']
      })
      this.data.outputObj[key]['percent'] = ((this.data.outputObj[key]['money'] * 100) / this.data.output).toFixed(2)
    }
    this.setData({
      inputObj: this.data.inputObj,
      outputObj: this.data.outputObj
    })
    // console.log('pieData', this.data.pieData)
    chartOptions = setPieChartOptions(this.data.pieData)
    if (chartPie) {
      chartPie.setOption(chartOptions)
    }
    this.getLineData(this.data.timeObj.year, this.data.timeObj.month)
    // console.log(this.data.inputObj, this.data.outputObj)
  },
  timeChange(e) {
    this.data.timeObj.year = e.detail.year
    this.data.timeObj.month = e.detail.month
    this.setData({
      timeObj: this.data.timeObj
    })
    this.data.output = 0
    this.data.input = 0
    this.data.inputObj = {}
    this.data.outputObj = {}
    this.data.inputDayObj = {}
    this.data.outputDayObj = {}
    if(app.globalData.records) {
      this.initData()
    } else this.reset()
    
  },
  initData() {
   
    this.data.output = 0
    this.data.input = 0
    this.data.inputObj = {}
    this.data.outputObj = {}
    this.data.inputDayObj = {}
    this.data.outputDayObj = {}
    this.getCalcMoney()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let now = new Date()
    this.data.timeObj.year = now.getFullYear()
    this.data.timeObj.month = now.getMonth() + 1
    this.initData()
    this.setBarSelected()
  },
  reset() {
    this.setData({
      output: 0,
      input: 0,
      inputObj: {},
      outputObj: {},
      inputDayObj: {},
      outputDayObj: {}
    })
    let arr = []
    let length = this.data.lineXaxisData
    while (length > 0) {
      arr.push(0)
        --length
    }
    // lineOptions = setLineChartOptions(this.data.lineXaxisData, arr, arr)
    // chartLine.setOption(lineOptions)
    chartLine.clear()
    chartPie.clear()
    // pieOptions = setPieChartOptions(null)
    // chartPie.setOption(pieData)

  },
  setBarSelected() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },


})