import { useState } from 'react'
import { Link } from 'react-router-dom'

const QUESTIONS = [
  {
    q: 'Độc quyền được định nghĩa là gì theo C.Mác và Ph.Ăngghen?',
    opts: [
      'Một doanh nghiệp duy nhất trong toàn bộ nền kinh tế',
      'Sự liên minh giữa các doanh nghiệp lớn nhằm thâu tóm sản xuất, tiêu thụ và thu lợi nhuận độc quyền cao',
      'Nhà nước nắm quyền kiểm soát toàn bộ nền kinh tế',
      'Sự cạnh tranh gay gắt giữa các doanh nghiệp lớn',
    ],
    ans: 1,
    explain: 'Theo C.Mác và Ph.Ăngghen, độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng thâu tóm sản xuất, tiêu thụ và định ra giá cả độc quyền để thu lợi nhuận độc quyền cao.',
  },
  {
    q: 'Nguyên nhân nào KHÔNG phải là nguyên nhân hình thành độc quyền?',
    opts: [
      'Sự phát triển của lực lượng sản xuất đòi hỏi vốn lớn',
      'Cạnh tranh gay gắt loại bỏ doanh nghiệp yếu kém',
      'Khủng hoảng kinh tế và sự phát triển hệ thống tín dụng',
      'Chính phủ ban hành luật bắt buộc doanh nghiệp sáp nhập',
    ],
    ans: 3,
    explain: 'Ba nguyên nhân chủ yếu hình thành độc quyền theo Lênin là: (1) Phát triển LLSX, (2) Cạnh tranh gay gắt, (3) Khủng hoảng kinh tế và hệ thống tín dụng. Chính phủ bắt buộc sáp nhập không phải nguyên nhân tự nhiên.',
  },
  {
    q: '"Tư bản tài chính" là kết quả của sự hợp nhất giữa?',
    opts: [
      'Tư bản thương nghiệp và tư bản nông nghiệp',
      'Tư bản ngân hàng và tư bản công nghiệp',
      'Nhà nước và doanh nghiệp tư nhân',
      'Tư bản nước ngoài và tư bản trong nước',
    ],
    ans: 1,
    explain: 'Theo Lênin: "Tư bản tài chính là kết quả của sự hợp nhất giữa tư bản ngân hàng của một số ít ngân hàng độc quyền lớn nhất với tư bản của những liên minh độc quyền các nhà công nghiệp."',
  },
  {
    q: 'Độc quyền nhà nước trong CNTB hình thành nhằm mục đích chính là?',
    opts: [
      'Bảo vệ quyền lợi của toàn thể nhân dân lao động',
      'Xây dựng chủ nghĩa xã hội',
      'Phục vụ lợi ích của các tổ chức độc quyền tư nhân và duy trì CNTB',
      'Loại bỏ hoàn toàn cạnh tranh',
    ],
    ans: 2,
    explain: 'Theo Lênin, độc quyền nhà nước trong CNTB hình thành nhằm phục vụ lợi ích của các tổ chức độc quyền tư nhân và tiếp tục duy trì, phát triển chủ nghĩa tư bản.',
  },
  {
    q: 'Apple thu phí 30% từ App Store là ví dụ của loại giá nào theo lý thuyết Lênin?',
    opts: [
      'Giá thị trường bình thường',
      'Giá cả độc quyền cao (khi bán)',
      'Giá cả độc quyền thấp (khi mua — ép giá đối tác/lập trình viên)',
      'Không thuộc loại nào trong lý thuyết',
    ],
    ans: 2,
    explain: 'Apple dùng vị thế độc quyền trên iOS để ép lập trình viên nộp 30% — tức là "mua" dịch vụ của lập trình viên với giá thấp hơn giá trị thực tế của nó (giá mua độc quyền thấp).',
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])
  const [showReview, setShowReview] = useState(false)

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const correct = idx === q.ans
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, { correct, selected: idx }])
  }

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleReset = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
    setShowReview(false)
  }

  const pct = Math.round((score / QUESTIONS.length) * 100)
  const grade = pct >= 80 ? '🏆 Xuất sắc!' : pct >= 60 ? '👍 Khá tốt!' : pct >= 40 ? '📚 Cần ôn thêm' : '💪 Cố lên!'

  return (
    <div className="ap-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .ap-quiz-option {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          color: #f5f5f7;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
          font-family: inherit;
          margin-bottom: 12px;
        }
        .ap-quiz-option:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }
        .ap-quiz-option:disabled {
          cursor: default;
        }
      `}</style>

      {/* Sticky top nav */}
      <nav className="ap-nav ap-nav--scrolled">
        <div className="ap-nav-inner">
          <Link to="/" className="ap-nav-back">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="currentColor">
              <path d="M8 1L1 7.5 8 14" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
            Lý thuyết
          </Link>
          <span className="ap-nav-logo" style={{ borderRight: 'none' }}>📝</span>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#f5f5f7' }}>
            Trắc nghiệm Chương 4
          </div>
          <Link to="/apple" className="ap-nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f7' }}>
            🍎 Case Study
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
        <div style={{ width: '100%', maxWidth: '640px' }}>

          {/* Progress Section */}
          {!finished && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#a1a1a6', marginBottom: 8, fontWeight: 500 }}>
                <span>Câu {current + 1} trên {QUESTIONS.length}</span>
                <span>Điểm số: {score}</span>
              </div>
              <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 980, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#0071e3', transition: 'width 0.3s ease-out', borderRadius: 980 }} />
              </div>
            </div>
          )}

          {finished ? (
            <>
              /* Finished Results Screen */
              <div className="ap-dark-card" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>
                  {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📚' : '💪'}
                </div>
                <div style={{ fontSize: 72, fontWeight: 800, color: '#f5f5f7', letterSpacing: '-0.03em', lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: '#0071e3', marginTop: 12, marginBottom: 36 }}>{grade}</div>

                {/* Stats blocks */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#30d158' }}>{score}</div>
                    <div style={{ fontSize: 14, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Câu đúng</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#ff453a' }}>{QUESTIONS.length - score}</div>
                    <div style={{ fontSize: 14, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Câu sai</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#a1a1a6' }}>{QUESTIONS.length}</div>
                    <div style={{ fontSize: 14, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Tổng câu</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button className="ap-btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleReset}>
                    🔄 Làm lại Quiz
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Link to="/" className="ap-btn-ghost" style={{ justifyContent: 'center' }}>
                      📖 Về Lý thuyết
                    </Link>
                    <Link to="/apple" className="ap-btn-ghost" style={{ justifyContent: 'center' }}>
                      🍎 Về Case Study
                    </Link>
                  </div>
                  <button className="ap-btn-ghost" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: '#a1a1a6', marginTop: 4 }} onClick={() => setShowReview(!showReview)}>
                    {showReview ? '🔼 Ẩn chi tiết đáp án' : '👁️ Xem chi tiết đáp án'}
                  </button>
                </div>
              </div>

              {/* Answer Review Section */}
              {showReview && (
                <div className="ap-fade ap-visible" style={{ marginTop: 24, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f5f5f7', marginBottom: 20 }}>
                    Chi tiết bài làm:
                  </h3>
                  {QUESTIONS.map((question, idx) => {
                    const userAns = answers[idx]; // { correct, selected }
                    const isUserCorrect = userAns?.correct;
                    const userSelectedOpt = question.opts[userAns?.selected];
                    const correctOpt = question.opts[question.ans];

                    return (
                      <div key={idx} style={{
                        background: '#1c1c1e',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: 16
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0071e3' }}>
                            CÂU {idx + 1}
                          </span>
                          <span style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: isUserCorrect ? '#30d158' : '#ff453a',
                            background: isUserCorrect ? 'rgba(48,209,88,0.1)' : 'rgba(255,69,58,0.1)',
                            padding: '4px 10px',
                            borderRadius: '980px'
                          }}>
                            {isUserCorrect ? '✓ ĐÚNG' : '✕ SAI'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '19px', fontWeight: 600, color: '#f5f5f7', marginBottom: 16, lineHeight: 1.4 }}>
                          {question.q}
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '16px', color: '#a1a1a6', marginBottom: 16 }}>
                          <div>
                            <span style={{ color: '#6e6e73' }}>Bạn chọn: </span>
                            <span style={{ color: isUserCorrect ? '#30d158' : '#ff453a', fontWeight: 500 }}>
                              {userSelectedOpt || 'Không trả lời'}
                            </span>
                          </div>
                          {!isUserCorrect && (
                            <div>
                              <span style={{ color: '#6e6e73' }}>Đáp án đúng: </span>
                              <span style={{ color: '#30d158', fontWeight: 500 }}>
                                {correctOpt}
                              </span>
                            </div>
                          )}
                        </div>

                        <div style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.04)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '16px',
                          lineHeight: 1.5,
                          color: '#8e8e93'
                        }}>
                          <strong style={{ color: '#a1a1a6', display: 'block', marginBottom: 4 }}>Giải thích:</strong>
                          {question.explain}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          ) : (
            /* Question Screen */
            <div className="ap-dark-card" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px 36px', textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                CÂU HỎI {current + 1} TRÊN {QUESTIONS.length}
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f5f5f7', lineHeight: 1.4, marginBottom: 28 }}>
                {q.q}
              </h2>

              {/* Options list */}
              <div style={{ marginBottom: 24 }}>
                {q.opts.map((opt, i) => {
                  let buttonBg = 'rgba(255, 255, 255, 0.04)'
                  let buttonBorderColor = 'rgba(255, 255, 255, 0.08)'
                  let buttonColor = '#f5f5f7'
                  let iconBg = 'rgba(255,255,255,0.08)'
                  let iconColor = '#a1a1a6'
                  let iconText = ['A', 'B', 'C', 'D'][i]

                  if (answered) {
                    if (i === q.ans) {
                      buttonBg = 'rgba(48,209,88,0.12)'
                      buttonBorderColor = '#30d158'
                      buttonColor = '#30d158'
                      iconBg = '#30d158'
                      iconColor = '#fff'
                      iconText = '✓'
                    } else if (selected === i) {
                      buttonBg = 'rgba(255,69,58,0.12)'
                      buttonBorderColor = '#ff453a'
                      buttonColor = '#ff453a'
                      iconBg = '#ff453a'
                      iconColor = '#fff'
                      iconText = '✕'
                    } else {
                      buttonColor = '#6e6e73'
                    }
                  }

                  return (
                    <button
                      key={i}
                      className="ap-quiz-option"
                      style={{
                        background: buttonBg,
                        borderColor: buttonBorderColor,
                        color: buttonColor,
                      }}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                    >
                      <span style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: iconBg,
                        color: iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 15,
                        fontWeight: 700,
                        marginRight: 14,
                        flexShrink: 0,
                        transition: 'all 0.2s'
                      }}>
                        {iconText}
                      </span>
                      <span style={{ flex: 1, lineHeight: 1.4 }}>{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation (revealed after answering) */}
              {answered && (
                <div className="ap-fade ap-visible" style={{
                  background: 'rgba(0,113,227,0.06)',
                  border: '1px solid rgba(0,113,227,0.25)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: 28,
                  fontSize: '17px',
                  color: '#a1a1a6',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: selected === q.ans ? '#30d158' : '#ff453a', display: 'block', marginBottom: 4 }}>
                    {selected === q.ans ? '✓ Câu trả lời chính xác!' : '✕ Câu trả lời chưa chính xác.'}
                  </strong>
                  {q.explain}
                </div>
              )}

              {/* Navigation button at bottom */}
              {answered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="ap-btn-primary" onClick={handleNext} style={{ padding: '12px 24px', fontSize: 17 }}>
                    {current + 1 >= QUESTIONS.length ? '📊 Xem kết quả' : 'Câu tiếp theo →'}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
