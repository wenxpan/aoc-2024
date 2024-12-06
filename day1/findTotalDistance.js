import fs from "fs/promises"

export const findTotalDistance = async () => {
  try {
    const data = await fs.readFile("./data.txt", "utf8")
    const numbers = data.match(/\d+/g).map(Number)

    const list1 = []
    const list2 = []

    numbers.forEach((num, index) => {
      if (index % 2 === 0) {
        list1.push(num)
      } else {
        list2.push(num)
      }
    })

    const sortedList1 = list1.sort((a, b) => a - b)
    const sortedList2 = list2.sort((a, b) => a - b)

    let totalDistance = 0

    sortedList1.forEach((number, index) => {
      totalDistance += Math.abs(number - sortedList2[index])
    })
    console.log("Total distance:", totalDistance)

    return totalDistance
  } catch (error) {
    console.error("Error reading the file:", error)
  }
}

findTotalDistance()
