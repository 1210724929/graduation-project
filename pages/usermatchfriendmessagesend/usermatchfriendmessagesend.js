// pages/usermatchfriendmessagesend/usermatchfriendmessagesend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendnumber:'',
    getnumber:'',
    getname:'',
    currentMessageList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options.number)
   // console.log(options.name)
    this.setData({
      getnumber: options.number,
      getname: options.name,
      sendnumber: wx.getStorageSync('userLoginId')
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
    var that=this;
      wx.request({
        url: 'http://localhost:8081/WeXinStudentMatchMessage/messagecurrent',
        data: { getId: this.data.getnumber, sendId: this.data.sendnumber},
        method: 'post',
        success: function (res) {
          //console.log(res)
          if (res.data.currentState =="send_sucess"){
            that.setData({
              currentMessageList: res.data.currentMatchMessageList
            })
          }
        }
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

  },
  matchfriend:function(){
    wx.redirectTo({
      url: '../usermatchfriend/usermatchfriend',
    })
  },

  //进行留言
  sendMessage:function(e){
    var that=this;
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatchMessage/messageinsert',
      data: e.detail.value,
      method: 'post',
      success: function (res) {
        //console.log(res)
        that.onShow();
      }
    })
  }
})