import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Login from '../pages/Login.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Questionnaire from '../pages/Questionnaire.jsx'
import LearningPathConfirm from '../pages/LearningPathConfirm.jsx'
import Home from '../pages/Home.jsx'
import Courses from '../pages/Courses.jsx'
import CourseDetail from '../pages/CourseDetail.jsx'
import Tutor from '../pages/Tutor.jsx'
import Sandbox from '../pages/Sandbox.jsx'
import Settings from '../pages/Settings.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/learning-path-confirm" element={<LearningPathConfirm />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
