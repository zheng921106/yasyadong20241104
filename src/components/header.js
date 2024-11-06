// src/components/header.js

import 'element-plus/dist/index.css';

export function renderHeader() {
    return `
    <div class="global-header">
      <div class="header-left">
        <img src="https://www.yasyadong.com/data/upload/common/07242086604829132.png" alt="Logo" class="logo">
        <el-menu mode="horizontal" background-color="#333" text-color="#fff" active-text-color="#ff6b6b">
          <el-submenu index="1">
            <template #title><i class="el-icon-menu"></i> yas 오리지널</template>
            <el-menu-item index="1-1">yas 오리지널</el-menu-item>
            <el-menu-item index="1-2">yas 플러스</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">기타 메뉴</el-menu-item>
        </el-menu>
      </div>
      <div class="header-center">
        <el-input placeholder="Search..." suffix-icon="el-icon-search" class="search-bar"></el-input>
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
      .el-menu {
        background-color: transparent;
      }
      .header-center {
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
      .search-bar {
        max-width: 400px;
        width: 100%;
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
