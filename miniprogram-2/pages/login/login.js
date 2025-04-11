const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// 新增日期格式化方法
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

Page({
  data: {
    openid: "",
    avatarUrl: defaultAvatarUrl,
    userInfo: {},
    showDialog: false // 新增授权提示对话框状态
  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl
    })

    const that = this
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        that.setData({
          openid: res.result.openid
        })
        const currentDate = formatDate(Date.now());
        wx.cloud.callFunction({
          name: "database",
          data: {
            date: currentDate, 
            openid: res.result.openid
          }
        })

        // 更新本地存储的用户信息
        that.setData({
          userInfo: {
            ...that.data.userInfo,
            avatarUrl: that.data.avatarUrl,
            openid: res.result.openid,
            loginTime: currentDate // 新增登录时间字段
          }
        })
        wx.setStorageSync('userInfo', that.data.userInfo)
      }
    })

    wx.setStorageSync('isLogin', true)
    wx.navigateBack()
  },

  goBack() {
    wx.navigateBack()
  }
})