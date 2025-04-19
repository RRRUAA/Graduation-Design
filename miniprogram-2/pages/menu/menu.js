Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerStyle: '',
    current: '0',

    list: [{
        icon: '/imgs/menu/推荐.png',
        type: 'url',
        name: '特色'
      },
      {
        icon: '/imgs/menu/主食-copy.png',
        type: 'url',
        name: '主食'
      },
      {
        icon: '/imgs/menu/甜点.png',
        type: 'url',
        name: '甜点'
      },
      {
        icon: '/imgs/menu/饮品.png',
        type: 'url',
        name: '饮品'
      }
    ],

    swiperList: [{
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      },
      {
        imageUri: '/imgs/authLoginbg.jpg',
        type: 'url',
      }
    ],

    specialList: [],

    mainList: [],

    sweetList: [],

    drinkList: [],

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    if (wx.getStorageSync('judge')) {
      wx.cloud.callFunction({
        name: "specialList",
        success: res => {
          this.setData({
            specialList: res.result.data.map((item, index) => ({
              ...item,
              num: 1,
              from: "specialList",
              number: index.toString(),
              isadded: false,
            }))
          });
        },
        fail: err => {
          console.error('云函数调用失败:', err);
          wx.showToast({
            title: '网络异常，请重试',
            icon: 'none'
          });
        },
      });

      wx.cloud.callFunction({
        name: "mainList",
        success: res => {
          this.setData({
            mainList: res.result.data.map((item, index) => ({
              ...item,
              num: 1,
              from: "mainList",
              number: index.toString(),
              isadded: false,
            }))
          });
        },
        fail: err => {
          console.error('云函数调用失败:', err);
          wx.showToast({
            title: '网络异常，请重试',
            icon: 'none'
          });
        },
      });

      wx.cloud.callFunction({
        name: "sweetList",
        success: res => {
          this.setData({
            sweetList: res.result.data.map((item, index) => ({
              ...item,
              num: 1,
              from: "sweetList",
              number: index.toString(),
              isadded: false,
            }))
          });
        },
        fail: err => {
          console.error('云函数调用失败:', err);
          wx.showToast({
            title: '网络异常，请重试',
            icon: 'none'
          });
        },
      });

      wx.cloud.callFunction({
        name: "drinkList",
        success: res => {
          this.setData({
            drinkList: res.result.data.map((item, index) => ({
              ...item,
              num: 1,
              from: "drinkList",
              number: index.toString(),
              isadded: false,
            }))
          });
        },
        fail: err => {
          console.error('云函数调用失败:', err);
          wx.showToast({
            title: '网络异常，请重试',
            icon: 'none'
          });
        },
      });

      wx.setStorageSync('judge', false)
    }
  },

  onLoad() {
    wx.cloud.callFunction({
      name: "specialList",
      success: res => {
        this.setData({
          specialList: res.result.data.map((item, index) => ({
            ...item,
            num: 1,
            from: "specialList",
            number: index.toString(),
            isadded: false,
          }))
        });
      },
      fail: err => {
        console.error('云函数调用失败:', err);
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
      },
    });

    wx.cloud.callFunction({
      name: "mainList",
      success: res => {
        this.setData({
          mainList: res.result.data.map((item, index) => ({
            ...item,
            num: 1,
            from: "mainList",
            number: index.toString(),
            isadded: false,
          }))
        });
      },
      fail: err => {
        console.error('云函数调用失败:', err);
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
      },
    });

    wx.cloud.callFunction({
      name: "sweetList",
      success: res => {
        this.setData({
          sweetList: res.result.data.map((item, index) => ({
            ...item,
            num: 1,
            from: "sweetList",
            number: index.toString(),
            isadded: false,
          }))
        });
      },
      fail: err => {
        console.error('云函数调用失败:', err);
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
      },
    });

    wx.cloud.callFunction({
      name: "drinkList",
      success: res => {
        this.setData({
          drinkList: res.result.data.map((item, index) => ({
            ...item,
            num: 1,
            from: "drinkList",
            number: index.toString(),
            isadded: false,
          }))
        });
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

  switch (e) {
    const {
      current
    } = e.currentTarget.dataset
    this.setData({
      current
    })
    this.triggerEvent('on-change', {
      index: current
    })
  },

  add(event) {
    if (!wx.getStorageSync('isLogin')) {
      wx.showToast({
        title: '请先登录', // 提示内容
        icon: 'none', // 图标，可选值：'success', 'loading', 'none'
        duration: 1000 // 提示持续时间，单位毫秒
      })
    } else {
      const newArray = wx.getStorageSync('newArray') || []
      const from = event.currentTarget.dataset.from;
      const number = event.currentTarget.dataset.number;
      var selectedItem = '';

      switch (from) {
        case "specialList":
          selectedItem = this.data.specialList[number]
          break;
        case "mainList":
          selectedItem = this.data.mainList[number]
          break;
        case "sweetList":
          selectedItem = this.data.sweetList[number]
          break;
        case "drinkList":
          selectedItem = this.data.drinkList[number]
          break;
        default:
          break;
      }
      if (!selectedItem.isadded) {
        wx.showToast({
          title: '添加成功', // 提示内容
          icon: 'success', // 图标，可选值：'success', 'loading', 'none'
          duration: 700 // 提示持续时间，单位毫秒
        })
        switch (from) {
          case "specialList":
            this.setData({
              [`specialList[${number}].isadded`]: true
            })
            break;
          case "mainList":
            this.setData({
              [`mainList[${number}].isadded`]: true
            })
            break;
          case "sweetList":
            this.setData({
              [`sweetList[${number}].isadded`]: true
            })
            break;
          case "drinkList":
            this.setData({
              [`drinkList[${number}].isadded`]: true
            })
            break;
          default:
            break;
        }
        newArray.push(selectedItem)
        wx.setStorageSync('newArray', newArray)
      } else {
        wx.showToast({
          title: '请勿重复添加', // 提示内容
          icon: 'none', // 图标，可选值：'success', 'loading', 'none'
          duration: 1000 // 提示持续时间，单位毫秒
        })
      }
    }
  }
})