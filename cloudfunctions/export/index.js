// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('account').where({
    openid: wxContext.OPENID
  }).get()
  try {
    let row = ["日期", "大类", "小类", "备注", "金额"]
    // const date = new Date()
    // const dateStr = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate()
    let dataFile = "account_" + Date.now() + ".xlsx"
    let allData = [row]
    if (res.data && res.data.length > 0) {
      const records = res.data[0].records
      for (const year in records) {
        for (const month in records[year]) {
          for (const day in records[year][month]) {
            for (const detailData of records[year][month][day]) {
              const timeStr = year + '-' + month + '-' + day
              const obj = [timeStr, detailData.type === "1" ? '支出' : '收入', detailData.text, detailData.remark, detailData.money]
              allData.push(obj)
            }
          }
        }
      }

      let buffer = await xlsx.build([{
        name: '记账明细数据',
        data: allData
      }])
      return await cloud.uploadFile({
        cloudPath: dataFile,
        fileContent: buffer
      })
    }

  } catch (err) {
    console.log(err)
    return err
  }
}