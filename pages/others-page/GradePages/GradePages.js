// pages/others-page/GradePages/GradePages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year_array: ['2019', '2018', '2017', '2016'],
    objectArray: [
      {
        id: 0,
        name: '2019'
      },
      {
        id: 1,
        name: '2018'
      },
      {
        id: 2,
        name: '2017'
      },
      {
        id: 3,
        name: '2016'
      }
    ],
     year_index: 0,
    select_year: function (e) {
      console.log('picker发送选择改变，携带值为', this.data.year_array[e.detail.value])
      this.setData({
        year_index: e.detail.value
      })
    },
  term_array: ['春季', '秋季'],
  objectArray: [
    {
      id: 0,
      name: '春季'
    },
    {
      id: 1,
      name: '秋季'
    }
  ],
  term_index: 0,
  select_term: function (e) {
      console.log('picker发送选择改变，携带值为', this.data.term_array[e.detail.value])
      this.setData({
        term_index: e.detail.value
      })
    }},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'userid': getApp().globalData.userid,
      'access_token': getApp().globalData.access_token
    });
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})