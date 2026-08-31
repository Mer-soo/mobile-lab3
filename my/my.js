Page({
  data: {
    num: 0,
    isLogin: false,
    src: '',
    nickName: '',
    newsList: []
  },

  // 页面显示时，自动检查本地登录状态与同步收藏列表
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isLogin: true,
        src: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
      this.getMyFavorites()
    }
  },

  // 选择/获取微信自带头像
  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail
    this.setData({
      src: avatarUrl
    })
  },

  // 获取/选择微信昵称
  onInputNickname: function (e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  // 点击“确认登录”
  loginWithCustomInfo: function () {
    if (!this.data.src) {
      wx.showToast({
        title: '请先点击获取头像',
        icon: 'none'
      })
      return
    }
    if (!this.data.nickName) {
      wx.showToast({
        title: '请输入或选择昵称',
        icon: 'none'
      })
      return
    }

    let userInfo = {
      avatarUrl: this.data.src,
      nickName: this.data.nickName
    }

    this.setData({
      isLogin: true
    })

    // 保存登录状态供详情页和下次打开时使用
    wx.setStorageSync('userInfo', userInfo)
    this.getMyFavorites()
  },

  // 读取本地收藏列表
  getMyFavorites: function () {
    let info = wx.getStorageInfoSync()
    let keys = info.keys
    let myNewsList = []

    for (var i = 0; i < keys.length; i++) {
      // 过滤非新闻数据（例如用户信息 userInfo）
      if (keys[i] !== 'userInfo') {
        let obj = wx.getStorageSync(keys[i])
        if (obj && obj.id) {
          myNewsList.push(obj)
        }
      }
    }

    this.setData({
      newsList: myNewsList,
      num: myNewsList.length
    })
  },

  // 点击跳转新闻详情
  goToDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  // 点击清除本地缓存
  clearStorage: function () {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有本地收藏和缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          this.setData({
            isLogin: false,
            src: '',
            nickName: '',
            newsList: [],
            num: 0
          })
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 点击关于我们
  showAbout: function () {
    wx.showModal({
      title: '关于高校新闻网',
      content: '本小程序由前端综合实践项目开发制作，提供最新高校资讯浏览与个人新闻收藏功能。',
      showCancel: false,
      confirmText: '知道了'
    })
  }
})