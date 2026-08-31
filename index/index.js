// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 幻灯片素材
    swiperImg: [
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg'},
      {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg'}
    ],
    newsList: [],        // 原始全部新闻列表
    displayNewsList: [], // 用于页面过滤展示的新闻列表
    searchKey: ''        // 搜索关键词
  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function(e) {
    // 获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    // 携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 自定义函数--监听输入框实时搜索新闻
   */
  onSearchInput: function(e) {
    let key = e.detail.value.trim()
    let allNews = this.data.newsList

    if (key === '') {
      this.setData({
        searchKey: '',
        displayNewsList: allNews
      })
    } else {
      let filtered = allNews.filter(item => item.title.includes(key))
      this.setData({
        searchKey: key,
        displayNewsList: filtered
      })
    }
  },

  /**
   * 自定义函数--清除搜索关键字
   */
  clearSearch: function() {
    this.setData({
      searchKey: '',
      displayNewsList: this.data.newsList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取新闻列表
    let list = common.getNewsList()
    // 更新列表数据
    this.setData({
      newsList: list,
      displayNewsList: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})