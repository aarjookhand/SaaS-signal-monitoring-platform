import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import SignalListView from './views/SignalListView';
import DetailedView from './views/DetailedViewPage';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<SignalListView />} />
          <Route path="/:id" element={<DetailedView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;