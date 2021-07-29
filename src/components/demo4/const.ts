// 判断是否五连
export function checkState (x: number, y: number, list: number[][]): number {
  const master = list[x][y]
  let count = 1

  /** 左->右 方向 */
  for (let i = x + 1; i < x + 5; i++) {
    if (list[i][y] === master) {
      count++
    } else {
      break
    }
  }
  for (let i = x - 1; i > x - 5; i--) {
    if (list[i][y] === master) {
      count++
    } else {
      break
    }
  }
  if (count >= 5) {
    return master
  } else {
    count = 1
  }

  /** 上->下 方向 */
  for (let i = y + 1; i < y + 5; i++) {
    if (list[x][i] === master) {
      count++
    } else {
      break
    }
  }
  for (let i = y - 1; i > y - 5; i--) {
    if (list[x][i] === master) {
      count++
    } else {
      break
    }
  }
  if (count >= 5) {
    return master
  } else {
    count = 1
  }

  /** 左上->右下 方向 */
  for (let i = x + 1, j = y + 1; i < x + 5; i++, j++) {
    if (list[i][j] === master) {
      count++
    } else {
      break
    }
  }
  for (let i = x - 1, j = y - 1; i > x - 5; i--, j--) {
    if (list[i][j] === master) {
      count++
    } else {
      break
    }
  }
  if (count >= 5) {
    return master
  } else {
    count = 1
  }

  /** 左下->右上 方向 */
  for (let i = x + 1, j = y - 1; i < x + 5; i++, j--) {
    if (list[i][j] === master) {
      count++
    } else {
      break
    }
  }
  for (let i = x - 1, j = y + 1; i > x - 5; i--, j++) {
    if (list[i][j] === master) {
      count++
    } else {
      break
    }
  }
  if (count >= 5) {
    return master
  } else {
    count = 1
  }

  return 0
}