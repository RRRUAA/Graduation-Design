// pages/mine/mine.js
Page({
  data: {
    show: false,
    isLogin: '',
    money: '',
    note: '40',
    avatarUrl: '',
    actions: [{
        name: '电话客服18261109608',
      },
      {
        name: '微信号uki_2450561417',
      },
      {},
    ],
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }

    const userInfo = wx.getStorageSync('userInfo');
    const avatarUrl = userInfo ? userInfo.avatarUrl : '';

    this.setData({
      avatarUrl
    })
    const isLogin = wx.getStorageSync('isLogin')
    this.setData({
      isLogin,
    })

    const money = wx.getStorageSync('money')
    this.setData({
      money,
    })

    const note = wx.getStorageSync('note')
    this.setData({
      note,
    })
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  signin() {
    let isSignin = wx.getStorageSync('isSignin');

    if (!isSignin) {
      wx.showToast({
        title: '签到成功', // 提示内容
        icon: 'success', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
      wx.setStorageSync('isSignin', true);
    } else {
      wx.showToast({
        title: '您今日已完成签到', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    }
  },

  goto_my_bills() {
    if (!wx.getStorageSync('isLogin')) {
      wx.showToast({
        title: '请先登录', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/my_bills/index',
      })
    }
  },

  gotobind() {
    if (!wx.getStorageSync('isLogin')) {
      wx.showToast({
        title: '请先登录', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/bind/index',
      })
    }
  },

  gotoaddress() {
    if (!wx.getStorageSync('isLogin')) {
      wx.showToast({
        title: '请先登录', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/address/index',
      })
    }
  },

  showmaker() {
    this.setData({
      show: true
    });
  },

  exit() {
    if (wx.getStorageSync('isLogin')) {
      wx.setStorageSync('isLogin', false)
      wx.setStorageSync('newArray', [])
      wx.setStorageSync('judge', true)
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  }
})