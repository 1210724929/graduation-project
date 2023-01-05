// pages/teacherscansigndetail/teacherscansigndetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    singInList:[],
    testLsit:[
      {createTime:'2015/10/14',
        city:'四川省宜宾市翠屏区水井街30号',
        isSignin:1
      },
      {
      createTime: '2015/10/14',
      city: '四川省宜宾市翠屏区水井街30号',
      isSignin: 1
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number: options.number,
    })
    //console.log(this.data.number)
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
    var that=this;
    wx.request({
      url:'http://localhost:8081/WeXinStudentSignIn/studentSignInSelect',
      data: { studentId: that.data.number},
      method: 'post',
      success: function (res) {
        //console.log(res)
        var util = require("../../utils/util.js");
        var applyData = res.data.sigInList;
        if (res.data.siginSelectState =="select_sucess"){
          for (var i = 0; i < applyData.length; i++) {
            applyData[i].createTime = util.formatTime(new Date(applyData[i].createTime))
          }
          that.setData({
            singInList: res.data.sigInList
          })
         
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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