const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[
      {
        id:"08192798",
        name:"张晨春",
        sex:"男",
        age:19,
        birthday:"2020-03-25",
        phone:"1916250520",
        address:"江苏省",
        mail:"1484371877@qq.com",
        department:"计算机科学与技术"

      },
      {
        id:"08192801",
        name:"李芳晨",
        sex:"男",
        age:19,
        birthday:"2020-03-25",
        phone:"15939780316",
        address:"江苏省",
        mail:"1484371877@corgi.com",
        department:"计算机科学与技术"

      },
      {
        id:"08192788",
        name:"张晨春",
        sex:"男",
        age:19,
        birthday:"2020-03-25",
        phone:"1916250520",
        address:"江苏省",
        mail:"1484371877@qq.com",
        department:"计算机科学与技术"

      },
      {
        id:"08192794",
        name:"张晨春",
        sex:"男",
        age:19,
        birthday:"2020-03-25",
        phone:"1916250520",
        address:"江苏省",
        mail:"1484371877@qq.com",
        department:"计算机科学与技术"

      }
    ]
    
  },
  change:function(e){
     var p=app.globalData.piority;
     if(p==0){
       app.Nochecked()
     }
     else{
      var id=e.currentTarget.dataset.id;
      var current=e.currentTarget.dataset.index;
      console.log(id);
      console.log(current);
      app.globalData.indexArray=[];
      console.log(app.globalData.indexArray);
      wx.navigateTo({
        url: '../addinfo/addinfo?id='+id+'&current='+current,
      })
     }

  },
  delete:function(e){
    var p=app.globalData.piority;
     if(p==0){
       app.Nochecked()
     }
     else{
      var current=e.currentTarget.dataset.index;
      this.data.records.splice(current,1);
      var t=this.data.records;
      this.setData({
        records:t
      })
      app.globalData.records=this.data.records;
      app.setStore();
      wx.showToast({
        title: '删除成功',
      })
     }
  },
  makecall:function(e){
    var phone=e.currentTarget.dataset.phone
         wx.makePhoneCall({
           phoneNumber: phone
         })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getStore().then((res)=>{
      this.setData({
        records:app.globalData.records
      })
    }).catch((res)=>{
      console.log("error")
    });
    
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
    app.getStore().then((res)=>{
      this.setData({
        records:app.globalData.records
      })
    }).catch((res)=>{
      console.log("error")
    });
    app.passGet();
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