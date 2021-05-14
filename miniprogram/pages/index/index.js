//index.js
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
    }]
  },

  onLoad: function () {
    
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
    this.setBarSelected()
  },
  setBarSelected() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

})