import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appleEcosystemLockedImg from '../assets/apple_ecosystem_locked.png'

/* ─── Apple-style nav items ─────────────────── */
const NAV_ITEMS = [
  { id: 'hero',      label: 'Tổng quan' },
  { id: 'journey',   label: 'Hành trình' },
  { id: 'price-high', label: 'Giá ĐQ cao' },
  { id: 'price-low',  label: 'Giá ĐQ thấp' },
  { id: 'compare',   label: 'So sánh' },
  { id: 'theory',    label: 'Lý thuyết' },
]

const ECO_ITEMS = [
  { id: 'app-store', name: 'App Store', icon: '🏪', x: 320, y: 200, color: '#0071e3', desc: 'Cửa hàng ứng dụng duy nhất trên iOS. Apple thu phí 30% đối với lập trình viên và cấm tải phần mềm từ nguồn bên ngoài (sideloading) để kiểm soát 100% doanh thu.' },
  { id: 'icloud', name: 'iCloud', icon: '☁️', x: 260, y: 304, color: '#30d158', desc: 'Dịch vụ lưu trữ đám mây tích hợp sâu. Đồng bộ ảnh, danh bạ, sao lưu thiết bị. Rất khó chuyển dữ liệu sang Android vì không có giải pháp chính thức từ Apple.' },
  { id: 'apple-watch', name: 'Apple Watch', icon: '⌚', x: 140, y: 304, color: '#ffd60a', desc: 'Đồng hồ thông minh bán chạy nhất thế giới, nhưng chỉ cho phép kết nối đầy đủ tính năng với iPhone. Người dùng đổi sang điện thoại Android sẽ mất luôn đồng hồ.' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '💳', x: 80, y: 200, color: '#ff3b30', desc: 'Ví điện tử độc quyền được quyền truy cập chip thanh toán NFC trên iPhone. Apple ngăn chặn các ứng dụng ngân hàng và ví điện tử đối thủ tiếp cận hạ tầng.' },
  { id: 'imessage', name: 'iMessage & FaceTime', icon: '💬', x: 140, y: 96, color: '#ff9500', desc: 'Nhắn tin và gọi điện miễn phí giữa các thiết bị Apple. Sử dụng bóng tin nhắn màu xanh lá và giảm chất lượng ảnh gửi từ Android để tạo rào cản tâm lý.' },
  { id: 'airpods', name: 'AirPods', icon: '🎧', x: 260, y: 96, color: '#a855f7', desc: 'Tai nghe tự động kết nối và chuyển đổi cực nhanh giữa các thiết bị Apple cùng iCloud. Khi dùng trên Android, AirPods mất hầu hết tính năng tiện ích.' }
]

/* ─── Intersection-observer fade helper ─────── */
function useFadeIn(ref) {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('ap-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.08 }
    )
    const el = ref.current
    if (el)
      el.querySelectorAll('.ap-fade,.ap-slide-up,.ap-slide-left,.ap-slide-right,.ap-flow-step').forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [ref])
}

/* ─── Sticky nav active section ─────────────── */
function useActive(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return active
}

/* ─── Main component ─────────────────────────── */
export default function ApplePage() {
  const pageRef = useRef(null)
  const [navScrolled, setNavScrolled] = useState(false)
  const [selectedEco, setSelectedEco] = useState(ECO_ITEMS[0])
  const active = useActive(NAV_ITEMS.map(n => n.id))
  useFadeIn(pageRef)

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="ap-root" ref={pageRef}>
      
      {/* Styles for ecosystem connection map */}
      <style>{`
        .eco-node {
          cursor: pointer;
        }
        .eco-node circle {
          transition: fill 0.3s, r 0.3s, filter 0.3s;
        }
        .eco-node:hover circle {
          r: 10px;
          filter: drop-shadow(0 0 8px var(--eco-color));
        }
        .eco-node--active circle {
          fill: var(--eco-color) !important;
          r: 10px;
          filter: drop-shadow(0 0 10px var(--eco-color));
        }
        .eco-line-glow {
          stroke-dasharray: 5;
          animation: eco-pulse 2s linear infinite;
        }
        @keyframes eco-pulse {
          to { stroke-dashoffset: -20; }
        }
      `}</style>

      {/* Sticky top nav (Apple style) */}
      <nav className={`ap-nav ${navScrolled ? 'ap-nav--scrolled' : ''}`}>
        <div className="ap-nav-inner">
          <Link to="/" className="ap-nav-back">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="currentColor">
              <path d="M8 1L1 7.5 8 14"/>
            </svg>
            Lý thuyết
          </Link>
          <span className="ap-nav-logo">🍎</span>
          <div className="ap-nav-links">
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`ap-nav-link ${active === n.id ? 'ap-nav-link--active' : ''}`}
                onClick={() => scrollTo(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
          <Link to="/quiz" className="ap-nav-cta">Quiz →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="ap-hero">
        <div className="ap-hero-eyebrow ap-fade">Case Study · MLN122 Chương 4</div>
        <h1 className="ap-hero-title ap-slide-up">Apple.</h1>
        <p className="ap-hero-sub ap-slide-up">
          Từ cạnh tranh tự do đến quyền lực thị trường.<br/>
          Phân tích qua lăng kính lý luận của V.I. Lênin.
        </p>

        {/* Stats strip */}
        <div className="ap-hero-stats ap-fade">
          {[
            { val: '~57%', desc: 'Thị phần smartphone cao cấp toàn cầu' },
            { val: '$3T', desc: 'Vốn hóa thị trường' },
            { val: '30%', desc: 'Phí hoa hồng App Store' },
            { val: '2B+', desc: 'Thiết bị Apple đang hoạt động' },
          ].map(s => (
            <div key={s.val} className="ap-stat">
              <span className="ap-stat-val">{s.val}</span>
              <span className="ap-stat-desc">{s.desc}</span>
            </div>
          ))}
        </div>

        <div className="ap-hero-glow" />
      </section>

      {/* SECTION 1 — JOURNEY */}
      <section id="journey" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phân tích 01</p>
          <h2 className="ap-heading ap-slide-up">
            Từ cạnh tranh tự do<br/>
            <span className="ap-grad">đến Độc quyền.</span>
          </h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 620, margin: '0 auto 64px' }}>
            Thị trường smartphone từng có hàng chục đối thủ — Nokia, BlackBerry, HTC, LG, Motorola… 
            Apple gia nhập 2007 với iPhone và từng bước xây dựng một hệ sinh thái không thể thay thế.
          </p>

          {/* Flowchart */}
          <div className="ap-flow">
            {[
              { year: '2000–06', icon: '⚔️', title: 'Cạnh tranh tự do', sub: 'Nokia, BlackBerry, HTC, LG cạnh tranh ngang nhau. Không có hãng nào thống trị.', color: '#6e6e73' },
              { year: '2007',    icon: '📱', title: 'Apple ra mắt iPhone', sub: 'Đầu tư R&D khổng lồ + thiết kế đột phá → chiếm thị phần cao cấp nhanh chóng.', color: '#0071e3' },
              { year: '2008–15', icon: '🌐', title: 'Xây hệ sinh thái khép kín', sub: 'App Store → iCloud → Apple Watch → Apple Pay. Người dùng bị "khoá" trong thế giới Apple.', color: '#30d158' },
              { year: '2015–nay',icon: '👑', title: 'Quyền lực thị trường', sub: 'Thống trị phân khúc cao cấp. App Store thu 30%. Nhà cung cấp phụ thuộc hoàn toàn.', color: '#ffd60a' },
            ].map((step, i) => (
              <div key={i} className="ap-flow-step" style={{ '--step-color': step.color, transitionDelay: `${i * 0.1}s` }}>
                <div className="ap-flow-icon">{step.icon}</div>
                <div className="ap-flow-year">{step.year}</div>
                <div className="ap-flow-title">{step.title}</div>
                <div className="ap-flow-sub">{step.sub}</div>
                {i < 3 && <div className="ap-flow-arrow">→</div>}
              </div>
            ))}
          </div>

          {/* Text and image block */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center', textAlign: 'left', marginTop: 56 }}>
            <div>
              <blockquote className="ap-quote ap-fade" style={{ margin: 0, marginBottom: 20 }}>
                <p>"Tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất khi phát triển đến một mức độ nhất định lại dẫn tới độc quyền."</p>
                <cite>— V.I. Lênin</cite>
              </blockquote>
              <p style={{ fontSize: 18, color: '#a1a1a6', lineHeight: 1.7 }}>
                Bằng cách kết nối chặt chẽ giữa phần cứng độc quyền và hệ điều hành iOS khép kín, Apple tạo ra một rào cản chuyển đổi khổng lồ. 
                Người dùng khi đã lỡ sở hữu nhiều thiết bị Apple sẽ không thể rời đi vì chi phí từ bỏ hệ sinh thái là quá đắt đỏ và phiền phức.
              </p>
            </div>
            <div className="ap-fade" style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={appleEcosystemLockedImg} alt="Locked Ecosystem Orbit illustration" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — GIÁ CAO */}
      <section id="price-high" className="ap-section ap-section--light">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade" style={{ color: '#1d1d1f' }}>Phân tích 02</p>
          <h2 className="ap-heading ap-slide-up" style={{ color: '#1d1d1f' }}>
            Giá bán <span style={{ color: '#0071e3' }}>độc quyền cao.</span>
          </h2>
          <p className="ap-body ap-fade" style={{ color: '#6e6e73', maxWidth: 600, margin: '0 auto 64px' }}>
            Apple không giảm giá dù chi phí sản xuất giảm nhờ quy mô khổng lồ. Đây là đặc trưng của tổ chức độc quyền: áp đặt giá cao khi kiểm soát nền tảng.
          </p>

          <div className="ap-product-grid ap-fade">
            {[
              { name: 'iPhone 15 Pro Max', price: '$1,199', cost: '~$500', icon: '📱', note: 'Biên lợi nhuận ~60%' },
              { name: 'MacBook Pro M3 Max', price: '$3,999', cost: '~$700', icon: '💻', note: 'Không có thay thế trực tiếp' },
              { name: 'App Store (hoa hồng)', price: '30%', cost: '~3%', icon: '🏪', note: 'Cổng duy nhất trên iOS' },
              { name: 'Apple Care+', price: '$299/năm', cost: 'Chi phí thực tế thấp', icon: '🛡️', note: 'Bắt buộc nếu muốn bảo hành tốt' },
            ].map(p => (
              <div key={p.name} className="ap-product-card">
                <span className="ap-product-icon">{p.icon}</span>
                <div className="ap-product-name">{p.name}</div>
                <div className="ap-product-price">{p.price}</div>
                <div className="ap-product-cost">Chi phí ước tính: {p.cost}</div>
                <div className="ap-product-note">{p.note}</div>
              </div>
            ))}
          </div>

          {/* Interactive Apple Ecosystem Map */}
          <div style={{ marginTop: 80 }}>
            <p className="ap-eyebrow" style={{ color: '#1d1d1f' }}>Tương tác hệ sinh thái</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', marginBottom: 12 }}>
              Cơ Chế "Khóa Người Dùng" Của Apple
            </h3>
            <p style={{ fontSize: '18px', color: '#6e6e73', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Bấm vào các dịch vụ và thiết bị xung quanh iPhone để xem cách Apple bủa vây người dùng và cản trở đối thủ cạnh tranh.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', margin: '0 auto', maxWidth: '900px', background: '#000', borderRadius: 24, padding: '32px 24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              
              {/* Left Column: SVG Orbit connection map */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <svg width="400" height="400" viewBox="0 0 400 400">
                  {/* Central Node (iPhone) */}
                  <g transform="translate(200, 200)">
                    <circle cx="0" cy="0" r="50" fill="#111" stroke="#0071e3" strokeWidth="2.5" />
                    <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">iPhone</text>
                  </g>

                  {/* Pulsing connection line to selected */}
                  <line
                    x1="200"
                    y1="200"
                    x2={selectedEco.x}
                    y2={selectedEco.y}
                    stroke={selectedEco.color}
                    strokeWidth="3.5"
                    className="eco-line-glow"
                  />

                  {/* Other connection lines (static) */}
                  {ECO_ITEMS.filter(item => item.id !== selectedEco.id).map(item => (
                    <line
                      key={`line-${item.id}`}
                      x1="200"
                      y1="200"
                      x2={item.x}
                      y2={item.y}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Orbit nodes */}
                  {ECO_ITEMS.map(item => (
                    <g
                      key={item.id}
                      className={`eco-node ${selectedEco.id === item.id ? 'eco-node--active' : ''}`}
                      transform={`translate(${item.x}, ${item.y})`}
                      style={{ '--eco-color': item.color }}
                      onClick={() => setSelectedEco(item)}
                    >
                      <circle cx="0" cy="0" r="20" fill="#1c1c1e" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                      <text x="0" y="6" textAnchor="middle" fontSize="16">{item.icon}</text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Right Column: Connection details display */}
              <div style={{ textAlign: 'left', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: selectedEco.color, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  KẾT NỐI HỆ SINH THÁI
                </span>
                <h4 style={{ fontSize: '23px', fontWeight: 800, color: '#f5f5f7', marginBottom: 12 }}>
                  {selectedEco.icon} {selectedEco.name}
                </h4>
                <p style={{ fontSize: '18px', color: '#a1a1a6', lineHeight: 1.6, margin: 0 }}>
                  {selectedEco.desc}
                </p>
                <div style={{ marginTop: 24, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', borderLeft: `3px solid ${selectedEco.color}` }}>
                  <span style={{ fontSize: '15px', color: '#a1a1a6' }}>
                    <strong>Biểu hiện độc quyền:</strong> Hạn chế lựa chọn của khách hàng và ép nhà sản xuất phần mềm phải chấp nhận luật lệ riêng của Apple.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — GIÁ THẤP */}
      <section id="price-low" className="ap-section ap-section--dark">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Phân tích 03</p>
          <h2 className="ap-heading ap-slide-up">
            Giá mua <span className="ap-grad">độc quyền thấp.</span>
          </h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 600, margin: '0 auto 64px' }}>
            Apple ép giá nhà cung cấp và thu 30% từ lập trình viên — biểu hiện điển hình của "giá mua độc quyền thấp" theo lý thuyết Lênin.
          </p>

          <div className="ap-two-col ap-fade">
            {/* Cột trái: Nhà cung cấp */}
            <div className="ap-dark-card">
              <div className="ap-dark-card-icon">🏭</div>
              <h3 className="ap-dark-card-title">Ép giá Nhà cung cấp</h3>
              <div className="ap-chain">
                {[
                  'Apple đặt hàng hàng trăm triệu linh kiện',
                  'Foxconn, Samsung Display, TSMC phụ thuộc vào Apple',
                  'Không đồng ý → mất hợp đồng → phá sản',
                  'Apple ép giảm giá, tăng tiêu chuẩn chất lượng',
                  'Apple giữ hầu hết lợi nhuận trong chuỗi giá trị',
                ].map((s, i) => (
                  <div key={i} className="ap-chain-item">
                    <span className="ap-chain-dot" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Lập trình viên */}
            <div className="ap-dark-card">
              <div className="ap-dark-card-icon">👨‍💻</div>
              <h3 className="ap-dark-card-title">Ép phí Lập trình viên</h3>
              <div className="ap-chain">
                {[
                  'App Store — cổng DUY NHẤT để phân phối app trên iOS',
                  'Apple thu 30% từ mọi giao dịch trong app',
                  'Epic Games kiện: Apple vi phạm luật chống độc quyền',
                  'Spotify tố: Apple tạo sân chơi không bình đẳng',
                  'Lập trình viên không có lựa chọn thay thế trên iOS',
                ].map((s, i) => (
                  <div key={i} className="ap-chain-item">
                    <span className="ap-chain-dot" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ap-verdict ap-fade">
            <span className="ap-verdict-icon">⚖️</span>
            <p style={{ fontSize: '18px', color: '#a1a1a6', lineHeight: '1.7', textAlign: 'left' }}>
              <strong style={{ color: '#f5f5f7' }}>Kết luận Lênin:</strong> Apple thu "giá mua độc quyền thấp" từ cả nhà cung cấp lẫn lập trình viên — 
              đây là nguồn gốc của lợi nhuận độc quyền khổng lồ, bên cạnh giá bán cao đối với người tiêu dùng.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SO SÁNH */}
      <section id="compare" className="ap-section ap-section--light">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade" style={{ color: '#1d1d1f' }}>Phân tích 04</p>
          <h2 className="ap-heading ap-slide-up" style={{ color: '#1d1d1f' }}>
            Apple <span style={{ color: '#0071e3' }}>vs</span> Samsung.
          </h2>

          <div className="ap-compare-grid ap-fade">
            <div className="ap-compare-col ap-compare-col--header">
              <div className="ap-compare-criteria">Tiêu chí</div>
              {['Hệ sinh thái', 'App Store', 'Định giá', 'Chuỗi cung ứng', 'Biên lợi nhuận gộp', 'Kiểm soát nền tảng', 'Quyền lực thị trường'].map(c => (
                <div key={c} className="ap-compare-row-label">{c}</div>
              ))}
            </div>
            <div className="ap-compare-col ap-compare-col--apple">
              <div className="ap-compare-col-header">🍎 Apple</div>
              {[
                'Khép kín hoàn toàn (iOS)',
                'Độc quyền, thu 30%',
                'Cao — ít khuyến mãi',
                'Ép giá nhà cung cấp mạnh',
                '~45–47%',
                'Kiểm soát toàn bộ iOS + App Store',
                'Rất cao ở phân khúc cao cấp',
              ].map((v, i) => (
                <div key={i} className="ap-compare-row-val ap-compare-row-val--apple">{v}</div>
              ))}
            </div>
            <div className="ap-compare-col ap-compare-col--samsung">
              <div className="ap-compare-col-header">📱 Samsung</div>
              {[
                'Mở (Android + One UI)',
                'Google Play — có thể cài ngoài',
                'Đa phân khúc từ thấp đến cao',
                'Tự sản xuất nhiều linh kiện',
                '~35–38%',
                'Phụ thuộc Google cho Android',
                'Phân tán hơn qua nhiều phân khúc',
              ].map((v, i) => (
                <div key={i} className="ap-compare-row-val ap-compare-row-val--samsung">{v}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — LÝ THUYẾT */}
      <section id="theory" className="ap-section ap-section--gradient">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Liên hệ Lý thuyết</p>
          <h2 className="ap-heading ap-slide-up">
            Apple qua lăng kính <span className="ap-grad">Lênin.</span>
          </h2>

          <div className="ap-theory-grid ap-fade">
            {[
              { icon: '📈', theory: 'Tập trung sản xuất → Độc quyền', apple: 'Apple thống trị phân khúc cao cấp sau khi hàng loạt đối thủ (Nokia, BlackBerry, LG) rút lui.', link: '/#khai-niem' },
              { icon: '💰', theory: 'Giá bán độc quyền cao', apple: 'iPhone, MacBook, Apple Watch — giá cao hơn chi phí sản xuất rất nhiều lần.', link: '/#gia-ca' },
              { icon: '📉', theory: 'Giá mua độc quyền thấp', apple: 'App Store 30% + ép Foxconn, Samsung Display giảm giá — thu lợi nhuận độc quyền.', link: '/#gia-ca' },
              { icon: '💎', theory: 'Tư bản tài chính & Đầu sỏ', apple: 'Apple nắm hàng trăm tỷ USD tiền mặt, chi phối nhiều ngành từ chip đến nội dung số.', link: '/#5-diem' },
              { icon: '🌏', theory: 'Xuất khẩu tư bản phổ biến', apple: 'Apple đầu tư nhà máy và trung tâm dữ liệu tại Việt Nam, Ấn Độ, Ireland...', link: '/#5-diem' },
              { icon: '⚔️', theory: 'Độc quyền không thủ tiêu cạnh tranh', apple: 'Apple vẫn cạnh tranh gay gắt với Samsung, Google — nhưng cạnh tranh ở cấp độ tập đoàn khổng lồ.', link: '/#canh-tranh' },
            ].map((item, i) => (
              <div key={i} className="ap-theory-card" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="ap-theory-icon">{item.icon}</div>
                <div className="ap-theory-body">
                  <div className="ap-theory-label">Lý thuyết</div>
                  <div className="ap-theory-theory">{item.theory}</div>
                  <div className="ap-theory-label" style={{ marginTop: 10 }}>Apple</div>
                  <div className="ap-theory-apple">{item.apple}</div>
                </div>
                <Link to={item.link} className="ap-theory-link">📖 Xem lý thuyết</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="ap-cta ap-fade">
        <h2 className="ap-cta-title">Kiểm tra kiến thức.</h2>
        <p className="ap-cta-sub">20 câu trắc nghiệm · Cạnh tranh & Độc quyền</p>
        <div className="ap-cta-btns">
          <Link to="/quiz" className="ap-btn-primary">Làm Quiz ngay →</Link>
          <Link to="/" className="ap-btn-ghost">← Ôn lại Lý thuyết</Link>
        </div>
      </section>
    </div>
  )
}
