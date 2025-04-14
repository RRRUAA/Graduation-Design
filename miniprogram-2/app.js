// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('isLogin', false);
    wx.setStorageSync('isSignin', false);
    wx.setStorageSync('judge', true);
    wx.setStorageSync('money', 100);
    wx.setStorageSync('note', 12.5);
    wx.setStorageSync('addressList', []);
    wx.setStorageSync('newArray', []);

    wx.cloud.init({
      env: 'cloud1-9gc2tnr459521c4d',
      traceUser: true
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    mybill: [],
    userInfo: null
  }

})