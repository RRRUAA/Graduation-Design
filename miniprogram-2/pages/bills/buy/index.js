function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

Page({
  data: {
    totalPrice: 0, // 用于存储总价格
    addressList: [],
    radio: '1',
    openid: ''
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
      let note = wx.getStorageSync('note')
      if (money + note < this.data.totalPrice / 100) {
        wx.showToast({
          title: '余额不足',
          icon: 'none', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      } else {
        if (money >= this.data.totalPrice / 100) {
          money -= this.data.totalPrice / 100;
        } else {
          note -= this.data.totalPrice / 100 - money;
          money = 0;
        }
        wx.setStorageSync('money', money)
        wx.setStorageSync('note', note)
        const currentDate = formatDate(Date.now());
        const newArray = wx.getStorageSync('newArray');

        // 新增过滤逻辑：只保留 name 和 num
        const filteredArray = newArray.map(({
          name,
          num
        }) => ({
          name,
          num
        }));

        const userInfo = wx.getStorageSync('userInfo');
        wx.cloud.callFunction({
          name: "bills",
          data: {
            date: currentDate,
            openid: userInfo.openid,
            addressList: this.data.addressList,
            newArray: filteredArray // 使用过滤后的数组
          }
        })

        wx.setStorageSync('newArray', [])
        wx.setStorageSync('judge', true)
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