import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserDashboard } from './components/user/UserDashboard';
import { CourseLibrary } from './components/courses/CourseLibrary';
import { CourseViewer } from './components/courses/CourseViewer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/courses" element={<CourseLibrary />} />
            <Route path="/courses/:courseId" element={<CourseViewer />} />
            <Route path="/" element={<UserDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;