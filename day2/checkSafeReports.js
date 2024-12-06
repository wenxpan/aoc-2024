import fs from "fs/promises"

export const checkSafeReports = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
    const reports = data
      .trim()
      .split("\n")
      .map((line) => line.trim().split(/\s+/).map(Number))

    let safeReportsNum = 0

    reports.forEach((report) => {
      let meetRequirements = true

      const initialOrder = getOrder(report[0], report[1])
      if (initialOrder === "neither") {
        return
      }

      for (const [index, num] of report.entries()) {
        const nextIndex = index + 1
        if (nextIndex === report.length) {
          break
        }

        const nextNum = report[nextIndex]
        const diffs = Math.abs(num - nextNum)
        const nextOrder = getOrder(num, nextNum)

        if (nextOrder !== initialOrder || diffs > 3) {
          meetRequirements = false
        }
      }

      if (meetRequirements) {
        safeReportsNum++
      }
    })

    // TODO: learn reduce
    console.log("Safe reports:", safeReportsNum)
    return safeReportsNum
  } catch (error) {
    console.error("Error reading the file:", error)
  }
}

const getOrder = (num1, num2) => {
  if (num1 < num2) {
    return "increase"
  } else if (num1 > num2) {
    return "decrease"
  } else {
    return "neither"
  }
}

checkSafeReports("./exampleData.txt")
checkSafeReports("./data.txt")
