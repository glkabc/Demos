export const Tools = {
    error: function(obj, result) {
      const tips = this.errorHandle(result)
      obj.$message.error(tips)
    },
    errorHandle: function(result) {
      let tips = '无法完成指定的操作，无法提供信息'
      // let obj = {}
      if (result.message && typeof result.message === 'string') {
        tips = ''
        tips = result.message
      }
      if (result.message && typeof result.message === 'object') {
        tips = this.errorHandleForEachObject(result.message)
      }
      if (result.errors && typeof result.errors === 'object') {
        tips = this.errorHandleForEachObject(result.errors)
      }
      // tips = tips.substr(0, tips.length - 2)
      return tips
    },
    errorHandleForEachObject: function(obj) {
      let tip = ''
      for (const item in obj) {
        tip = tip + obj[item].join(',') + '☆'
      }
      return tip
    },
    success: function(obj, info) {
      obj.$message.success(info)
    },
    errorTips: function(obj, info) {
      obj.$message.error(info)
    }
  }
  