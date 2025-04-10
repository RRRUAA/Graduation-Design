const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: null,     // 新增用户信息存储字段
    avatarUrl: defaultAvatarUrl,
    showDialog: false   // 新增授权提示对话框状态
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(e.detail);
    this.setData({
      avatarUrl,
    })
    wx.navigateBack();
    wx.setStorageSync('isLogin', true)
    wx.setStorageSync('userInfo', e.detail )
  },

  goBack() {
    wx.navigateBack()
  }
})
