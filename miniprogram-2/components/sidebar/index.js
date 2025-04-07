Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [
        {
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
    },

    defaultCurrent: {
      type: Number,
      value: 0
    }
  },
  observers: {
    'defaultCurrent': function (defaultCurrent) {
      this.data.current === defaultCurrent || this.setData({
        current: defaultCurrent
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    }
  }
})