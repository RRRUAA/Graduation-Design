// custom-tab-bar/index.js
Component({
  properties: {

  },

  data: {
    selected: null,
    list: [{
        "pagePath": "/pages/home/home",
        "iconPath": "/imgs/tabBar/sweet1.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/menu/menu",
        "iconPath": "/imgs/tabBar/sweet2.png",
        "text": "点餐"
      },
      {
        "pagePath": "/pages/about/about",
        "text": "关于"
      },
      {
        "pagePath": "/pages/bills/bills",
        "iconPath": "/imgs/tabBar/sweet3.png",
        "text": "订单"
      },
      {
        "pagePath": "/pages/mine/mine",
        "iconPath": "/imgs/tabBar/sweet4.png",
        "text": "我的"
      }
    ]
  },


  methods: {
    switchTab(e) {
      const {
        index,
        url
      } = e.currentTarget.dataset;
      if (this.data.selected == index || index == undefined) return;
      wx.switchTab({
        url,
      })
    }
  }
})