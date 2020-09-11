const app = getApp()

Page({
  data: {
    text: '',
    paramList: []
  },
  onLoad: function () {

  },
  handleInput(e) {
    this.setData({
      text: e.detail.value
    })
  },
  handleSearch() {
    if(this.data.text==""){
      wx.showModal({
        title:"请输入查询地址",
        showCancel:false
      })
    }
    else(
    wx.request({
      url: 'http://gjzwfw.www.gov.cn/fwmh/healthCode/getNucleic.do',
      data: `regionCode=00&keyword=${this.data.text}&pagenum=1&pagesize=100000`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        this.setData({
          paramList: res.data.params.data
        })
      }
    }))
  },
  handleClick(e) {
    const {
      dataset: {
        name,
        address,
        iid,
        orgPhone
      }
    } = e.currentTarget
    this.setData({
      name,
      address,
      iid,
      orgPhone
    })
  }
})