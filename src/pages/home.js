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
            const maxVisiblePages = 5; // 最多显示10页
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
                   <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background: linear-gradient(to bottom, #1e1e1e, #121212);
                            color: #fff;
                            overflow-x: hidden;
                        }

                        a {
                            text-decoration: none;
                            color: inherit;
                        }

                        .video-container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 20px;
                            justify-content: center;
                            padding: 20px;
                        }

                        .video-item {
                            width: 300px;
                            background-color: #333;
                            border-radius: 10px;
                            overflow: hidden;
                            transform: scale(0.9);
                            transition: transform 0.3s ease, box-shadow 0.3s ease;
                        }

                        .video-item:hover {
                            transform: scale(1.03);
                        }

                        .video-thumbnail {
                            color: #fff;
                        }

                        .video-thumbnail img {
                            width: 100%;
                            height: auto;
                            opacity: 0;
                            animation: fadeIn 0.8s forwards;
                        }

                        .video-info {
                            padding: 10px;
                            text-align: center;
                        }

                        .pagination {
                            display: flex;
                            flex-wrap: wrap;
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

                        .pagination a.active {
                            background-color: #d32f2f;
                            font-weight: bold;
                        }

                        .pagination a:hover {
                            background-color: #555;
                        }

                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: scale(0.9);
                            }
                            to {
                                opacity: 1;
                                transform: scale(1);
                            }
                        }

                        /* 响应式设计 */
                        @media (max-width: 768px) {
                            .video-item {
                                width: calc(100% - 40px); /* 在小屏设备上单列显示 */
                                max-width: 500px;
                            }

                            .pagination a {
                                padding: 8px 10px;
                                font-size: 14px;
                            }

                            .video-info {
                                font-size: 14px;
                            }
                        }

                        @media (max-width: 480px) {
                            .video-item {
                                width: calc(100% - 20px); /* 更小屏幕适配 */
                            }

                            .pagination a {
                                padding: 5px 8px;
                                font-size: 12px;
                                margin: 3px;
                            }

                            .video-info {
                                font-size: 12px;
                            }
                        }
                    </style>
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
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            document.body.style.opacity = '0';
                            document.body.style.transition = 'opacity 0.5s ease-in-out';
                            setTimeout(() => document.body.style.opacity = '1', 50);
                        });
                    </script>
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
