// pages/userdetail/userdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetailItemList:[
      {name: '账号'},
      {name: '性别'},
      {name: '学院'},
      {name: '专业'}
    ],
    userDetailItem:{
      account: '1210724929',
      gender: '男',
      college: '计算机学院' ,
      margin: '物联网工程' 
    },   
    userFunItem:[
      {name:'篮球'},
      { name: '羽毛球' },
      { name: '旅游' },
      { name: '唱歌' },
      { name: '看书' },
    ],
    imageList: ["/image/297296_300.jpg ",
                "/image/269254_300.jpg",
                "/image/320215_300.jpg"
                ],
    
    matchHabbyList:{},
    studentDetail:{}

  },

  chooseImage:function(){
    var that=this;
    wx.chooseImage({
      count:6,
      success: function(res) {
       // console.log(res)
        that.setData({
          imageList:res.tempFilePaths
        })
      },
    })
  },
  previewImage:function(e){
    var current=e.target.dataset.src
    wx.previewImage({
      current:current,
      urls: this.data.imageList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatch/studentDetail',
      data: { number: wx.getStorageSync('userLoginId') },
      method: 'post',
      success: function (res) {
      //  console.log(res)
        that.setData({
          studentDetail: res.data.studentDetail
        })
      }
    })

  },
  onShow:function(){
    var that = this

    wx.request({
      url: 'http://localhost:8081/WeXinStudentMatch/habbyselect',
      data: { studentId: wx.getStorageSync('userLoginId') },
      method: 'post',
      success: function (res) {
        // console.log(res)
        that.setData({
          matchHabbyList: res.data.studentMatch
        })
      }
    })
  },
  userdetailoperation:function(){
    wx.navigateTo({
      url: '../userdetailoperation/userdetailoperation',
    })
  },
  userMessage:function(){
    wx.redirectTo({
      url: '../usermatchfriendmessage/usermatchfriendmessage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  
})