// pages/teacherscanask/teacherscanask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentLeave: [
      { name: '张三', college: '计算机学院', magor: '物联网', class: '2015.2' },
      { name: '历史', college: '人文学院', magor: '韩语', class: '2015.4' },
    ],
    studentList:{},
    //为0请假，1为留校
    type:0,

    suseCollegeList: '',
    suseCollegeChoose: 5,
    suseMajorList: '',
    suseMajorChoose: 5,
    suseGradeList: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    suseGradeChoose: '',
    suseClassesList: ["1", "2", "3", "4", "5", "6", "7"],
    suseClassesChoose: '' 
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.setStorageSync('teacherASk', this.data.type);
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
        if (res.data.collegeState == "college_sucess") {
          that.setData({
            suseCollegeList: res.data.collegeList
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
    
  },


  /**页面下页面的跳转 */
  teacherdetail:function(e){
   // console.log(e)
    wx.setStorageSync("type", 0)
   // console.log(wx.getStorageSync("type"))
    var number=e.target.dataset.number
    wx.navigateTo({
      url: '../teacherscandetail/teacherscandetail?number=' + number,
    })
   },

   teacherscanleave:function(e){
     wx.redirectTo({
       url: '../teacherscanleave/teacherscanleave?type=1',
     })
   },

  teacherscanask:function(e){
    wx.redirectTo({
      url: '../teacherscanask/teacherscanask?type=0',
    })
  },

  teacherscansign: function (e) {
    wx.redirectTo({
      url: '../teacherscansign/teacherscansign',
    })
  },
  signInDetail:function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherasklistselect2',
      data: {},
      method: 'post',
      success: function (res) {
        console.log(res);
        if (res.data.studentState == "select_sucess") {
          that.setData({
            studentList: res.data.studentList,
          })
        } else {

        }

      }
    })
  },
  /**根据条件查询，将条件传到后台*/
  signInSelect: function (e) {
    //console.log(e.detail.value)
    var that = this;
    wx.request({
      url: 'http://localhost:8081/WeXinTeacher/teacherasklistselect',
      data: e.detail.value,
      method: 'post',
      success: function (res) {
        //console.log(res)
        if (res.data.studentState == "select_sucess") {
          that.setData({
            studentList: res.data.studentList
          })
        }else{
          that.setData({
            studentList: ''
          })
        }
      }
    })
  },
  /**查询条件的相关操作 */
  collegeChoose: function (e) {
    //console.log(e.detail)
    this.setData({
      suseCollegeChoose: e.detail.value
    })

    var that = this;
    //console.log(that.data.suseCollegeList[that.data.suseCollegeChoose].college)
    wx.request({
      url: 'http://localhost:8081/WeXinCollegeService/susemajorlist',
      data: { college: that.data.suseCollegeList[that.data.suseCollegeChoose].college },
      method: 'post',
      success: function (res) {
        // console.log(res)
        if (res.data.majorState == "major_sucess") {
          that.setData({
            suseMajorList: res.data.majorList,
            suseMajorChoose: 0
          })
        } 
      }
    })
  },
  majorChoose: function (e) {
    this.setData({
      suseMajorChoose: e.detail.value
    })
  },
  gradeChoose: function (e) {
    this.setData({
      suseGradeChoose: e.detail.value
    })
  },
  classesChoose: function (e) {
    this.setData({
      suseClassesChoose: e.detail.value
    })
  },

})