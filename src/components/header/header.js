// src/components/header.js

export function renderHeader() {
    return `
    <div class="global-header">
      <div class="header-left">
        <img src="https://www.yasyadong.com/data/upload/common/07242086604829132.png" alt="Logo" class="logo">
      </div>
      <div class="header-center">
        <input type="text" placeholder="Search..." class="search-bar">
        <button class="search-button">&#x1F50D;</button>
      </div>
      <div class="header-right">
        <a href="/login" class="login-link">로그인 / 회원가입</a>
      </div>
    </div>
    <style lang="scss">
     .global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;

  .header-left {
    display: flex;
    align-items: center;

    .logo {
      height: 60px;
      margin-right: 10px;
    }
  }

  .header-center {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .search-bar {
      padding: 5px;
      border-radius: 15px 0 0 15px;
      border: none;
      outline: none;
      width: 100%;
      max-width: 200px;
    }

    .search-button {
      padding: 5px 10px;
      background-color: #333;
      border: none;
      border-radius: 0 15px 15px 0;
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #555;
      }
    }
  }

  .header-right {
    margin-left: auto;

    .login-link {
      color: #4e88ff;
      text-decoration: none;
      font-size: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;

    .header-left,
    .header-center,
    .header-right {
      width: 100%;
      justify-content: center;
      margin: 5px 0;
    }

    .header-center {
      .search-bar {
        width: 80%;
        max-width: none;
      }
    }

    .header-right {
      .login-link {
        font-size: 14px;
      }
    }
  }
}

    </style>
  `;
}
