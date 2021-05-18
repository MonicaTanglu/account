Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#ffffff",
    list: [{
      "pagePath": "/pages/index/index",
      icon: 'balance-list-o',
      "iconPath": "/assets/icons/list-alt.png",
      "selectedIconPath": "/assets/icons/list-alt-selected.png",
      "text": "明细"
    },{
      "pagePath": "/pages/statistics/statistics",
      icon: 'bar-chart-o',
      "iconPath": "/assets/icons/chart-pie.png",
      "selectedIconPath": "/assets/icons/chart-pie-selected.png",
      "text": "统计"
    },{
      "pagePath": "/pages/mine/mine",
      icon: 'setting-o',
      "iconPath": "/assets/icons/cog.png",
      "selectedIconPath": "/assets/icons/cog-selected.png",
      "text": "设置"
    }],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = this.data.list[e.detail]
      const url = data.pagePath
      wx.switchTab({
        url
      })
      // this.setData({
      //   selected: data.index
      // })
    },
    goto() {
      wx.navigateTo({
        url: '/pages/add/add',
      })
    }
  }
})