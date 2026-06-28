import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appleEcosystemLockedImg from '../assets/apple_ecosystem_locked.png'
import appleIphoneCenterImg from '../assets/apple_iphone_center.png'
import appleAppstoreImg from '../assets/apple_appstore.png'
import appleIcloudImg from '../assets/apple_icloud.png'
import appleWatchImg from '../assets/apple_watch.png'
import applePayImg from '../assets/apple_pay.png'
import appleImessageImg from '../assets/apple_imessage.png'
import appleAirpodsImg from '../assets/apple_airpods.png'
import appleJourneyFreeCompetitionImg from '../assets/apple_journey_free_competition.png'
import appleJourneyLaunchImg from '../assets/apple_journey_launch.png'
import appleJourneyLockinImg from '../assets/apple_journey_lockin.png'
import appleJourneyMonopolyImg from '../assets/apple_journey_monopoly.png'
import appleMacbookImg from '../assets/apple_macbook.png'
import appleCareImg from '../assets/apple_care.png'
import appleIphone15ProMaxImg from '../assets/apple_iphone15_pro_max.png'

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
  { id: 'app-store', name: 'App Store', icon: '🏪', img: appleAppstoreImg, x: 320, y: 200, color: '#0071e3', textColor: '#2a92ff', desc: 'Cửa hàng ứng dụng duy nhất trên iOS. Apple thu phí 30% đối với lập trình viên và cấm tải phần mềm từ nguồn bên ngoài (sideloading) để kiểm soát 100% doanh thu.' },
  { id: 'icloud', name: 'iCloud', icon: '☁️', img: appleIcloudImg, x: 260, y: 304, color: '#30d158', textColor: '#30d158', desc: 'Dịch vụ lưu trữ đám mây tích hợp sâu. Đồng bộ ảnh, danh bạ, sao lưu thiết bị. Rất khó chuyển dữ liệu sang Android vì không có giải pháp chính thức từ Apple.' },
  { id: 'apple-watch', name: 'Apple Watch', icon: '⌚', img: appleWatchImg, x: 140, y: 304, color: '#ffd60a', textColor: '#ffd60a', desc: 'Đồng hồ thông minh bán chạy nhất thế giới, nhưng chỉ cho phép kết nối đầy đủ tính năng với iPhone. Người dùng đổi sang điện thoại Android sẽ mất luôn đồng hồ.' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '💳', img: applePayImg, x: 80, y: 200, color: '#ff3b30', textColor: '#ff6b63', desc: 'Ví điện tử độc quyền được quyền truy cập chip thanh toán NFC trên iPhone. Apple ngăn chặn các ứng dụng ngân hàng và ví điện tử đối thủ tiếp cận hạ tầng.' },
  { id: 'imessage', name: 'iMessage & FaceTime', icon: '💬', img: appleImessageImg, x: 140, y: 96, color: '#ff9500', textColor: '#ff9500', desc: 'Nhắn tin và gọi điện miễn phí giữa các thiết bị Apple. Sử dụng bóng tin nhắn màu xanh lá và giảm chất lượng ảnh gửi từ Android để tạo rào cản tâm lý.' },
  { id: 'airpods', name: 'AirPods', icon: '🎧', img: appleAirpodsImg, x: 260, y: 96, color: '#a855f7', textColor: '#c084fc', desc: 'Tai nghe tự động kết nối và chuyển đổi cực nhanh giữa các thiết bị Apple cùng iCloud. Khi dùng trên Android, AirPods mất hầu hết tính năng tiện ích.' }
]

const COMPARE_DETAILS = [
  {
    label: 'Hệ sinh thái',
    apple: 'Khép kín hoàn toàn (iOS)',
    samsung: 'Mở (Android + One UI)',
    title: 'Hệ sinh thái',
    appleDetail: 'Hệ sinh thái iOS khép kín hoạt động như một "pháo đài độc quyền" tự nhiên. Khi mua iPhone, người dùng bị ràng buộc vào iCloud, Apple Watch, Apple Pay... tạo ra chi phí chuyển đổi (switching cost) cực kỳ cao để giữ chân họ.',
    samsungDetail: 'Dùng hệ điều hành Android mở, tạo sự đa dạng sản phẩm nhưng khiến Samsung phụ thuộc lớn vào Google (hệ sinh thái phần mềm Android cốt lõi), khó tự tạo ra thế độc quyền khép kín hoàn toàn.'
  },
  {
    label: 'App Store',
    apple: 'Độc quyền, thu 30%',
    samsung: 'Google Play — có thể cài ngoài',
    title: 'Quyền kiểm soát kho ứng dụng',
    appleDetail: 'App Store là cổng phân phối ứng dụng duy nhất trên iOS. Apple áp đặt mức phí hoa hồng 30% (Apple Tax), là biểu hiện rõ nét của việc áp đặt "giá độc quyền cao" nhờ kiểm soát cơ sở hạ tầng số.',
    samsungDetail: 'Cho phép người dùng cài đặt ứng dụng từ nhiều nguồn khác nhau ngoài Google Play (như Galaxy Store hoặc trực tiếp từ file APK), thể hiện tính chất cạnh tranh mở hơn của Android.'
  },
  {
    label: 'Định giá',
    apple: 'Cao — ít khuyến mãi',
    samsung: 'Đa phân khúc từ thấp đến cao',
    title: 'Chiến lược định giá sản phẩm',
    appleDetail: 'Áp dụng chính sách "giá độc quyền cao" cho các sản phẩm phần cứng (iPhone, MacBook) để thu lợi nhuận độc quyền khổng lồ vượt xa chi phí sản xuất thực tế.',
    samsungDetail: 'Định giá đa phân khúc, dàn trải từ giá rẻ đến cao cấp nhằm bao phủ thị trường. Phản ánh chiến lược cạnh tranh hỗn hợp giữa cạnh tranh tự do (phân khúc thấp) và độc quyền nhóm (phân khúc cao).'
  },
  {
    label: 'Chuỗi cung ứng',
    apple: 'Ép giá nhà cung cấp mạnh',
    samsung: 'Tự sản xuất nhiều linh kiện',
    title: 'Sức ép chuỗi cung ứng',
    appleDetail: 'Sử dụng quyền lực mua cực lớn (monopsony power) để áp đặt "giá mua độc quyền thấp" lên các đối tác trong chuỗi cung ứng (ép Foxconn, Samsung Display... giảm giá bán tối đa).',
    samsungDetail: 'Sở hữu chuỗi sản xuất tự cung tự cấp cực mạnh (tự sản xuất chip, màn hình, RAM, pin), giảm sự phụ thuộc vào bên ngoài nhưng phải gánh chịu chi phí vận hành nhà máy khổng lồ.'
  },
  {
    label: 'Biên lợi nhuận gộp',
    apple: '~45–47%',
    samsung: '~35–38%',
    title: 'Biên lợi nhuận gộp',
    appleDetail: 'Đạt biên lợi nhuận gộp siêu cao nhờ áp đặt thành công cả hai gọng kìm: giá bán độc quyền cao đối với người tiêu dùng và giá mua độc quyền thấp đối với nhà cung ứng và lập trình viên.',
    samsungDetail: 'Biên lợi nhuận gộp thấp hơn do cơ cấu sản phẩm trải dài nhiều phân khúc giá rẻ có biên lợi nhuận mỏng và chi phí tự vận hành sản xuất linh kiện gốc lớn.'
  },
  {
    label: 'Kiểm soát nền tảng',
    apple: 'Kiểm soát toàn bộ iOS + App Store',
    samsung: 'Phụ thuộc Google cho Android',
    title: 'Kiểm soát nền tảng',
    appleDetail: 'Nắm giữ toàn bộ quyền kiểm soát cả phần cứng lẫn phần mềm. Đây là đỉnh cao của việc tích hợp dọc để ngăn chặn đối thủ xâm nhập thị trường và bảo vệ lợi nhuận độc quyền lâu dài.',
    samsungDetail: 'Dù mạnh về sản xuất phần cứng nhưng hệ điều hành và các dịch vụ cốt lõi vẫn dựa vào Android của Google, khiến Samsung dễ bị ảnh hưởng bởi các quyết định chiến lược của Google.'
  },
  {
    label: 'Quyền lực thị trường',
    apple: 'Rất cao ở phân khúc cao cấp',
    samsung: 'Phân tán hơn qua nhiều phân khúc',
    title: 'Quyền lực thị trường',
    appleDetail: 'Dù lượng máy bán ra ít hơn Samsung, Apple thâu tóm tới hơn 85% lợi nhuận của toàn ngành smartphone toàn cầu, thể hiện quyền lực độc quyền tuyệt đối.',
    samsungDetail: 'Có thị phần lớn nhất về số lượng máy bán ra nhưng lợi nhuận phân tán do sự cạnh tranh gay gắt từ các thương hiệu Trung Quốc ở phân khúc giá rẻ và trung cấp.'
  }
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
  const [selectedCompareIdx, setSelectedCompareIdx] = useState(null)
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
        .eco-node:focus {
          outline: none;
        }
        .eco-node:focus circle, .eco-node:focus-visible circle {
          outline: none;
          r: 10px;
          stroke: var(--eco-color);
          stroke-width: 2px;
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
        
        .ap-compare-wrapper {
          width: 100%;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .ap-compare-tr {
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .ap-compare-tr:hover {
          background-color: rgba(0, 113, 227, 0.04) !important;
        }
        .ap-compare-tr--active {
          background-color: rgba(0, 113, 227, 0.08) !important;
        }
        .ap-compare-tr--active td {
          border-bottom-color: rgba(0, 113, 227, 0.2) !important;
        }
        .ap-explain-panel {
          background: #fff;
          border: 1px solid #d2d2d7;
          border-radius: 18px;
          padding: 28px;
          min-height: 420px;
          text-align: left;
          color: #1d1d1f;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .ap-explain-header {
          font-size: 20px;
          font-weight: 700;
          color: #1d1d1f;
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e5ea;
          padding-bottom: 12px;
        }
        .ap-explain-section {
          margin-bottom: 20px;
        }
        .ap-explain-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .ap-explain-body {
          font-size: 16px;
          line-height: 1.6;
          color: #515154;
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
          <span className="ap-nav-logo" style={{ display: 'flex', alignItems: 'center', color: '#f5f5f7' }}>
            <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
          </span>
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
        <h1 className="ap-hero-title ap-slide-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <svg viewBox="0 0 814 1000" width="64" height="64" fill="currentColor">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
          </svg>
          Apple
        </h1>
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
          <p className="ap-eyebrow ap-fade">Hành trình</p>
          <h2 className="ap-heading ap-slide-up">
            Từ cạnh tranh tự do<br/>
            <span className="ap-grad">đến Độc quyền</span>
          </h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 620, margin: '0 auto 64px' }}>
            Thị trường smartphone từng có hàng chục đối thủ — Nokia, BlackBerry, HTC, LG, Motorola… 
            Apple gia nhập 2007 với iPhone và từng bước xây dựng một hệ sinh thái không thể thay thế.
          </p>

          {/* Flowchart */}
          <div className="ap-flow">
            {[
              { year: '2000–06', img: appleJourneyFreeCompetitionImg, title: 'Cạnh tranh tự do', sub: 'Nokia, BlackBerry, HTC, LG cạnh tranh ngang nhau. Không có hãng nào thống trị.', color: '#6e6e73' },
              { year: '2007',    img: appleJourneyLaunchImg, title: 'Apple ra mắt iPhone', sub: 'Đầu tư R&D khổng lồ + thiết kế đột phá → chiếm thị phần cao cấp nhanh chóng.', color: '#0071e3' },
              { year: '2008–15', img: appleJourneyLockinImg, title: 'Xây hệ sinh thái khép kín', sub: 'App Store → iCloud → Apple Watch → Apple Pay. Người dùng bị "khoá" trong thế giới Apple.', color: '#30d158' },
              { year: '2015–nay',img: appleJourneyMonopolyImg, title: 'Quyền lực thị trường', sub: 'Thống trị phân khúc cao cấp. App Store thu 30%. Nhà cung cấp phụ thuộc hoàn toàn.', color: '#ffd60a' },
            ].map((step, i) => (
              <div key={i} className="ap-flow-step" style={{ '--step-color': step.color, transitionDelay: `${i * 0.1}s` }}>
                <div className="ap-flow-icon" style={{ borderRadius: 12, overflow: 'hidden', width: 64, height: 64, margin: '0 auto 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={step.img} alt={step.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
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
              <img src={appleEcosystemLockedImg} alt="Locked Ecosystem Orbit illustration" loading="lazy" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — GIÁ CAO */}
      <section id="price-high" className="ap-section ap-section--light">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade" style={{ color: '#1d1d1f' }}>Giá bán cao</p>
          <h2 className="ap-heading ap-slide-up" style={{ color: '#1d1d1f' }}>
            Giá bán <span style={{ color: '#0071e3' }}>độc quyền cao</span>
          </h2>
          <p className="ap-body ap-fade" style={{ color: '#6e6e73', maxWidth: 600, margin: '0 auto 64px' }}>
            Apple không giảm giá dù chi phí sản xuất giảm nhờ quy mô khổng lồ. Đây là đặc trưng của tổ chức độc quyền: áp đặt giá cao khi kiểm soát nền tảng.
          </p>

          <div className="ap-product-grid ap-fade">
            {[
              { name: 'iPhone 15 Pro Max', price: '$1,199', cost: '~$500', img: appleIphone15ProMaxImg, note: 'Biên lợi nhuận ~60%' },
              { name: 'MacBook Pro M3 Max', price: '$3,999', cost: '~$700', img: appleMacbookImg, note: 'Không có thay thế trực tiếp' },
              { name: 'App Store (hoa hồng)', price: '30%', cost: '~3%', img: appleAppstoreImg, note: 'Cổng duy nhất trên iOS' },
              { name: 'Apple Care+', price: '$299/năm', cost: 'Chi phí thực tế thấp', img: appleCareImg, note: 'Bắt buộc nếu muốn bảo hành tốt' },
            ].map(p => (
              <div key={p.name} className="ap-product-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="ap-product-image" style={{ width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', marginBottom: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="ap-product-name" style={{ fontSize: 19 }}>{p.name}</div>
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
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '100%' }}>
                <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto', maxWidth: '400px', maxHeight: '400px' }}>
                  <defs>
                    <clipPath id="center-clip">
                      <circle cx="0" cy="0" r="45" />
                    </clipPath>
                    {ECO_ITEMS.map(item => (
                      <clipPath key={`clip-${item.id}`} id={`clip-${item.id}`}>
                        <circle cx="0" cy="0" r="20" />
                      </clipPath>
                    ))}
                  </defs>

                  {/* Central Node (iPhone) */}
                  <g transform="translate(200, 200)">
                    <circle cx="0" cy="0" r="45" fill="#111" stroke="#0071e3" strokeWidth="2.5" />
                    <image href={appleIphoneCenterImg} x="-45" y="-45" height="90" width="90" clipPath="url(#center-clip)" />
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedEco(item);
                          e.preventDefault();
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Xem chi tiết về ${item.name}`}
                    >
                      <circle cx="0" cy="0" r="20" fill="#1c1c1e" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                      <image href={item.img} x="-20" y="-20" height="40" width="40" clipPath={`url(#clip-${item.id})`} />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Right Column: Connection details display */}
              <div style={{ textAlign: 'left', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: selectedEco.textColor, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  KẾT NỐI HỆ SINH THÁI
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <img src={selectedEco.img} alt={selectedEco.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '23px', fontWeight: 800, color: '#f5f5f7', margin: 0 }}>
                    {selectedEco.name}
                  </h4>
                </div>
                <p style={{ fontSize: '18px', color: '#a1a1a6', lineHeight: 1.6, margin: 0 }}>
                  {selectedEco.desc}
                </p>
                <div style={{ marginTop: 24, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: `1px solid ${selectedEco.color}33` }}>
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
          <p className="ap-eyebrow ap-fade">Giá mua thấp</p>
          <h2 className="ap-heading ap-slide-up">
            Giá mua <span className="ap-grad">độc quyền thấp</span>
          </h2>
          <p className="ap-body ap-fade" style={{ maxWidth: 600, margin: '0 auto 64px' }}>
            Apple ép giá nhà cung cấp và thu 30% từ lập trình viên — biểu hiện điển hình của "giá mua độc quyền thấp" theo lý thuyết Lênin.
          </p>

          <div className="ap-two-col ap-fade">
            {/* Cột trái: Nhà cung cấp */}
            <div className="ap-dark-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="ap-dark-card-title" style={{ marginTop: 0 }}>Ép giá Nhà cung cấp</h3>
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
            <div className="ap-dark-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="ap-dark-card-title" style={{ marginTop: 0 }}>Ép phí Lập trình viên</h3>
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
          <p className="ap-eyebrow ap-fade" style={{ color: '#1d1d1f' }}>So sánh</p>
          <h2 className="ap-heading ap-slide-up" style={{ color: '#1d1d1f' }}>
            Apple <span style={{ color: '#0071e3' }}>vs</span> Samsung
          </h2>

          <div className="ap-compare-wrapper ap-fade" style={{
            display: selectedCompareIdx !== null ? 'grid' : 'block',
            gridTemplateColumns: selectedCompareIdx !== null ? '1.25fr 0.75fr' : 'none',
            gap: '32px',
            margin: '40px auto 0',
            maxWidth: selectedCompareIdx !== null ? '1100px' : '900px',
            transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}>
            {/* Left table */}
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              border: '1px solid #d2d2d7',
              borderRadius: '18px',
              overflow: 'hidden',
              textAlign: 'left',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              transition: 'all 0.3s ease'
            }}>
              <thead>
                <tr style={{ background: '#f5f5f7' }}>
                  <th style={{ padding: '16px 20px', fontSize: '17px', fontWeight: 700, color: '#6e6e73', borderBottom: '1px solid #d2d2d7' }}>Tiêu chí</th>
                  <th style={{ padding: '16px 20px', fontSize: '17px', fontWeight: 700, color: '#1d1d1f', borderBottom: '1px solid #d2d2d7', borderLeft: '1px solid #d2d2d7' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor">
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                      </svg>
                      Apple
                    </div>
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: '17px', fontWeight: 700, color: '#0c4da2', borderBottom: '1px solid #d2d2d7', borderLeft: '1px solid #d2d2d7' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <svg viewBox="0 0 100 50" width="32" height="16" fill="#0c4da2">
                        <ellipse cx="50" cy="25" rx="48" ry="24" transform="rotate(-10 50 25)" />
                        <text x="50" y="31" font-family="sans-serif" font-weight="900" font-size="14" fill="#fff" text-anchor="middle" letter-spacing="1">SAMSUNG</text>
                      </svg>
                      Samsung
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_DETAILS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`ap-compare-tr ${selectedCompareIdx === idx ? 'ap-compare-tr--active' : ''}`}
                    onClick={() => setSelectedCompareIdx(idx)}
                  >
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1d1d1f',
                      background: '#fafafa',
                      borderBottom: idx === 6 ? 'none' : '1px solid #e5e5ea',
                      width: '25%'
                    }}>
                      {row.label}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '18px',
                      color: '#3a3a3c',
                      lineHeight: 1.5,
                      borderBottom: idx === 6 ? 'none' : '1px solid #e5e5ea',
                      borderLeft: '1px solid #e5e5ea',
                      width: '37.5%'
                    }}>
                      {row.apple}
                    </td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '18px',
                      color: '#3a3a3c',
                      lineHeight: 1.5,
                      borderBottom: idx === 6 ? 'none' : '1px solid #e5e5ea',
                      borderLeft: '1px solid #e5e5ea',
                      width: '37.5%'
                    }}>
                      {row.samsung}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Right explanation panel (only visible when a row is selected) */}
            {selectedCompareIdx !== null && (
              <div className="ap-explain-panel" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                background: '#fff',
                position: 'relative',
                animation: 'fadeInRight 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompareIdx(null);
                  }}
                  aria-label="Đóng bảng so sánh chi tiết"
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#8e8e93',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    transition: 'all 0.2s',
                    padding: 0
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f7';
                    e.currentTarget.style.color = '#1d1d1f';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#8e8e93';
                  }}
                >
                  ✕
                </button>

                <div className="ap-explain-header" style={{ paddingRight: 32 }}>
                  Phân tích: {COMPARE_DETAILS[selectedCompareIdx].title}
                </div>
                
                <div className="ap-explain-section">
                  <div className="ap-explain-title" style={{ color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg viewBox="0 0 814 1000" width="14" height="14" fill="currentColor">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                    </svg>
                    Apple (Góc nhìn Độc quyền)
                  </div>
                  <div className="ap-explain-body">
                    {COMPARE_DETAILS[selectedCompareIdx].appleDetail}
                  </div>
                </div>

                <div className="ap-explain-section">
                  <div className="ap-explain-title" style={{ color: '#0c4da2', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg viewBox="0 0 100 50" width="28" height="14" fill="#0c4da2">
                      <ellipse cx="50" cy="25" rx="48" ry="24" transform="rotate(-10 50 25)" />
                      <text x="50" y="31" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#fff" textAnchor="middle" letterSpacing="1">SAMSUNG</text>
                    </svg>
                    Samsung (Đối chiếu)
                  </div>
                  <div className="ap-explain-body">
                    {COMPARE_DETAILS[selectedCompareIdx].samsungDetail}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5 — LÝ THUYẾT */}
      <section id="theory" className="ap-section ap-section--gradient">
        <div className="ap-container">
          <p className="ap-eyebrow ap-fade">Liên hệ Lý thuyết</p>
          <h2 className="ap-heading ap-slide-up">
            Apple qua lăng kính <span className="ap-grad">Lênin</span>
          </h2>

          <div className="ap-theory-grid ap-fade">
            {[
              { num: '01', theory: 'Tập trung sản xuất → Độc quyền', apple: 'Apple thống trị phân khúc cao cấp sau khi hàng loạt đối thủ (Nokia, BlackBerry, LG) rút lui.', link: '/#khai-niem' },
              { num: '02', theory: 'Giá bán độc quyền cao', apple: 'iPhone, MacBook, Apple Watch — giá cao hơn chi phí sản xuất rất nhiều lần.', link: '/#gia-ca' },
              { num: '03', theory: 'Giá mua độc quyền thấp', apple: 'App Store 30% + ép Foxconn, Samsung Display giảm giá — thu lợi nhuận độc quyền.', link: '/#gia-ca' },
              { num: '04', theory: 'Tư bản tài chính & Đầu sỏ', apple: 'Apple nắm hàng trăm tỷ USD tiền mặt, chi phối nhiều ngành từ chip đến nội dung số.', link: '/#5-diem' },
              { num: '05', theory: 'Xuất khẩu tư bản phổ biến', apple: 'Apple đầu tư nhà máy và trung tâm dữ liệu tại Việt Nam, Ấn Độ, Ireland...', link: '/#5-diem' },
              { num: '06', theory: 'Độc quyền không thủ tiêu cạnh tranh', apple: 'Apple vẫn cạnh tranh gay gắt với Samsung, Google — nhưng cạnh tranh ở cấp độ tập đoàn khổng lồ.', link: '/#canh-tranh' },
            ].map((item, i) => (
              <div key={i} className="ap-theory-card" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '18px' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '36px', fontWeight: 800, color: 'rgba(255,255,255,0.05)', fontFamily: 'monospace', lineHeight: 1 }}>
                  {item.num}
                </div>
                <div className="ap-theory-body" style={{ flex: 1 }}>
                  <div className="ap-theory-label" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8e8e93', marginBottom: 6 }}>Lý thuyết</div>
                  <div className="ap-theory-theory" style={{ fontSize: '17px', fontWeight: 700, color: '#f5f5f7', marginBottom: 14, lineHeight: 1.4 }}>{item.theory}</div>
                  <div className="ap-theory-label" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8e8e93', marginBottom: 6 }}>Apple</div>
                  <div className="ap-theory-apple" style={{ fontSize: '14px', color: '#a1a1a6', lineHeight: 1.6 }}>{item.apple}</div>
                </div>
                <Link to={item.link} className="ap-theory-link" style={{ marginTop: 20 }}>📖 Xem lý thuyết</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="ap-cta ap-fade">
        <h2 className="ap-cta-title">Kiểm tra kiến thức</h2>
        <p className="ap-cta-sub">5 câu trắc nghiệm · Cạnh tranh &amp; Độc quyền</p>
        <div className="ap-cta-btns">
          <Link to="/quiz" className="ap-btn-primary">Làm Quiz ngay →</Link>
          <Link to="/" className="ap-btn-ghost">← Ôn lại Lý thuyết</Link>
          <Link to="/ai-usage" className="ap-btn-ghost">AI Usage</Link>
          <Link to="/references" className="ap-btn-ghost">Tài liệu tham khảo</Link>
        </div>
      </section>
    </div>
  )
}

