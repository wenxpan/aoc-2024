const getOrder = (num1, num2) => {
  if (num1 < num2) {
    return "increase"
  } else if (num1 > num2) {
    return "decrease"
  } else {
    return "neither"
  }
}

export const checkMeetRequirements = (report) => {
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

  return meetRequirements
}
