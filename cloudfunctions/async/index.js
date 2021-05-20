// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const res = await db.collection('account').where({
    openid: wxContext.OPENID
  }).get()
  let result;
  if (res.data) {
    result = await db.collection('account').where({
      openid: wxContext.OPENID
    }).update({
      data: event
    })
  } else {
    let params = {
      openid: wxContext.OPENID,
      ...event
    }
    result = await db.collection('account').add({
      data: params
    })
  }
  if (result.stats.updated > 0 || result._id) {
    let findList = await db.collection('account').where({openid:wxContext.OPENID}).get()
    return {
      err: '',
      data: findList.data,
      code: 200
    }
  }
  else return {
    err: '更新失败',
    code: 500
  }

}