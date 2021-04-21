

export const getTime = (time) => {
  console.log(time)
  let minutes = parseInt(time / 60)
  let seconds = time % 60
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds
}

// 检测模块数据是否存在
export const checkModel = (modelArr, dataArr) => {
  console.log(modelArr)
  console.log(dataArr)
  let checkArr = {}
  modelArr.map((item) => {
    const index = dataArr.indexOf(item)
    if (index >= 0) {
      checkArr[item] = true
    } else {
      checkArr[item] = false
    }
  })
  console.log(checkArr)
}