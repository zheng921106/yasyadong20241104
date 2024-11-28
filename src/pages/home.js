import { renderHeader } from '../components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const header = renderHeader("", true); // 开启 Banner
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get('page')) || 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            // 获取总记录数
            const countQuery = `SELECT COUNT(*) as total FROM od_items`;
            const totalResult = await env.DB.prepare(countQuery).first();
            const totalItems = totalResult.total;
            const totalPages = Math.ceil(totalItems / pageSize);

            // 查询当前页数据
            const query = `SELECT * FROM od_items LIMIT ${pageSize} OFFSET ${offset}`;
            const results = await env.DB.prepare(query).all();

            // 构建分页导航
            const maxVisiblePages = 10; // 最多显示10页
            const paginationStart = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            const paginationEnd = Math.min(totalPages, paginationStart + maxVisiblePages - 1);

            const pagination = `
                <div class="pagination">
                    <a href="?page=${page > 1 ? page - 1 : 1}" class="prev">이전</a>
                    ${Array.from({ length: paginationEnd - paginationStart + 1 }, (_, i) => paginationStart + i)
                .map(p => `
                            <a href="?page=${p}" class="${p === page ? 'active' : ''}">${p}</a>
                        `).join('')}
                    <a href="?page=${page < totalPages ? page + 1 : totalPages}" class="next">다음</a>
                </div>
            `;
            let html = `<!DOCTYPE html>
                ${header}
            <body>
                <div class="video-container">
                    ${results.results.map(row => `
                        <div class="video-item">
                            <a href="/items?items_id=${row.items_id}">
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
                   ${pagination}
            </body>
           `;
            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });
        } catch (error) {
            return new Response(`Error: ${error.message}`, { status: 500 });
        }
    },
};
