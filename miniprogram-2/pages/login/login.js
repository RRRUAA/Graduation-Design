
Page({

  data: {

  },

  login() {
    wx.setStorageSync('isLogin', true);
    wx.setStorageSync('name', '羽祈');
    wx.navigateBack();
  },

  goBack() {
    wx.navigateBack()
  }
})