## ORANGY

Đây là 1 project với mục đích thực hành tạo 1 trang website dựa theo yêu cầu và design figma có sẵn.
Project được dựa theo figma để làm theo tỉ lệ gần với design figma nhất có thể

## Công nghệ sử dụng

HTML, CSS, SASS/SCSS, Javascript

## Project gồm có

- Header
- Các section giới thiệu về shop
- Danh sách sản phẩm shop đang bán
- Form Contact us
- Các chương trình khuyến mãi đang diễn ra
- Phần FAQs - các câu hỏi thường gặp
- Thông tin liên hệ
- Footer

## Clone the repository

```
git clone -b BThuchanh4 https://github.com/hieu7654321/VuMinhHieu.git
```

## Install Dependencies

Install Sass
```
npm install sass
```

Install Tailwind
```
npm install tailwindcss @tailwindcss/cli
```

## Build SASS/SCSS

```
npm run build:css
```

## Build Tailwind

```
npx @tailwindcss/cli -i ./Css/input.css -o ./Css/output.css --watch
```