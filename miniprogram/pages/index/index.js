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

    // let category = app.globalData.category
    // if(!category) {
    //   wx.setStorageSync('category', icons.icons)
    // }
  },
  buttontap(e) {
    // console.log(e.detail)
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
    let now = new Date()
    this.data.timeObj.year = now.getFullYear()
    this.data.timeObj.month = now.getMonth() + 1
    this.setRecords()

    this.setBarSelected()
  },
  setRecords() {
    let records = app.globalData.records
    if (!records) {
      this.setData({
        records: null
      })
      return
    }
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
    this.setRecords()
  },
  remove(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          let obj = e.currentTarget.dataset
          let item = this.data.records[obj.day][obj.index]
          this.selectComponent('#topHeader').setMoney({
            type: item.type,
            money: item.money
          })

          if (this.data.records[obj.day].length === 1) {
            delete this.data.records[obj.day]
          } else {
            this.data.records[obj.day].splice(obj.index, 1)
          }

          this.setData({
            records: this.data.records
          })
          app.globalData.records[this.data.timeObj.year][this.data.timeObj.month] = this.data.records
          wx.setStorageSync('records', app.globalData.records)
          wx.setStorageSync('updated', true)
        }
      }
    })

  }
})