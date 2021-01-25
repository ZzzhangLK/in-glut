
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  aboutpage: function () {
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/others-page/AboutPages/AboutPages/AboutPages"
    })
  },
  openapp: function (e) {
    console.log(e)
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/webview/webview?hash=" + e.currentTarget.dataset.hash + "&color=" + encodeURIComponent(e.currentTarget.dataset.color)
    })
  },
  loginpage: function () {
    wx.clearStorage()
    wx.reLaunch({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/others-page/LoginPages/LoginPages"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      'userid': app.globalData.userid,
      'access_token': app.globalData.access_token,
      'data': app.globalData.data
    });
    
    // wx.getStorage({
    //   key: 'userid',
    //   success: function (res) {
    //     that.setData({
    //       userid: res.data
    //     })
    //   }
    // })
    
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
    wx.getStorage({
      key: 'access_token',
      fail: function () {
        wx.reLaunch({
          url: '/pages/others-page/LoginPages/LoginPages'
        })
      }
    });

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
    wx.stopPullDownRefresh()
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