// pages/category/category.js
// const icons = require('../../utils/category')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: '1',
    inputIcons: null,
    outputIcons: null,
    currentIcons: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let icons = wx.getStorageSync('category')
    if(icons) {
      this.setData({
        inputIcons: icons.input,
        outputIcons: icons.output,
        currentIcons: icons.output
      })
    }
    
  },
  changeTab(e) {
    let index = e.currentTarget.dataset.index
    let icons = index === '1' ? this.data.outputIcons : this.data.inputIcons
    this.setData({
      tabIndex: index,
      currentIcons: icons
    })
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '确定要删除吗？',
          success: (res) => {
            if(res.confirm) {

            }
          }
        })
        break;
    }
  },
  add() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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