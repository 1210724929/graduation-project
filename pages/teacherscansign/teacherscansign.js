// pages/teacherscansign/teacherscansign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studenteTest: [
      { name: '张三', college: '计算机学院', magor: '物联网', class: '2015.2' },
      { name: '历史', college: '人文学院', magor: '韩语', class: '2015.4' },
    ],
    studentList:{},
    onShow:0,
    signInTotal:'',
    studentTotal:'',
    signInByCondition:'',
    studentByCondition:'',

    suseCollegeList:["计算机","法学院"],
    suseCollegeChoose:5,
    suseMajorList:["物联网","电商"],
    suseMajorChoose:5,
    suseGradeList: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    suseGradeChoose:'',
    suseClassesList: ["1", "2", "3", "4", "5", "6", "7"],
    suseClassesChoose:'' 
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
    var that = this;
    wx.request({
      url: 'http://localhost:8081/WeXinCollegeService/susecollegelist',
      data: {},
      method: 'post',
      success: function (res) {
        //console.log(res)
        if (res.data.collegeState == "college_sucess"){ 
          that.setData({
            suseCollegeList:res.data.collegeList
          })
        }
        /*查询学院对应的专业*/ 
        wx.request({
          url: 'http://localhost:8081/WeXinCollegeService/susemajorlist',
          data: { college: that.data.suseCollegeList[that.data.suseCollegeChoose].college },
          method: 'post',
          success: function (res) {
           // console.log(res)
            if (res.data.majorState == "major_sucess") {
              that.setData({
                suseMajorList: res.data.majorList
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherselecttotal',
      data:{},
      method:'post',
      success:function(res){
        //console.log(res)
        if (res.data.studentSignInState == "stusignselect_success" && res.data.studentState == "stuselect_success"){
          that.setData({
            signInTotal: res.data.signInTotal,
            studentTotal: res.data.studentTotal  

          })
        } else if (res.data.studentSignInState == "stusignselect_fail" && res.data.studentState == "stuselect_success"){
          that.setData({
            signInTotal:0,
            studentTotal: res.data.studentTotal
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
  SignIndetail:function(e){
    var number = e.target.dataset.number
    //console.log(number)
    wx.navigateTo({
      url: '../teacherscansigndetail/teacherscansigndetail?number=' + number,
    })
  },


  teacherscanleave: function (e) {
    wx.redirectTo({
      url: '../teacherscanleave/teacherscanleave',
    })
  },

  teacherscanask: function (e) {
    wx.redirectTo({
      url: '../teacherscanask/teacherscanask',
    })
  },

  teacherscansign: function (e) {
    wx.redirectTo({
      url: '../teacherscansign/teacherscansign',
    })
  },

  //点击查看详情
  signInDetail:function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherasklistselect',
      data: {},
      method: 'post',
      success: function (res) {
        //console.log(res);
        if (res.data.studentState == "select_sucess") {
          that.setData({
            studentList: res.data.studentList,
            onShow:1
          })
        } else {
        }
      }
    })
  },

  //根据条件查询
  signInSelect:function(e){
    //console.log(e.detail.value)
    var that=this;
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherselectbycondition',
      data:e.detail.value,
      method:'post',
      success:function(res){
       // console.log(res)
        if (res.data.studentState == "select_sucess"){
          that.setData({
            signInByCondition:res.data.signInTotal,
            studentByCondition:res.data.studentTotal
            
          })
        }
      }
    })
  },

  /**查询条件的相关操作 */
  collegeChoose:function(e){
    //console.log(e.detail)
    this.setData({
      suseCollegeChoose:e.detail.value
    })
    
    var that = this;
    //console.log(that.data.suseCollegeList[that.data.suseCollegeChoose].college)
    wx.request({
      url: 'http://localhost:8081/WeXinCollegeService/susemajorlist',
      data: { college: that.data.suseCollegeList[that.data.suseCollegeChoose].college},
      method: 'post',
      success: function (res) {
       // console.log(res)
        if (res.data.majorState == "major_sucess") {
          that.setData({
            suseMajorList: res.data.majorList,
            suseMajorChoose:0
          })
        }
      }
    })
  },
  majorChoose:function(e){
    this.setData({
      suseMajorChoose: e.detail.value
    })
  },
  gradeChoose:function(e){
    this.setData({
      suseGradeChoose: e.detail.value
    })
  },
  classesChoose:function(e){
    this.setData({
      suseClassesChoose: e.detail.value
    })
  },

})