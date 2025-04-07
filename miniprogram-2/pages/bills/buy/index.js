// pages/bills/buy/index.js
Page({
  data: {
    totalPrice: 0, // 用于存储总价格
    addressList: [],
    radio: '1',
  },

  onShow() {
    const newArray = wx.getStorageSync('newArray')
    let totalPrice = 0;
    newArray.forEach(item => {
      // 去掉 price 中的 "$" 符号并转换为数字
      const price = parseFloat(item.price.replace('$', ''));
      // 累加每个元素的价格
      totalPrice += price * item.num;
    });
    totalPrice *= 100;
    this.setData({
      totalPrice: totalPrice
    });

    const addressList = wx.getStorageSync('addressList');
    this.setData({
      addressList
    })
  },

  onClickLeft() {
    wx.navigateBack()
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onSubmit() {
    if (this.data.addressList == '') {
      wx.showToast({
        title: '请添加送餐地址',
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    } else {
      let money = wx.getStorageSync('money')
      if (money < this.data.totalPrice/100) {
        wx.showToast({
          title: '余额不足',
          icon: 'none', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      } else {
        money = money - this.data.totalPrice/100
        wx.setStorageSync('money', money)
 
        wx.switchTab({
          url: '/pages/bills/bills',
        })
        wx.showToast({
          title: '提交成功！',
          icon: 'success', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      }
    }
  }
})