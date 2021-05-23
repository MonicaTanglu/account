// pages/add/add.js
const iconData = require('../../utils/category')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeObj: {
      year: null,
      month: null,
      day: null
    },
    money: null,
    field: '',
    tabIndex: '1',
    activeIconIndex: 1,
    inputIcons: null,
    outputIcons: null,
    currentIcons: null,
    currentIconText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let icons = app.globalData.category
    if (!icons) icons = iconData.icons
    let now = new Date()
    this.setData({
      'timeObj.year': now.getFullYear(),
      'timeObj.month': now.getMonth() + 1,
      'timeObj.day': now.getDate(),
      inputIcons: icons.input,
      outputIcons: icons.output,
      currentIcons: icons.output
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onConfirmTime(e) {
    let arr = e.detail.value.split('-')
    let timeObj = {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      day: parseInt(arr[2])
    }
    this.setData({
      timeObj
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.currentIconText = this.data.currentIcons[this.data.activeIconIndex].text
  },
  changeTab(e) {
    let index = e.currentTarget.dataset.index
    let icons = index === '1' ? this.data.outputIcons : this.data.inputIcons
    this.setData({
      tabIndex: index,
      currentIcons: icons
    })
  },
  selectIcon(e) {
    let index = e.currentTarget.dataset.index
    this.data.currentIconText = this.data.currentIcons[index].text
    this.setData({
      activeIconIndex: index
    })
  },
  inputChange(e) {
    let v = e.detail.value
    let field = e.currentTarget.dataset.field

    if (field !== 'money') {
      this.data.field = v
      return v
    }
    this.setData({
      money: v,
    })
  },
  add() {
    if (!this.data.money) {
      wx.showToast({
        title: '请填写金额！',
        icon: 'none'
      })
      return
    }
    if (!/^\d+(\.\d+)?$/.test(this.data.money)) {
      wx.showToast({
        title: '金额格式不正确',
        icon: 'none'
      })
      return
    }
    let year = this.data.timeObj.year
    let month = this.data.timeObj.month
    let day = this.data.timeObj.day
    let records = app.globalData.records ? app.globalData.records : {}
    if (!records[year]) records[year] = {}
    if (!records[year][month]) records[year][month] = {}
    if (!records[year][month][day]) records[year][month][day] = []
    let obj = {
      text: this.data.currentIconText,
      money: parseFloat(this.data.money),
      remark: this.data.field,
      type: this.data.tabIndex,
      time: day
    }
    records[year][month][day].push(obj)
    app.globalData.records = records
    wx.setStorageSync('records', records)
    wx.setStorageSync('updated', true)
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 0,
      })
    }, 500);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})