import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localstorage';

import timer from './store/timer';
import tomato from './store/tomato';
import main from './store/store';

import { MainBlock } from './pages/MainBlock';
import { Layout } from './pages/Layout';
import { Activity } from './pages/Activity';

const persistedState = loadState();
const store = configureStore({
  reducer: combineReducers({
    main: main.reducer,
    timer: timer.reducer,
    tomato: tomato.reducer,
  }),
  preloadedState: persistedState
});
store.subscribe(() => {
  saveState(store.getState());
})

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<MainBlock />} />
              <Route path='stats' element={<Activity />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
