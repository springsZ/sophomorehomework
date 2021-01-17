// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    records:[],
    srecords:[],
    indexArray:[],
    info:''
  },
  getinfo(e){
    this.setData({
       info:e.detail.value
    })
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
    var index=this.data.indexArray[current];
    this.data.srecords.splice(current,1);
    this.data.records.splice(index,1);
    var t=this.data.records;
    var st=this.data.srecords;
    this.setData({
      records:t,
      srecords:st
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

  search(){
     var info=this.data.info;
     this.setData({
       srecords:[],
       indexArray:[]
     })
     if(info==""){
       wx.showToast({
         title: '内容不能为空',
       })
     }
     else if(isNaN(info)){
       var i=0;
       var l=this.data.records.length;
       for(;i<l;i++){
         if(this.data.records[i].name.indexOf(info)!=-1){
           this.data.indexArray.push(i);
           var p=this.data.indexArray;
           this.setData({
             indexArray:p
           })
         }
       }
       if(this.data.indexArray.length==0){
         wx.showToast({
           title: '未查询到相关学生信息',
           icon:'none'
         })
       }
       else{
        for(var i=0;i<this.data.indexArray.length;i++){
          this.data.srecords.push(this.data.records[this.data.indexArray[i]]);
          var t=this.data.srecords;
          this.setData({
            srecords:t
          })
        }
       }

     }
     else{
      var i=0;
      var l=this.data.records.length;
      for(;i<l;i++){
        if(this.data.records[i].id.indexOf(info)!=-1){
          this.data.indexArray.push(i);
          var p=this.data.indexArray;
          this.setData({
            indexArray:p
          })
        }
      }
      if(this.data.indexArray.length==0){
        wx.showToast({
          title: '未查询到相关学生信息',
          icon:'none'
        })
      }
      else{
       for(var i=0;i<this.data.indexArray.length;i++){
         this.data.srecords.push(this.data.records[this.data.indexArray[i]]);
         var t=this.data.srecords;
         this.setData({
           srecords:t
         })
       }
      }

     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      records:app.globalData.records
    })
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
    this.setData({
      records:app.globalData.records
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      records:app.globalData.records,
      srecords:[],
      indexArray:[],
    })
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