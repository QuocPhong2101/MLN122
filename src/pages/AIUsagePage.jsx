import { Link } from 'react-router-dom'

const AI_LIST = [
  {
    name: 'Google Gemini',
    desc: 'Hỗ trợ xây dựng cấu trúc code React, tối ưu hóa CSS và các hiệu ứng tương tác (Ecosystem Map, Quiz, Compare Panel).'
  },
  {
    name: 'ChatGPT',
    desc: 'Hỗ trợ brainstorm các góc nhìn kinh tế chính trị về Case Study Apple và xây dựng bộ câu hỏi trắc nghiệm.'
  },
  {
    name: 'Antigravity IDE',
    desc: 'Môi trường phát triển hỗ trợ đồng bộ mã nguồn, biên dịch thời gian thực và quản lý tài nguyên của dự án.'
  }
]

export default function AIUsagePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f5f5f7', fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <Link to="/" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>← Trang chủ</Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <Link to="/references" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>Tài liệu tham khảo</Link>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <Link to="/apple" style={{ color: '#f5f5f7', textDecoration: 'none', fontSize: 14, opacity: 0.7 }}>Case Study Apple</Link>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(48,209,88,0.12)', border: '1px solid rgba(48,209,88,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 32, fontSize: 13, color: '#30d158', fontWeight: 600, letterSpacing: '0.05em' }}>
          🤖 AI USAGE
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 24 }}>
          Các công cụ AI đã sử dụng
        </h1>
        <p style={{ fontSize: 18, color: '#a1a1a6', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Danh sách các mô hình trí tuệ nhân tạo và vai trò hỗ trợ thực hiện dự án.
        </p>

        {/* AI List cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 600, marginBottom: 48 }}>
          {AI_LIST.map((ai, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 24px', textAlign: 'left' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{ai.name}</div>
              <p style={{ color: '#a1a1a6', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{ai.desc}</p>
            </div>
          ))}
        </div>

        {/* Short declaration to satisfy academic criteria 4.4 */}
        <div style={{ width: '100%', maxWidth: 600, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32 }}>
          <p style={{ color: '#8e8e93', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            * Cam kết: Các công cụ trên được sử dụng dưới dạng trợ lý kỹ thuật và hỗ trợ trình bày trực quan. Nội dung lý luận và phân tích do nhóm tự biên soạn và chịu trách nhiệm.
          </p>
        </div>
      </div>
    </div>
  )
}
