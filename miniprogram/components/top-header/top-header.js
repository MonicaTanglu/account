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
      
    }
  },
  pageLifetimes: {
    show() {
      let now = new Date()
      this.setData({
        'timeObj.year': now.getFullYear(),
        'timeObj.month': now.getMonth() + 1
      })
      this.data.input = 0 
      this.data.output = 0
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
      this.getCalcMoney()
      this.triggerEvent('timeChange', {
        year: timeObj.year,
        month: timeObj.month
      })
      
    },
    reset() {
      this.data.output = 0
      this.data.input = 0
      // app.globalData.records = null
      this.setData({
        input: this.data.input,
        output: this.data.output
      })
    },
    setMoney(obj) {
      if(obj.type === '1') {
        this.setData({
          output: this.data.output - obj.money
        })
      } else {
        this.setData({
          input: this.data.input - obj.money
        })
      }
    },
    getCalcMoney() {
      this.reset()
      let records = wx.getStorageSync('records')
      if (!records) {
       
        return
      }
      if (!records[this.data.timeObj.year]) {
        // this.reset()
        return
      }
      if (!records[this.data.timeObj.year][this.data.timeObj.month]) {
        // this.reset()
        return
      }
      app.globalData.records = records
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