// pages/others-page/LoginPages/LoginPages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  agreement: function() {

    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）

      url: "/pages/others-page/AboutPages/AgreementPages/AgreementPages"

    })
  },
  account: function () {

    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）

      url: "/pages/others-page/AboutPages/NoAccountPages/NoAccountPages"

    })
  },
  password: function () {

    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）

      url: "/pages/others-page/AboutPages/NoPasswordPages/NoPasswordPages"

    })
  },
  loginyiban: function() {
    console.log(this.data.userName)
    console.log(this.data.userPwd)
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/login.php', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
      }, // 设置请求的 header
      data: {
        zh: this.data.userName,
        mm: this.data.userPwd
      },
      success: function(res) {
        console.log(res);
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'userid',
            data: res.data.data.userid
          });
          wx.setStorage({
            key: 'access_token',
            data: res.data.data.access_token
          });
          wx.setStorage({
            key: 'data',
            data: res.data.data.data
          });
          var app = getApp()
          app.globalData.access_token = res.data.data.access_token
          app.globalData.userid = res.data.data.userid
          app.globalData.data = res.data.data.data
          wx.reLaunch({
            url: '/pages/index/index'
          })
          // wx.navigateBack({
          //   delta: 1,
          // });
        }
        wx.showToast({
          title: res.data.text,
          icon: 'success',
          duration: 2000
        })
      },
      fail: function() {
        wx.showToast({
          title:"登录出现错误!",
          icon: 'cancel',
          duration: 2000
        })
        //console.log('error');
      },
      complete: function() {
        // complete 
      }
    })
    // wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）

    //   url: "/pages/index/index"

    // })
  },
  guestyiban: function () {
    wx.showModal({
      title: '提示',
      content: '确定使用游客账号登录吗？',
      success: function (res) {
        if (res.cancel) {
          //console.log('游客登录失败')
        } else {
          wx.showLoading({
            title: '登录中...',
          })
          wx.request({
            url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/login.php', //上线的话必须是https，没有appId的本地请求貌似不受影响 
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
            header: {
              'Content-Type': "application/x-www-form-urlencoded",
            }, // 设置请求的 header
            data: {
              zh: "guest",
              mm: "guest"
            },
            success: function (res) {
              console.log(res);
              if (res.data.res == 100) {
                wx.setStorage({
                  key: 'userid',
                  data: res.data.data.userid
                });
                wx.setStorage({
                  key: 'access_token',
                  data: res.data.data.access_token
                });
                wx.setStorage({
                  key: 'data',
                  data: res.data.data.data
                });
                var app = getApp()
                app.globalData.access_token = res.data.data.access_token
                app.globalData.userid = res.data.data.userid
                app.globalData.data = res.data.data.data
                wx.reLaunch({
                  url: '/pages/index/index'
                })
                // wx.navigateBack({
                //   delta: 1,
                // });
              }
              wx.showToast({
                title: res.data.text,
                icon: 'success',
                duration: 2000
              })
            },
            fail: function () {
              console.log('error');
            },
            complete: function () {
              // complete 
            }
          })
        }
      }
    })

    
    // wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）

    //   url: "/pages/index/index"

    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'access_token',
      success: function (res) {
        console.log(res.data)
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }, fail: function () {
        
      }
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