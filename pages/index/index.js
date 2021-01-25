//index.js
//获取应用实例
const app = getApp()

var util = require('../../utils/util.js');
Page({
  data: {
    mydate:null,
    classtable:null,
    conf_week:null,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 7500,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    backgroundImgs: [],
    display: '',
  },
  //事件处理函数
  grade: function () {
    wx.navigateTo({
      url: "/pages/others-page/GradePages/GradePages"
    })
  },
  discover: function () {
    wx.switchTab({
      url: "/pages/discover/discover"
    })
  },
  applist: function () {
    wx.switchTab({
      url: "/pages/app/app"
    })
  },
  openapp: function (e) {
    console.log(e)
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/webview/webview?hash=" + e.currentTarget.dataset.hash + "&color=" + encodeURIComponent(e.currentTarget.dataset.color)
    })
  },
  tweets: function (e) {
    console.log("/pages/others-page/TweetsPages/TweetsPages?link=" + e.currentTarget.dataset.link)
    wx.navigateTo({
      url: "/pages/others-page/TweetsPages/TweetsPages?link=" +encodeURIComponent(e.currentTarget.dataset.link)
    });
  },
  // modalpages: function (e) {
  //   console.log("/pages/others-page/ModalPages/ModalPages?link=" + e.currentTarget.dataset.link)
  //   wx.navigateTo({
  //     url: "/pages/others-page/ModalPages/ModalPages?link=" + encodeURIComponent(e.currentTarget.dataset.link)
  //   });
  //   wx.setStorage({
  //     key: 'key',
  //     data: 0
  //   });
  //   this.setData({
  //     display: "none"
  //   });
  // },
  classtable_settime:function(time){
    if(typeof this.data.home==="undefined")return;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var weekdaynum=[6,0,1,2,3,4,5];
    this.data.mydate=time
    var d = new Date(this.data.mydate)
    var now_timestamp = parseInt(d.getTime() / 1000);
    var config_timestamp = this.data.home[7].config_timestamp;
    var weeknumber = parseInt((now_timestamp - config_timestamp) / 604800) + 1;
    //console.log(d, now_timestamp, config_timestamp, weeknumber, weekday[d.getDay()], weekdaynum[d.getDay()])
    this.setData({
      week: weekday[d.getDay()],
      conf_day:weekdaynum[d.getDay()],
      conf_week: weeknumber,
    })
  },
  switch_left: function () {
    this.classtable_settime(this.data.mydate - 86400000)
  },
  switch_right: function () {
    this.classtable_settime(this.data.mydate + 86400000)
  },
  switch_now: function () {
    this.classtable_settime(new Date().getTime())
  },
  init_classtable:function(){
    
    var that = this
    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/classtable.php',
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded", 'accesstoken': getApp().globalData.access_token },
      data: {},
      success: function (res) {
        //wx.stopPullDownRefresh()
        //console.log(res);
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'classtable',
            data: res.data.data
          });
          that.setData({
            classtable: res.data.data,
          });
          that.classtable_settime((new Date()).getTime());
          console.log(res.data)
        }
      },
      fail: function () {
        console.log('error');
        wx.showToast({
          title: '出错了！',
        })
      },
      complete: function () {
        // complete 
      }
    })
  },
  init_data:function(){
    var that=this;
    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/home.php',
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded", 'accesstoken': getApp().globalData.access_token },
      data: {},
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res);
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'home',
            data: res.data.data
          });
          if (res.data.data[8][0].key!="1"){
            wx.setStorage({
              key: 'key',
              data:1
            });
            // that.setData({
            //   display: "block"
            // });
          };
          //////////
          //console.log(res.data.data[8][0].key);
          // for(var i =0;i<res.data.data[8].length;i++){
          //   console.log(i);
          //   wx.getStorage({
          //     key: 'key',
          //     data: res.data.data[8][i].key
          //   });
          //   //that.showModal();
          // };
          // wx.setStorage({
          //   key: 'key',
          //   data: res.data.data[8][0].key
          // });
          //////////
          //that.showModal();
          //that.hideModal();
          that.setData({
            home: res.data.data,
          });
          that.money();
          that.classtable_settime((new Date()).getTime());
          
        }
      },
      fail: function () {
        console.log('error');
        wx.showToast({
          title: '出错了！',
        })
      },
      complete: function () {
        // complete 
      }
    })
  },
  init_modal_data: function () {
    var that = this;
    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/home.php',
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded", 'accesstoken': getApp().globalData.access_token },
      data: {},
      success: function (res) {
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'key',
            data: res.data.data[8][0].key
          });
          
          
          that.setData({
            key: res.data.data[8][0].key,
          });
          //console.log(res.data.data[8][0].key);
        }
      },
      fail: function () {
        console.log('error');
        wx.showToast({
          title: '出错了！',
        })
      },
      complete: function () {
        // complete 
      }
    })
  },
  init_rss_data: function () {
    var that = this;


    wx.request({
      url: 'https://yiban.glut.edu.cn/glutlife/wxapp/api/home_rss.php',
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded", 'accesstoken': getApp().globalData.access_token },
      data: {},
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res);
        if (res.data.res == 100) {
          wx.setStorage({
            key: 'home_rss',
            data: res.data.data
          });
          that.setData({
            home_rss: res.data.data,
          });
          //that.refresh_week();
          //that.money();
        }
      },
      fail: function () {
        console.log('error');
        wx.showToast({
          title: '出错了！',
        })
      },
      complete: function () {
        // complete 
      }
    })
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
  // refresh_week:function(){
  //   var now_timestamp = parseInt((new Date()).getTime() / 1000);
  //   var config_timestamp = this.data.home[7].config_timestamp;
  //   var weeknumber = parseInt((now_timestamp - config_timestamp) / 604800) + 1;
  //   this.setData({
  //     "conf_week":weeknumber,
  //   })
  // },



  // showModal: function () {
  //     this.setData({
  //       display: "block"
  //     })
  // },
  // hideModal: function () {
  //   this.setData({
  //     display: "none"
  //   });
  //   wx.setStorage({
  //     key: 'key',
  //     data: 0
  //   });
  // },
  money: function () {
    var money1 = this.data.home[2][0];
    var money2 = this.data.home[2][1];
    var money3 = Math.abs(this.data.home[2][2]);
    var money=[money1,money2,money3];
    console.log(money);
    this.setData({
      "money": money,
      "money_data":money
    })
  },
  hidden_money: function (res) {
    //var that = this;
    //console.log(res)
    //event.stopPropagation()
    if (this.data.money[0] !== '****'){
      this.setData({
        "money": ['****','****','****']
      })
    }else{
      //that.money();
      this.setData({
        "money": this.data.money_data
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.init_data();
    this.init_classtable();
    this.init_rss_data();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onLoad: function () {
    
    var time = util.formatTime(new Date());
    //var mydate = new Date().getTime();
    var myddy = new Date().getDay();//获取存储当前日期
    //var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //var weekdaynum = ["6", "0", "1", "2", "3", "4", "5"];
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      //weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      //weekdaynum :["6", "0", "1", "2", "3", "4", "5"],
      time: time,
      //week: weekday[myddy],//
      //conf_day: weekdaynum[myddy]
    });
    wx.getStorage({
      key: 'home',
      success:function(res){
        console.log(res.data);
        that.setData({
          home: res.data,
        });
        //that.refresh_week();
      }
    });
    wx.getStorage({
      key: 'classtable',
      success: function (res) {
        console.log(res.data);
        that.setData({
          classtable: res.data,
        });
        that.classtable_settime((new Date()).getTime())
      }
    });
    this.init_data();
    this.init_rss_data();
    // this.init_modal_data();
    this.init_classtable();
    
    wx.showShareMenu({
      withShareTicket: true
    });
    var app = getApp();
    this.setData({
      'userid': app.globalData.userid,
      'access_token': app.globalData.access_token,
      'data': app.globalData.data
    });
    // wx.getStorage({
    //   key: 'key',
    //   success(res) {
    //     console.log(res.data);
    //     switch (res.data) {
    //       case "1":
    //         that.setData({
    //           display: "block"
    //         });
    //         wx.setStorage({
    //           key: 'key',
    //           data: 0
    //         });
    //         break;
    //       case "0":
    //         that.setData({
    //           display: "none"
    //         });
    //         break;
    //       default:
    //         that.setData({
    //           display: "block"
    //         });
    //     };
    //   }
    // });
  },
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
});
  