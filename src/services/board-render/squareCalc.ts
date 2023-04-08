type SquareProps = {
  id: string
  color: string
}

export function squareCalc() {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const nums = ["8", "7", "6", "5", "4", "3", "2", "1"]
  const boardList: string[] = []

  nums.forEach(num => {
    letters.forEach(letter => {
      boardList.push(`${letter}${num}`)
    })
  })

  const boardTemp: SquareProps[] = []
  boardList.forEach(square => {
    const num = square.split('')
    const isEven = Number(num[1]) % 2 === 0

    if(isEven){
      if(boardTemp.length % 2 === 0) {
        return boardTemp.push({id: square, color: "white"})
      }
      boardTemp.push({id: square, color: "black"})
    } else {
      if(boardTemp.length % 2 === 0) {
        return boardTemp.push({id: square, color: "black"})
      }
      boardTemp.push({id: square, color: "white"})
    }
  })

  return boardTemp
}