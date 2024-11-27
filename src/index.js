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
      <body>
        ${header}

        <!-- 横向滚动的 Banner 区域 -->
        <div class="banner-container">
          <div class="banner-item">
            <img src="https://example.com/banner1.jpg" alt="Banner 1" style="width: 100%; height: auto;">
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
      <style>
        /* 分页样式 */
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
