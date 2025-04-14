import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    isLogin: '',
    avatarUrl: '',
    swiperList: [{
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      }
    ],

    formatter(day) {
      const date = day.date.getDate();
      if (date < new Date().getDate()) {
        day.topInfo = '漏签';
      }
      if (date === new Date().getDate()) {
        day.text = '今天';
      }
      return day;
    },

    show: false,
    minDate: new Date(2025, new Date().getMonth(), 1).getTime(),
    maxDate: new Date(2025, new Date().getMonth(), new Date().getDate()).getTime(),
    current: 0
  },

  onSwiperChange(e) {
    const {
      current
    } = e.detail
    this.setData({
      current
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    const isLogin = wx.getStorageSync('isLogin')
    this.setData({
      isLogin,
    })
    const userInfo = wx.getStorageSync('userInfo');
    const avatarUrl = userInfo ? userInfo.avatarUrl : '';
    this.setData({
      avatarUrl
    })
  },

  gotomenu() {
    wx.switchTab({
      url: '/pages/menu/menu',
    })
  },

  gotoLogin() {
    wx.navigateTo({
      url: "/pages/login/login",
    })
  },

  showDialog() {
    Dialog.alert({
      title: '优惠券兑换码',
      message: '55210719',
    }).then(() => {
      // on close
    });
  },

  gotodiscount() {
    wx.navigateTo({
      url: '/pages/home/discount/index',
    })
  },


  onDisplay() {
    if (wx.getStorageSync('isLogin')) {
      this.setData({
        show: true
      });
    } else {
      wx.showToast({
        title: '请先登录', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    }
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
})