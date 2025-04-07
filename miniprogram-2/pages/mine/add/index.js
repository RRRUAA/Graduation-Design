// pages/mine/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    option: [{
        text: '请选择地址',
        value: 0
      },
      {
        text: '朝阳区',
        value: 1
      },
      {
        text: '南关区',
        value: 2
      },
      {
        text: '宽城区',
        value: 3
      },
      {
        text: '双阳区',
        value: 4
      },
      {
        text: '九台区',
        value: 5
      },
    ],
    name: '', // 存储姓名
    phone: '', // 存储电话
    address: '', // 存储地址
    isButtonDisabled: true, // 控制按钮是否禁用
  },

  goBack() {
    wx.navigateBack()
  },

  // 监听下拉菜单变化
  onDropdownChange: function (event) {
    const value = event.detail; // 获取选中的值
    this.setData({
      value: value
    });
    this.checkInputs();
  },

  // 监听姓名输入
  onNameInput: function (event) {
    this.setData({
      name: event.detail.value
    });
    this.checkInputs();
  },

  // 监听电话输入
  onPhoneInput: function (event) {
    this.setData({
      phone: event.detail.value
    });
    this.checkInputs();
  },

  // 监听地址输入
  onAddressInput: function (event) {
    this.setData({
      address: event.detail.value
    });
    this.checkInputs();
  },

  // 检查所有输入框和下拉菜单是否已填写
  checkInputs: function () {
    const {
      name,
      phone,
      address,
      value
    } = this.data;
    const isButtonDisabled = !(name &&
      phone &&
      address &&
      value !== null &&
      value !== 0); // 如果有一个为空，则禁用按钮
    this.setData({
      isButtonDisabled: isButtonDisabled
    });
  },

  onSubmit: function () {
    const {
      name,
      phone,
      address,
      value,
    } = this.data;

    let option = this.data.option[value].text

    // 检查输入是否为空（双重保险）
    if (!name || !phone || !address || value === null || value === 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 提交逻辑
    const newAddress = {
      name,
      phone,
      address,
      option
    };
    let addressList = wx.getStorageSync('addressList') || [];
    addressList.push(newAddress);
    wx.setStorageSync('addressList', addressList);

    wx.navigateBack();
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
  },
})