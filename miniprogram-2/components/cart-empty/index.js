// components/cart-empty/index.js
Component({
  properties: {

  },

  data: {

  },

  methods: {
    handleClick() {
      if (!wx.getStorageSync('isLogin')) {
        wx.showToast({
          title: '请先登录', // 提示内容
          icon: 'none', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      } else {
        wx.switchTab({
          url: '/pages/menu/menu',
        })
      }
    },
  }
})