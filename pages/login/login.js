//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    accountcheck: ""
  },

  onLoad: function() {

  },
  registerUser: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  loginIn: function(e) {
    var that=this;
    console.log(e.detail.value);
    //var url = "http://localhost:8081/wexinUser/login"
    // console.log("-------------" + url + "-------------");
    wx.request({
      url: "http://localhost:8081/wexinUser/login",
      data: e.detail.value,
      dataType: 'json',
      method: 'POST',
      success: function(res) {
      //  console.log("requst success");
      //  console.log(res);
       // console.log("return data=" + res.data.loginFlag);
        if (res.data.loginFlag == 0) {
          var content = '登录失败，账号错误'
          wx.showModal({
            title: '提示',
            content: content,
          })
        } else if (res.data.loginFlag == "student_success") {
         // console.log("成果能够")
          wx.setStorageSync('userLoginId', res.data.typeNumber);
          wx.redirectTo({
            url: '../studentapply/studentapply',
          })
        } else if (res.data.loginFlag =="teacher_success"){
          wx.setStorageSync('userLoginId', res.data.typeNumber);
          wx.redirectTo({
            url: '../teacherscanask/teacherscanask',
          })
        } else if (res.data.loginFlag =="housemaster_success"){
          wx.setStorageSync('userLoginId', res.data.typeNumber);
          wx.redirectTo({
            url: '../housemastersend/housemastersend',
          })
        }
        //保存用户信息全局或者本地缓存
       // app.globalData.userId = that.data.accountcheck;
       // console.log(app.globalData.userId)
        //wx.setStorageSync('userLoginId', that.data.accountcheck);
      //  console.log(wx.getStorageSync('userLoginId'))
       // wx.setStorageSync('userLoginId', '15101070216');
      },
      fail: function() {
        console.log("requst fail");
        wx.showModal({
          title: '提示',
          content: '网络请求失败，请检查网络',
        })
      },
      complete: function() {
       // console.log("requst complete");
      }
    })
  },
  //前台输入格式验证
  accountCheck: function(e) {
    //console.log(e.detail.value.length)
    if (!(/\d{11}/.test(e.detail.value))) {
      // wx.showToast({
      //   title: '账号错误',
      //   duration: 1000,
      //   icon: 'none'
      // });
    }
    this.setData({
      accountcheck: e.detail.value
    })
  },
  radioChange: function(e) {
    // console.log(this.data.accountcheck)
    //console.log(e.detail.value)
    if (e.detail.value != "0") {
      if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.accountcheck))) {
        // wx.showToast({
        //   title: '手机号码有误',
        //   duration: 1000,
        //   icon: 'none'
        // });
      }
    }

  }
})