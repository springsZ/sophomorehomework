// pages/addinfo/addinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:1,//1为新增，2为修改
    topic:"",
    op:{},
    records:[],
    date: '请选择',
    region: ['江苏省', '徐州市', '铜山区'],
    picker1:['男','女'],
    sex:'请选择',
    picker2:['计算机科学与技术','信息安全','信息科学','大数据科学与技术'],
    department:"请选择",
    name:'',
    id:'',
    age:'',
    phone:'',
    mail:''

  },

  checktopic:function(){
   var arr = Object.keys(this.data.op);
    
     if(arr.length == 0){
       this.setData({
         topic:"新增学生信息"
       })
     }
     else{
       var index=parseInt(this.data.op.current) ;//跨页面参数是字符串，需要转数字
       console.log(index);
       var id=this.data.op.id;
       var item;
       if(app.globalData.indexArray.length!=0){
          item=this.data.records[app.globalData.indexArray[index]];
       }
       else item=this.data.records[index];
       console.log(item);
       this.setData({
         status:2,
         topic:'修改学生信息',
         id:item.id,
         name:item.name,
         sex:item.sex,
         age:item.age,
         date:item.birthday,
         region:item.address,
         department:item.department,
         mail:item.mail,
         phone:item.phone

       })
     }
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  PickerChange1(e) {
    console.log(e);
    this.setData({
      sex: this.data.picker1[e.detail.value]
    })
  },
  PickerChange2(e) {
    console.log(e);
    this.setData({
      department: this.data.picker2[e.detail.value]
    })
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getId(e){
    this.setData({
      id:e.detail.value
    })
  },
  getAge(e){
    this.setData({
      age:e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getMail(e){
    this.setData({
      mail:e.detail.value
    })
  },
  submit(){
    if(this.data.name==""||this.data.id==""||this.data.age==""||this.data.phone==""||this.data.mail==""){
      wx.showToast({
        title: '请检查是否有内容为空',
        icon:'none'
      })
    }
    else{
      var item={};
      item.name=this.data.name;
      item.age=this.data.age;
      item.id=this.data.id;
      item.sex=this.data.sex;
      item.birthday=this.data.date;
      item.phone=this.data.phone;
      item.address=this.data.region;
      item.mail=this.data.mail;
      item.department=this.data.department;
      console.log(item)
      if(this.data.status=="1"){
        var l=this.data.records.length;
        var i=0;
        for(;i<l;i++){
          if(this.data.records[i].id==item.id){
            break;
          }
        }
        if(i==l){
          this.data.records.push(item);
          var temp=this.data.records;
          this.setData({
            records:temp
          })
        app.globalData.records=this.data.records;
        app.setStore();
        wx.showToast({
          title: '新建成功',
        })
        }
        else{
          wx.showToast({
            title: '新建失败，当前学生已存在！',
            icon:"none"
          })
        }
       
      }
      else{
        var index;
        if(app.globalData.indexArray.length!=0){
          index=app.globalData.indexArray[this.data.op.current]
        }
        else index=this.data.op.current;
        this.data.records[index]=item;
        var temp=this.data.records;
        this.setData({
          records:temp
        })
        app.globalData.records=this.data.records;
        app.setStore();
        wx.showToast({
          title: '修改成功',
        })
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
     
      this.setData({
         op:options
      })
      console.log(options)
      this.checktopic();
      
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