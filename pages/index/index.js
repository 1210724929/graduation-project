//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '大学生公寓管理',
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onLoad: function () {
    
  },
 
})
