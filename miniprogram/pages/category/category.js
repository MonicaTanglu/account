// pages/category/category.js
// const icons = require('../../utils/category')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: '1',
    inputIcons: null,
    outputIcons: null,
    currentIcons: null,
    activeIconIndex: 1,
    popShow: false,
    categoryObj: {
      icon: '',
      text: ''
    },
    otherIcons: [{
      icon: 'heart',
      text: ''
    }, {
      icon: 'heartbeat',
      text: ''
    }, {
      icon: 'smile-o',
      text: ''
    }, {
      icon: 'frown-o',
      text: ''
    }, {
      icon: 'meh-o',
      text: ''
    }, {
      icon: 'plane',
      text: ''
    }, {
      icon: 'battery-2',
      text: ''
    }, {
      icon: 'th-list',
      text: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let icons = app.globalData.category
    if (icons) {
      this.setData({
        inputIcons: icons.input,
        outputIcons: icons.output,
        currentIcons: icons.output
      })
    }

  },
  inputChange(e) {
    if (e.detail.value) {
      this.data.categoryObj.text = e.detail.value
    }
  },
  closePop() {
    this.setData({
      popShow: false
    })
  },
  confirmPop() {
    let type = 'input'
    let obj = {
      icon: this.data.otherIcons[this.data.activeIconIndex].icon,
      text: this.data.categoryObj.text
    }
    let categoryList = app.globalData.category
    if (this.data.tabIndex === '1') type = 'output'
    for (let item of categoryList[type]) {
      if (item.text === obj.text) {
        wx.showToast({
          title: '已存在该类别！',
          icon: 'error'
        })
        return
      }
    }
    categoryList[type].push(obj)
    app.globalData.category = categoryList
    wx.setStorageSync('category', categoryList)
    wx.setStorageSync('update', true)
    this.setData({
      popShow: false,
      currentIcons: categoryList[type]
    })
    wx.showToast({
      title: '新增成功',
      icon: 'success'
    })
  },
  remove(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          this.data.currentIcons.splice(index, 1)
          this.setData({
            currentIcons: this.data.currentIcons
          })
          let type = this.data.tabIndex === '1' ? 'output' : 'input'
          app.globalData.category[type] = this.data.currentIcons
          wx.setStorageSync('category', app.globalData.category)
          wx.setStorageSync('update', true)
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },
  changeTab(e) {
    let index = e.currentTarget.dataset.index
    let icons = index === '1' ? this.data.outputIcons : this.data.inputIcons
    this.setData({
      tabIndex: index,
      currentIcons: icons
    })
  },
  // onClose(event) {
  //   const {
  //     position,
  //     instance
  //   } = event.detail;
  //   switch (position) {
  //     case 'left':
  //     case 'cell':
  //       break;
  //     case 'right':

  //       break;
  //   }
  // },
  closePop() {
    this.setData({
      popShow: false
    })
  },
  selectIcon(e) {
    let index = e.currentTarget.dataset.index
    // this.data.currentIconText = this.data.currentIcons[index].text
    this.setData({
      activeIconIndex: index
    })
  },
  add() {
    this.setData({
      popShow: true
    })
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