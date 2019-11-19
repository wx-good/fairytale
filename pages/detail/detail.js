// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 头部标题
    wx.setNavigationBarTitle({
      title: options.title
    })

    this.setData({
      id: options.id
    })

    let that = this
    let id = that.data.id;
    wx.showLoading({
      title: '数据加载中',
    })

    // 发起网络请求
    wx.request({
      url: 'https://route.showapi.com/1700-3',
      data: {
        showapi_appid: 105727,
        showapi_sign: "6b83983dc92b4012ae035b9391e4193f",
        id: options.id

      },
      success(res) {
        // console.log(res.data.showapi_res_body)

        let nickName = wx.getStorageSync('nickName') || ""

        if (nickName) {
          //做缓存操作

          //判断当前用户 ，是否访问过当前故事，如果有，不做操作，没有，插入即可
          //当前是所有的缓存 
          let storys = wx.getStorageSync('storys') || []

          if (storys.length) {
            //有缓存

            //　nickName = Azwd
            //1.获取当前用户下面的缓存

            let myInfo = storys.filter((item, index) => {
              return item.nickName == nickName
            })

            // 2.判断myInfo内是否有访问过当前故事

            // 通过当前故事id，判断缓存内是否存在当前id的故事信息
            let myDetailIndex = myInfo.findIndex((item, index) => {
              return item.id == id;
            })

            if (myDetailIndex == -1) {
              //没有，进行缓存

              // console.log('不存在')

              let data = res.data.showapi_res_body;
              data['nickName'] = nickName
              storys.push(data)  // 故事id
              wx.setStorageSync("storys", storys)

            }

            // console.log("abcd")


          } else {
            // 没有缓存，设置缓存

            let data = res.data.showapi_res_body;
            data['nickName'] = nickName

            storys.push(data)  // 故事id

            // storys['nickName'] = nickName


            // console.log(storys,"1234567890")
            wx.setStorageSync("storys", storys)

          }



        }

        that.setData({
          detail: res.data.showapi_res_body
        })

        wx.hideLoading()
      }
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