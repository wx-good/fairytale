// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    nickName:"",
    page: 1,
    classifyid:"",
  },

  detail(e) {
    // console.log(e.currentTarget.dataset)
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/detail?id=' + data.id + "&title=" + data.title
    })
  },
  // 滚动事件监听
  onPageScroll(e) {
    // console.log(e)  
    let page = this.data.page;
    if (e.scrollTop >= 2986 + (page - 1) * 3550) {

      //获取新的数据
      this.data.page++;

      this.setData({
        page: this.data.page
      })

      this.getStorysList()

    }
  

    
  },
  getStorysList(){
    // 发起网络请求
    let that = this
    let page = that.data.page
    let classifyid = that.data.classifyid
    wx.showLoading({
      title: '数据加载中',
    })

    wx.request({
      url: 'https://route.showapi.com/1700-2',
      data: {
        showapi_appid: 105727,
        showapi_sign: "6b83983dc92b4012ae035b9391e4193f",
        classifyId: classifyid,
        page,

      },
      success(res) {
        console.log(res.data.showapi_res_body.contentlist)
        let list = that.data.list.concat(res.data.showapi_res_body.contentlist)
        that.setData({
          list
        })
       console.log(that.data.list)
        console.log(that.data.classifyid)

        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
  // 判断是否登录
    let nickName = wx.getStorageSync("nickName") || ""


    this.setData({
      nickName,
      classifyid: options.classifyid
    })
    // 更改头部标题
    wx.setNavigationBarTitle({
      title: options.classify
    })

    this.getStorysList()
    

    
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


})