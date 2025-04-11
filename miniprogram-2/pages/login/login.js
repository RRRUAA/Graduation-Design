const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userinfo: {},
    openid: "",
    avatarUrl: defaultAvatarUrl,
    showDialog: false // 新增授权提示对话框状态
  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })

    const that = this
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log("云函数调用成功")
        that.setData({
          openid: res.result.openid,
          userinfo: e.detail.userInfo
        })
        console.log("openid", that.data.openid)
        console.log("userinfo", that.data.userinfo)
      },
      fail: res => {
        console.log("云函数调用失败")
      }
    })

    wx.navigateBack();
    wx.setStorageSync('isLogin', true)
    wx.setStorageSync('userInfo', e.detail)
  },

  goBack() {
    wx.navigateBack()
  }
})