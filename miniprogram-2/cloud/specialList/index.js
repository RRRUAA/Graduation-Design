// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event) => {
  try {
    const db = cloud.database()
    // 查询所有包含目标字段的文档
    const res = await db.collection('specialList')
      .field({ // 指定返回字段
        _id: false,
      })
      .get()

    return {
      errCode: 0,
      data: res.data
    }
  } catch (e) {
    return {
      errCode: 1001,
      errMsg: `查询失败：${e.message}`
    }
  }
}