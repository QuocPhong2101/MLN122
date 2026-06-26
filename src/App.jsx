import { Routes, Route } from 'react-router-dom'
import TheoryPage from './pages/TheoryPage'
import ApplePage from './pages/ApplePage'
import QuizPage from './pages/QuizPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TheoryPage />} />
      <Route path="/apple" element={<ApplePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  )
}
