// src/components/header.js

export function renderHeader() {
    return `
    <div class="global-header">
      <div class="header-left">
        <img src="your-logo-url.png" alt="Logo" class="logo">
        <nav class="menu">
          <div class="menu-item">yas 오리지널</div>
          <div class="menu-item">yas 플러스</div>
          <div class="menu-item">기타 메뉴</div>
        </nav>
      </div>
      <div class="header-center">
        <input type="text" placeholder="Search..." class="search-bar">
        <button class="search-button">&#x1F50D;</button>
      </div>
      <div class="header-right">
        <a href="/login" class="login-link">로그인 / 회원가입</a>
      </div>
    </div>
    <style>
      /* Header 样式 */
      .global-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #000;
        color: #fff;
      }
      .header-left {
        display: flex;
        align-items: center;
      }
      .logo {
        width: 40px;
        margin-right: 10px;
      }
      .menu {
        display: flex;
        gap: 15px;
      }
      .menu-item {
        color: #fff;
        cursor: pointer;
      }
      .menu-item:hover {
        color: #ff6b6b;
      }
      .header-center {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .search-bar {
        padding: 5px;
        border-radius: 15px 0 0 15px;
        border: none;
        outline: none;
        width: 200px;
      }
      .search-button {
        padding: 5px 10px;
        background-color: #333;
        border: none;
        border-radius: 0 15px 15px 0;
        color: #fff;
        cursor: pointer;
      }
      .search-button:hover {
        background-color: #555;
      }
      .header-right {
        margin-left: auto;
      }
      .login-link {
        color: #4e88ff;
        text-decoration: none;
        font-size: 16px;
      }
      .login-link:hover {
        text-decoration: underline;
      }
    </style>
  `;
}
