// pages/housemastersendoperation/housemastersendoperation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLoginId: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userLoginId: wx.getStorageSync('userLoginId'),
      id: options.applyid
    })
    //console.log(this.data)
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

  },
  addSend: function(e) {
    var that = this;
    var id = this.data.userLoginId;
    console.log(e.detail.value);
    if (e.detail.value.content != "") {
      wx.request({
        url: 'http://localhost:8081/WeXinHousemasterSend/housemastersendinsert',
        data: e.detail.value,
        method: 'POST',
        success: function(res) {
          console.log(res.data.insetState);
          if (res.data.insetState == "inset_sucess") {
            wx.redirectTo({
              url: '../housemastersend/housemastersend',
            })
          } else {

          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入内容',
      })
    }
  }
})