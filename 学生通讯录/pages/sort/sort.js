// pages/sort/sort.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort:"请选择",
    picker1:['专业','性别','家庭住址'],
    dpicker:['计算机科学与技术','信息安全','信息科学','大数据科学与技术'],
    spicker:['男','女'],
    sindex:-1,
    class:"请选择",
    content:"请选择",
    region: ['江苏省', '徐州市', '铜山区'],
    records:[],
    srecords:[],
    indexArray:[],

  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
    this.getSort();
  },
  PickerChange1(e) {
    console.log(e);
    this.setData({
      class: this.data.picker1[e.detail.value],
      sindex:e.detail.value,
      content:"请选择"
    })
   
  },
  dPickerChange(e) {
    console.log(e);
    this.setData({
      content: this.data.dpicker[e.detail.value]
    })
    this.getSort();
  },
  sPickerChange(e) {
    console.log(e);
    this.setData({
      content: this.data.spicker[e.detail.value]
    })
    this.getSort();
  },
  getSort(){
    this.setData({
      srecords:[],
      indexArray:[]
    })
     if(this.data.sindex==0)
     {
       var i=0;
       var l=this.data.records.length;
       for(;i<l;i++){
         if(this.data.records[i].department==this.data.content){
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
     else if(this.data.sindex==1){
      var i=0;
      var l=this.data.records.length;
      for(;i<l;i++){
        if(this.data.records[i].sex==this.data.content){
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
        if(this.isRegion(i)){
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
     app.globalData.indexArray=this.data.indexArray;
     console.log(app.globalData.indexArray)
     wx.navigateTo({
       url: '../addinfo/addinfo?id='+id+'&current='+current
     })
    }
 },
  isRegion(i){
    var j=0
    for(;j<this.data.region.length;j++){
      if(this.data.records[i].address[j]!=this.data.region[j])
      {
        break;
      }
    }
    return j==3?true:false;
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
        sort:"请选择",
        picker1:['专业','性别','家庭住址'],
        dpicker:['计算机科学与技术','信息安全','信息科学','大数据科学与技术'],
        spicker:['男','女'],
        sindex:-1,
        class:"请选择",
        content:"请选择",
        region: ['江苏省', '徐州市', '铜山区'],
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