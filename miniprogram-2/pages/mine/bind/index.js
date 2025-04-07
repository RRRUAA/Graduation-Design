Component({

  data: {
    inputValue: '' // 用于存储输入框的内容
  },

  methods: {
    goBack() {
      wx.navigateBack()
    },

    onInputChange: function (e) {
      this.setData({
        inputValue: e.detail.value // 获取输入框的值并更新到 data 中
      });
    },

    onSubmit() {
      const inputValue = this.data.inputValue;
      if(inputValue=="55210719"){
        wx.showToast({
          title: '兑换成功', // 提示内容
          icon: 'success', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
        let temp=wx.getStorageSync('note');
        temp+=1.5;
        wx.setStorageSync('note', temp)
      }
      else{
        wx.showToast({
          title: '请输入正确的兑换码', // 提示内容
          icon: 'none', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      }
    }
  }
})