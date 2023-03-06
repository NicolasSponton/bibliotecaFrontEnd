import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import './App.css';
import esES from 'antd/locale/es_ES';
import store from './redux/app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRouter from './Layout';

function App() {
  return (
    <BrowserRouter>
       <Provider store={store}>
        <ConfigProvider locale={esES}>
          <AppRouter/>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
