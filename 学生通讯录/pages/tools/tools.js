// pages/tools/tools.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'',
    Login:''

  },
  addNew(){
    var p=app.globalData.piority;
     if(p==0){
       app.Nochecked()
     }
     else{
       wx.navigateTo({
         url: '../addinfo/addinfo',
       })
     }
  },
  showModal(e) {
    this.setData({
      str:""
    })
    var content;
    if(e.currentTarget.dataset.id==0){
       content="请输入验证码"
    }
    if(e.currentTarget.dataset.id==1){
      content="请输入修改的验证码"
   }
    this.setData({
      modalName: e.currentTarget.dataset.target,
      Login:content
    })
  },
  hideModal() {
    this.setData({
      modalName: null
    })
  },
  getstring:function(e){
     this.setData({
       str:e.detail.value
     })
  },
  checked:function(){
    if(this.data.str==""){
      wx.showToast({
        title: '输入不能为空',
        icon:'loading'
      })
    }
    else if(this.data.Login=="请输入验证码"){
     app.toLogin(this.data.str);
    var p=app.globalData.piority;
    console.log(p)
    if(p==2){
      this.hideModal();
    }
   }
   else{
     var p=app.globalData.piority;
     if(p==0){
      app.Nochecked()
     }
     else{
     app.globalData.password=this.data.str;
     app.passStore();
     wx.showToast({
       title: '修改成功',
     })
     this.hideModal();
    }
   }
  },
  gotosearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  gosort(){
    wx.navigateTo({
      url: '../sort/sort',
    })
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

  }
})