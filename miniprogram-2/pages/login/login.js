Page({
  data: {
    userInfo: null,     // 新增用户信息存储字段
    showDialog: false   // 新增授权提示对话框状态
  },

  // 修改后的登录方法
  login() {
    const that = this;
    // 检查是否已授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.getUserProfile();
        } else {
          that.setData({ showDialog: true }); // 显示授权提示对话框
        }
      }
    })
  },

  // 新增用户信息获取方法
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员信息', // 必须声明信息用途
      success: (res) => {
        this.setData({ 
          userInfo: res.userInfo 
        });
        // 存储到本地缓存
        wx.setStorageSync('isLogin', true);
        wx.setStorageSync('userInfo', res.userInfo);
        wx.navigateBack();
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' });
      }
    })
  },

  // 新增对话框确认回调
  onConfirm() {
    this.setData({ showDialog: false });
    this.getUserProfile();
  },

  // 新增对话框取消回调
  onCancel() {
    this.setData({ showDialog: false });
    wx.showToast({ title: '需要授权才能登录', icon: 'none' });
  },

  // ... 保留原有返回逻辑 ...
  goBack() {
    wx.navigateBack()
  }
})