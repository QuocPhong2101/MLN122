import { Routes, Route } from 'react-router-dom'
import TheoryPage from './pages/TheoryPage'
import ApplePage from './pages/ApplePage'
import QuizPage from './pages/QuizPage'
import AIUsagePage from './pages/AIUsagePage'
import ReferencesPage from './pages/ReferencesPage'
import ChatBox from './components/ChatBox'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TheoryPage />} />
        <Route path="/apple" element={<ApplePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ai-usage" element={<AIUsagePage />} />
        <Route path="/references" element={<ReferencesPage />} />
      </Routes>
      <ChatBox />
    </>
  )
}
