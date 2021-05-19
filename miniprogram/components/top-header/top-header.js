// components/top-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    output: {
      type: Number,
      value: 582652.25
    },
    input: {
      type: Number,
      value: 100025.25
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeObj: {
      year: null,
      month: null
    }
  },

  lifetimes: {
    ready() {
      let now = new Date()
      this.setData({
        'timeObj.year': now.getFullYear(),
        'timeObj.month': now.getMonth() + 1
      })
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
      this.triggerEvent('timeChange', {
        year: timeObj.year,
        month: timeObj.month
      })
    }
  }
})