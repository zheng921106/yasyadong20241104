import { renderHeader } from '../components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const header = renderHeader(); // 从 header.js 获取头部内容
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get('page')) || 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            const query = `SELECT * FROM od_items LIMIT ${pageSize} OFFSET ${offset}`;
            const results = await env.DB.prepare(query).all();

            // HTML 内容，包含 header 和页面样式
            let html = `<!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>야동 최신 | 야스닷컴 추천 사이트 | 인기 성인영상</title>
                <style>
                    /* 保留原来的 CSS 样式 */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #121212;
                        color: #fff;
                        margin: 0;
                        padding: 0;
                    }
                    .global-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 20px;
                        background-color: #000;
                        color: #fff;
                    }
                    .banner-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        padding: 10px;
                        background-color: #1a1a1a;
                    }
                    .banner-item {
                        flex: 1 0 calc(100% / 2 - 10px);
                        background-color: #333;
                        border-radius: 5px;
                        overflow: hidden;
                        max-width: 273.3px;
                        max-height: 84.8px;
                    }
                    .banner-item img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    @media (min-width: 768px) {
                        .banner-item {
                            flex: 1 0 calc(100% / 6 - 10px);
                        }
                    }
                    .video-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        padding: 20px;
                        gap: 15px;
                        background-color: #121212;
                    }
                    .video-item {
                        width: 300px;
                        background-color: #333;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .video-thumbnail img {
                        width: 100%;
                        height: auto;
                    }
                    .video-info {
                        padding: 10px;
                        text-align: center;
                    }
                    .pagination {
                        display: flex;
                        justify-content: center;
                        margin: 20px 0;
                    }
                    .pagination a {
                        padding: 10px 15px;
                        margin: 0 5px;
                        text-decoration: none;
                        background-color: #444;
                        color: #fff;
                        border-radius: 5px;
                    }
                    .pagination a:hover {
                        background-color: #d32f2f;
                    }
                </style>
            </head>
            <body>
                ${header} <!-- 插入头部 -->

                <!-- 横向滚动的 Banner 区域 -->
                <div class="banner-container">
                    <div class="banner-item">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEi9zULC2Bg1ME1jFzHBi7gmVGVm2Ve6rGHRPWJ4zAPGs3oHJHX1G6MCbVZFqvuH5Q6hLcflzJoqD9gL0xJRSfJ3ZeY70Fk1IPm_cPKqgtIM8zDHBSBKDJyhmXgC5O2Fx0_r8qAcmhwVpsYVZl6is0w2s4Ze6XPtl2g4S0NPTO9omTZywEUoRtxlTW74JTrr" alt="Banner 1">
                    </div>
                    <div class="banner-item">
                        <img src="https://blogger.googleusercontent.com/img/a/AVvXsEh1iEMTiytqH0Qy_AkSVEIr0o7MmKrs8sj274MjiSXpVPZBUTpP2NHTEAm-3alvIcei0GuVv6qv0SoIqBjopOcrRZKtwx2e31aUI-uMKmqggiOucJkYFPkUyARMRyeZGT-XsgRzoum-zo1MgM-ryfZm29mIP8v5zxpplgDHAu_zHA_AO0JTtuxit2M_3gGQ" alt="Banner 2">
                    </div>
                </div>

                <!-- Video Content -->
                <div class="video-container">
                    ${results.results.map(row => `
                        <div class="video-item">
                            <a href="/home/items?items_id=${row.items_id}">
                                <div class="video-thumbnail">
                                    <img src="https://www.yasyadong.com/data/upload/store/items/1/${row.items_image || 'https://via.placeholder.com/365x200'}" alt="${row.items_name || 'No Title'}">
                                    <div class="video-duration">${row.goods_custom}</div>
                                </div>
                                <div class="video-info">
                                    <div class="video-title">${row.items_name || 'NoData'}</div>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>

                <!-- 分页导航 -->
                <div class="pagination">
                    <a href="?page=${page > 1 ? page - 1 : 1}" class="prev">上一页</a>
                    <a href="?page=${page + 1}" class="next">下一页</a>
                </div>
            </body>
            </html>`;

            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });

        } catch (error) {
            return new Response(`页面加载出错: ${error.message}`, { status: 500 });
        }
    },
};
