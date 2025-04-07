// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    wx.setStorageSync('isLogin', false);
    wx.setStorageSync('name', false);
    wx.setStorageSync('money', 100);
    wx.setStorageSync('note', 12.3);
    wx.setStorageSync('isSignin', false);
    wx.setStorageSync('newArray', [])
    wx.setStorageSync('addressList', [])

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