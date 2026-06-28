---
target: src/pages/ApplePage.jsx
total_score: 35
p0_count: 0
p1_count: 3
timestamp: 2026-06-28T08-25-41Z
slug: src-pages-applepage-jsx
---
# Design Critique: ApplePage.jsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Phản hồi tương tác của bản đồ hệ sinh thái và panel rất tốt, nhưng thanh điều hướng có thể tăng độ tương phản của nút active. |
| 2 | Match System / Real World | 4 | Nội dung so sánh và sơ đồ mô tả hoạt động thực tế của doanh nghiệp rất logic, thực tế. |
| 3 | User Control and Freedom | 4 | Đã có nút đóng (✕) cho phép đóng bảng so sánh chi tiết và đưa bảng về giữa màn hình. |
| 4 | Consistency and Standards | 2 | Phát hiện các bo góc lệch chuẩn (10px) và phông chữ Arial trong logo Samsung SVG, cùng nhiều mã màu cứng chưa khai báo trong DESIGN.md. |
| 5 | Error Prevention | 4 | Giao diện điều hướng an toàn, không có trường dữ liệu đầu vào phức tạp dễ gây lỗi cho người dùng. |
| 6 | Recognition Rather Than Recall | 4 | Bản đồ hệ sinh thái trực quan hóa hoàn hảo giúp nhận diện tức thì các liên kết độc quyền mà không cần ghi nhớ. |
| 7 | Flexibility and Efficiency | 3 | Chưa hỗ trợ phím tắt điều hướng nhanh trong slide thuyết trình. |
| 8 | Aesthetic and Minimalist Design | 4 | Tối giản, sang trọng, tuân thủ đúng định hướng Apple Keynote nền tối sâu. |
| 9 | Error Recovery | 4 | Không có luồng thao tác phức tạp cần phục hồi lỗi. |
| 10 | Help and Documentation | 3 | Có liên kết AI Usage và Tài liệu tham khảo ở footer nhưng nên đưa thêm lên thanh menu điều hướng. |
| **Total** | | **35/40** | **Good (Address weak areas)** |

## Anti-Patterns Verdict

**LLM assessment**: Trang web có thẩm mỹ tối giản rất cao, bố cục thoáng đạt, phản ánh đúng tinh thần Apple. Tuy nhiên, việc sử dụng các mã màu cứng ngẫu nhiên cho biểu tượng hệ sinh thái và phông chữ Arial trong phần SVG làm giảm tính nhất quán chuyên nghiệp của hệ thống thiết kế.

**Deterministic scan**: Detector phát hiện một số lỗi không khớp với `DESIGN.md`:
- Màu sắc ngoài hệ thống (các mã màu `#ffd60a`, `#ff3b30`, `#ff9500`, `#a855f7` cho biểu tượng hệ sinh thái; mã `#1756a9` cho logo Samsung; và các mã xám `#d2d2d7`, `#515154`, `#6e6e73`, `#8e8e93`).
- Bo góc không đồng bộ: `borderRadius: 10` tại dòng 460 và `borderRadius: '10px'` tại dòng 470 thay vị dùng token `12px` (`rounded.sm`).
- Font chữ không nằm trong hệ thống: `fontFamily: Arial` tại dòng 705 và `font-family="Arial..."` tại dòng 587 (logo Samsung SVG).

## Overall Impression
Giao diện đạt chất lượng sản xuất rất cao, mượt mà và trực quan xuất sắc. Điểm cần làm là đồng bộ hóa các bo góc, font chữ và đăng ký đầy đủ các mã màu hệ sinh thái vào `DESIGN.md` để đạt sự nhất quán tuyệt đối.

## What's Working
- **Hiệu ứng trực quan hóa hệ sinh thái:** Hoạt ảnh đường kết nối xung động (pulsing glow) hoạt động mượt mà và trực quan.
- **Tính năng so sánh Split-screen:** Trải nghiệm nhấp dòng để hiển thị giải thích chi tiết rất thông minh và gọn gàng.

## Priority Issues
- **[P2] Bo góc lệch chuẩn**: Dòng 460 và 470 chứa `borderRadius: 10` / `10px` lệch chuẩn token `12px` (`rounded.sm`).
  - *Why it matters*: Phá vỡ tính nhất quán hình học của các nút và container.
  - *Fix*: Đổi thành `12` / `'12px'`.
  - *Suggested command*: `/fk space`
- **[P2] Màu sắc ngoài hệ thống**: Chứa một số màu cứng ngoài bảng màu `DESIGN.md`.
  - *Why it matters*: Làm loãng hệ thống bảng màu thiết kế chuẩn.
  - *Fix*: Đăng ký các màu này vào extensions của `DESIGN.md` và `.fk-skills/design.json`.
  - *Suggested command*: `/fk color`
- **[P2] Phông chữ không đồng bộ**: Logo Samsung SVG sử dụng Arial thay vì phông chữ không chân chuẩn của hệ thống.
  - *Why it matters*: Gây trôi lệch thiết kế typography.
  - *Fix*: Đổi thành `sans-serif`.
  - *Suggested command*: `/fk type`

## Persona Red Flags

**Jordan (First-Timer)**: Không gặp khó khăn vì giao diện điều hướng rất trực quan, các phần đều có chỉ dẫn rõ ràng.
**Alex (Power User)**: Thao tác trơn tru, tuy nhiên việc chuyển đổi giữa các tab Lý thuyết hoặc phần so sánh có thể nhanh hơn nếu có phím tắt hỗ trợ.

## Minor Observations
- Các đường viền mờ của bảng so sánh sử dụng màu `#d2d2d7` nên được chuyển sang biến màu hệ thống hoặc khai báo rõ ràng.

## Questions to Consider
- Chúng ta có nên tạo thêm các phím tắt bàn phím (ví dụ: phím mũi tên) để chuyển đổi nhanh các phần thuyết trình không?
