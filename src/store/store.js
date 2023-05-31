import { createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "store",
  initialState: {
    tomatoes: [], // { id: 1234, name: '', count: 1, duration: { active: 25, others: (count - 1) * 25 } }
    history: [], // { caseId: 1, date: '05.05.2023', duration: 24, tomatoDuration: 20, pause: 1, stops: 1, tomatoCount: 0 }
    theme: "light",
    options: { duration: 25, shortRestDuration: 5, longRestDuration: 15, longRestFrequency: 4 },
  },
  reducers: {
    switchTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
    createTask: (state, action) => { state.tomatoes.push(action.payload) },
    deleteTask: (state, action) => { state.tomatoes = state.tomatoes.filter(tomato => tomato.id !== action.payload) },
    plusFiveDuration: (state, action) => { state.tomatoes = state.tomatoes.map(tomato => tomato.id === action.payload ? { ...tomato, duration: { ...tomato.duration, active: tomato.duration.active + 5 } } : tomato) },
    minusOneDuration: (state, action) => { state.tomatoes = state.tomatoes.map(tomato => tomato.id === action.payload ? { ...tomato, duration: { ...tomato.duration, active: tomato.duration.active - 1 } } : tomato) },
    moreTomatoes: (state, action) => { state.tomatoes = state.tomatoes.map(tomato => tomato.id === action.payload.id ? { ...tomato, count: tomato.count + 1, duration: { ...tomato.duration, others: tomato.duration.others + action.payload.duration } } : tomato) },
    lessTomatoes: (state, action) => {
      if (state.tomatoes.filter(tomato => tomato.id === action.payload)[0].count !== 1) {
        state.tomatoes = state.tomatoes.map(
          tomato => tomato.id === action.payload ? { ...tomato, count: tomato.count - 1, duration: { ...tomato.duration, others: tomato.duration.others - 25 } } : tomato)
      }
    },
    rename: (state, action) => { state.tomatoes = state.tomatoes.map(tomato => tomato.id === action.payload.id ? { ...tomato, name: action.payload.newName } : tomato) },
    removeFinished: (state, action) => { state.tomatoes = state.tomatoes.filter(tomato => tomato.id !== action.payload) },
    addToHistory: (state, action) => {
      if (state.history.filter(obj => obj.date === action.payload.date).length === 0) {
        state.history.push(action.payload.object);
      } else {
        state.history = state.history.map(obj => obj.date === action.payload.date ?
          {
            ...obj,
            duration: obj.duration + action.payload.object.duration,
            tomatoDuration: obj.tomatoDuration + action.payload.object.tomatoDuration,
            // tomatoCount: obj.tomatoCount + action.payload.object.tomatoCount,
            pause: obj.pause + action.payload.object.pause,
            stops: obj.stops + action.payload.object.stops,
          } : obj)
      }
    },
    addTomatoToHistory: (state, action) => {
      if (state.history.filter(obj => obj.date === action.payload).length === 0) {
        state.history.push({
          date: action.payload,
          tomatoCount: 1,
          duration: 0,
          tomatoDuration: 0,
          pause: 0,
          stops: 0,
        })
      } else {
        state.history = state.history.map(obj => obj.date === action.payload ? {
          ...obj,
          tomatoCount: obj.tomatoCount + 1,
        } : obj)
      }
    },
    changeDuration: (state) => {
      if (state.options.duration === 40) {
        state.options.duration = 15;
      } else {
        state.options.duration = state.options.duration + 5;
      }
    },
    changeShortRestDuration: (state) => {
      if (state.options.shortRestDuration === 5) {
        state.options.shortRestDuration = 3;
      } else {
        state.options.shortRestDuration++;
      }
    },
    changeLongRestDuration: (state) => {
      if (state.options.longRestDuration === 30) {
        state.options.longRestDuration = 15;
      } else {
        state.options.longRestDuration = state.options.longRestDuration + 5;
      }
    },
    changeLongRestFrequency: (state) => {
      if (state.options.longRestFrequency === 5) {
        state.options.longRestFrequency = 3;
      } else {
        state.options.longRestFrequency++;
      }
    },
  }
})

export const { switchTheme, createTask, deleteTask, plusFiveDuration, minusOneDuration, moreTomatoes,
  lessTomatoes, rename, removeFinished, addToHistory, addTomatoToHistory, changeDuration, changeShortRestDuration,
  changeLongRestDuration, changeLongRestFrequency } = store.actions;
export default store;