// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storylist: null,
    msg: null,
    msgs: null,
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
    let that = this

    wx.showLoading({
      title: '数据加载中',
    })

    // 发起网络请求
    wx.request({
      url: 'https://route.showapi.com/1700-1',
      data: {
        showapi_appid: 105727,
        showapi_sign: "6b83983dc92b4012ae035b9391e4193f",

      },
      success(res) {
        // console.log(res.data.showapi_res_body.storylist)
        // classify  classifyId

        that.setData({
          storylist: res.data.showapi_res_body.storylist
        })

        wx.hideLoading()
      }
    })

    setInterval(() => {
      let one = Math.floor(Math.random() * (255 - 1 + 1) + 1)
      let two = Math.floor(Math.random() * (255 - 1 + 1) + 1)
      let three = Math.floor(Math.random() * (255 - 1 + 1) + 1)
      that.setData({
        msg: `rgb(${one},${two},${three})`,
        msgs: `rgb(${three},${one},${two})`,
      })
    }, 500);
  },

  list(e) {
    // console.log(e.currentTarget.dataset)
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../list/list?classify=' + data.classify + "&classifyid=" + data.classifyid,
    })
  }



})