export function startButtonText(isAlreadyStarted, isTimerActive) {
  let startButtonText = "Старт";
  if (isAlreadyStarted && !isTimerActive) {
    startButtonText = "Продолжить";
  } else if (isAlreadyStarted && isTimerActive) {
    startButtonText = "Пауза";
  }
  return startButtonText;
}

export function finishButtonText(isRestTime) {
  let finishButtonText = "Сделано";
  if (isRestTime) {
    finishButtonText = "Пропустить";
  } else {
    finishButtonText = "Сделано";
  }
  return finishButtonText;
}

export function headerStyle(isAlreadyStarted, isRestTime, theme) {
  let headerStyle;
  if (theme === "light") {
    if (isAlreadyStarted) {
      headerStyle = { backgroundColor: "#DC3E22" }
      if (isRestTime) {
        headerStyle = { backgroundColor: "#A8B64F" }
      }
    } else {
      headerStyle = { backgroundColor: "#C4C4C4" }
    }
  } else if (theme === "dark") {
    if (isAlreadyStarted) {
      headerStyle = { backgroundColor: "rgb(162 73 57)" }
      if (isRestTime) {
        headerStyle = { backgroundColor: "#899441" }
      }
    } else {
      headerStyle = { backgroundColor: "rgb(75 71 71)" }
    }
  }
  return headerStyle;
}

export function countText(count, word1, word2, word3) {
  if (count >= 11 && count < 15 || [0, 5, 6, 7, 8, 9].includes(count % 10)) {
    return word1; // "помидоров";
  }
  if (count % 10 === 1) {
    return word2; // "помидор";
  }
  if ([2, 3, 4].includes(count % 10)) {
    return word3; // "помидора";
  }
}
