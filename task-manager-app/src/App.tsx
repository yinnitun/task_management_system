import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="/new" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
