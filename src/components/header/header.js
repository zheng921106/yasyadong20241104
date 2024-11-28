export function renderHeader(title = "야동 최신 | 야스닷컴 추천 사이트 | 인기 성인영상", showBanner = false) {
    const bannerHtml = showBanner
        ? `<div class="banner-container">
            <div class="banner-item">
                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEi9zULC2Bg1ME1jFzHBi7gmVGVm2Ve6rGHRPWJ4zAPGs3oHJHX1G6MCbVZFqvuH5Q6hLcflzJoqD9gL0xJRSfJ3ZeY70Fk1IPm_cPKqgtIM8zDHBSBKDJyhmXgC5O2Fx0_r8qAcmhwVpsYVZl6is0w2s4Ze6XPtl2g4S0NPTO9omTZywEUoRtxlTW74JTrr" alt="Banner 1">
            </div>
            <div class="banner-item">
                <img src="https://blogger.googleusercontent.com/img/a/AVvXsEh1iEMTiytqH0Qy_AkSVEIr0o7MmKrs8sj274MjiSXpVPZBUTpP2NHTEAm-3alvIcei0GuVv6qv0SoIqBjopOcrRZKtwx2e31aUI-uMKmqggiOucJkYFPkUyARMRyeZGT-XsgRzoum-zo1MgM-ryfZm29mIP8v5zxpplgDHAu_zHA_AO0JTtuxit2M_3gGQ" alt="Banner 2">
            </div>
        </div>`
        : '';

    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/src/components/header/global-header.css"> <!-- 正确路径 -->
            <link rel="stylesheet" href="/pages/home.css"> <!-- 正确路径 -->
    <link rel="stylesheet" href="/pages/items.css"> <!-- 正确路径 -->
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
        ${bannerHtml}
    `;
}
