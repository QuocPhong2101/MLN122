import { useState, useRef, useEffect } from 'react'

// ─── Thay thế bằng API Key của Gemini sau khi nhận được ───
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_MODEL = 'gemini-2.5-flash'
//
// ─── System prompt chứa toàn bộ nội dung lý thuyết MLN122 Chương 4 ───
const SYSTEM_PROMPT = `Bạn là trợ lý học tập chuyên về môn Kinh tế Chính trị Mác - Lênin (MLN122), được nhúng trong bài thuyết trình về Chương 4: Cạnh tranh và Độc quyền.

NHIỆM VỤ: Trả lời các câu hỏi liên quan đến nội dung Chương 4 và case study Apple với độ chính xác cao. Chỉ trả lời trong phạm vi kiến thức được cung cấp bên dưới. Nếu câu hỏi nằm ngoài phạm vi, hãy nói rõ và hướng người dùng về nội dung Chương 4.

PHONG CÁCH: Ngắn gọn, chính xác, học thuật nhưng dễ hiểu. Trả lời bằng tiếng Việt. Sử dụng bullet points khi liệt kê. Không bịa đặt thông tin ngoài nội dung sau.

═══════════════════════════════════════════════
NỘI DUNG CHƯƠNG 4: CẠNH TRANH VÀ ĐỘC QUYỀN
═══════════════════════════════════════════════

PHẦN I – KHÁI NIỆM ĐỘC QUYỀN
• Định nghĩa (Giáo trình MLN122): "Độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng thâu tóm việc sản xuất và tiêu thụ một số loại hàng hoá, có khả năng định ra giá cả độc quyền, nhằm thu lợi nhuận độc quyền cao."
• Cơ sở kinh tế: Sự tích tụ và tập trung sản xuất đến trình độ cực cao.
• Khi cạnh tranh tự do đào thải lẫn nhau, các thế lực lớn sống sót liên kết thành liên minh để kiểm soát đầu ra, áp đặt giá bán, thu lợi nhuận tối cao.

PHẦN II – NGUYÊN NHÂN HÌNH THÀNH ĐỘC QUYỀN
Nguyên nhân 01 – Sự phát triển của Lực lượng Sản xuất:
Cuối thế kỷ XIX, các phát minh KH-KT mới (động cơ diesel, máy phát điện, ngành luyện kim, đường sắt...) đòi hỏi quy mô sản xuất cực lớn và vốn khổng lồ. Doanh nghiệp nhỏ không đáp ứng được phải tích tụ, sáp nhập.
Nguyên nhân 02 – Do cạnh tranh khốc liệt:
Cạnh tranh tự do đẩy các doanh nghiệp vào cuộc chiến đào thải. Doanh nghiệp yếu kém bị phá sản hoặc thâu tóm. Doanh nghiệp mạnh thắng cuộc ngày càng lớn mạnh và liên minh với nhau.
Nguyên nhân 03 – Khủng hoảng kinh tế & Hệ thống tín dụng:
Khủng hoảng kinh tế 1873 thúc đẩy sự phá sản của xí nghiệp vừa và nhỏ. Ngân hàng và tín dụng là đòn bẩy tài chính giúp tập trung tư bản vào tay các tập đoàn lớn.
Trích dẫn Lênin: "Tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất khi phát triển đến một mức độ nhất định lại dẫn tới độc quyền."

PHẦN III – GIÁ CẢ & LỢI NHUẬN ĐỘC QUYỀN
• Giá cả Độc quyền Cao (khi bán): Tổ chức độc quyền áp đặt giá bán cao hơn giá trị thực, thâu tóm lợi nhuận từ người tiêu dùng và doanh nghiệp nhỏ ngoài độc quyền.
• Giá cả Độc quyền Thấp (khi mua): Ép giá mua nguyên liệu đầu vào thấp từ nhà sản xuất nhỏ, nông dân, đối tác yếu thế.
• Nguồn gốc thực chất của Lợi nhuận độc quyền cao: Vẫn là giá trị thặng dư do người lao động tạo ra ở các xí nghiệp độc quyền, cộng với một phần giá trị thặng dư của doanh nghiệp ngoài độc quyền và thu nhập của người sản xuất nhỏ, người tiêu dùng thông qua trao đổi không ngang giá.

PHẦN IV – ĐỘC QUYỀN NHÀ NƯỚC
• Định nghĩa: "Độc quyền nhà nước là kiểu độc quyền trong đó nhà nước thực hiện nắm giữ vị thế độc quyền trên cơ sở duy trì sức mạnh của các tổ chức độc quyền ở những lĩnh vực then chốt..."
• Bản chất: Sự dung hợp giữa sức mạnh kinh tế của các tài phiệt độc quyền tư nhân và quyền lực tối cao của bộ máy chính trị nhà nước tư sản.
• Ví dụ lĩnh vực: Phát hành tiền tệ, Điện lực quốc gia, Quốc phòng & An ninh, Đường sắt quốc gia, Hạ tầng chiến lược, Nghiên cứu vũ trụ.
Nguyên nhân hình thành Độc quyền Nhà nước:
1. Xã hội hóa sản xuất ngày càng cao → cần trung tâm điều tiết thống nhất.
2. Ngành chiến lược ít lợi nhuận: giáo dục, y tế, giao thông, nghiên cứu cơ bản → tư nhân không muốn đầu tư → Nhà nước đảm nhận.
3. Hạn chế mâu thuẫn xã hội: Nhà nước can thiệp qua an sinh xã hội, thuế lũy tiến để duy trì ổn định.
4. Toàn cầu hóa & Cạnh tranh quốc tế: Nhà nước bảo vệ lợi ích tập đoàn trong nước trước đối thủ nước ngoài.

PHẦN V – TÁC ĐỘNG CỦA ĐỘC QUYỀN
Tác động Tích cực:
• Thúc đẩy tiến bộ khoa học kỹ thuật: Tiềm lực tài chính khổng lồ cho phép đầu tư dài hạn vào R&D.
• Nâng cao năng suất lao động xã hội: Tập trung sản xuất quy mô lớn, tối ưu quản trị, giảm chi phí trung bình.
• Thúc đẩy sản xuất lớn hiện đại: Hình thành chuỗi liên kết giá trị, đầu tàu dẫn dắt ngành kinh tế.
Tác động Tiêu cực:
• Gây thiệt hại cho người tiêu dùng: Giá độc quyền cao và giá mua độc quyền thấp làm giảm phúc lợi xã hội.
• Kìm hãm tiến bộ kỹ thuật: Khi giữ vị thế độc quyền tuyệt đối, doanh nghiệp có xu hướng trì hoãn đổi mới để bảo vệ lợi nhuận hiện tại.
• Gia tăng bất bình đẳng xã hội: Lợi nhuận tập trung vào tay nhóm nhỏ đầu sỏ tài chính, gia tăng khoảng cách giàu nghèo.

PHẦN VI – QUAN HỆ CẠNH TRANH VÀ ĐỘC QUYỀN
Trích dẫn Lênin: "Độc quyền sinh ra từ cạnh tranh tự do, độc quyền không tiêu diệt cạnh tranh, mà tồn tại bên trên và bên cạnh nó, từ đó sinh ra những mâu thuẫn và xung đột cực kỳ gay gắt và sâu sắc."
Ba hình thức cạnh tranh khi có độc quyền:
1. Cạnh tranh giữa Độc quyền và ngoài Độc quyền: Chèn ép nguồn nguyên liệu, phong tỏa phân phối đối với doanh nghiệp nhỏ.
2. Cạnh tranh giữa các Tổ chức Độc quyền: Tranh giành thị trường tiêu thụ và nguồn tài nguyên chiến lược giữa các ông lớn.
3. Cạnh tranh trong nội bộ Tổ chức Độc quyền: Các thành viên trong cartel, liên minh cạnh tranh ngầm giành quyền kiểm soát cổ phần và tỉ lệ chia lợi ích.

PHẦN VII – 5 ĐẶC ĐIỂM KINH TẾ CỦA CNTB ĐỘC QUYỀN (theo Lênin)
Đặc điểm 01: Tập trung sản xuất và các tổ chức độc quyền
Tích tụ sản xuất cao độ → hình thành liên minh lớn: Cartel, Syndicate, Trust, Consortium.
- Cartel (Các-ten): Thỏa thuận về giá, thị trường, sản lượng nhưng độc lập sản xuất & lưu thông. Mức liên kết: 1/4.
- Syndicate (Xanh-đi-ca): Độc lập sản xuất, nhưng khâu lưu thông do ban quản trị chung. Mức liên kết: 2/4.
- Trust (Tô-rớt): Mất hoàn toàn tính độc lập sản xuất & lưu thông, sáp nhập nhận cổ phần. Mức liên kết: 3/4.
- Consortium (Công-xoóc-xi-om): Mức cao nhất. Công ty đa ngành + ngân hàng hợp nhất dưới quyền tài phiệt đầu sỏ. Mức liên kết: 4/4.
Đặc điểm 02: Tư bản tài chính và Đầu sỏ tài chính
Sự hòa nhập giữa tư bản ngân hàng độc quyền lớn nhất và tư bản công nghiệp độc quyền tạo nên thế lực tài phiệt chi phối toàn bộ nền kinh tế chính trị.
Đặc điểm 03: Xuất khẩu tư bản trở thành phổ biến
Khác với xuất khẩu hàng hóa, xuất khẩu tư bản là đưa vốn ra nước ngoài (FDI, FPI) để khai thác tài nguyên và nhân công rẻ nhằm thu lợi nhuận siêu ngạch.
Đặc điểm 04: Phân chia thị trường thế giới giữa các liên minh độc quyền
Các tập đoàn độc quyền quốc tế phân chia thị trường tiêu thụ toàn cầu, tạo thỏa ước khống chế ranh giới thương mại thế giới.
Đặc điểm 05: Phân chia lãnh thổ thế giới giữa các cường quốc tư bản
Các tập đoàn thúc đẩy chính phủ mở rộng ảnh hưởng địa chính trị → xung đột thực dân, chiến tranh giành thuộc địa và vùng ảnh hưởng.

PHẦN VIII – ĐẶC ĐIỂM CỦA ĐỘC QUYỀN NHÀ NƯỚC (3 đặc trưng theo Lênin)
Đặc trưng 1: Sự kết hợp nhân sự giữa Nhà nước và Tổ chức Độc quyền
Có sự luân chuyển nhân sự liên tục: quan chức nhà nước ↔ giám đốc tập đoàn, ngân hàng tư nhân. Các hiệp hội tư bản là "chính phủ đằng sau chính phủ".
Đặc trưng 2: Sự hình thành và phát triển của Sở hữu Nhà nước
Nhà nước tích lũy vốn đầu tư xây dựng công ty công ích, hạ tầng cơ sở, hoặc quốc hữu hóa doanh nghiệp tư nhân. Nhà nước mở rộng thị trường qua mua sắm công.
Đặc trưng 3: Độc quyền Nhà nước là công cụ điều tiết kinh tế vĩ mô
Sử dụng chính sách tài khóa, tiền tệ, hành pháp hỗ trợ tập đoàn tư nhân. Dung hợp 3 cơ chế: thị trường + độc quyền tư nhân + điều tiết vĩ mô của nhà nước.

═══════════════════════════════════════════════
CASE STUDY: APPLE – ĐIỂN HÌNH CỦA ĐỘC QUYỀN TƯ NHÂN
═══════════════════════════════════════════════

Hành trình của Apple:
- Giai đoạn 1: Cạnh tranh tự do (1970s-1990s): Thị trường máy tính cá nhân sơ khai với nhiều đối thủ cạnh tranh.
- Giai đoạn 2: Ra mắt iPhone (2007): Steve Jobs tạo ra cuộc cách mạng điện thoại thông minh, thiết lập nền tảng.
- Giai đoạn 3: Lock-in hệ sinh thái: Xây dựng hệ sinh thái khép kín (iCloud, App Store, Apple Watch...) tạo rào cản chuyển đổi cao.
- Giai đoạn 4: Thống lĩnh độc quyền: Dù lượng máy bán ít hơn Samsung, Apple thâu tóm hơn 85% lợi nhuận toàn ngành smartphone toàn cầu.

Hệ sinh thái iOS – công cụ độc quyền:
• App Store: Cổng phân phối ứng dụng DUY NHẤT trên iOS. Apple thu phí 30% (Apple Tax). Cấm sideloading để kiểm soát 100% doanh thu.
• iCloud: Đồng bộ dữ liệu ảnh, danh bạ, sao lưu. Rất khó chuyển sang Android vì không có giải pháp chính thức.
• Apple Watch: Chỉ kết nối đầy đủ với iPhone. Đổi sang Android → mất luôn đồng hồ.
• Apple Pay: Độc quyền NFC, ngăn ví điện tử đối thủ tiếp cận hạ tầng.
• iMessage & FaceTime: Bóng tin nhắn màu xanh lá cho iPhone, giảm chất lượng ảnh từ Android → rào cản tâm lý.
• AirPods: Tự động kết nối nhanh giữa các thiết bị Apple. Dùng trên Android mất hầu hết tính năng.

Biểu hiện giá độc quyền của Apple:
• Giá Độc quyền Cao (khi bán ra): iPhone, MacBook định giá cao hơn nhiều so với chi phí sản xuất. Ít khuyến mãi.
• Giá Độc quyền Thấp (khi mua vào): Ép Foxconn, Samsung Display, nhà cung cấp linh kiện giảm giá tối đa nhờ quyền lực mua (monopsony power).
• Biên lợi nhuận gộp Apple: ~45-47% (cao hơn Samsung ~35-38%).
• Apple thâu tóm hơn 85% lợi nhuận toàn ngành smartphone toàn cầu.

So sánh Apple vs Samsung:
• Hệ sinh thái: Apple – khép kín hoàn toàn (iOS); Samsung – mở (Android + One UI).
• App Store: Apple – độc quyền, thu 30%; Samsung – Google Play, có thể cài từ ngoài.
• Định giá: Apple – cao, ít khuyến mãi; Samsung – đa phân khúc từ thấp đến cao.
• Chuỗi cung ứng: Apple – ép giá nhà cung cấp mạnh (monopsony); Samsung – tự sản xuất nhiều linh kiện.
• Kiểm soát nền tảng: Apple – kiểm soát toàn bộ iOS + App Store; Samsung – phụ thuộc Google cho Android.
• Quyền lực thị trường: Apple – rất cao ở phân khúc cao cấp; Samsung – phân tán hơn qua nhiều phân khúc.

Liên hệ lý thuyết Lênin với Apple:
• Apple là điển hình của Đặc điểm 01 (Tập trung sản xuất) – kiểm soát toàn bộ chuỗi giá trị.
• Apple thực hiện cả Giá Độc quyền Cao (bán) và Giá Độc quyền Thấp (mua) theo lý thuyết Giá cả Độc quyền.
• Cạnh tranh giữa các Tổ chức Độc quyền: Apple vs Samsung vs Google là ví dụ điển hình.`

// ─── Hàm gọi Gemini API ───
async function callGemini(messages) {
  if (!GEMINI_API_KEY) {
    throw new Error('API_KEY_MISSING')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.'
}

// ─── Render Markdown cơ bản (bold, bullet, newline) ───
function SimpleMarkdown({ text }) {
  const lines = text.split('\n')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        // bullet
        const isBullet = /^[•\-\*]\s/.test(line.trim())
        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        return (
          <div key={i} style={{ display: 'flex', gap: isBullet ? 8 : 0, alignItems: 'flex-start' }}>
            {isBullet && <span style={{ color: '#0071e3', flexShrink: 0, marginTop: 2 }}>•</span>}
            <span
              style={{ fontSize: 14, lineHeight: 1.6, color: '#f5f5f7' }}
              dangerouslySetInnerHTML={{ __html: isBullet ? content.replace(/^[•\-\*]\s/, '') : content }}
            />
          </div>
        )
      })}
    </div>
  )
}

const SUGGESTED_QUESTIONS = [
  'Định nghĩa độc quyền là gì?',
  'Nguyên nhân hình thành độc quyền?',
  '5 đặc điểm của CNTB độc quyền?',
  'Apple liên hệ lý thuyết nào?',
  'Cartel và Trust khác nhau thế nào?',
]

export default function ChatBox() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý học tập MLN122. Hãy hỏi tôi bất kỳ điều gì về **Chương 4: Cạnh tranh & Độc quyền** hoặc case study **Apple**.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [noKey, setNoKey] = useState(!GEMINI_API_KEY)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const chatBodyRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text) {
    const q = (text || input).trim()
    if (!q || loading) return

    if (!GEMINI_API_KEY) {
      setNoKey(true)
      return
    }

    setInput('')
    const userMsg = { role: 'user', content: q }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = [...messages, userMsg]
      const reply = await callGemini(history)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      const msg = e.message === 'API_KEY_MISSING'
        ? 'Chưa cấu hình API Key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env.'
        : `Lỗi: ${e.message}`
      setMessages(prev => [...prev, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const showSuggestions = messages.length <= 1

  return (
    <>
      {/* ─── Floating Button ─── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9000,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open
            ? 'rgba(30,30,32,0.95)'
            : 'linear-gradient(135deg, #0071e3 0%, #005bb5 100%)',
          border: open ? '1.5px solid rgba(255,255,255,0.12)' : 'none',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open
            ? '0 4px 24px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,113,227,0.55)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: open ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ─── Chat Panel ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: 96,
          right: 28,
          zIndex: 8999,
          width: 'min(420px, calc(100vw - 40px))',
          height: 'min(580px, calc(100vh - 140px))',
          background: 'rgba(18,18,20,0.97)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 18px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0071e3, #30d158)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f5f7', lineHeight: 1.2 }}>Trợ lý MLN122</div>
            <div style={{ fontSize: 12, color: '#6e6e73', marginTop: 2 }}>Chương 4 · Cạnh tranh & Độc quyền</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: GEMINI_API_KEY ? '#30d158' : '#ff9500' }} />
            <span style={{ fontSize: 11, color: '#6e6e73' }}>{GEMINI_API_KEY ? 'Online' : 'Cần API Key'}</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatBodyRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                gap: 8,
                alignItems: 'flex-end',
              }}
            >
              {m.role === 'assistant' && (
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0071e3, #30d158)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                }}>
                  🎓
                </div>
              )}
              <div
                style={{
                  maxWidth: '82%',
                  padding: m.role === 'user' ? '10px 14px' : '12px 14px',
                  borderRadius: m.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, #0071e3, #005bb5)'
                    : 'rgba(255,255,255,0.06)',
                  border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  color: '#f5f5f7',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {m.role === 'user' ? (
                  <span>{m.content}</span>
                ) : (
                  <SimpleMarkdown text={m.content} />
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0071e3, #30d158)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12
              }}>🎓</div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', gap: 4, alignItems: 'center'
              }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#0071e3',
                    animation: `chatDot 1.2s ease-in-out ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && !loading && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, color: '#6e6e73', marginBottom: 8, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Câu hỏi gợi ý</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      background: 'rgba(0,113,227,0.08)',
                      border: '1px solid rgba(0,113,227,0.2)',
                      borderRadius: 10,
                      color: '#2a92ff',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0,113,227,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(0,113,227,0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0,113,227,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(0,113,227,0.2)'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {noKey && (
            <div style={{
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(255,149,0,0.08)',
              border: '1px solid rgba(255,149,0,0.2)',
              fontSize: 13,
              color: '#ff9500',
              lineHeight: 1.5,
            }}>
              ⚠️ Chưa có API Key. Thêm <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>VITE_GEMINI_API_KEY=...</code> vào file <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>.env</code> rồi chạy lại.
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 14px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.02)',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            gap: 8,
            alignItems: 'flex-end',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '8px 8px 8px 14px',
            transition: 'border-color 0.2s',
          }}
            onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(0,113,227,0.5)'}
            onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Hỏi về Chương 4 hoặc case study Apple..."
              disabled={loading}
              rows={1}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#f5f5f7',
                fontSize: 14,
                lineHeight: 1.5,
                resize: 'none',
                fontFamily: 'inherit',
                maxHeight: 100,
                overflow: 'auto',
                scrollbarWidth: 'none',
              }}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #0071e3, #005bb5)'
                  : 'rgba(255,255,255,0.08)',
                border: 'none',
                color: input.trim() && !loading ? '#fff' : '#4a4a4e',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div style={{ fontSize: 11, color: '#3a3a3e', textAlign: 'center', marginTop: 8 }}>
            Enter để gửi · Shift+Enter xuống dòng
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
