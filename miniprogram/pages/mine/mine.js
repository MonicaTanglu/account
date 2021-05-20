// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      checked: true
    })
    wx.showLoading({
      title: '同步中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          wx.cloud.callFunction({
            name: 'async',
            data: {
              category: app.globalData.category,
              records: app.globalData.records
            },
            success: res => {
              if (res.code === 200) {
                let updated = wx.getStorageSync('updated')
                if (!updated) {
                  app.globalData.records = res.data.records
                  app.globalData.category = res.data.category
                  wx.setStorageSync('updated', false)
                }
                wx.showToast({
                  title: '同步完成',
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: '同步失败',
                  icon: 'success'
                })
              }
              this.setData({
                checked: false
              })
            }
          })

        },
      })
    }, 2000);
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
    this.setBarSelected()
  },
  setBarSelected() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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