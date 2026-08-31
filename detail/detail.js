var common = require('../../utils/common.js')

Page({
  data: {
    article: {},
    isAdd: false
  },

  onLoad: function (options) {
    let id = options.id
    let result = common.getNewsDetail(id)
    if (result.code === '200') {
      this.setData({
        article: result.news,
        isAdd: wx.getStorageSync(id) ? true : false
      })
    }
  },

  // 点击添加收藏
  addFooter: function () {
    // 1. 检查用户是否已登录（判断 Storage 里是否有登录信息或 OpenID/昵称）
    // 如果你在 my 页面登录时保存了 userInfo，这里可以同步读取
    let userInfo = wx.getStorageSync('userInfo') 

    // 如果没有登录信息，提示用户并阻止收藏
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '您当前处于未登录状态，请先前往“我的”页面登录后再进行收藏！',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            // 点击确定后自动切换至“我的” Tab 页
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
      return; // 拦截后续收藏逻辑
    }

    // 2. 已登录状态下正常执行收藏逻辑
    let article = this.data.article
    wx.setStorageSync(article.id, article)
    this.setData({ isAdd: true })
    
    wx.showToast({
      title: '收藏成功',
      icon: 'success'
    })
  },

  // 点击取消收藏
  cancelFooter: function () {
    let article = this.data.article
    wx.removeStorageSync(article.id)
    this.setData({ isAdd: false })
    
    wx.showToast({
      title: '已取消收藏',
      icon: 'none'
    })
  }
})