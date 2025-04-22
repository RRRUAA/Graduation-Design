Page({

  data: {
    addressList: []
  },

  onShow() {
    const addressList = wx.getStorageSync('addressList');
    this.setData({
      addressList
    })
  },

  createHandle() {
    wx.navigateTo({
      url: '/pages/mine/add/index'
    });
  },

  minus(event) {
    let array = wx.getStorageSync('addressList') || [];
    let time = event.currentTarget.dataset.time;
    array = array.filter(item => item.time !== time);
    wx.setStorageSync('addressList', array);
    wx.reLaunch({
      url: '/pages/mine/address/index' // 重新打开当前小程序，清空所有页面栈，重新打开首页
    });
  },

  goBack() {
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
})