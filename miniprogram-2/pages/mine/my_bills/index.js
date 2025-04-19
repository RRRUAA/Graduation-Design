Component({

  properties: {

  },


  data: {
    personInfo: {},
    total: 0,
    bills: {},
  },


  methods: {
    onLoad() {
      let personInfo = wx.getStorageSync('userInfo');
      this.setData({
        personInfo
      })
    },

    onShow() {
      wx.cloud.callFunction({
        name: "states",
        success: res => {
          this.setData({
            total: res.result.data.length,
            bills: res.result.data
          });
          console.log(this.data.bills)
        },
        fail: err => {
          console.error('云函数调用失败:', err);
          wx.showToast({
            title: '网络异常，请重试',
            icon: 'none'
          });
        },
      });
    },

    goBack() {
      wx.navigateBack()
    },
  }
})