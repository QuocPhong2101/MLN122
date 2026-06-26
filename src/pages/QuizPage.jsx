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
    q: 'Câu nói của Lênin: "Tự do cạnh tranh đẻ ra..." được hoàn thành đúng nhất là?',
    opts: [
      '...sự công bằng trong phân phối',
      '...tập trung sản xuất và sự tập trung sản xuất khi phát triển đến mức độ nhất định lại dẫn tới độc quyền',
      '...sự phá sản của tất cả doanh nghiệp',
      '...độc quyền nhà nước ngay lập tức',
    ],
    ans: 1,
    explain: 'Đây là câu trích dẫn nổi tiếng của V.I.Lênin, khẳng định mối quan hệ tất yếu giữa cạnh tranh tự do → tập trung sản xuất → độc quyền.',
  },
  {
    q: 'Hình thức tổ chức độc quyền nào có trình độ CAO NHẤT trong giáo trình?',
    opts: ['Cartel', 'Syndicate', 'Trust', 'Consortium'],
    ans: 3,
    explain: 'Consortium (Công-xoóc-xi-om) là hình thức tổ chức độc quyền cao nhất, bao gồm nhiều công ty, ngân hàng, tập đoàn thuộc các ngành khác nhau liên kết dưới sự chi phối tài chính thống nhất.',
  },
  {
    q: 'Trong Cartel, các doanh nghiệp thỏa thuận với nhau về điều gì?',
    opts: [
      'Sáp nhập hoàn toàn thành một doanh nghiệp duy nhất',
      'Giá bán, sản lượng, thị trường — nhưng vẫn độc lập về sản xuất và lưu thông',
      'Thống nhất khâu lưu thông nhưng độc lập sản xuất',
      'Chuyển giao toàn bộ quyền quản lý cho ban quản trị chung',
    ],
    ans: 1,
    explain: 'Cartel là liên minh các xí nghiệp ký hiệp nghị về giá cả, sản lượng, thị trường, kỳ hạn thanh toán — nhưng vẫn độc lập về cả sản xuất lẫn lưu thông hàng hóa.',
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
    q: '"Đầu sỏ tài chính" (tài phiệt) thực hiện sự thống trị thông qua cơ chế nào?',
    opts: [
      'Bạo lực vũ trang',
      'Luật pháp nhà nước',
      '"Chế độ tham dự" — mua cổ phiếu khống chế theo chuỗi công ty mẹ-con-cháu',
      'Quốc hữu hóa tất cả doanh nghiệp',
    ],
    ans: 2,
    explain: '"Chế độ tham dự" là cơ chế nhà tài phiệt mua cổ phiếu khống chế "công ty mẹ" → công ty mẹ khống chế "công ty con" → công ty con khống chế "công ty cháu". Bằng lượng vốn nhỏ, kiểm soát lượng vốn rất lớn.',
  },
  {
    q: 'Xuất khẩu tư bản khác với xuất khẩu hàng hóa ở điểm nào?',
    opts: [
      'Xuất khẩu tư bản là đưa vốn ra nước ngoài để kiếm lợi nhuận, không phải bán hàng',
      'Xuất khẩu tư bản chỉ là bán máy móc thiết bị',
      'Xuất khẩu tư bản là xuất khẩu tiền mặt',
      'Chúng giống nhau hoàn toàn',
    ],
    ans: 0,
    explain: 'Xuất khẩu tư bản là xuất khẩu giá trị ra nước ngoài (đầu tư vốn) nhằm thu giá trị thặng dư. Khác với xuất khẩu hàng hóa là bán sản phẩm đã sản xuất ra.',
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
    q: '"Hôm nay là bộ trưởng, ngày mai là chủ ngân hàng" — câu này của Lênin nói về đặc trưng nào của độc quyền nhà nước?',
    opts: [
      'Sự phát triển của sở hữu nhà nước',
      'Sự kết hợp về nhân sự giữa nhà nước và tổ chức độc quyền',
      'Công cụ điều tiết kinh tế',
      'Xuất khẩu tư bản',
    ],
    ans: 1,
    explain: 'Câu trích dẫn này của Lênin mô tả đặc trưng thứ nhất của độc quyền nhà nước: sự kết hợp về nhân sự — các quan chức nhà nước và lãnh đạo tổ chức độc quyền luân chuyển vị trí cho nhau.',
  },
  {
    q: 'Tác động TIÊU CỰC nào của độc quyền KHÔNG được đề cập trong giáo trình?',
    opts: [
      'Gây thiệt hại cho người tiêu dùng qua giá cao',
      'Kìm hãm tiến bộ kỹ thuật',
      'Gia tăng bất bình đẳng xã hội',
      'Làm giảm GDP của quốc gia',
    ],
    ans: 3,
    explain: 'Giáo trình đề cập 3 tác động tiêu cực: (1) Gây thiệt hại người tiêu dùng, (2) Kìm hãm tiến bộ kỹ thuật, (3) Gia tăng bất bình đẳng xã hội. "Làm giảm GDP" không được đề cập.',
  },
  {
    q: 'Theo Lênin, độc quyền có quan hệ như thế nào với cạnh tranh?',
    opts: [
      'Độc quyền thủ tiêu hoàn toàn cạnh tranh',
      'Độc quyền và cạnh tranh không có mối quan hệ gì',
      'Độc quyền không thủ tiêu cạnh tranh mà làm cạnh tranh gay gắt hơn',
      'Cạnh tranh tạo ra độc quyền và độc quyền thủ tiêu cạnh tranh',
    ],
    ans: 2,
    explain: 'Lênin khẳng định: Độc quyền không thủ tiêu cạnh tranh mà làm cho cạnh tranh trở nên đa dạng, gay gắt hơn. Có 3 hình thức cạnh tranh mới trong điều kiện độc quyền.',
  },
  {
    q: 'Apple thu phí 30% từ App Store là ví dụ của loại giá nào theo lý thuyết Lênin?',
    opts: [
      'Giá thị trường bình thường',
      'Giá cả độc quyền cao (khi bán)',
      'Giá cả độc quyền thấp (khi mua — ép giá lập trình viên)',
      'Không thuộc loại nào trong lý thuyết',
    ],
    ans: 2,
    explain: 'Apple dùng vị thế độc quyền trên iOS để ép lập trình viên nộp 30% — tức là "mua" dịch vụ của lập trình viên với giá thấp hơn giá trị thực. Đây là giá mua độc quyền thấp.',
  },
  {
    q: 'Trong các hình thức xuất khẩu tư bản, Samsung đầu tư nhà máy tại Việt Nam là ví dụ của?',
    opts: [
      'Xuất khẩu hàng hóa',
      'Đầu tư gián tiếp (FPI)',
      'Đầu tư trực tiếp (FDI)',
      'Viện trợ phát triển',
    ],
    ans: 2,
    explain: 'Đầu tư trực tiếp (FDI) là hình thức xây dựng hoặc mua doanh nghiệp tại nước ngoài để trực tiếp kinh doanh thu lợi nhuận. Samsung xây nhà máy ở Việt Nam là FDI điển hình.',
  },
  {
    q: 'Syndicate khác Cartel ở điểm gì?',
    opts: [
      'Syndicate mất hoàn toàn tính độc lập cả sản xuất lẫn lưu thông',
      'Syndicate vẫn độc lập sản xuất nhưng thống nhất khâu lưu thông (mua bán do ban quản trị chung)',
      'Syndicate là hình thức thấp hơn Cartel',
      'Không có sự khác biệt',
    ],
    ans: 1,
    explain: 'Syndicate: Vẫn độc lập về sản xuất, nhưng mất độc lập về lưu thông — mọi mua/bán do ban quản trị chung đảm nhận. Đây là mức cao hơn Cartel (Cartel còn độc lập cả sản xuất lẫn lưu thông).',
  },
  {
    q: 'Nguồn gốc của lợi nhuận độc quyền cao thực chất là gì?',
    opts: [
      'Do nhà nước trợ cấp trực tiếp',
      'Do may mắn trong kinh doanh',
      'Từ giá trị thặng dư của công nhân và trao đổi không ngang giá với các nước thuộc địa, phụ thuộc',
      'Từ lợi nhuận thương mại đơn thuần',
    ],
    ans: 2,
    explain: 'Nguồn gốc lợi nhuận độc quyền vẫn là lao động không công của công nhân (giá trị thặng dư), cộng thêm từ sự chênh lệch trao đổi không ngang giá và bóc lột các nước thuộc địa, phụ thuộc.',
  },
  {
    q: 'Tại sao nhà nước phải đầu tư vào các ngành như giáo dục, y tế, giao thông?',
    opts: [
      'Vì các ngành này có lợi nhuận cao nhất',
      'Vì đây là ngành dễ quản lý nhất',
      'Vì tư nhân không muốn đầu tư do vốn lớn, thu hồi chậm, ít lợi nhuận',
      'Vì chính phủ muốn kiểm soát toàn bộ nền kinh tế',
    ],
    ans: 2,
    explain: 'Đây là nguyên nhân thứ hai hình thành độc quyền nhà nước: Nhiều ngành chiến lược có vốn đầu tư lớn, thời gian thu hồi dài, lợi nhuận thấp → tư nhân không muốn đầu tư → nhà nước phải đứng ra.',
  },
  {
    q: 'Trong cuộc cạnh tranh Apple vs Samsung — đây là loại cạnh tranh nào theo Lênin?',
    opts: [
      'Cạnh tranh trong nội bộ tổ chức độc quyền',
      'Cạnh tranh giữa tổ chức độc quyền và doanh nghiệp ngoài độc quyền',
      'Cạnh tranh giữa các tổ chức độc quyền với nhau',
      'Cạnh tranh tự do đơn thuần',
    ],
    ans: 2,
    explain: 'Apple và Samsung đều là các tổ chức độc quyền lớn. Cuộc cạnh tranh giữa họ là hình thức "cạnh tranh giữa các tổ chức độc quyền với nhau" — một trong 3 hình thức cạnh tranh trong điều kiện độc quyền.',
  },
  {
    q: 'Đặc điểm nào của CNTB độc quyền dẫn đến chủ nghĩa thực dân và chiến tranh thế giới?',
    opts: [
      'Tư bản tài chính và đầu sỏ tài chính',
      'Tập trung sản xuất ở trình độ cao',
      'Phân chia lãnh thổ thế giới giữa các cường quốc tư bản',
      'Xuất khẩu tư bản',
    ],
    ans: 2,
    explain: 'Đặc điểm thứ 5: Phân chia lãnh thổ thế giới giữa các cường quốc tư bản. Các tập đoàn độc quyền thúc đẩy chính phủ mở rộng ảnh hưởng → chủ nghĩa thực dân → xung đột → chiến tranh thế giới.',
  },
  {
    q: 'Cơ chế điều tiết kinh tế của độc quyền nhà nước là sự dung hợp của?',
    opts: [
      'Chỉ có kế hoạch hóa nhà nước',
      'Thị trường + Độc quyền tư nhân + Điều tiết nhà nước',
      'Chỉ có thị trường tự do',
      'Chỉ có độc quyền nhà nước thuần túy',
    ],
    ans: 1,
    explain: 'Cơ chế điều tiết kinh tế độc quyền nhà nước là sự dung hợp cả ba cơ chế: thị trường + độc quyền tư nhân + điều tiết của nhà nước — nhằm phát huy mặt tích cực và hạn chế tiêu cực của từng cơ chế.',
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

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
          font-size: 15px;
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#a1a1a6', marginBottom: 8, fontWeight: 500 }}>
                <span>Câu {current + 1} trên {QUESTIONS.length}</span>
                <span>Điểm số: {score}</span>
              </div>
              <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 980, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#0071e3', transition: 'width 0.3s ease-out', borderRadius: 980 }} />
              </div>
            </div>
          )}

          {finished ? (
            /* Finished Results Screen */
            <div className="ap-dark-card" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>
                {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📚' : '💪'}
              </div>
              <div style={{ fontSize: 72, fontWeight: 800, color: '#f5f5f7', letterSpacing: '-0.03em', lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#0071e3', marginTop: 12, marginBottom: 36 }}>{grade}</div>

              {/* Stats blocks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#30d158' }}>{score}</div>
                  <div style={{ fontSize: 11, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Câu đúng</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#ff453a' }}>{QUESTIONS.length - score}</div>
                  <div style={{ fontSize: 11, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Câu sai</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#a1a1a6' }}>{QUESTIONS.length}</div>
                  <div style={{ fontSize: 11, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>Tổng câu</div>
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
              </div>
            </div>
          ) : (
            /* Question Screen */
            <div className="ap-dark-card" style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px 36px', textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                CÂU HỎI {current + 1} TRÊN {QUESTIONS.length}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f5f5f7', lineHeight: 1.4, marginBottom: 28 }}>
                {q.q}
              </h2>

              {/* Options list */}
              <div style={{ marginBottom: 24 }}>
                {q.opts.map((opt, i) => {
                  let buttonBg = 'rgba(255, 255, 255, 0.04)'
                  let buttonBorder = '1px solid rgba(255, 255, 255, 0.08)'
                  let buttonColor = '#f5f5f7'
                  let iconBg = 'rgba(255,255,255,0.08)'
                  let iconColor = '#a1a1a6'
                  let iconText = ['A', 'B', 'C', 'D'][i]

                  if (answered) {
                    if (i === q.ans) {
                      buttonBg = 'rgba(48,209,88,0.12)'
                      buttonBorder = '1px solid #30d158'
                      buttonColor = '#30d158'
                      iconBg = '#30d158'
                      iconColor = '#fff'
                      iconText = '✓'
                    } else if (selected === i) {
                      buttonBg = 'rgba(255,69,58,0.12)'
                      buttonBorder = '1px solid #ff453a'
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
                        borderColor: buttonBorder.split(' ')[2],
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
                        fontSize: 13,
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
                  fontSize: '14px',
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
                  <button className="ap-btn-primary" onClick={handleNext} style={{ padding: '12px 24px', fontSize: 14 }}>
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
