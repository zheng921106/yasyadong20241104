// src/pages/home.js
import { renderHeader } from './components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            // 使用统一的 header
            const header = renderHeader();

            // 从 D1 数据库查询示例数据
            const query = "SELECT * FROM data_videos LIMIT 10"; // 查询 data_user 表前10条数据
            const results = await env.DB.prepare(query).all(); // 使用 D1 Database API 执行查询

            // 生成 HTML 内容，包含查询结果
            let html = `<!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>视频网站</title>
        <style>
          /* CSS 代码（保持不变） */
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

          /* 其他样式... */
        </style>
      </head>
      <body>
        ${header}

        <!-- 横向滚动的 Banner 区域 -->
        <div class="banner-container">
          <!-- Banner 项目（保持不变） -->
        </div>

        <!-- Tab Navigation -->
        <div class="tab-bar">
          <div class="tab active">업데이트</div>
          <div class="tab">배우별</div>
          <div class="tab">취향별</div>
          <div class="tab">인기100</div>
        </div>

        <!-- Category Filter -->
        <div class="category-container">
          <div class="category active">전체</div>
          <div class="category">한국</div>
          <div class="category">일본</div>
          <div class="category">서양</div>
          <div class="category">중화권</div>
          <div class="category">동남아</div>
        </div>

        <!-- Video Content -->
        <div class="video-container">
          <!-- 显示查询数据 -->
          ${results.results.map(row => `
            <div class="video-item">
              <div class="video-thumbnail">
                <img src="https://example.com/thumbnail.jpg" alt="示例视频标题">
                <div class="video-duration">5:30</div>
              </div>
              <div class="video-info">
                <div class="video-title">${row.name || '示例视频标题'}</div>
                <div class="video-meta">观看次数 ${row.views || 1000} · 2024-11-01</div>
                <p>这是一个示例视频描述。</p>
              </div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>`;

            // 返回生成的 HTML 页面
            return new Response(html, {
                headers: {'Content-Type': 'text/html;charset=UTF-8'},
            });

        } catch (error) {
            // 错误处理
            return new Response(`页面加载出错: ${error.message}`, { status: 500 });
        }
    },
};
