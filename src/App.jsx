import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TheoryPage from './pages/TheoryPage'
import ApplePage from './pages/ApplePage'
import QuizPage from './pages/QuizPage'
import AIUsagePage from './pages/AIUsagePage'
import ReferencesPage from './pages/ReferencesPage'
import ChatBox from './components/ChatBox'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
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
