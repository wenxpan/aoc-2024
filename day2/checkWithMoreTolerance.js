import fs from "fs/promises"
import { checkMeetRequirements } from "./utils.js"

export const checkWithMoreTolerance = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
    const reports = data
      .trim()
      .split("\n")
      .map((line) => line.trim().split(/\s+/).map(Number))

    let safeReportsNum = 0

    reports.forEach((report) => {
      if (checkMeetRequirements(report)) {
        safeReportsNum++
        return
      }
      const meetRequirementWithNumRemoved = report.find((num, index) => {
        const newReport = report.filter((_, i) => i !== index)
        return checkMeetRequirements(newReport)
      })
      if (meetRequirementWithNumRemoved) {
        safeReportsNum++
      }
    })

    console.log("Safe reports for more tolerance:", safeReportsNum)
    return safeReportsNum
  } catch (error) {
    console.error("Error reading the file:", error)
  }
}

checkWithMoreTolerance("./exampleData.txt")
checkWithMoreTolerance("./data.txt")
