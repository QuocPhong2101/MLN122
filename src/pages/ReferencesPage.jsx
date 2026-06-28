import { Link } from 'react-router-dom'

const REFERENCES = [
  {
    category: 'Giáo trình & Sách học thuật',
    icon: '📗',
    color: '#30d158',
    items: [
      {
        id: '[1]',
        text: 'Bộ Giáo dục và Đào tạo (2021). Giáo trình Kinh tế Chính trị Mác-Lênin. NXB Chính trị Quốc gia Sự thật, Hà Nội.',
        note: 'Nguồn lý thuyết chính: 5 đặc điểm CNTB độc quyền, định nghĩa giá bán độc quyền cao, giá mua độc quyền thấp',
      },
      {
        id: '[2]',
        text: 'Hội đồng Lý luận Trung ương (2021). Giáo trình Lý luận Chính trị — Kinh tế Chính trị Mác-Lênin (dành cho bậc Đại học không chuyên lý luận chính trị). NXB Chính trị Quốc gia Sự thật.',
        note: 'Dùng để đối chiếu khái niệm tư bản tài chính và đầu sỏ tài chính (Chương 4)',
      },
      {
        id: '[3]',
        text: 'V.I. Lênin (1917). Chủ nghĩa Đế quốc — Giai đoạn Tột cùng của Chủ nghĩa Tư bản (bản dịch tiếng Việt, NXB Sự thật, 1984).',
        note: 'Trích dẫn trực tiếp định nghĩa và 5 đặc điểm của CNTB độc quyền',
      },
    ]
  },
  {
    category: 'Báo cáo tài chính & Dữ liệu Apple',
    icon: '📊',
    color: '#0071e3',
    items: [
      {
        id: '[4]',
        text: 'Apple Inc. (2023). Annual Report 2023 (Form 10-K). Securities and Exchange Commission (SEC). Truy cập tại: investor.apple.com',
        note: 'Nguồn số liệu: doanh thu, biên lợi nhuận gộp ~45-47%, thị phần',
      },
      {
        id: '[5]',
        text: 'Counterpoint Research (2023). Global Smartphone Market Share Q4 2023. Truy cập tại: counterpointresearch.com',
        note: 'Dữ liệu thị phần smartphone cao cấp ~57% của Apple',
      },
      {
        id: '[6]',
        text: 'Statista (2024). Number of active Apple devices worldwide 2024. Truy cập tại: statista.com',
        note: 'Số liệu 2 tỷ+ thiết bị Apple đang hoạt động',
      },
    ]
  },
  {
    category: 'Văn bản pháp lý & Chính sách',
    icon: '⚖️',
    color: '#ffd60a',
    items: [
      {
        id: '[7]',
        text: 'U.S. District Court, Northern District of California (2021). Epic Games, Inc. v. Apple Inc. — Case No. 4:20-cv-05640-YGR. Final Judgment and Permanent Injunction.',
        note: 'Cơ sở phân tích vụ kiện Epic vs Apple — App Store độc quyền phí 30%',
      },
      {
        id: '[8]',
        text: 'U.S. House of Representatives, Subcommittee on Antitrust (2020). Investigation of Competition in Digital Markets. Majority Staff Report and Recommendations.',
        note: 'Báo cáo Quốc hội Mỹ xác nhận Apple có hành vi độc quyền trên thị trường ứng dụng iOS',
      },
      {
        id: '[9]',
        text: 'European Commission (2024). Digital Markets Act — Apple designated as Gatekeeper. Official Journal of the European Union.',
        note: 'EU xác định Apple là "Gatekeeper" theo Đạo luật Thị trường Kỹ thuật số',
      },
    ]
  },
  {
    category: 'Nghị quyết & Văn kiện Đảng',
    icon: '📜',
    color: '#ff375f',
    items: [
      {
        id: '[10]',
        text: 'Đảng Cộng sản Việt Nam (2021). Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII. NXB Chính trị Quốc gia Sự thật, Hà Nội.',
        note: 'Nhận định về bản chất CNTB hiện đại và xu hướng độc quyền của các tập đoàn xuyên quốc gia',
      },
      {
        id: '[11]',
        text: 'Nghị quyết 52-NQ/TW ngày 27/9/2019 của Bộ Chính trị về một số chủ trương, chính sách chủ động tham gia cuộc Cách mạng công nghiệp lần thứ tư.',
        note: 'Bối cảnh kinh tế số — liên hệ vị thế độc quyền nền tảng số của Apple',
      },
    ]
  },
  {
    category: 'Tài liệu báo chí & Phân tích ngành',
    icon: '📰',
    color: '#bf5af2',
    items: [
      {
        id: '[12]',
        text: 'The Verge (2023). "Apple\'s App Store fee structure explained." Truy cập ngày 15/6/2024.',
        note: 'Giải thích cấu trúc phí 30% App Store và tranh cãi pháp lý',
      },
      {
        id: '[13]',
        text: 'Bloomberg (2023). "Apple\'s Supply Chain: Foxconn, TSMC and the Price of Control." Bloomberg Technology.',
        note: 'Phân tích chuỗi cung ứng và quyền lực của Apple đối với nhà cung cấp',
      },
      {
        id: '[14]',
        text: 'Financial Times (2022). "Apple\'s gross margin hits record high as services boom." FT Technology.',
        note: 'Số liệu biên lợi nhuận và tăng trưởng dịch vụ Apple',
      },
    ]
  },
]

const LO_MAPPING = [
  { lo: 'LO1', desc: 'Trình bày được lý luận cơ bản của chủ nghĩa Mác-Lênin về kinh tế chính trị', section: 'Trang lý thuyết — 5 đặc điểm CNTB độc quyền theo Lênin' },
  { lo: 'LO2', desc: 'Phân tích được các vấn đề kinh tế-xã hội hiện đại từ góc nhìn Mác-Lênin', section: 'Case Study Apple — 4 sections phân tích (Hành trình, Giá bán cao, Giá mua thấp, So sánh)' },
  { lo: 'LO3', desc: 'Vận dụng lý thuyết vào giải thích thực tiễn kinh tế Việt Nam và thế giới', section: 'Panel giải thích bảng so sánh — liên hệ lý luận Lênin với từng tiêu chí Apple-Samsung' },
  { lo: 'LO4', desc: 'Sử dụng công nghệ và làm việc nhóm hiệu quả', section: 'Website React tương tác + Quiz + Phụ lục AI Usage (trang này)' },
]

export default function ReferencesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f5f5f7', fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <Link to="/" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>← Trang chủ</Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <Link to="/ai-usage" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>Phụ lục AI Usage</Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <Link to="/apple" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>Case Study Apple</Link>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 32px 60px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,113,227,0.12)', border: '1px solid rgba(0,113,227,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 24, fontSize: 13, color: '#0071e3', fontWeight: 600, letterSpacing: '0.05em' }}>
          📚 TÀI LIỆU THAM KHẢO & ĐỐI CHIẾU NGUỒN
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
          Nguồn tài liệu<br />
          <span style={{ background: 'linear-gradient(135deg, #0071e3, #bf5af2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>chính thống</span>
        </h1>
        <p style={{ fontSize: 18, color: '#a1a1a6', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
          Toàn bộ nội dung học thuật trong sản phẩm đều được đối chiếu với các nguồn 
          giáo trình, văn bản pháp lý và báo cáo chính thống dưới đây.
        </p>
      </section>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 32px' }}>

        {/* LO Mapping */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#f5f5f7' }}>Liên kết Learning Outcomes (LO)</h2>
          <p style={{ color: '#8e8e93', marginBottom: 28, fontSize: 15 }}>Sản phẩm đáp ứng các chuẩn đầu ra sau của môn Kinh tế Chính trị Mác-Lênin</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LO_MAPPING.map((lo, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1fr', gap: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 24px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0071e3', textAlign: 'center', padding: '4px 0' }}>{lo.lo}</div>
                <div style={{ fontSize: 14, color: '#f5f5f7', lineHeight: 1.6 }}>{lo.desc}</div>
                <div style={{ fontSize: 13, color: '#8e8e93', lineHeight: 1.6, borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: 20 }}>
                  <span style={{ color: '#30d158', fontWeight: 600 }}>→ </span>{lo.section}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* References by category */}
        <section>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#f5f5f7' }}>Danh mục tài liệu tham khảo</h2>
          <p style={{ color: '#8e8e93', marginBottom: 36, fontSize: 15 }}>Phân loại theo nguồn — {REFERENCES.reduce((acc, cat) => acc + cat.items.length, 0)} tài liệu tổng cộng</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {REFERENCES.map((cat, ci) => (
              <div key={ci}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: cat.color, margin: 0 }}>{cat.category}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cat.items.map((item, ri) => (
                    <div key={ri} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${cat.color}33`, borderRadius: 12, padding: '16px 20px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: cat.color, paddingTop: 2 }}>{item.id}</span>
                      <div>
                        <p style={{ margin: '0 0 6px', fontSize: 14, color: '#f5f5f7', lineHeight: 1.7 }}>{item.text}</p>
                        <p style={{ margin: 0, fontSize: 12, color: '#6e6e73', fontStyle: 'italic', lineHeight: 1.5 }}>
                          <span style={{ color: '#8e8e93' }}>Dùng để đối chiếu: </span>{item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/ai-usage" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f5f5f7', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            🤖 Phụ lục AI Usage
          </Link>
          <Link to="/" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f5f5f7', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            📖 Lý thuyết Lênin
          </Link>
          <Link to="/apple" style={{ padding: '12px 24px', borderRadius: 10, background: '#0071e3', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            → Case Study Apple
          </Link>
        </div>

      </div>
    </div>
  )
}
