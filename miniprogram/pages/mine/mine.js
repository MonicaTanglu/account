// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    loading: false,
    fileUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      checked: true,
      loading: true
    })
    wx.showLoading({
      title: '同步中',
    })
    // setTimeout(() => {
    //   wx.hideLoading({
    //     success: (res) => {
    // let categoryUpdated = wx.getStorageSync('categoryUpdated')
    // let updated = wx.getStorageSync('updated')
    // let dataParams = {
    //   records: app.globalData.records ? app.globalData.records : {}
    // }
    // if (categoryUpdated) {
    //   dataParams['category'] = app.globalData.category ? app.globalData.category : {}
    // }

    // wx.cloud.callFunction({
    //   name: 'async',
    //   data: dataParams,
    //   success: res => {
    //     wx.hideLoading()
    //     if (res.result.code === 200) {

    //       if (!updated) {
    //         app.globalData.records = res.result.data.records
    //         app.globalData.category = res.result.data.category
    //         wx.setStorageSync('records', app.globalData.records)
    //         wx.setStorageSync('category', app.globalData.category)
    //         wx.setStorageSync('updated', false)
    //         wx.setStorageSync('categoryUpdated', false)
    //       }

    //       wx.showToast({
    //         title: '同步完成',
    //         icon: 'success'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '同步失败',
    //         icon: 'success'
    //       })
    //     }
    //     this.setData({
    //       checked: false,
    //       loading: false
    //     })
    //   },
    //   fail: (err) => {
    //     wx.showToast({
    //       title: '同步失败',
    //       icon: 'error'
    //     })
    //     this.setData({
    //       checked: false,
    //       loading: false
    //     })
    //   }

    // })
    this.asyncData((bl) => {
      if (bl) {
        wx.showToast({
          title: '同步完成',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '同步失败',
          icon: 'error'
        })
      }
      this.setData({
        checked: false,
        loading: false
      })
    })

    //     },
    //   })
    // }, 2000);
  },
  asyncData(cb) {
    let categoryUpdated = wx.getStorageSync('categoryUpdated')
    let updated = wx.getStorageSync('updated')
    let dataParams = {
      records: app.globalData.records ? app.globalData.records : {}
    }
    if (categoryUpdated) {
      dataParams['category'] = app.globalData.category ? app.globalData.category : {}
    }
    wx.cloud.callFunction({
      name: 'async',
      data: dataParams,
      success: res => {
        wx.hideLoading()
        if (res.result.code === 200) {
          if (!updated) {
            app.globalData.records = res.result.data.records
            app.globalData.category = res.result.data.category
            wx.setStorageSync('records', app.globalData.records)
            wx.setStorageSync('category', app.globalData.category)
            wx.setStorageSync('updated', false)
            wx.setStorageSync('categoryUpdated', false)
          }
          cb(true)
        } else {
          cb(false)
        }
      },
      fail: (err) => {
        wx.hideLoading()
        cb(false)
      }

    })
  },
  export () {
    wx.showLoading({
      title: '生成中',
    })
    this.asyncData((bl) => {
      if (bl) {
        wx.cloud.callFunction({
          name: 'export',
          success: (res) => {
            wx.hideLoading()
            this.getFileUrl(res.result.fileID)

          },
          fail: (err) => {
            console.log(err)
            wx.showToast({
              title: '生成失败',
              icon: 'success'
            })
          }
        })
      } else {
        wx.showToast({
          title: '生成失败',
          icon: 'success'
        })
      }
    })

  },
  getFileUrl(fileId) {
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        this.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: (err) => {
        console.log(err)
        wx.showToast({
          title: '生成失败',
          icon: 'success'
        })
      }
    })
  },
  copy() {
    let that = this
    wx.setClipboardData({
      data: that.data.fileUrl,
      success: () => {
        wx.getClipboardData({
          success: () => {
            wx.showToast({
              title: '复制成功',
            })
          },
        })
      }
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