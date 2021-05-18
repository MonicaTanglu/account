// pages/add/add.js
const icons = require('../../utils/category')
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
    tabIndex: '1',
    activeIconIndex: 1,
    inputIcons: icons.icons.input,
    outputIcons: icons.icons.output,
    currentIcons: icons.icons.output,
    currentIconText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date()
    this.setData({
      'timeObj.year': now.getFullYear(),
      'timeObj.month': now.getMonth() + 1,
      'timeObj.day': now.getDate()
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
    if(/^\d+(\.\d+)?$/.test(v)) {
      this.setData({
        money: v
      })
    } else {
      wx.showToast({
        title: '格式错误',
        icon: 'error'
      })
      return money
    }
  },
  add() {
    let records = wx.getStorageSync('records')
    if(!records) records = []
    let obj = {text: this.data.currentIconText,money: parseFloat(this.data.money)}
    records.push(obj)
    wx.setStorageSync('records', records)
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
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