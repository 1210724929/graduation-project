// pages/studentapplyoperation/studentapplyoperation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLoginId:'',
    id:'',
    // applyId:'',
    // applyType:"留校",
    // applyText:"（深宫高阁，清楼里女主人公玉妃，依栏杆而眺望。放眼一下，这繁华的街道，灯红酒绿……霜色珀泪暗暗地流下，泪淌下，将嘴角的朱红浸润。此刻她才发现，这繁华富贵，轻罗裳衣……这一切不过就是浮云、过眼云烟。曾经进入宫殿时这遥远的沧桑之音，现在才终于领悟。她拿起了随身带进宫里的青色牧笛，朱红泪，滑尽了这支牧笛。音凄惨犹如寒冬呼啸，犹如瑟瑟冽秋……她回忆着，在溪水流淌旁，吹笛的少年。回忆着，在花落过"

    applylist: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this;
    // this.setData({
    //   applyId:options.applyId
    // });
    // if(options.applyId==undefined){
    //   return;
    // }
    // wx.request({
    //   url: '',
    //   data:{"applyId":options.applyId},
    //   method:'GET',
    //   success:function(res){
    //     var area=res.data.area;
    //     if(1){}
    //   }
    // })
    this.setData({
      userLoginId: wx.getStorageSync('userLoginId'),
      id: options.applyid
    })
   // console.log("url传值，及通过url传值查询数据库")
   // console.log(options);
    var applyid = options.applyid;
    var that=this;
    //区分是修改还是创建，根据有没有参数传递
    if (options.applyid!=null){
      wx.request({
        url:'http://localhost:8081/WexinStudentApply/applylistitem',
        data: {id:applyid},
        dataType: 'json',
        method: 'POST',
        success:function(res){
         // console.log(res.data.studentApplyItem)
          that.setData({
            applylist: res.data.studentApplyItem
          })
        }
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      userLoginId: wx.getStorageSync('userLoginId')
    })
    //console.log(options)
    
    
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
  //申请信息
  formSubmit:function(e){
    var that=this;
    var formData = e.detail.value;
    console.log(formData);
    if (that.data.id != null){
      //修改
      var url = 'http://localhost:8081/WexinStudentApply/applylistupdate'
    }else{
        //创建
      var url = 'http://localhost:8081/WexinStudentApply/applylist'
    }
    console.log("访问地址："+url)
    wx.request({
      url: url,
      data: JSON.stringify(formData), 
      dataType: 'json',
      method: 'POST',
      success: function(res) {
        console.log("requst success");
        console.log("return data=" + res.data.insetApplyState);
        console.log("return data=" + res.data.updateApplyState);
        wx.redirectTo({
          url: '../studentapply/studentapply',
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})