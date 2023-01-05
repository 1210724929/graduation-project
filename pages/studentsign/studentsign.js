// pages/studentsign/studentsign.js
//将微信经纬度转成腾讯地图的地址

//引入ADC核心类
var QQMapWX=require("../../qqmap-wx-jssdk/qqmap-wx-jssdk.js");
//实例化API 核心类
const wxMap=new QQMapWX({
  key:"QTUBZ-R63KX-H2Y4F-ZK44T-DBWXJ-JPBDS"
});
//调用时间获取当前时间
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   latitude:"",
   longitude:"",
   logintime:'',
   loginaddress:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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



  //经纬度逆解析
  reverseGeocoder(latitude, longitude){
    var that =this
    wxMap.reverseGeocoder({
      location:{
        latitude: latitude,
        longitude: longitude,
      },
      success:function(res){
        //console.log(res);
        var time=util.formatTime(new Date());
        that.setData({
          loginaddress: res.result.address,
          logintime:time
        })
      },
      fail:function(res){
        console.log(res);
      }
    });
  },
  //获取位置
  getSignIn:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          latitude:latitude,
          longitude:longitude
        })
        that.reverseGeocoder(latitude, longitude);
      }
    })
  },
  //获取位置后签到
  signIn:function(){
    var that=this;
    if(that.data.latitude==""){
      wx.showModal({
        title: '提示',
        content: '请先获取位置',
      })
    }else{
      //console.log("成功")
     // console.log(wx.getStorageSync('userLoginId'))
      wx.request({
        url: 'http://localhost:8081/WeXinStudentSignIn/studentSignIn',
        data:{
          studentId: wx.getStorageSync('userLoginId'),
          longitude: that.data.longitude,
          latitude: that.data.latitude,
          isSignin:1,
          city: that.data.loginaddress,
        },
        dataType: 'json',
        method:"post",
        success:function(res){
          console.log(res)
          var content = '签到失败';
          if(res.data.siginInsertState=="insert_sucess"){
             content = '签到成功';
          } else if (res.data.siginUpdateState =="update_sucess"){
            content = '签到更新成功';
          }
          wx.showModal({
            title: '提示',
            content: content,
          })
        }
      })
    }
  }

      
})


