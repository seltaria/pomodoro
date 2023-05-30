import { createSlice } from "@reduxjs/toolkit";

const timer = createSlice({
  name: "timer",
  initialState: {
    minutes: 0,
    seconds: 0,
    isTimerActive: false,
    isAlreadyStarted: false,
    isRestTime: false,
    tomatoNumber: 1,
    isOnPause: false,
    longRestCounter: 1,
  },
  reducers: {
    setMinutes: (state, action) => { state.minutes = action.payload },
    setSeconds: (state, action) => { state.seconds = action.payload },
    plusFiveMinutes: (state) => { state.minutes = state.minutes + 5 },
    minusOneSecond: (state) => { state.seconds-- },
    minusOneMinute: (state) => { state.minutes-- },
    setTimerActive: (state) => { state.isTimerActive = true },
    setTimerNotActive: (state) => { state.isTimerActive = false },
    setStarted: (state) => { state.isAlreadyStarted = true },
    neverStarted: (state) => { state.isAlreadyStarted = false },
    setRestTime: (state) => { state.isRestTime = true },
    setNotRestTime: (state) => { state.isRestTime = false },
    addTomatoNumber: (state) => { state.tomatoNumber++ },
    resetTomatoNumber: (state) => { state.tomatoNumber = 1 },
    pause: (state) => { state.isOnPause = true },
    resume: (state) => { state.isOnPause = false },
    addLongRestCount: (state) => { state.longRestCounter++ },
    resetLongRestCount: (state) => { state.longRestCounter = 1 },
  }
})

export const { setTimerActive, setTimerNotActive, setStarted, neverStarted, setRestTime, setNotRestTime, addTomatoNumber,
  resetTomatoNumber, pause, resume, addLongRestCount, resetLongRestCount,
  setMinutes, plusFiveMinutes, minusOneSecond, minusOneMinute, setSeconds } = timer.actions;
export default timer;