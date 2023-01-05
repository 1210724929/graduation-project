// pages/register/register.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regItem: [{
        name: '姓名：',
        str: '真实姓名',
        focus: 'true'
      },
      {
        name: '学号：',
        str: ''
      },
      {
        name: '电话号码：',
        str: ''
      },
      {
        name: '密码：',
        str: ''
      },
      {
        name: '确认秘密：'
      },
      {
        name: "身份"
      }
    ],
    studentdisplay: true,
    studentItem: [{
        name: '学院',
        str: '计算机学院'
      },
      {
        name: '专业',
        str: '物联网工程'
      },
      {
        name: '年级',
        str: '2015.2'
      },
      {
        name: '班级',
        str: '2015.2'
      },
    ],
    array: ['学生', '辅导员', '宿舍管理员'],
    index: '0',

    suseCollegeList: '',
    suseCollegeChoose: 5,
    suseMajorList: '',
    suseMajorChoose: 5,
    suseGradeList: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    suseGradeChoose: '2',
    suseClassesList: ["1", "2", "3", "4", "5", "6", "7"],
    suseClassesChoose: '0' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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


  register: function(e) {
    console.log(e.detail.value);
    var url= null ;
    if(e.detail.value.type==0){
      url = "http://localhost:8081/wexinUser/registerStudent";
    }else if(e.detail.value.type==1){
      url = "http://localhost:8081/wexinUser/registerTeacher";
    }else if(e.detail.value.type==2){
      url = "http://localhost:8081/wexinUser/registerHousemaster";
    }
    /**非空判断 */
    var registData=e.detail.value;
    if (registData.naem == '' || registData.number == '' || registData.phone == '' || registData.password==''){
      wx.showModal({
            title: '提示',
            content: "内容不能为空",
          })
    }else{
      wx.request({
        url: url,
        data: e.detail.value,
        dataType: 'json',
        method: 'POST',
        success: function (res) {
          //console.log("requst success");
        //  console.log("return data=" + res.data.registerFlag);
          if (res.data.registerFlag == 0) {
            var content = '注册失败,账号已注册'
            wx.showModal({
              title: '提示',
              content: content,
            })
          } else if (res.data.registerFlag == 1) {
            // console.log("成果能够")
            wx.switchTab({
              url: '/pages/login/login',
            })
          }

        },
        fail: function () {
          console.log("requst fail");
        },
        complete: function () {
          
        }
      })
    }
   
  },

  bindPickerChange: function(e) {
   // console.log(e.detail.value)
    if (e.detail.value == 0) {
      this.setData({
        index: e.detail.value,
        studentdisplay: true
      })
        //console.log("展示")
    } else {
      this.setData({
        index: e.detail.value,
        studentdisplay: false
      })
     // console.log("展2示")
    }
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
  //手机账号格式测试
  radioChange: function (e) {
    // console.log(this.data.accountcheck)
    //console.log(e.detail.value)
    if (e.detail.value != "0") {
      if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.accountcheck))) {
        wx.showToast({
          title: '手机号码有误',
          duration: 1000,
          icon: 'none'
        });
      }
    }

  }
})