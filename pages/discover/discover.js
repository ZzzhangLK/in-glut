// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rss:null,
    type:'schoolnotice',
  },
  news:function(e){
    this.setData({type:e.target.dataset.type});
  },
  init_data: function(){
    var that = this
    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/rss.php',
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded", 'accesstoken': getApp().globalData.access_token },
      data: {},
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res);
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'rss',
            data: res.data.data
          });
          that.setData({
            rss: res.data.data,
          });
          console.log(res.data)
        }
      }
    })
  },
  articlepages: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/others-page/ArticlePages/ArticlePages?type="+e.currentTarget.dataset.type+"&id="+e.currentTarget.dataset.id
    });
  },
  tweets: function (e) {
    console.log("/pages/others-page/TweetsPages/TweetsPages?link=" + e.currentTarget.dataset.link)
    wx.navigateTo({
      url: "/pages/others-page/TweetsPages/TweetsPages?link=" + encodeURIComponent(e.currentTarget.dataset.link)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*var app = getApp();
    this.setData({
      'userid': app.globalData.userid,
      'access_token': app.globalData.access_token,
      'data': app.globalData.data
    });*/
    var that=this;
    wx.getStorage({
      key: 'rss',
      success: function (res) {
        //console.log(res.data);
        that.setData({
          rss: res.data,
        });
      }
    });
    this.init_data();
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
    this.init_data();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this;
    // 设置转发内容
    var shareObj = {
      title: "in桂工 | 你想要的，都在这里!",
      path: '',        // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: 'https://yiban.glut.edu.cn/zlk/image/wxapp/image/share.jpg',
      success: function (res) {　 // 转发成功之后的回调　　　　　
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {　// 转发失败之后的回调
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    return shareObj;
  }
})