//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    records:[],
    piority:0,
    password:"z010325",
    indexArray:[],
  },
  
    Nochecked:function(){
      wx.showToast({
        title: '请先验证身份',
        icon:'loading'
      })
    },
    toLogin:function(str){
      if(this.globalData.password==str){
        this.globalData.piority=2;
        wx.showToast({
          title: '登陆成功'
        })
      }
      else{
        this.globalData.piority=0;
        wx.showToast({
          title: '身份验证错误',
          icon:'loading'
        })
      }

      
    },
    passStore(){
      wx.setStorage({
        data: this.globalData.password,
        key: 'password'
      })
    },
    passGet(){
      var that=this;
      wx.getStorage({
        key: 'password',
        success(res){
          that.globalData.password=res.data;
          console.log(that.globalData.password);
        },
       
      })
    },
    setStore(){
      wx.setStorage({
        data: this.globalData.records,
        key: 'records'
      })
    },
    getStore(){
      var that=this;
      return new Promise(function (resolve, reject) {
        
      
      wx.getStorage({
        key: 'records',
        success(res){
          that.globalData.records=res.data
          console.log(that.globalData.records);
          resolve(res.data)
        },
        fail(res){
          reject(res)
        }
      })
    })

    }
  
})