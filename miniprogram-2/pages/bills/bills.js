Page({
  data: {
    isArrayEmpty: true, // 默认数组为空
    List: []
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

    const newArray = wx.getStorageSync('newArray') || []
    // 定义一个空数组 array

    this.setData({
      isArrayEmpty: newArray.length === 0,
      List: wx.getStorageSync('newArray')
    })
  },

  minus(event) {
    let array = wx.getStorageSync('newArray') || [];
    let name = event.currentTarget.dataset.name;
    array = array.filter(item => item.name !== name);
    wx.setStorageSync('newArray', array);
    wx.reLaunch({
      url: '/pages/bills/bills' // 重新打开当前小程序，清空所有页面栈，重新打开首页
    });
  },

  buy() {
    wx.navigateTo({
      url: '/pages/bills/buy/index',
    })
  },

  onChange(event) {
    let arrays = wx.getStorageSync('newArray')
    let index = event.currentTarget.dataset.index;
    arrays[index].num = event.detail;
    wx.setStorageSync('newArray', arrays)
  },

})