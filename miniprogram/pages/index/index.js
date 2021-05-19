//index.js
// const icons = require('../../utils/category')
const app = getApp()

Page({
  data: {
    show: false,
    buttons: [{
      type: 'default',
      className: '',
      text: '取消',
      value: 0
    }, {
      type: 'primary',
      className: '',
      text: '确定',
      value: 1
    }],
    input: 0,
    output: 0,
    records: null,
    iconObj: {},
    timeObj: {
      year: null,
      month: null
    }
  },

  onLoad: function () {
    let now = new Date()
    this.data.timeObj.year = now.getFullYear()
    this.data.timeObj.month = now.getMonth() + 1
    let records = app.globalData.records
    for (let item of app.globalData.category.input) {
      this.data.iconObj[item.text] = item.icon
    }
    for (let item of app.globalData.category.output) {
      this.data.iconObj[item.text] = item.icon
    }
    if (records[this.data.timeObj.year]) {
      this.setData({
        records: records[this.data.timeObj.year][this.data.timeObj.month],
        timeObj: this.data.timeObj,
        iconObj: this.data.iconObj
      })

    }
    // let category = app.globalData.category
    // if(!category) {
    //   wx.setStorageSync('category', icons.icons)
    // }
  },
  buttontap(e) {
    console.log(e.detail)
  },
  openPicker() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },

  onShow: function () {
    let records = app.globalData.records
    if (records[this.data.timeObj.year] && records[this.data.timeObj.year][this.data.timeObj.month]) {
      this.setData({
        records: records[this.data.timeObj.year][this.data.timeObj.month]
      })
    }

    this.setBarSelected()
  },
  setBarSelected() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  timeChange(e) {
    this.data.timeObj.year = e.detail.year
    this.data.timeObj.month = e.detail.month
    this.setData({
      timeObj: this.data.timeObj
    })
  }
})