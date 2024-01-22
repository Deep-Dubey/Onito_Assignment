import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';

import store from './store';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import DataTable from './DataTable';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/step-1" element={<Step1Form />} />
            <Route path="/step-2" element={<Step2Form />} />
            <Route path="/" element={<Step1Form />} />
          </Routes>
          <DataTable />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
