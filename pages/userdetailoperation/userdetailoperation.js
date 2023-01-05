// pages/userdetailoperation/userdetailoperation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchhabbytest:[{}],
    matchHabbyList:{},
    userMatchId:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userMatchId: wx.getStorageSync('userLoginId')
    })
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatch/habbyselect',
      data: { studentId: that.data.userMatchId },
      method: 'post',
      success: function (res) {
        //console.log(res)
        that.setData({
          matchHabbyList: res.data.studentMatch
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
  onShareAppMessage: function () {

  },
  matchhabby:function(e){
    //console.log(e.detail.value)
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatch/habbyinsert',
      data: e.detail.value,
      method: 'post',
      success: function (res){
        console.log(res)
        var content='';
        if (res.data.mathInsertState =="inset_sucess"){  
          content = '插入成功';
        } else if (res.data.mathInsertState == "inset_fail"){
          content = '插入失败'
        } else if (res.data.mathInsertState == "updata_sucess"){
          content = '更新成功'
        }else{
          content = '操作失败'
        }
        wx.showModal({
          title: '提示',
          content: content,
        })
      }
    })
    
  }
})