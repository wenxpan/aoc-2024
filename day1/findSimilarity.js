import fs from "fs/promises"

export const findSimilarity = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
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

    const list2Occurances = {}

    list2.forEach((num) => {
      list2Occurances[num] = list2Occurances[num] ? list2Occurances[num] + 1 : 1
    })

    let totalSimilarity = 0

    list1.forEach((number) => {
      if (list2Occurances[number]) {
        totalSimilarity += list2Occurances[number] * number
      }
    })

    console.log("Total similarity:", totalSimilarity)

    return totalSimilarity
  } catch (error) {
    console.error("Error reading the file:", error)
  }
}

findSimilarity("./exampleData.txt")
findSimilarity("./data.txt")
