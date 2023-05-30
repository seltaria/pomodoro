import { createSlice } from "@reduxjs/toolkit";

const tomato = createSlice({
  name: "tomato",
  initialState: {
    duration: 0,
    tomatoDuration: 0,
    pause: 0,
    stops: 0,
    tomatoCount: 0,
  },
  reducers: {
    addDuration: (state) => { state.duration++ },
    addTomatoDuration: (state) => { state.tomatoDuration++ },
    addPause: (state) => { state.pause++ },
    addStops: (state) => { state.stops++ },
    addTomatoCount: (state) => { state.tomatoCount++ },
    resetDuration: (state) => { state.duration = 0 },
    resetTomatoDuration: (state) => { state.tomatoDuration = 0 },
    resetPause: (state) => { state.pause = 0 },
    resetStops: (state) => { state.stops = 0 },
    resetTomatoCount: (state) => { state.tomatoCount = 0 },
    resetAll: (state) => {
      state.duration = 0;
      state.tomatoDuration = 0;
      state.pause = 0;
      state.stops = 0;
      state.tomatoCount = 0;
    },
  }
})

export const { addDuration, addTomatoDuration, addPause, addStops, addTomatoCount,
  resetDuration, resetTomatoDuration, resetPause, resetStops, resetTomatoCount, resetAll } = tomato.actions;
export default tomato;