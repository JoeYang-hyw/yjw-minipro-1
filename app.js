//app.js定义页面启动入口
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getWeatherInfo:function(cityid,fc){
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/7d?location=" + cityid + "&key=1f8b48aec85645a8a8478c96bd641292",
      success:function(res){
        console.log(res)
        fc(res.data)
      },
      fail:function(){
        console.log("fail")
      }
    })
  },
  getLifestyleInfo:function(cityid,fc){
    wx.request({
      url: "https://devapi.qweather.com/v7/indices/1d?type=3,8,1,2,5,6,7,9,10&location=" + cityid + "&key=1f8b48aec85645a8a8478c96bd641292",
      success:function(res){
        console.log(res)
        fc(res.data)
      }
    })
  },
  getCurWeatherInfo:function(cityid,fc){
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/now?location=" + cityid + "&key=1f8b48aec85645a8a8478c96bd641292",
      success: function (res) {
        console.log(res)
        fc(res.data)
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})
