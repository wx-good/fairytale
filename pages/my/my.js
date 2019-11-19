// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff: true,
    storys:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 先去获取用户信息，根据结果，判断当前是否登录  nickName

    let nickName = wx.getStorageSync('nickName') || "";
    let that = this;
    if (nickName) {
      //已经授权【显示的是 用户的缓存信息】

      that.getStorys()

      // // console.log(storys)
      that.setData({
          // storys
        onoff:false

      })

    } else {
      //没有授权【显示的是 登录按钮】

      wx.showToast({
        title: '请登录',
        duration: 2000,
        icon:"loading",
        success(res) {
          that.setData({
            onoff:true
          })
        }
      })


    }
  },

  // 获取当前用户缓存的方法
  getStorys() {
    // 1.获取条件
    let nickName = wx.getStorageSync('nickName')

    let allStorys = wx.getStorageSync('storys')

    let storys = allStorys.filter((item, index) => {
      return item.nickName == nickName
    })

    this.setData({
      storys,
    })
    console.log(this.data.storys)
  },

  // 点击登录
  getuserinfo(e) {
    console.log(e)


    if (e.detail.userInfo.nickName) {
      //授权  avatarUrl 头像
      wx.setStorageSync("nickName", e.detail.userInfo.nickName)
      wx.showToast({
        title: '登录成功',
        duration: 2000
      })

      this.setData({
        onoff: false
      })
    }


    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       console.log(res,11111111111)

    //     } else {
    //       console.log('登录失败！')
    //     }
    //   }
    // })

  },

  goToDetail(e) {
    //跳转到当前故事的详情页面

    let { id, title } = e.currentTarget.dataset;

    console.log(id, title)

    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + "&title=" + title,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})