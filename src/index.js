// src/pages/home.js
import { renderHeader } from './components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            // 使用统一的 header
            const header = renderHeader();

            // 获取分页参数，默认第一页
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get('page')) || 1; // 当前页
            const pageSize = 10; // 每页显示 10 条
            const offset = (page - 1) * pageSize; // 偏移量

            // 从 D1 数据库查询分页数据
            const query = `SELECT * FROM od_items LIMIT ${pageSize} OFFSET ${offset}`;
            const results = await env.DB.prepare(query).all();

            // 生成 HTML 内容，包含查询结果
            let html = `<!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <style>
          /* CSS 样式 */
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
          .tab-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            background-color: #2b2b2b;
            padding: 10px;
          }
          .tab {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #444;
            cursor: pointer;
            border-radius: 5px;
          }
          .tab.active {
            background-color: #d32f2f;
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
          .video-thumbnail {
            position: relative;
          }
          .video-thumbnail img {
            width: 100%;
            height: auto;
          }
          .video-duration {
            position: absolute;
            bottom: 5px;
            right: 5px;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 12px;
          }
          .video-info {
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .video-title {
            font-size: 14px;
            margin: 5px 0;
            color: #ff6b6b;
            text-align: center;
          }
          .video-meta {
            font-size: 12px;
            color: #aaa;
            text-align: center;
          }
          .category-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 10px;
          }
          .category {
            padding: 5px 10px;
            border: 1px solid #ff6b6b;
            border-radius: 5px;
            color: #ff6b6b;
            cursor: pointer;
            background-color: transparent;
            font-size: 14px;
          }
          .category.active {
            background-color: #ff6b6b;
            color: #fff;
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
        ${header}

        <!-- 横向滚动的 Banner 区域 -->
        <div class="banner-container">
          <div class="banner-item">
            <img src="https://www.example.com/banner1.jpg" alt="Banner 1">
          </div>
          <!-- 更多 Banner 项目 -->
        </div>

        <!-- Video Content -->
        <div class="video-container">
          ${results.results.map(row => `
            <div class="video-item">
              <div class="video-thumbnail">
                <img src="https://www.yasyadong.com/data/upload/store/items/1/${row.items_image || 'placeholder.jpg'}" 
                     alt="${row.items_name || 'No Title'}">
                <div class="video-duration">5:30</div>
              </div>
              <div class="video-info">
                <div class="video-title">${row.items_name || 'NoData'}</div>
              </div>
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

            // 返回生成的 HTML 页面
            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });

        } catch (error) {
            // 错误处理
            return new Response(`页面加载出错: ${error.message}`, { status: 500 });
        }
    },
};
