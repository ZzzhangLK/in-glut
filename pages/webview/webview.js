// pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, decodeURIComponent(options.color), decodeURIComponent(decodeURIComponent(options.color)));
    var that=this;
    wx.getStorage({
      key: 'access_token',
      success:function(res){
        console.log(res);
        var hash, color;
        hash = options.hash
        color = decodeURIComponent(decodeURIComponent(options.color))
        that.setData({
          'url': "https://yiban.glut.edu.cn/i/u/" + hash + ".html?access_token=" + res.data
        });
        console.log(that.data.url);
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: color
        });
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        });
      },
      fail: function () {
        wx.reLaunch({
          url: '/pages/others-page/LoginPages/LoginPages'
        })
      }
    })
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