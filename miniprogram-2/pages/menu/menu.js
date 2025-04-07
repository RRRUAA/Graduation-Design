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

    specialList: [{
        url: '/imgs/menu/鸡蛋.png',
        name: '鸡蛋',
        description: '高蛋白，高营养',
        from: 'specialList',
        number: '0',
        price: '$1.5',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/饺子.png',
        name: '饺子',
        description: '驴肉馅饺子',
        from: 'specialList',
        number: '1',
        price: '$3',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/小炒.png',
        name: '小炒',
        description: '特色凉菜小炒',
        from: 'specialList',
        number: '2',
        price: '$5',
        num: '1',
        isadded: false
      },
    ],

    mainList: [{
        url: '/imgs/menu/鸡.png',
        name: '烤鸡',
        description: '正宗白羽鸡',
        from: 'mainList',
        number: '0',
        price: '$30',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/米饭.png',
        name: '米饭',
        description: '东北好米',
        from: 'mainList',
        number: '1',
        price: '$2',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/鱼.png',
        name: '鱼',
        description: '年年有“鱼”',
        from: 'mainList',
        number: '2',
        price: '$30',
        num: '1',
        isadded: false
      },
    ],

    sweetList: [{
        url: '/imgs/menu/茶点.png',
        name: '茶点',
        description: '一笼三个',
        from: 'sweetList',
        number: '0',
        price: '$10',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/水果.png',
        name: '水果拼盘',
        description: '西瓜+葡萄+哈密瓜',
        from: 'sweetList',
        number: '1',
        price: '$25',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/香肠.png',
        name: '香肠',
        description: '慕尼黑香肠',
        from: 'sweetList',
        number: '2',
        price: '$2',
        num: '1',
        isadded: false
      },
    ],

    drinkList: [{
        url: '/imgs/menu/冷饮.png',
        name: '橙汁',
        description: 'orange juice！',
        from: 'drinkList',
        number: '0',
        price: '$4',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/啤酒.png',
        name: '啤酒',
        description: '青岛雪花啤酒',
        from: 'drinkList',
        number: '1',
        price: '$18',
        num: '1',
        isadded: false
      },
      {
        url: '/imgs/menu/热饮.png',
        name: '茶',
        description: '龙井茶',
        from: 'drinkList',
        number: '2',
        price: '$18',
        num: '1',
        isadded: false
      },
    ],

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
          duration: 1000 // 提示持续时间，单位毫秒
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