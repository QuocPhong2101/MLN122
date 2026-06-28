---
name: MLN122 Presentation
description: Triển lãm học thuyết độc quyền Lênin qua case study Apple & Samsung
colors:
  primary: "#0071e3"
  primary-light: "#30d158"
  samsung-blue: "#0c4da2"
  neutral-bg: "#000000"
  neutral-surface: "#161617"
  text-primary: "#f5f5f7"
  text-muted: "#a1a1a6"
  apple-yellow: "#ffd60a"
  apple-red: "#ff3b30"
  apple-orange: "#ff9500"
  apple-purple: "#a855f7"
  apple-blue-text: "#2a92ff"
  apple-red-text: "#ff6b63"
  apple-purple-text: "#c084fc"
  apple-gray-secondary: "#6e6e73"
  apple-gray-tertiary: "#8e8e93"
  apple-gray-dark: "#515154"
  apple-border-light: "#d2d2d7"
  apple-border-separator: "#e5e5ea"
typography:
  display:
    fontFamily: "-apple-system, 'SF Pro Display', sans-serif"
    fontSize: "clamp(36px, 5.5vw, 68px)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.03em"
  body:
    fontFamily: "-apple-system, 'SF Pro Display', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "12px"
  md: "18px"
  pill: "980px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: MLN122 Presentation

## 1. Overview

**Creative North Star: "Leninist Apple Keynote"**

Hệ thống thiết kế kết hợp sự sang trọng, tinh tế và tối giản của một buổi ra mắt sản phẩm Apple cao cấp với chiều sâu học thuật của lý luận Mác-Lênin. Giao diện sử dụng nền tối sâu thẳm, làm nổi bật thông tin và tạo cảm giác điện ảnh (cinematic) khi thuyết trình. Mọi chi tiết đồ họa đều kiềm chế tối đa để tôn vinh số liệu và luận điểm phân tích.

**Key Characteristics:**
- Nền đen sâu và độ tương phản chữ hoàn hảo.
- Typography lớn, khoảng trống rộng rãi để phân luồng thông tin rõ ràng.
- Hiệu ứng chuyển động mượt mà và tương tác chủ động (click để hiển thị).
- Loại bỏ hoàn toàn các trang trí rườm rà không phục vụ mục đích học thuật.

## 2. Colors

Bảng màu sử dụng hệ sắc độ tối của Apple kết hợp với sắc xanh độc quyền để tạo độ nhấn.

### Primary
- **Apple Blue** (#0071e3): Sắc xanh chủ đạo dùng cho các nút bấm chính (Call to Action), trạng thái kích hoạt (Active tab) và highlight.

### Secondary
- **Apple Green** (#30d158): Dùng làm màu gradient phụ cho các nhãn chữ quan trọng và biểu tượng hệ sinh thái.
- **Samsung Blue** (#0c4da2): Màu xanh thương hiệu đối lập dùng riêng cho cột Samsung trong bảng so sánh.

### Neutral
- **Deep Black** (#000000): Màu nền nền tảng cho toàn bộ website, tạo chiều sâu thị giác tối đa.
- **Off White** (#f5f5f7): Màu chữ chính, có độ sáng nhẹ để tránh mỏi mắt người đọc.
- **Muted Gray** (#a1a1a6): Màu chữ phụ, mô tả chi tiết và các trạng thái chưa kích hoạt.

**The Ten Percent Rule.** Màu xanh chủ đạo (Apple Blue) chỉ được chiếm tối đa 10% diện tích bất kỳ màn hình nào. Sự hiếm hoi mới tạo nên tính định hướng cao cấp.

## 3. Typography

**Display Font:** -apple-system, 'SF Pro Display', sans-serif
**Body Font:** -apple-system, 'SF Pro Text', 'Be Vietnam Pro', sans-serif

Cặp font chữ không chân tinh tế, tối giản, mang lại trải nghiệm đọc dễ chịu và hiện đại.

### Hierarchy
- **Display** (Bold 700, clamp(36px, 5.5vw, 68px), 1.18): Dùng cho tiêu đề lớn của các Section. Bắt buộc text-wrap: balance.
- **Headline** (Semi-bold 600, 24px, 1.3): Tiêu đề phụ hoặc các thông số thống kê lớn.
- **Title** (Medium 500, 20px, 1.4): Tiêu đề của các thẻ (Card title).
- **Body** (Regular 400, 18px, 1.7): Nội dung mô tả và các đoạn phân tích học thuật. Chiều dài dòng tối đa 70ch để tối ưu hóa trải nghiệm đọc.
- **Label** (Medium 500, 13px, 0.05em, uppercase): Dành cho các nhãn nhỏ, kicker (eyebrow) chỉ dẫn bên trên tiêu đề.

## 4. Elevation

Hệ thống thiết kế tuân thủ tính phẳng tối giản, loại bỏ bóng đổ để giảm nhiễu thị giác.

**The Border Silhouette Rule.** Toàn bộ chiều sâu của giao diện được phân tách bằng màu nền phụ (`#161617`) và các đường viền mảnh bán trong suốt (`1px solid rgba(255,255,255,0.08)`) trên nền đen sâu, không lạm dụng bóng đổ (`box-shadow`).

## 5. Components

### Buttons
- **Shape:** Bo cong tối đa hình viên thuốc (pill shape, 980px).
- **Primary:** Nền xanh `#0071e3`, chữ trắng, padding `8px 18px`.
- **Ghost:** Viền mỏng `1px solid rgba(255,255,255,0.2)`, chữ trắng `#f5f5f7`, padding `6px 12px`, font-size `13px`.
- **Hover:** Tăng nhẹ độ sáng nền đối với nút Primary, thêm nền xám nhạt mờ đối với nút Ghost.

**The Tactile Restraint Rule.** Các nút bấm trong thanh nav phải cực kỳ nhỏ gọn (`13px`) và kiềm chế về khoảng cách để giữ sự thanh thoát cho header.

### Cards / Containers
- **Corner Style:** Bo góc lớn (`18px`) cho các thẻ nội dung chính, bo góc nhỏ (`12px`) cho các nút/thẻ phụ.
- **Background:** Nền xám đen mờ (`rgba(255,255,255,0.03)`) hoặc đen mờ (`rgba(0,0,0,0.4)`).
- **Border:** Viền mảnh `1px solid rgba(255,255,255,0.06)`.

## 6. Do's and Don'ts

### Do:
- **Do** Duy trì khoảng trống (margin/padding) lớn để giao diện luôn thoáng đạt.
- **Do** Đảm bảo độ tương phản của chữ luôn đạt WCAG AA trên nền tối.
- **Do** Dùng số thứ tự lớn màu mờ (`01`, `02`) thay cho hình ảnh gượng ép trong các phần lý thuyết.

### Don't:
- **Don't** Sử dụng hình ảnh do AI vẽ (AI-generated image) ở bất kỳ phần nào trên giao diện.
- **Don't** Dùng hiệu ứng viền sọc một bên (side-stripe border) trên các thẻ nội dung.
- **Don't** Ghép chữ gradient màu sắc đè lên các hình nền phức tạp gây khó đọc.
- **Don't** Dùng các hiệu ứng chuyển động xoay, phóng to ảnh khi hover chuột vào hình ảnh.
