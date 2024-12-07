import fs from "fs/promises"
import { checkMeetRequirements } from "./utils.js"

export const checkSafeReports = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
    const reports = data
      .trim()
      .split("\n")
      .map((line) => line.trim().split(/\s+/).map(Number))

    const safeReportsNum = reports.filter(checkMeetRequirements).length

    console.log("Safe reports:", safeReportsNum)
    return safeReportsNum
  } catch (error) {
    console.error("Error reading the file:", error)
  }
}

checkSafeReports("./exampleData.txt")
checkSafeReports("./data.txt")
