// pages/sutdentapply/sutdentapply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: '1',
        applyType: '留校',
        applyState: '已审批',
        content: '（深宫高阁，清楼里女主人公玉妃，依栏杆而眺望。放眼一下，这繁华的街道，灯红酒绿……霜色珀泪暗暗地流下，泪淌下，将嘴角的朱红浸润。此刻她才发现，这繁华富贵，轻罗裳衣……这一切不过就是浮云、过眼云烟。曾经进入宫殿时这遥远的沧桑之音，现在才终于领悟。她拿起了随身带进宫里的青色牧笛，朱红泪，滑尽了这支牧笛。音凄惨犹如寒冬呼啸，犹如瑟瑟冽秋……她回忆着，在溪水流淌旁，吹笛的少年。回忆着，在花落过',
        applyTime: '2019/5/10 9:03'
      },
      {
        applyId: '2',
        applyType: '请假',
        applyState: '待审批',
        applyText: '相遇的机会就像天空那两弯弧虹一般。而彼此相处相语就如同那天空的彩虹最暗淡的一色，而你在我的心中留下的印象就是雨后，清馨折射过的霞红。喜欢你若可以不用说出口，你就已经知道我的心意。我想又是自己想多了',
        applyTime: '2019/5/10 9:03'
      },
    ],
    applylist: {},
    number: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    
    this.setData({
      number: options.number,
      type: wx.getStorageSync("type")
    })
    
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
    //console.log(wx.getStorageSync('userLoginId'))
    //console.log(this.data.number)
    var that = this;
    var type = wx.getStorageSync('type');
    that.setData({
      type: type
    })
     
    //console.log(that.data);
    if (that.data.type == 0) {
      wx.request({
        url: 'http://localhost:8081/WeXinTeacher/teacheraskdetail',
        data: {
          studentId: that.data.number,
        },
        method: 'POST',
        success: function(res) {
          // console.log("requst success:"+JSON.stringify(res.data.studentApplyList));
          console.log(res)
          var util = require("../../utils/util.js");
          var applyData = res.data.studentAskList;
          if (res.data.studentAskState == "ask_sucess") {
            for (var i = 0; i < applyData.length; i++) {
              applyData[i].createTime = util.formatTime(new Date(applyData[i].createTime))
            }
            that.setData({

              applylist: res.data.studentAskList
            })
          } else {

          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (that.data.type==1){
      wx.request({
        url: 'http://localhost:8081/WeXinTeacher/teacherleavedetail',
        data: {
          studentId: that.data.number,
        },
        method: 'POST',
        success: function (res) {
          console.log("requst data:");
          console.log(res)
          var util = require("../../utils/util.js");
          var applyData = res.data.studentLeaveList;
          if (res.data.studentLeaveState == "leave_sucess") {
            for (var i = 0; i < applyData.length; i++) {
              applyData[i].createTime = util.formatTime(new Date(applyData[i].createTime))
            }
            that.setData({
              applylist: res.data.studentLeaveList
            })
          } else {

          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }


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

  readState:function(e){
    var that=this;
    var studentApplyId=e.target.dataset.id
    console.log(studentApplyId)
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherisread',
      data: {id: studentApplyId},
      dataType:JSON,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if(res.data.studentApplyIsRead=="isRead_change"){

        }
        that.onShow();
       
      }
    })

  }



})