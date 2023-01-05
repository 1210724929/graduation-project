// pages/usermatchfriendmessage/usermatchfriendmessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    senddisplay: 1,
    getdisplay: 0,
    sendMessageList: {},
    getMessageList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
    this.sendMessage();
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

  },
  sendMessage: function() {
    var that=this;
    this.setData({
      senddisplay: 1,
      getdisplay: 0
    })
     var that=this;
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatchMessage/messagesend',
      data: { sendId: wx.getStorageSync('userLoginId') },
      method: 'post',
      success: function (res) {
         console.log(res)
        that.setData({
          sendMessageList: res.data.sendMatchMessageList
        })
      }
    })
  },
  getMessage: function() {
    var that=this;
    this.setData({
      senddisplay: 0,
      getdisplay: 1
    })
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatchMessage/messageget',
      data: {getId: wx.getStorageSync('userLoginId')},
      method: 'post',
      success: function(res) {
        console.log(res)
        that.setData({
          getMessageList: res.data.getMatchMessageList
        })
      }
    })

  },
  userDetail: function() {
    wx.redirectTo({
      url: '../userdetail/userdetail',
    })
  }
})