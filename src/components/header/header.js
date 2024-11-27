export function renderHeader(title = "야동 최신 | 야스닷컴 추천 사이트 | 인기 성인영상") {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>${title}</title>
      <meta name="keywords" content="야동, 최신야동, 한국야동, 국산야동, 일본야동, 서양야동, 성인방송, bj야동, 모바일야동, 야스닷컴, 성인야동, 야동사이트, 인기야동, 무료야동, AV영상" />
      <meta name="description" content="야동 서비스에 최전선에 있는 야스닷컴은 최신 야동을 매일 업데이트하는 인기 성인 사이트입니다. 빠른 속도로 다양한 한국, 일본, 서양 야동을 실시간으로 무료 시청하세요. 최고의 야동 추천 사이트에서 제한 없이 즐기세요." />
      <meta name="referrer" content="no-referrer" />
      <meta name="google-site-verification" content="Rqq8YUdS-Bzs8EtOsKteEOxUdBjOmDGpXkmfG3JCgCg" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="format-detection" content="telephone=no">
      <link rel="shortcut icon" href="https://www.yasyadong.com/favicon.ico" />
      <meta name="renderer" content="webkit|ie-comp|ie-stand">
      <style lang="scss">
      a { text-decoration: none;color:inherit }
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
    </head>
    <body>
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
    `;
}
