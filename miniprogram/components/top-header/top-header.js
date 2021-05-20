// components/top-header.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // output: {
    //   type: Number,
    //   value: 582652.25
    // },
    // input: {
    //   type: Number,
    //   value: 100025.25
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeObj: {
      year: null,
      month: null
    },
    output: 0,
    input: 0
  },

  lifetimes: {
    ready() {
      let now = new Date()
      this.setData({
        'timeObj.year': now.getFullYear(),
        'timeObj.month': now.getMonth() + 1
      })
      this.getCalcMoney()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirmTime(e) {
      let arr = e.detail.value.split('-')
      let timeObj = {
        year: parseInt(arr[0]),
        month: parseInt(arr[1])
      }
      this.setData({
        timeObj
      })
      this.triggerEvent('timeChange', {
        year: timeObj.year,
        month: timeObj.month
      })
      this.getCalcMoney()
    },
    getCalcMoney() {
      let records = app.globalData.records
      if (!records) return
      if (!records[this.data.timeObj.year]) return
      if (!records[this.data.timeObj.year][this.data.timeObj.month]) return
      for (let key in records[this.data.timeObj.year][this.data.timeObj.month]) {
        for (let item of records[this.data.timeObj.year][this.data.timeObj.month][key]) {
          if (item.type === '1') {
            this.data.output += item.money
          } else {
            this.data.input += item.money
          }
        }
      }
      this.setData({
        input: this.data.input,
        output: this.data.output
      })
    }
  }
})