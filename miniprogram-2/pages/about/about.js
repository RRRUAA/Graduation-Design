// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})