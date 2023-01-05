// pages/usermatchfriend/usermatchfriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchFriendListTest:[
      {matchdegree:'90%',name:'蓝雅',sex:'女生',habby:'篮球',college:'美术学院'},
      { matchdegree: '88%', name: '芮然', sex: '女生', habby: '排球', college: '飞行学院' },
      { matchdegree: '79%', name: '周然', sex: '女生', habby: '唱歌', college: '教育学院' }
    ],
    matchfrienddegree:'',
    matchfriendname: '', 
    matchfriendhabby:'',
    matchfriendcollege:'',
    matchfriendnumber:'',
    index:0,
    matchFriendList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.matchFriend()
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
  choosefriend:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var match=e.currentTarget.dataset.number;
    //console.log(index)
    that.setData({
      index: index,
      matchfrienddegree: that.data.matchFriendList[index].matchdegreeS,
      matchfriendname: that.data.matchFriendList[index].name,
      matchfriendhabby: that.data.matchFriendList[index].habby0,
      matchfriendcollege: that.data.matchFriendList[index].college,
      matchfriendnumber: that.data.matchFriendList[index].studentId
    })
   // console.log("页面"+that.data.index)
  },
  userDetail:function(){
    wx.navigateTo({
      url: '../userdetail/userdetail',
    })
  },
  matchFriend:function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatch/matchfriend',
      data: { studentId: wx.getStorageSync('userLoginId')},
      method: 'post',
      success: function (res) {
        console.log(res);
        if (res.data.matchFriendState == "match_sucess") {
          that.setData({
            
            matchFriendList: res.data.matchFriendList,
            matchfrienddegree: res.data.matchFriendList[0].matchdegreeS,
            matchfriendname: res.data.matchFriendList[0].name,
            matchfriendhabby: res.data.matchFriendList[0].habby0,
            matchfriendcollege: res.data.matchFriendList[0].college,
            matchfriendnumber: res.data.matchFriendList[0].studentId
          })
         
        } else {

        }

      }
    })
  },

  //跳转留言界面，携带者信息
  matchMessageSend:function(e){
    var match = e.currentTarget.dataset.number;
    var name= e.currentTarget.dataset.name;
   // console.log(e.currentTarget.dataset)
    wx.redirectTo({
      url: '../usermatchfriendmessagesend/usermatchfriendmessagesend?number=' + match + '&name='+name,
    })
  }
})