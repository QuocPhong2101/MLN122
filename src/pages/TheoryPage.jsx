import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'khai-niem', label: 'Khái niệm' },
  { id: 'nguyen-nhan', label: 'Nguyên nhân' },
  { id: 'gia-ca', label: 'Giá cả & LN' },
  { id: 'dq-nha-nuoc', label: 'ĐQ Nhà nước' },
  { id: 'tac-dong', label: 'Tác động' },
  { id: 'canh-tranh', label: 'Cạnh tranh' },
  { id: '5-diem', label: '5 Đặc điểm' },
  { id: 'dq-nn-dactrung', label: 'ĐĐ ĐQ NN' },
]

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function useFadeIn(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('ap-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    const el = ref.current
    if (el) {
      el.querySelectorAll('.ap-fade, .ap-slide-up').forEach(item => {
        observer.observe(item)
      })
    }
    return () => observer.disconnect()
  }, [ref])
}

/* ─── Apple-style Accordion ─── */
function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: '#000',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '14px',
          overflow: 'hidden',
          transition: 'border-color 0.2s'
        }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#f5f5f7' }}>{item.title}</span>
            </div>
            <svg
              style={{
                color: open === i ? '#0071e3' : '#6e6e73',
                transform: open === i ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s, color 0.2s',
                flexShrink: 0
              }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div style={{
            maxHeight: open === i ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out'
          }}>
            <div style={{
              padding: '0 24px 20px 56px',
              color: '#a1a1a6',
              fontSize: '14px',
              lineHeight: 1.6,
              borderTop: '1px solid rgba(255,255,255,0.04)',
              paddingTop: '16px'
            }}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TheoryPage() {
  const contentRef = useRef(null)
  const active = useActiveSection(NAV_ITEMS.map(n => n.id))
  const [navScrolled, setNavScrolled] = useState(false)

  useFadeIn(contentRef)

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="ap-root" ref={contentRef}>
      {/* Sticky top nav (Apple style) */}
      <nav className={`ap-nav ${navScrolled ? 'ap-nav--scrolled' : ''}`}>
        <div className="ap-nav-inner">
          <Link to="/" className="ap-nav-back" style={{ fontWeight: 600, color: '#f5f5f7' }}>
            📚 Chương 4
          </Link>
          <div className="ap-nav-links" style={{ paddingLeft: 10 }}>
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`ap-nav-link ${active === n.id ? 'ap-nav-link--active' : ''}`}
                onClick={() => scrollTo(n.id)}
                style={{ fontSize: '11px', padding: '0 8px' }}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link to="/apple" className="ap-nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f7' }}>
              🍎 Case Study
            </Link>
            <Link to="/quiz" className="ap-nav-cta">Quiz →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="ap-hero" style={{ minHeight: '85vh' }}>
        <div className="ap-hero-eyebrow ap-fade">Học phần · MLN122 Chương 4</div>
        <h1 className="ap-hero-title ap-slide-up" style={{ fontSize: 'clamp(54px, 8vw, 90px)' }}>
          Cạnh Tranh &<br />
          <span className="ap-grad">Độc Quyền.</span>
        </h1>
        <p className="ap-hero-sub ap-slide-up" style={{ maxWidth: 640 }}>
          Hệ thống lý luận của V.I.Lênin về độc quyền và độc quyền nhà nước trong nền kinh tế thị trường tư bản chủ nghĩa.
        </p>
        <div className="ap-hero-glow" />
      </section>

      {/* ======= PHẦN I: KHÁI NIỆM ======= */}
      <section id="khai-niem" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần I</p>
          <h2 className="ap-heading ap-slide-up">Khái niệm <span className="ap-grad">Độc quyền.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 680, margin: '0 auto 40px' }}>
            Theo C.Mác và Ph.Ăngghen, cạnh tranh tự do dẫn đến tích tụ và tập trung sản xuất. 
            Khi quá trình này phát triển đến một trình độ nhất định sẽ dẫn đến độc quyền.
          </p>

          <blockquote className="ap-quote ap-fade" style={{ marginBottom: 48 }}>
            <p>"Độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng thâu tóm việc sản xuất và tiêu thụ một số loại hàng hoá, có khả năng định ra giá cả độc quyền, nhằm thu lợi nhuận độc quyền cao."</p>
            <cite>— Định nghĩa Giáo trình MLN122</cite>
          </blockquote>

          {/* Example grid */}
          <div className="ap-theory-grid ap-fade" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 40 }}>
            {[
              { icon: '🍎', label: 'APPLE', theory: 'Hệ sinh thái iOS khép kín', apple: 'Kiểm soát chặt chẽ App Store và các dịch vụ đi kèm để giữ chân người dùng và thu lợi nhuận cao.' },
              { icon: '🔍', label: 'GOOGLE', theory: 'Thống trị tìm kiếm toàn cầu', apple: 'Nắm giữ hơn 90% thị phần công cụ tìm kiếm, định hình cách tiếp cận thông tin trực tuyến.' },
              { icon: '🪟', label: 'MICROSOFT', theory: 'Độc quyền hệ điều hành PC', apple: 'Windows chiếm lĩnh phần lớn máy tính cá nhân trên thế giới trong nhiều thập kỷ.' },
              { icon: '📱', label: 'SAMSUNG', theory: 'Dẫn đầu chip & màn hình', apple: 'Kiểm soát chuỗi cung ứng linh kiện then chốt, tạo lợi thế lớn trước các đối thủ cạnh tranh.' }
            ].map((item, idx) => (
              <div key={idx} className="ap-theory-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="ap-theory-icon">{item.icon}</span>
                <span className="ap-theory-label">{item.label}</span>
                <div className="ap-theory-theory">{item.theory}</div>
                <div className="ap-theory-apple" style={{ fontSize: '13px' }}>{item.apple}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PHẦN II: NGUYÊN NHÂN ======= */}
      <section id="nguyen-nhan" className="ap-section" style={{ background: '#111' }}>
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần II</p>
          <h2 className="ap-heading ap-slide-up">Nguyên nhân <span style={{ color: '#0071e3' }}>hình thành.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
            Ba tác nhân cốt lõi thúc đẩy quá trình chuyển dịch tất yếu từ cạnh tranh tự do sang độc quyền.
          </p>

          <div className="ap-chain ap-fade" style={{ maxWidth: 800, margin: '0 auto 48px' }}>
            {[
              { step: '01', title: 'Sự phát triển của Lực lượng Sản xuất', desc: 'Cuối thế kỷ XIX, các phát minh khoa học kỹ thuật mới (động cơ diesel, máy phát điện, ngành luyện kim, đường sắt...) đòi hỏi quy mô sản xuất cực lớn và nguồn vốn khổng lồ. Doanh nghiệp nhỏ không đáp ứng được phải tích tụ, sáp nhập.' },
              { step: '02', title: 'Do cạnh tranh khốc liệt', desc: 'Cạnh tranh tự do đẩy các doanh nghiệp vào cuộc chiến đào thải. Doanh nghiệp yếu kém bị phá sản hoặc thâu tóm, doanh nghiệp mạnh thắng cuộc ngày càng lớn mạnh và liên minh với nhau.' },
              { step: '03', title: 'Khủng hoảng kinh tế & Hệ thống tín dụng', desc: 'Cuộc khủng hoảng kinh tế 1873 thúc đẩy nhanh chóng sự phá sản của các xí nghiệp vừa và nhỏ. Hệ thống ngân hàng và tín dụng đóng vai trò là đòn bẩy tài chính, giúp tập trung tư bản vào tay các tập đoàn lớn.' }
            ].map((item, idx) => (
              <div key={idx} className="ap-dark-card" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 24, padding: 28, marginBottom: 16 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#0071e3', opacity: 0.8, fontFamily: 'monospace' }}>{item.step}</div>
                <div style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f5f5f7', marginBottom: 8, textAlign: 'left' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#a1a1a6', lineHeight: 1.6, textAlign: 'left' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="ap-quote ap-fade">
            <p>"Tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất khi phát triển đến một mức độ nhất định lại dẫn tới độc quyền."</p>
            <cite>— V.I. Lênin</cite>
          </blockquote>
        </div>
      </section>

      {/* ======= PHẦN III: GIÁ CẢ ======= */}
      <section id="gia-ca" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần III</p>
          <h2 className="ap-heading ap-slide-up">Giá cả & <span className="ap-grad">Lợi nhuận.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
            Cách thức các tổ chức độc quyền chi phối thị trường để tối đa hóa giá trị thặng dư.
          </p>

          <div className="ap-two-col ap-fade">
            <div className="ap-dark-card" style={{ borderTop: '3px solid #ff3b30' }}>
              <div style={{ display: 'inline-block', background: 'rgba(255,59,48,0.1)', color: '#ff3b30', borderRadius: 980, padding: '4px 12px', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                📈 Giá cả Độc quyền Cao
              </div>
              <h3 className="ap-dark-card-title" style={{ marginBottom: 12 }}>Áp đặt khi bán hàng</h3>
              <p style={{ fontSize: 14, color: '#a1a1a6', lineHeight: 1.7 }}>
                Tổ chức độc quyền áp đặt giá bán cao hơn giá trị thực tế của hàng hóa nhằm thâu tóm lợi nhuận từ người tiêu dùng và các doanh nghiệp nhỏ ngoài độc quyền.
              </p>
            </div>

            <div className="ap-dark-card" style={{ borderTop: '3px solid #34c759' }}>
              <div style={{ display: 'inline-block', background: 'rgba(52,199,89,0.1)', color: '#34c759', borderRadius: 980, padding: '4px 12px', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                📉 Giá cả Độc quyền Thấp
              </div>
              <h3 className="ap-dark-card-title" style={{ marginBottom: 12 }}>Ép giá khi mua vào</h3>
              <p style={{ fontSize: 14, color: '#a1a1a6', lineHeight: 1.7 }}>
                Tổ chức độc quyền ép giá mua thấp đối với nguyên liệu đầu vào, hàng hóa dịch vụ từ các nhà sản xuất nhỏ, nông dân, hoặc đối tác không có thế lực thương lượng.
              </p>
            </div>
          </div>

          <div className="ap-verdict ap-fade" style={{ marginTop: 24 }}>
            <span className="ap-verdict-icon">💡</span>
            <p style={{ fontSize: '14px', color: '#a1a1a6', lineHeight: '1.7', textAlign: 'left' }}>
              <strong style={{ color: '#f5f5f7' }}>Nguồn gốc thực chất của Lợi nhuận độc quyền cao:</strong> Vẫn là giá trị thặng dư do người lao động tạo ra ở các xí nghiệp độc quyền, cộng với một phần giá trị thặng dư của các doanh nghiệp ngoài độc quyền và thu nhập của người sản xuất nhỏ, người tiêu dùng thông qua trao đổi không ngang giá.
            </p>
          </div>
        </div>
      </section>

      {/* ======= PHẦN IV: ĐQ NHÀ NƯỚC ======= */}
      <section id="dq-nha-nuoc" className="ap-section" style={{ background: '#111' }}>
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần IV</p>
          <h2 className="ap-heading ap-slide-up">Độc quyền <span style={{ color: '#ffd60a' }}>Nhà nước.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
            Sự kết hợp sức mạnh của các tổ chức độc quyền tư nhân với sức mạnh của nhà nước tư sản thành một cơ chế thống nhất.
          </p>

          <blockquote className="ap-quote ap-fade" style={{ marginBottom: 48, borderLeftColor: '#ffd60a', background: 'rgba(255,214,10,0.04)' }}>
            <p>"Độc quyền nhà nước là kiểu độc quyền trong đó nhà nước thực hiện nắm giữ vị thế độc quyền trên cơ sở duy trì sức mạnh của các tổ chức độc quyền ở những lĩnh vực then chốt nhằm tạo ra sức mạnh vật chất cho sự ổn định của chế độ chính trị xã hội."</p>
          </blockquote>

          {/* Grid of Examples */}
          <h3 className="ap-fade" style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginBottom: 24, textAlign: 'left', maxWidth: 860, margin: '0 auto 24px' }}>
            Ví dụ thực tế về lĩnh vực Độc quyền Nhà nước:
          </h3>
          <div className="ap-product-grid ap-fade" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', maxWidth: 860, margin: '0 auto 48px' }}>
            {[
              { icon: '💵', label: 'Phát hành tiền tệ', desc: 'Ngân hàng Trung ương độc quyền in và kiểm soát lượng tiền lưu thông.' },
              { icon: '⚡', label: 'Điện lực quốc gia', desc: 'Hệ thống truyền tải điện huyết mạch do tập đoàn nhà nước vận hành.' },
              { icon: '🛡️', label: 'Quốc phòng & An ninh', desc: 'Sản xuất vũ khí và các khí tài quân sự chiến lược được kiểm soát nghiêm ngặt.' },
              { icon: '🚂', label: 'Đường sắt quốc gia', desc: 'Hạ tầng giao thông đường sắt quy mô lớn cần quản lý tập trung.' },
              { icon: '🛣️', label: 'Hạ tầng chiến lược', desc: 'Xây dựng đường cao tốc, cảng biển, sân bay bằng ngân sách công.' },
              { icon: '🔬', label: 'Nghiên cứu vũ trụ', desc: 'Đầu tư ngân sách lớn cho nghiên cứu khoa học cơ bản mang tính quốc gia.' }
            ].map((item, idx) => (
              <div key={idx} className="ap-product-card" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{item.icon}</span>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f7', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#a1a1a6', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Accordion for Causes of State Monopoly */}
          <h3 className="ap-fade" style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginBottom: 24, textAlign: 'left', maxWidth: 860, margin: '32px auto 20px' }}>
            Nguyên nhân hình thành Độc quyền Nhà nước:
          </h3>
          <div className="ap-fade" style={{ maxWidth: 860, margin: '0 auto' }}>
            <Accordion items={[
              {
                icon: '1️⃣',
                title: 'Xã hội hóa sản xuất',
                content: 'Quá trình xã hội hóa sản xuất ngày càng cao đòi hỏi phải có một trung tâm điều tiết thống nhất. Nhà nước phải tham gia quản lý nền kinh tế ở tầm vĩ mô khi tích tụ tư bản phát triển đến mức vượt quá khả năng tự điều tiết của tư nhân.'
              },
              {
                icon: '2️⃣',
                title: 'Ngành chiến lược ít lợi nhuận',
                content: 'Nhiều ngành kinh tế có ý nghĩa chiến lược (giáo dục, y tế, giao thông công cộng, nghiên cứu cơ bản) đòi hỏi vốn đầu tư cực lớn, thời gian thu hồi vốn rất dài nhưng lợi nhuận thấp. Tư nhân không muốn đầu tư → Nhà nước phải trực tiếp đảm nhận để bảo đảm sự phát triển chung.'
              },
              {
                icon: '3️⃣',
                title: 'Hạn chế mâu thuẫn xã hội',
                content: 'Sự thống trị của độc quyền tư nhân làm gia tăng phân hóa giàu nghèo khốc liệt. Nhà nước phải can thiệp thông qua các chính sách an sinh xã hội, thuế thu nhập lũy tiến, điều tiết thu nhập nhằm duy trì ổn định xã hội, xoa dịu mâu thuẫn.'
              },
              {
                icon: '4️⃣',
                title: 'Toàn cầu hóa & Cạnh tranh quốc tế',
                content: 'Xuuyên kinh tế đối ngoại tầm quốc gia. Nhà nước đứng ra ký kết hiệp định, bảo vệ lợi ích của các tập đoàn trong nước trước đối thủ nước ngoài.'
              }
            ]} />
          </div>

          <div className="ap-verdict ap-fade" style={{ marginTop: 32, border: '1px solid rgba(255,59,48,0.2)', background: 'rgba(255,59,48,0.05)', maxWidth: 860 }}>
            <span className="ap-verdict-icon" style={{ color: '#ff3b30' }}>⚠️</span>
            <p style={{ color: '#a1a1a6', fontSize: '14px', lineHeight: '1.7', textAlign: 'left' }}>
              <strong style={{ color: '#f5f5f7' }}>Bản chất của Độc quyền Nhà nước trong CNTB:</strong> Là sự kết hợp sức mạnh của các tổ chức độc quyền tư nhân với sức mạnh của nhà nước tư sản nhằm phục vụ lợi ích của tư sản độc quyền và bảo vệ hệ thống tư bản chủ nghĩa.
            </p>
          </div>
        </div>
      </section>

      {/* ======= PHẦN V: TÁC ĐỘNG ======= */}
      <section id="tac-dong" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần V</p>
          <h2 className="ap-heading ap-slide-up">Tác động của <span className="ap-grad">Độc quyền.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 64px' }}>
            Hai mặt đối lập song hành của độc quyền đối với nền kinh tế xã hội.
          </p>

          <div className="ap-two-col ap-fade">
            <div className="ap-dark-card" style={{ borderTop: '3px solid #30d158' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>✅</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#30d158' }}>Tác động Tích cực</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0 }}>
                {[
                  ['Thúc đẩy tiến bộ khoa học kỹ thuật', 'Sở hữu tiềm lực tài chính khổng lồ cho phép đầu tư dài hạn vào R&D, tạo ra các công nghệ đột phá mới.'],
                  ['Nâng cao năng suất lao động xã hội', 'Tập trung sản xuất quy mô lớn, tối ưu hóa quy trình quản trị hiện đại, giảm chi phí trung bình.'],
                  ['Thúc đẩy sản xuất lớn hiện đại', 'Hình thành các chuỗi liên kết giá trị, đóng vai trò đầu tàu dẫn dắt các ngành kinh tế phát triển.']
                ].map(([title, desc], idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#a1a1a6', lineHeight: 1.6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', flexShrink: 0, marginTop: 7 }} />
                    <span><strong style={{ color: '#f5f5f7' }}>{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ap-dark-card" style={{ borderTop: '3px solid #ff453a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>❌</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#ff453a' }}>Tác động Tiêu cực</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0 }}>
                {[
                  ['Gây thiệt hại cho người tiêu dùng', 'Bán hàng với giá độc quyền cao và ép mua với giá độc quyền thấp, làm giảm phúc lợi xã hội.'],
                  ['Kìm hãm tiến bộ kỹ thuật', 'Khi giữ vị thế độc quyền tuyệt đối, doanh nghiệp có xu hướng trì hoãn đổi mới công nghệ để bảo vệ lợi nhuận hiện tại.'],
                  ['Gia tăng bất bình đẳng xã hội', 'Lợi nhuận khổng lồ tập trung vào tay một nhóm nhỏ đầu sỏ tài chính, gia tăng khoảng cách giàu nghèo.']
                ].map(([title, desc], idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#a1a1a6', lineHeight: 1.6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff453a', flexShrink: 0, marginTop: 7 }} />
                    <span><strong style={{ color: '#f5f5f7' }}>{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======= PHẦN VI: QUAN HỆ CẠNH TRANH ======= */}
      <section id="canh-tranh" className="ap-section" style={{ background: '#111' }}>
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần VI</p>
          <h2 className="ap-heading ap-slide-up">Quan hệ <span style={{ color: '#0a84ff' }}>Cạnh tranh & Độc quyền.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
            Độc quyền không tiêu diệt cạnh tranh tự do mà cùng song tồn và tạo ra các hình thức cạnh tranh gay gắt hơn.
          </p>

          <blockquote className="ap-quote ap-fade" style={{ marginBottom: 48, borderLeftColor: '#0a84ff', background: 'rgba(10,132,255,0.04)' }}>
            <p>"Độc quyền sinh ra từ cạnh tranh tự do, độc quyền không tiêu diệt cạnh tranh, mà tồn tại bên trên và bên cạnh nó, từ đó sinh ra những mâu thuẫn và xung đột cực kỳ gay gắt và sâu sắc."</p>
            <cite>— V.I. Lênin</cite>
          </blockquote>

          {/* Grid for competition types */}
          <div className="ap-theory-grid ap-fade" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {[
              {
                num: '01',
                title: 'Cạnh tranh giữa Độc quyền và ngoài Độc quyền',
                desc: 'Các tập đoàn lớn chèn ép, ngăn cản nguồn cung cấp nguyên liệu, phong tỏa phân phối đối với doanh nghiệp nhỏ để độc chiếm thị trường.',
                tags: ['Ưu thế vốn', 'Chèn ép kỹ thuật', 'Tẩy chay']
              },
              {
                num: '02',
                title: 'Cạnh tranh giữa các Tổ chức Độc quyền',
                desc: 'Cuộc chiến khốc liệt giữa các ông lớn cùng ngành hoặc khác ngành nhằm tranh giành thị trường tiêu thụ và nguồn tài nguyên chiến lược.',
                tags: ['Apple vs Samsung', 'Chiến tranh giá cả', 'Mua đứt sáp nhập']
              },
              {
                num: '03',
                title: 'Cạnh tranh trong nội bộ Tổ chức Độc quyền',
                desc: 'Các thành viên trong cùng một cartel, liên minh cạnh tranh ngầm để giành quyền kiểm soát cổ phần chi phối và tỉ lệ chia lợi ích lớn hơn.',
                tags: ['Thâu tóm cổ phần', 'Lợi ích nhóm', 'Tranh chấp quyền lực']
              }
            ].map((item, idx) => (
              <div key={idx} className="ap-theory-card" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(10,132,255,0.25)', fontFamily: 'monospace', lineHeight: 1 }}>{item.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginTop: 10, textAlign: 'left' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#a1a1a6', lineHeight: 1.6, flex: 1, textAlign: 'left' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                  {item.tags.map((t, i) => (
                    <span key={i} style={{ background: 'rgba(10,132,255,0.1)', color: '#0a84ff', borderRadius: 980, padding: '3px 8px', fontSize: 11, fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PHẦN VII: 5 ĐẶC ĐIỂM ======= */}
      <section id="5-diem" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần VII</p>
          <h2 className="ap-heading ap-slide-up">5 Đặc điểm Kinh tế của <span className="ap-grad">CNTB Độc quyền.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
            Lý luận kinh tế kinh điển của V.I.Lênin về chủ nghĩa tư bản độc quyền tư nhân.
          </p>

          <div className="ap-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {[
              { num: '01', title: 'Tập trung sản xuất và các tổ chức độc quyền', desc: 'Sự tích tụ và tập trung sản xuất cao độ dẫn đến hình thành các liên minh lớn chi phối toàn bộ ngành hàng (Cartel, Syndicate, Trust, Consortium).' },
              { num: '02', title: 'Tư bản tài chính và Đầu sỏ tài chính', desc: 'Sự hòa nhập giữa tư bản ngân hàng độc quyền lớn nhất và tư bản công nghiệp độc quyền tạo nên thế lực tài phiệt chi phối toàn bộ nền kinh tế chính trị.' },
              { num: '03', title: 'Xuất khẩu tư bản trở thành phổ biến', desc: 'Khác với xuất khẩu hàng hóa, xuất khẩu tư bản là đưa vốn ra nước ngoài (FDI, FPI) để khai thác tài nguyên và nhân công rẻ mạt nhằm thu lợi nhuận siêu ngạch.' },
              { num: '04', title: 'Phân chia thị trường thế giới giữa các liên minh độc quyền', desc: 'Các tập đoàn độc quyền quốc tế lớn phân chia thị trường tiêu thụ toàn cầu, tạo ra các thỏa ước khống chế ranh giới thương mại thế giới.' },
              { num: '05', title: 'Phân chia lãnh thổ thế giới giữa các cường quốc tư bản', desc: 'Các tập đoàn thúc đẩy chính phủ mở rộng tầm ảnh hưởng địa chính trị, dẫn đến xung đột thực dân, chiến tranh để giành giật thuộc địa và vùng ảnh hưởng.' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="ap-dark-card"
                style={{
                  background: '#111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  gridColumn: idx === 4 ? 'span 2' : 'auto',
                  padding: 32,
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#30d158', letterSpacing: '0.05em', marginBottom: 8 }}>ĐẶC ĐIỂM {item.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f5f5f7', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#a1a1a6', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Forms of Monopoly organization */}
          <h3 className="ap-fade" style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginTop: 56, marginBottom: 24, textAlign: 'left', maxWidth: 900, margin: '56px auto 24px' }}>
            Các hình thức tổ chức độc quyền (từ thấp đến cao):
          </h3>
          <div className="ap-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              { name: 'Cartel (Các-ten)', level: 1, desc: 'Các doanh nghiệp thỏa thuận về giá cả, thị trường, sản lượng nhưng độc lập hoàn toàn về cả sản xuất và lưu thông.' },
              { name: 'Syndicate (Xanh-đi-ca)', level: 2, desc: 'Các doanh nghiệp giữ tính độc lập sản xuất, nhưng khâu lưu thông (mua bán nguyên vật liệu, bán sản phẩm) do ban quản trị chung quản trị.' },
              { name: 'Trust (Tô-rớt)', level: 3, desc: 'Doanh nghiệp mất hoàn toàn tính độc lập sản xuất và lưu thông, sáp nhập và nhận cổ phần tương ứng chịu sự quản trị thống nhất.' },
              { name: 'Consortium (Công-xoóc-xi-om)', level: 4, desc: 'Mức độ cao nhất. Các công ty đa ngành, ngân hàng hợp nhất dưới quyền chi phối tài chính tối cao của một nhóm tài phiệt đầu sỏ.' }
            ].map((item, idx) => (
              <div key={idx} className="ap-dark-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', padding: 24, textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginBottom: 8 }}>{item.name}</div>
                <p style={{ fontSize: 13, color: '#a1a1a6', lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#6e6e73' }}>Mức độ liên kết:</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4].map(dot => (
                      <div
                        key={dot}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: dot <= item.level ? '#30d158' : 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PHẦN VIII: ĐẶC ĐIỂM ĐQ NHÀ NƯỚC ======= */}
      <section id="dq-nn-dactrung" className="ap-section" style={{ background: '#111' }}>
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phần VIII</p>
          <h2 className="ap-heading ap-slide-up">Đặc điểm của <span style={{ color: '#30d158' }}>Độc quyền Nhà nước.</span></h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
            Lý luận của Lênin về 3 đặc trưng độc lập của độc quyền nhà nước trong nền kinh tế thị trường tư bản chủ nghĩa.
          </p>

          <div className="ap-chain ap-fade" style={{ maxWidth: 860, margin: '0 auto' }}>
            {[
              { num: '1', title: 'Sự kết hợp nhân sự giữa Nhà nước và Tổ chức Độc quyền', desc: 'Có sự luân chuyển nhân sự liên tục: quan chức nhà nước chuyển sang làm giám đốc các tập đoàn, ngân hàng tư nhân và ngược lại. Các hiệp hội tư bản đóng vai trò là "chính phủ đằng sau chính phủ".' },
              { num: '2', title: 'Sự hình thành và phát triển của Sở hữu Nhà nước', desc: 'Nhà nước tích lũy vốn đầu tư xây dựng các công ty công ích, hạ tầng cơ sở cốt lõi, hoặc quốc hữu hóa các doanh nghiệp tư nhân. Nhà nước mở rộng thị trường thông qua các gói thầu mua sắm công lớn.' },
              { num: '3', title: 'Độc quyền Nhà nước là công cụ điều tiết kinh tế vĩ mô', desc: 'Sử dụng hệ thống chính sách tài khóa, tiền tệ, hành pháp để hỗ trợ các tập đoàn tư nhân. Sự dung hợp của 3 cơ chế điều tiết: thị trường + độc quyền tư nhân + điều tiết vĩ mô của nhà nước.' }
            ].map((item, idx) => (
              <div key={idx} className="ap-dark-card" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 24, padding: 28, marginBottom: 16 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(48,209,88,0.1)',
                  color: '#30d158',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  flexShrink: 0
                }}>{item.num}</div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f5f5f7', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: '#a1a1a6', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="ap-cta">
        <div className="ap-container">
          <h2 className="ap-cta-title ap-slide-up">Áp dụng thực tiễn.</h2>
          <p className="ap-cta-sub ap-fade">Bạn đã học xong lý thuyết — Hãy phân tích Apple qua lăng kính của Lênin!</p>
          <div className="ap-cta-btns ap-fade">
            <Link to="/apple" className="ap-btn-primary">
              🍎 Xem Case Study Apple
            </Link>
            <Link to="/quiz" className="ap-btn-ghost">
              📝 Làm Quiz ôn tập (20 câu)
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
