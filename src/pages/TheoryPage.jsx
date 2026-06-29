import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import monopolyPowerImg from '../assets/monopoly_power.png'
import stateCapitalismImg from '../assets/state_capitalism.png'
import industrialMonopolyRiseImg from '../assets/industrial_monopoly_rise.png'
import monopolyPriceSqueezeImg from '../assets/monopoly_price_squeeze.png'
import monopolyDualImpactImg from '../assets/monopoly_dual_impact.png'
import monopolyClashImg from '../assets/monopoly_clash.png'
import financialCapitalOligarchyImg from '../assets/financial_capital_oligarchy.png'
import stateMonopolyIntegrationImg from '../assets/state_monopoly_integration.png'

const TABS = [
  { id: 'overview', label: 'Tổng quan Sơ đồ' },
  { id: 'khai-niem', label: 'Phần I: Khái niệm' },
  { id: 'nguyen-nhan', label: 'Phần II: Nguyên nhân' },
  { id: 'gia-ca', label: 'Phần III: Giá cả & LN' },
  { id: 'dq-nha-nuoc', label: 'Phần IV: ĐQ Nhà nước' },
  { id: 'tac-dong', label: 'Phần V: Tác động' },
  { id: 'canh-tranh', label: 'Phần VI: Cạnh tranh' },
  { id: '5-diem', label: 'Phần VII: 5 Đặc điểm' },
  { id: 'dq-nn-dactrung', label: 'Phần VIII: ĐĐ ĐQ NN' },
]

const MINDMAP = {
  center: { label: 'CẠNH TRANH', label2: '& ĐỘC QUYỀN', sub: 'CHƯƠNG 4 · MLN122' },
  cx: 450, cy: 240,
  branches: [
    {
      id: 'branch-tunan',
      label: 'Độc quyền tư nhân',
      x: 230, y: 240,
      color: '#0071e3',
      side: 'left',
      width: 175,
      nodes: [
        { id: 'khai-niem',    label: ['1. Khái niệm', 'Độc quyền'],      x: 90,  y: 85,  color: '#30d158' },
        { id: 'nguyen-nhan', label: ['2. Nguyên nhân', 'hình thành'],   x: 90,  y: 168, color: '#a855f7' },
        { id: 'gia-ca',      label: ['3. Giá cả &', 'Lợi nhuận Độc quyền'],   x: 90,  y: 250, color: '#ff9500' },
        { id: 'canh-tranh',  label: ['6. Quan hệ', 'Cạnh tranh – Độc quyền'], x: 90,  y: 335, color: '#0071e3' }
      ]
    },
    {
      id: 'branch-cntb',
      label: ['Chủ nghĩa tư bản', 'độc quyền'],
      x: 615, y: 145,
      color: '#ff3b30',
      side: 'right',
      width: 180,
      nodes: [
        { id: 'tac-dong', label: ['5. Tác động của', 'Độc quyền'],       x: 810, y: 75,  color: '#ff9500' },
        { id: '5-diem',   label: ['7. 5 Đặc điểm Chủ nghĩa', 'tư bản độc quyền'], x: 810, y: 170, color: '#ff3b30' }
      ]
    },
    {
      id: 'branch-nhanuoc',
      label: 'Độc quyền Nhà nước',
      x: 615, y: 335,
      color: '#ffd60a',
      side: 'right',
      width: 198,
      nodes: [
        { id: 'dq-nha-nuoc',    label: ['4. Độc quyền', 'Nhà nước'],    x: 810, y: 280, color: '#ffd60a' },
        { id: 'dq-nn-dactrung', label: ['8. Đặc điểm', 'Độc quyền Nhà nước'], x: 810, y: 375, color: '#30d158' }
      ]
    }
  ]
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
          borderRadius: '12px',
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
              userSelect: 'none',
              outline: 'none'
            }}
            onClick={() => setOpen(open === i ? null : i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setOpen(open === i ? null : i);
                e.preventDefault();
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={open === i}
            aria-label={`Mở rộng thông tin ${item.title}`}
            onFocus={(e) => {
              e.currentTarget.parentElement.style.borderColor = '#0071e3';
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.06)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#f5f5f7' }}>{item.title}</span>
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
            display: 'grid',
            gridTemplateRows: open === i ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.3s ease-out',
            overflow: 'hidden'
          }}>
            <div style={{ minHeight: 0 }}>
              <div style={{
                padding: '0 24px 20px 56px',
                color: '#a1a1a6',
                fontSize: '17px',
                lineHeight: 1.6,
                borderTop: '1px solid rgba(255,255,255,0.04)',
                paddingTop: '16px'
              }}>
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TheoryPage() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return TABS.some(t => t.id === hash) ? hash : 'overview'
  })
  const [navScrolled, setNavScrolled] = useState(false)
  const [hoveredNode, setHoveredNode] = useState(null)
  const tabContentRef = useRef(null)

  useEffect(() => {
    window.location.hash = activeTab
    window.scrollTo(0, 0)
    // Trigger tab change visual reset
    if (tabContentRef.current) {
      tabContentRef.current.classList.remove('ap-visible')
      // Small timeout to re-trigger transition
      setTimeout(() => {
        tabContentRef.current?.classList.add('ap-visible')
      }, 50)
    }
  }, [activeTab])

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Find index and next/prev tabs
  const curIdx = TABS.findIndex(t => t.id === activeTab)
  const prevTab = curIdx > 0 ? TABS[curIdx - 1] : null
  const nextTab = curIdx < TABS.length - 1 ? TABS[curIdx + 1] : null

  return (
    <div className="ap-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Styles block for interactive mindmap and transitions */}
      <style>{`
        .mindmap-node {
          cursor: pointer;
          outline: none;
        }
        .mindmap-node circle {
          transition: fill 0.2s, r 0.2s, filter 0.2s;
        }
        .mindmap-node:hover circle {
          r: 9px;
          filter: drop-shadow(0 0 10px var(--node-color));
        }
        .mindmap-node:focus circle, .mindmap-node:focus-visible circle {
          r: 9px;
          stroke-width: 3px;
          filter: drop-shadow(0 0 10px var(--node-color));
        }
        .mindmap-node:hover text, .mindmap-node:focus text {
          fill: #fff !important;
          font-weight: 700;
        }
        .mindmap-path {
          stroke-dasharray: 6;
          animation: pulse-line 6s linear infinite;
          transition: opacity 0.3s, stroke-dasharray 0.3s;
        }
        .mindmap-path.hovered {
          animation: pulse-line 2s linear infinite;
        }
        @keyframes pulse-line {
          to { stroke-dashoffset: -24; }
        }
        .tab-content {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .tab-content.ap-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>

      {/* Sticky top nav (Apple style) */}
      <nav className={`ap-nav ${navScrolled || activeTab !== 'overview' ? 'ap-nav--scrolled' : ''}`}>
        <div className="ap-nav-inner">
          <button onClick={() => setActiveTab('overview')} className="ap-nav-back" style={{ fontWeight: 600, color: '#f5f5f7', background: 'none', border: 'none', cursor: 'pointer' }}>
            📚 Chương 4
          </button>
          <div className="ap-nav-links" style={{ paddingLeft: 10 }}>
            {TABS.map(n => (
              <button
                key={n.id}
                className={`ap-nav-link ${activeTab === n.id ? 'ap-nav-link--active' : ''}`}
                onClick={() => setActiveTab(n.id)}
                style={{ padding: '0 10px' }}
              >
                {n.id === 'overview' ? 'Sơ đồ' : n.label.replace('Phần ', '')}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link to="/apple" className="ap-nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f7', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: '13px' }}>
              <svg viewBox="0 0 814 1000" width="13" height="13" fill="currentColor">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              Case Study
            </Link>
            <Link to="/ai-usage" className="ap-nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f7', padding: '6px 12px', fontSize: '13px' }}>AI Usage</Link>
            <Link to="/references" className="ap-nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f7', padding: '6px 12px', fontSize: '13px' }}>Tài liệu</Link>
            <Link to="/quiz" className="ap-nav-cta" style={{ padding: '6px 12px', fontSize: '13px' }}>Quiz →</Link>
          </div>
        </div>
      </nav>

      {/* Main Content Render */}
      <main style={{ flex: 1, padding: '80px 24px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="ap-container tab-content ap-visible" ref={tabContentRef} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>

          {/* ══════════════════════════════════════
              TAB 0 — OVERVIEW (Mindmap Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <p className="ap-eyebrow">Tổng quan bài học</p>
                <h1 className="ap-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: 12 }}>
                  Sơ Đồ Tư Duy <span className="ap-grad">Chương 4.</span>
                </h1>
                <p className="ap-body" style={{ fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
                  Click vào các nhánh dưới đây để đi trực tiếp đến phần lý thuyết chi tiết tương ứng.
                </p>
              </div>

              {/* Sơ đồ tư duy tương tác — full-bleed để hiển thị to */}
              <div style={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(calc(100vw - 80px), 1800px)',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '16px'
              }}>
                <svg width="100%" viewBox="-200 10 1280 460" style={{ display: 'block' }}>
                  <defs>
                    <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(0,113,227,0.25)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                  </defs>

                  {/* Hub glow */}
                  <circle cx="450" cy="240" r="150" fill="url(#hub-glow)" pointerEvents="none" />

                  {/* Connection lines from center to branches */}
                  {MINDMAP.branches.map(branch => {
                    const isHovered = branch.nodes.some(n => n.id === hoveredNode)
                    let pathD
                    if (branch.id === 'branch-tunan') {
                      pathD = `M 450 240 C 350 240, 350 240, 230 240`
                    } else if (branch.id === 'branch-cntb') {
                      pathD = `M 450 240 C 530 240, 530 145, 615 145`
                    } else {
                      pathD = `M 450 240 C 530 240, 530 335, 615 335`
                    }
                    return (
                      <path
                        key={`branch-line-${branch.id}`}
                        d={pathD}
                        fill="none"
                        stroke={branch.color}
                        strokeWidth={isHovered ? 3 : 1.5}
                        opacity={isHovered ? 0.7 : 0.25}
                        style={{ transition: 'all 0.3s' }}
                      />
                    )
                  })}

                  {/* Connection curves from branches to child nodes */}
                  {MINDMAP.branches.map(branch => 
                    branch.nodes.map(node => {
                      const isHovered = hoveredNode === node.id
                      let pathD = ''
                      if (branch.side === 'left') {
                        pathD = `M 230 240 C 160 240, 160 ${node.y}, 90 ${node.y}`
                      } else if (branch.id === 'branch-cntb') {
                        pathD = `M 615 145 C 715 145, 715 ${node.y}, 810 ${node.y}`
                      } else {
                        pathD = `M 615 335 C 715 335, 715 ${node.y}, 810 ${node.y}`
                      }
                      return (
                        <path
                          key={`node-line-${node.id}`}
                          d={pathD}
                          fill="none"
                          stroke={node.color}
                          className={`mindmap-path ${isHovered ? 'hovered' : ''}`}
                          strokeWidth={isHovered ? 3.5 : 1.5}
                          opacity={isHovered ? 0.9 : 0.3}
                        />
                      )
                    })
                  )}

                  {/* Central Hub Node */}
                  <g transform="translate(450, 240)">
                    <circle cx="0" cy="0" r="80" fill="#000" stroke="#0071e3" strokeWidth="3" />
                    <circle cx="0" cy="0" r="74" fill="rgba(0,113,227,0.08)" />
                    <text x="0" y="-10" textAnchor="middle" fill="#f5f5f7" fontSize="18" fontWeight="800" letterSpacing="0.05em">{MINDMAP.center.label}</text>
                    <text x="0" y="14" textAnchor="middle" fill="#0071e3" fontSize="18" fontWeight="800" letterSpacing="0.05em">{MINDMAP.center.label2}</text>
                    <text x="0" y="34" textAnchor="middle" fill="#6e6e73" fontSize="13" fontWeight="600">{MINDMAP.center.sub}</text>
                  </g>

                  {/* Category Hub Boxes */}
                  {MINDMAP.branches.map(branch => {
                    const rectW = branch.width || 168
                    const rectH = Array.isArray(branch.label) ? 54 : 40
                    const isHovered = branch.nodes.some(n => n.id === hoveredNode)
                    return (
                      <g key={branch.id} transform={`translate(${branch.x}, ${branch.y})`}>
                        <rect
                          x={-rectW / 2} y={-rectH / 2}
                          width={rectW} height={rectH}
                          rx="10" ry="10"
                          fill="#151516"
                          stroke={branch.color}
                          strokeWidth={isHovered ? 2.5 : 1.5}
                          style={{ transition: 'all 0.3s', filter: isHovered ? `drop-shadow(0 0 8px ${branch.color}55)` : 'none' }}
                        />
                        <text
                          x="0" y="0" textAnchor="middle"
                          fill={isHovered ? '#fff' : '#f5f5f7'}
                          fontSize="18" fontWeight="700"
                          style={{ transition: 'all 0.3s' }}
                        >
                          {Array.isArray(branch.label) ? (
                            <>
                              <tspan x="0" dy="-5">{branch.label[0]}</tspan>
                              <tspan x="0" dy="18">{branch.label[1]}</tspan>
                            </>
                          ) : (
                            <tspan x="0" dy="5">{branch.label}</tspan>
                          )}
                        </text>
                      </g>
                    )
                  })}

                  {/* Leaf nodes */}
                  {MINDMAP.branches.map(branch =>
                    branch.nodes.map(node => {
                      const isHovered = hoveredNode === node.id
                      const isLeft = branch.side === 'left'
                      const textAnchor = isLeft ? 'end' : 'start'
                      const textX = isLeft ? -14 : 14
                      const hitX = isLeft ? -200 : -14
                      const hitW = isLeft ? 214 : 220
                      return (
                        <g
                          key={node.id}
                          className="mindmap-node"
                          transform={`translate(${node.x}, ${node.y})`}
                          style={{ '--node-color': node.color }}
                          onClick={() => setActiveTab(node.id)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          tabIndex={0}
                          role="button"
                          aria-label={`Xem lý thuyết phần ${Array.isArray(node.label) ? node.label.join(' ') : node.label}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setActiveTab(node.id);
                              e.preventDefault();
                            }
                          }}
                        >
                          <rect x={hitX} y="-23" width={hitW} height="46" fill="transparent" style={{ cursor: 'pointer' }} />
                          <circle cx="0" cy="0" r={isHovered ? 9 : 7} fill="#000" stroke={node.color} strokeWidth="2.5" style={{ transition: 'all 0.2s' }} />
                          {isHovered && <circle cx="0" cy="0" r="4" fill={node.color} style={{ transition: 'all 0.2s' }} />}
                          <text
                            x={textX}
                            textAnchor={textAnchor}
                            fill={isHovered ? '#fff' : '#c8c8cc'}
                            fontSize="18"
                            fontWeight={isHovered ? '700' : '500'}
                            style={{ transition: 'all 0.2s', fontFamily: 'inherit', textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.4)' : 'none' }}
                          >
                            {Array.isArray(node.label) ? (
                              <>
                                <tspan x={textX} dy="-6">{node.label[0]}</tspan>
                                <tspan x={textX} dy="20">{node.label[1]}</tspan>
                              </>
                            ) : (
                              node.label
                            )}
                          </text>
                        </g>
                      )
                    })
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 1 — KHÁI NIỆM (Concept Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'khai-niem' && (
            <div>
              <p className="ap-eyebrow">Phần I</p>
              <h2 className="ap-heading">Khái niệm <span className="ap-grad">Độc quyền</span></h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center', textAlign: 'left', margin: '40px 0' }}>
                <div>
                  <blockquote className="ap-quote" style={{ margin: 0, marginBottom: 24 }}>
                    <p>"Độc quyền là sự liên minh giữa các doanh nghiệp lớn, có khả năng thâu tóm việc sản xuất và tiêu thụ một số loại hàng hoá, có khả năng định ra giá cả độc quyền, nhằm thu lợi nhuận độc quyền cao."</p>
                    <cite>— Giáo trình MLN122</cite>
                  </blockquote>
                  <p style={{ fontSize: 18, color: '#a1a1a6', lineHeight: 1.8 }}>
                    Cơ sở kinh tế hình thành độc quyền là sự tích tụ và tập trung sản xuất đến trình độ cực cao. 
                    Khi các doanh nghiệp tự do cạnh tranh đào thải lẫn nhau, các thế lực lớn sống sót sẽ liên kết thành liên minh 
                    để kiểm soát hoàn toàn đầu ra, áp đặt giá bán và thu lợi ích tối cao.
                  </p>
                </div>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={monopolyPowerImg} alt="Monopoly Power Graph" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              {/* Example grid */}
              <div className="ap-theory-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 40 }}>
                {[
                  { icon: '', label: 'APPLE', theory: 'Hệ sinh thái iOS khép kín', apple: 'Kiểm soát chặt chẽ App Store và các dịch vụ đi kèm để giữ chân người dùng và thu lợi nhuận cao.' },
                  { icon: '', label: 'GOOGLE', theory: 'Thống trị tìm kiếm toàn cầu', apple: 'Nắm giữ hơn 90% thị phần công cụ tìm kiếm, định hình cách tiếp cận thông tin trực tuyến.' },
                  { icon: '', label: 'MICROSOFT', theory: 'Độc quyền hệ điều hành PC', apple: 'Windows chiếm lĩnh phần lớn máy tính cá nhân trên thế giới trong nhiều thập kỷ.' },
                  { icon: '', label: 'SAMSUNG', theory: 'Dẫn đầu chip & màn hình', apple: 'Kiểm soát chuỗi cung ứng linh kiện then chốt, tạo lợi thế lớn trước các đối thủ cạnh tranh.' }
                ].map((item, idx) => (
                  <div key={idx} className="ap-theory-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="ap-theory-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 32 }}>
                      {item.label === 'APPLE' ? (
                        <svg viewBox="0 0 814 1000" width="22" height="22" fill="#fff">
                          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                        </svg>
                      ) : item.label === 'GOOGLE' ? (
                        <svg viewBox="0 0 24 24" width="22" height="22">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                      ) : item.label === 'MICROSOFT' ? (
                        <svg viewBox="0 0 23 23" width="22" height="22">
                          <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                          <rect x="12" y="1" width="10" height="10" fill="#7FBA00"/>
                          <rect x="1" y="12" width="10" height="10" fill="#00A4EF"/>
                          <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
                        </svg>
                      ) : item.label === 'SAMSUNG' ? (
                        <svg viewBox="0 0 100 50" width="36" height="18" fill="#0c4da2">
                          <ellipse cx="50" cy="25" rx="48" ry="24" transform="rotate(-10 50 25)" />
                          <text x="50" y="31" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="14" fill="#fff" text-anchor="middle" letter-spacing="1">SAMSUNG</text>
                        </svg>
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className="ap-theory-label">{item.label}</span>
                    <div className="ap-theory-theory">{item.theory}</div>
                    <div className="ap-theory-apple">{item.apple}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 2 — NGUYÊN NHÂN (Causes Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'nguyen-nhan' && (
            <div>
              <p className="ap-eyebrow">Phần II</p>
              <h2 className="ap-heading">Nguyên nhân <span style={{ color: '#0071e3' }}>hình thành</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
                Ba tác nhân cốt lõi thúc đẩy quá trình chuyển dịch tất yếu từ cạnh tranh tự do sang độc quyền.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center', margin: '40px 0' }}>
                <div className="ap-chain">
                  {[
                    { step: '01', title: 'Sự phát triển của Lực lượng Sản xuất', desc: 'Cuối thế kỷ XIX, các phát minh khoa học kỹ thuật mới (động cơ diesel, máy phát điện, ngành luyện kim, đường sắt...) đòi hỏi quy mô sản xuất cực lớn và nguồn vốn khổng lồ. Doanh nghiệp nhỏ không đáp ứng được phải tích tụ, sáp nhập.' },
                    { step: '02', title: 'Do cạnh tranh khốc liệt', desc: 'Cạnh tranh tự do đẩy các doanh nghiệp vào cuộc chiến đào thải. Doanh nghiệp yếu kém bị phá sản hoặc thâu tóm, doanh nghiệp mạnh thắng cuộc ngày càng lớn mạnh và liên minh với nhau.' },
                    { step: '03', title: 'Khủng hoảng kinh tế & Hệ thống tín dụng', desc: 'Cuộc khủng hoảng kinh tế 1873 thúc đẩy nhanh chóng sự phá sản của các xí nghiệp vừa và nhỏ. Hệ thống ngân hàng và tín dụng đóng vai trò là đòn bẩy tài chính, giúp tập trung tư bản vào tay các tập đoàn lớn.' }
                  ].map((item, idx) => (
                    <div key={idx} className="ap-dark-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 24, padding: 24, marginBottom: 12 }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#0071e3', opacity: 0.8, fontFamily: 'monospace' }}>{item.step}</div>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f5f5f7', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontSize: 16, color: '#a1a1a6', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={industrialMonopolyRiseImg} alt="Industrial Monopoly Rise" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              <blockquote className="ap-quote">
                <p>"Tự do cạnh tranh đẻ ra tập trung sản xuất và sự tập trung sản xuất khi phát triển đến một mức độ nhất định lại dẫn tới độc quyền."</p>
                <cite>— V.I. Lênin</cite>
              </blockquote>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 3 — GIÁ CẢ & LN (Price Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'gia-ca' && (
            <div>
              <p className="ap-eyebrow">Phần III</p>
              <h2 className="ap-heading">Giá cả & <span className="ap-grad">Lợi nhuận</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
                Cách thức các tổ chức độc quyền chi phối thị trường để tối đa hóa giá trị thặng dư.
              </p>

              <div className="ap-two-col">
                <div className="ap-dark-card" style={{ borderTop: '3px solid #ff3b30', background: '#111' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(255,59,48,0.1)', color: '#ff3b30', borderRadius: 980, padding: '4px 12px', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                    📈 Giá cả Độc quyền Cao
                  </div>
                  <h3 className="ap-dark-card-title" style={{ marginBottom: 12 }}>Áp đặt khi bán hàng</h3>
                  <p style={{ fontSize: 20, color: '#a1a1a6', lineHeight: 1.7 }}>
                    Tổ chức độc quyền áp đặt giá bán cao hơn giá trị thực tế của hàng hóa nhằm thâu tóm lợi nhuận từ người tiêu dùng và các doanh nghiệp nhỏ ngoài độc quyền.
                  </p>
                </div>

                <div className="ap-dark-card" style={{ borderTop: '3px solid #30d158', background: '#111' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(48,209,88,0.1)', color: '#30d158', borderRadius: 980, padding: '4px 12px', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                    📉 Giá cả Độc quyền Thấp
                  </div>
                  <h3 className="ap-dark-card-title" style={{ marginBottom: 12 }}>Ép giá khi mua vào</h3>
                  <p style={{ fontSize: 20, color: '#a1a1a6', lineHeight: 1.7 }}>
                    Tổ chức độc quyền ép giá mua thấp đối với nguyên liệu đầu vào, hàng hóa dịch vụ từ các nhà sản xuất nhỏ, nông dân, hoặc đối tác không có thế lực thương lượng.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32, alignItems: 'center', marginTop: 32 }}>
                <div className="ap-verdict" style={{ margin: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
                  <div>
                    <span className="ap-verdict-icon" style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>💡</span>
                    <p style={{ fontSize: '17px', color: '#a1a1a6', lineHeight: '1.7', textAlign: 'left', margin: 0 }}>
                      <strong style={{ color: '#f5f5f7' }}>Nguồn gốc thực chất của Lợi nhuận độc quyền cao:</strong> Vẫn là giá trị thặng dư do người lao động tạo ra ở các xí nghiệp độc quyền, cộng với một phần giá trị thặng dư của các doanh nghiệp ngoài độc quyền và thu nhập của người sản xuất nhỏ, người tiêu dùng thông qua trao đổi không ngang giá.
                    </p>
                  </div>
                </div>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={monopolyPriceSqueezeImg} alt="Monopoly Price Squeeze" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 4 — ĐQ NHÀ NƯỚC (State Monopoly Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'dq-nha-nuoc' && (
            <div>
              <p className="ap-eyebrow">Phần IV</p>
              <h2 className="ap-heading">Độc quyền <span style={{ color: '#ffd60a' }}>Nhà nước</span></h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'center', textAlign: 'left', margin: '40px 0' }}>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={stateCapitalismImg} alt="State Monopoly Capitalism" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
                <div>
                  <blockquote className="ap-quote" style={{ margin: 0, borderLeftColor: '#ffd60a', background: 'rgba(255,214,10,0.04)' }}>
                    <p>"Độc quyền nhà nước là kiểu độc quyền trong đó nhà nước thực hiện nắm giữ vị thế độc quyền trên cơ sở duy trì sức mạnh của các tổ chức độc quyền ở những lĩnh vực then chốt..."</p>
                  </blockquote>
                  <p style={{ fontSize: 20, color: '#a1a1a6', lineHeight: 1.7, marginTop: 16 }}>
                    Sự dung hợp giữa sức mạnh kinh tế của các tài phiệt độc quyền tư nhân và quyền lực tối cao của bộ máy chính trị nhà nước tư sản. 
                    Mục đích cuối cùng là tạo ra sự ổn định cho nền kinh tế, hỗ trợ tư bản tư nhân thâu tóm lợi nhuận và duy trì chế độ xã hội.
                  </p>
                </div>
              </div>

              {/* Grid of Examples */}
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f5f7', marginBottom: 24, textAlign: 'left', maxWidth: 860, margin: '32px auto 24px' }}>
                Ví dụ thực tế về lĩnh vực Độc quyền Nhà nước:
              </h3>
              <div className="ap-product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', maxWidth: 860, margin: '0 auto 48px' }}>
                {[
                  { icon: '💵', label: 'Phát hành tiền tệ', desc: 'Ngân hàng Trung ương độc quyền in và kiểm soát lượng tiền lưu thông.' },
                  { icon: '⚡', label: 'Điện lực quốc gia', desc: 'Hệ thống truyền tải điện huyết mạch do tập đoàn nhà nước vận hành.' },
                  { icon: '🛡️', label: 'Quốc phòng & An ninh', desc: 'Sản xuất vũ khí và các khí tài quân sự chiến lược được kiểm soát nghiêm ngặt.' },
                  { icon: '🚂', label: 'Đường sắt quốc gia', desc: 'Hạ tầng giao thông đường sắt quy mô lớn cần quản lý tập trung.' },
                  { icon: '🛣️', label: 'Hạ tầng chiến lược', desc: 'Xây dựng đường cao tốc, cảng biển, sân bay bằng ngân sách công.' },
                  { icon: '🔬', label: 'Nghiên cứu vũ trụ', desc: 'Đầu tư ngân sách lớn cho nghiên cứu khoa học cơ bản mang tính quốc gia.' }
                ].map((item, idx) => (
                  <div key={idx} className="ap-product-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px' }}>
                    <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{item.icon}</span>
                    <div style={{ fontSize: 19, fontWeight: 700, color: '#f5f5f7', marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 17, color: '#a1a1a6', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Accordion for Causes */}
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f5f7', marginBottom: 24, textAlign: 'left', maxWidth: 860, margin: '0 auto 20px' }}>
                Nguyên nhân hình thành Độc quyền Nhà nước:
              </h3>
              <div style={{ maxWidth: 860, margin: '0 auto' }}>
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
                    content: 'Xu hướng quốc tế hóa đời sống kinh tế đòi hỏi phải có sự điều tiết các quan hệ kinh tế đối ngoại tầm quốc gia. Nhà nước đứng ra ký kết hiệp định, bảo vệ lợi ích của các tập đoàn trong nước trước đối thủ nước ngoài.'
                  }
                ]} />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 5 — TÁC ĐỘNG (Impact Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'tac-dong' && (
            <div>
              <p className="ap-eyebrow">Phần V</p>
              <h2 className="ap-heading">Tác động của <span className="ap-grad">Độc quyền</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 64px' }}>
                Hai mặt đối lập song hành của độc quyền đối với nền kinh tế xã hội.
              </p>

              <div className="ap-two-col">
                <div className="ap-dark-card" style={{ borderTop: '3px solid #30d158', background: '#111' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 24 }}>✅</span>
                    <h3 style={{ fontSize: 21, fontWeight: 700, color: '#30d158' }}>Tác động Tích cực</h3>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0, textAlign: 'left' }}>
                    {[
                      ['Thúc đẩy tiến bộ khoa học kỹ thuật', 'Sở hữu tiềm lực tài chính khổng lồ cho phép đầu tư dài hạn vào R&D, tạo ra các công nghệ đột phá mới.'],
                      ['Nâng cao năng suất lao động xã hội', 'Tập trung sản xuất quy mô lớn, tối ưu hóa quy trình quản trị hiện đại, giảm chi phí trung bình.'],
                      ['Thúc đẩy sản xuất lớn hiện đại', 'Hình thành các chuỗi liên kết giá trị, đóng vai trò đầu tàu dẫn dắt các ngành kinh tế phát triển.']
                    ].map(([title, desc], idx) => (
                      <li key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 17, color: '#a1a1a6', lineHeight: 1.6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', flexShrink: 0, marginTop: 7 }} />
                        <span><strong style={{ color: '#f5f5f7' }}>{title}:</strong> {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ap-dark-card" style={{ borderTop: '3px solid #ff3b30', background: '#111' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 24 }}>❌</span>
                    <h3 style={{ fontSize: 21, fontWeight: 700, color: '#ff6b63' }}>Tác động Tiêu cực</h3>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0, textAlign: 'left' }}>
                    {[
                      ['Gây thiệt hại cho người tiêu dùng', 'Bán hàng với giá độc quyền cao và ép mua với giá độc quyền thấp, làm giảm phúc lợi xã hội.'],
                      ['Kìm hãm tiến bộ kỹ thuật', 'Khi giữ vị thế độc quyền tuyệt đối, doanh nghiệp có xu hướng trì hoãn đổi mới công nghệ để bảo vệ lợi nhuận hiện tại.'],
                      ['Gia tăng bất bình đẳng xã hội', 'Lợi nhuận khổng lồ tập trung vào tay một nhóm nhỏ đầu sỏ tài chính, gia tăng khoảng cách giàu nghèo.']
                    ].map(([title, desc], idx) => (
                      <li key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 17, color: '#a1a1a6', lineHeight: 1.6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3b30', flexShrink: 0, marginTop: 7 }} />
                        <span><strong style={{ color: '#f5f5f7' }}>{title}:</strong> {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                <div style={{ maxWidth: '640px', width: '100%', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={monopolyDualImpactImg} alt="Monopoly Dual Impact" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 6 — CẠNH TRANH (Competition Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'canh-tranh' && (
            <div>
              <p className="ap-eyebrow">Phần VI</p>
              <h2 className="ap-heading">Quan hệ <span style={{ color: '#2a92ff' }}>Cạnh tranh & Độc quyền</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
                Độc quyền không tiêu diệt cạnh tranh tự do mà cùng song tồn và tạo ra các hình thức cạnh tranh gay gắt hơn.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'center', marginBottom: 48 }}>
                <blockquote className="ap-quote" style={{ margin: 0, width: '100%', borderLeftColor: '#0071e3', background: 'rgba(0,113,227,0.04)' }}>
                  <p style={{ fontSize: 20 }}>"Độc quyền sinh ra từ cạnh tranh tự do, độc quyền không tiêu diệt cạnh tranh, mà tồn tại bên trên và bên cạnh nó, từ đó sinh ra những mâu thuẫn và xung đột cực kỳ gay gắt và sâu sắc."</p>
                  <cite style={{ color: '#2a92ff' }}>— V.I. Lênin</cite>
                </blockquote>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={monopolyClashImg} alt="Monopoly Clash" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>

              {/* Grid for competition types */}
              <div className="ap-theory-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
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
                  <div key={idx} className="ap-theory-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(0,113,227,0.25)', fontFamily: 'monospace', lineHeight: 1 }}>{item.num}</div>
                    <h3 style={{ fontSize: 21, fontWeight: 700, color: '#f5f5f7', marginTop: 10, textAlign: 'left' }}>{item.title}</h3>
                    <p style={{ fontSize: 19, color: '#a1a1a6', lineHeight: 1.6, flex: 1, textAlign: 'left' }}>{item.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                      {item.tags.map((t, i) => (
                        <span key={i} style={{ background: 'rgba(0,113,227,0.1)', color: '#2a92ff', borderRadius: 980, padding: '3px 10px', fontSize: 16, fontWeight: 500 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 7 — 5 ĐẶC ĐIỂM (5 Features Tab)
          ══════════════════════════════════════ */}
          {activeTab === '5-diem' && (
            <div>
              <p className="ap-eyebrow">Phần VII</p>
              <h2 className="ap-heading">5 Đặc điểm Kinh tế của <span className="ap-grad">CNTB Độc quyền</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
                Lý luận kinh tế kinh điển của V.I.Lênin về chủ nghĩa tư bản độc quyền tư nhân.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
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
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#30d158', letterSpacing: '0.05em', marginBottom: 8 }}>ĐẶC ĐIỂM {item.num}</div>
                    <h3 style={{ fontSize: 21, fontWeight: 700, color: '#f5f5f7', marginBottom: 12 }}>{item.title}</h3>
                    <p style={{ fontSize: 19, color: '#a1a1a6', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Forms of Monopoly organization */}
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f5f7', marginTop: 56, marginBottom: 24, textAlign: 'left', maxWidth: '1000px', margin: '56px auto 24px' }}>
                Các hình thức tổ chức độc quyền (từ thấp đến cao):
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32, alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                  {[
                    { name: 'Cartel', level: 1, desc: 'Các doanh nghiệp thỏa thuận về giá cả, thị trường, sản lượng nhưng độc lập hoàn toàn về cả sản xuất và lưu thông.' },
                    { name: 'Syndicate', level: 2, desc: 'Các doanh nghiệp giữ tính độc lập sản xuất, nhưng khâu lưu thông (mua bán nguyên vật liệu, bán sản phẩm) do ban quản trị chung quản trị.' },
                    { name: 'Trust', level: 3, desc: 'Doanh nghiệp mất hoàn toàn tính độc lập sản xuất và lưu thông, sáp nhập và nhận cổ phần tương ứng chịu sự quản trị thống nhất.' },
                    { name: 'Consortium', level: 4, desc: 'Mức độ cao nhất. Các công ty đa ngành, ngân hàng hợp nhất dưới quyền chi phối tài chính tối cao của một nhóm tài phiệt đầu sỏ.' }
                  ].map((item, idx) => (
                    <div key={idx} className="ap-dark-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', padding: 20, textAlign: 'left' }}>
                      <div style={{ fontSize: 19, fontWeight: 700, color: '#f5f5f7', marginBottom: 6 }}>{item.name}</div>
                      <p style={{ fontSize: 16, color: '#a1a1a6', lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, color: '#6e6e73' }}>Mức độ liên kết:</span>
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
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={financialCapitalOligarchyImg} alt="Financial Capital Oligarchy" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              TAB 8 — ĐĐ ĐQ NN (State Features Tab)
          ══════════════════════════════════════ */}
          {activeTab === 'dq-nn-dactrung' && (
            <div>
              <p className="ap-eyebrow">Phần VIII</p>
              <h2 className="ap-heading">Đặc điểm của <span style={{ color: '#30d158' }}>Độc quyền Nhà nước</span></h2>
              <p className="ap-body" style={{ maxWidth: 640, margin: '0 auto 56px' }}>
                Lý luận của Lênin về 3 đặc trưng độc lập của độc quyền nhà nước trong nền kinh tế thị trường tư bản chủ nghĩa.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="ap-chain">
                  {[
                    { num: '1', title: 'Sự kết hợp nhân sự giữa Nhà nước và Tổ chức Độc quyền', desc: 'Có sự luân chuyển nhân sự liên tục: quan chức nhà nước chuyển sang làm giám đốc các tập đoàn, ngân hàng tư nhân và ngược lại. Các hiệp hội tư bản đóng vai trò là "chính phủ đằng sau chính phủ".' },
                    { num: '2', title: 'Sự hình thành và phát triển của Sở hữu Nhà nước', desc: 'Nhà nước tích lũy vốn đầu tư xây dựng các công ty công ích, hạ tầng cơ sở cốt lõi, hoặc quốc hữu hóa các doanh nghiệp tư nhân. Nhà nước mở rộng thị trường thông qua các gói thầu mua sắm công lớn.' },
                    { num: '3', title: 'Độc quyền Nhà nước là công cụ điều tiết kinh tế vĩ mô', desc: 'Sử dụng hệ thống chính sách tài khóa, tiền tệ, hành pháp để hỗ trợ các tập đoàn tư nhân. Sự dung hợp của 3 cơ chế điều tiết: thị trường + độc quyền tư nhân + điều tiết vĩ mô của nhà nước.' }
                  ].map((item, idx) => (
                    <div key={idx} className="ap-dark-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 20, padding: 24, marginBottom: 12 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'rgba(48,209,88,0.1)',
                        color: '#30d158',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        flexShrink: 0,
                        fontSize: 15
                      }}>{item.num}</div>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f5f5f7', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontSize: 16, color: '#a1a1a6', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={stateMonopolyIntegrationImg} alt="State Monopoly Integration" loading="lazy" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              FOOTER PAGINATION CONTROLS
          ══════════════════════════════════════ */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
            {prevTab ? (
              <button className="ap-btn-ghost" onClick={() => setActiveTab(prevTab.id)} style={{ padding: '12px 24px', fontSize: 19 }}>
                ← {prevTab.label.split(': ').pop()}
              </button>
            ) : <div />}
            
            {activeTab !== 'overview' && (
              <button className="ap-btn-ghost" onClick={() => setActiveTab('overview')} style={{ padding: '12px 24px', fontSize: 19, background: 'rgba(255,255,255,0.04)' }}>
                🗺️ Tổng quan Sơ đồ
              </button>
            )}
            
            {nextTab ? (
              <button className="ap-btn-primary" onClick={() => setActiveTab(nextTab.id)} style={{ padding: '12px 24px', fontSize: 19 }}>
                {nextTab.label.split(': ').pop()} →
              </button>
            ) : (
              <Link to="/apple" className="ap-btn-primary" style={{ padding: '12px 24px', fontSize: 19, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                </svg>
                Case Study Apple →
              </Link>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
