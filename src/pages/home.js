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
            const countQuery = `
    SELECT COUNT(*) as total
    FROM od_items
`; // 总记录数不需要排序
            const totalResult = await env.DB.prepare(countQuery).first();
            const totalItems = totalResult.total;
            const totalPages = Math.ceil(totalItems / pageSize);

// 查询当前页数据
            const query = `
    SELECT *
    FROM od_items
    ORDER BY items_addtime DESC -- 按时间戳倒序排列
    LIMIT ${pageSize}
    OFFSET ${offset}
`;
            const results = await env.DB.prepare(query).all();

// 构建分页导航
            // 构建分页导航
            const maxVisiblePages = 5; // 最多显示5个页码
            const paginationStart = Math.max(1, page - Math.floor(maxVisiblePages / 2));
            const paginationEnd = Math.min(totalPages, paginationStart + maxVisiblePages - 1);

            const pagination = `
    <div class="pagination">
        <a href="?page=1" class="first">첫 페이지</a> <!-- 跳转到第一页 -->
        <a href="?page=${page > 1 ? page - 1 : 1}" class="prev">이전</a>
        ${Array.from({ length: paginationEnd - paginationStart + 1 }, (_, i) => paginationStart + i)
                .map(p => `
                <a href="?page=${p}" class="${p === page ? 'active' : ''}">${p}</a>
            `).join('')}
        ${paginationEnd < totalPages
                ? `<span>...</span><a href="?page=${totalPages}" class="all-pages">${totalPages}</a>`
                : ''
            }
        <a href="?page=${page < totalPages ? page + 1 : totalPages}" class="next">다음</a>
        <a href="?page=${totalPages}" class="last">마지막 페이지</a> <!-- 跳转到最后一页 -->
    </div>
`;
            let html = `<!DOCTYPE html>
               ${header}
                        <style lang="scss">
                            ul {
                                width: 100%;
                                margin: 0;
                                padding: 0;
                            }
                            ul, li {
                                overflow: hidden;
                                display: inline-block; /* 使 li 横向排列 */
                            }
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background: linear-gradient(to bottom, #1e1e1e, #121212);
                                color: #fff;
                                overflow-x: hidden;
                                font-size: 12px;
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

                            /* Tabs 样式 */
                            .tabs_items {
                                display: flex;
                                flex-wrap: wrap; /* 允许换行 */
                                justify-content: flex-start;
                                padding: 0;
                                margin: 0;
                            }

                            .tabs_items li {
                                cursor: pointer;
                                font-size: 16px;
                                background-color: #222;
                                border-radius: 5px 5px 0 0;
                                color: #bbb;
                                transition: all 0.3s ease;
                                padding: 10px;
                                margin: 0 5px;
                            }

                            .tabs_items li:hover {
                                background-color: #444;
                            }

                            .tabs_items li.active {
                                background-color: #d32f2f;
                                color: #fff;
                                font-weight: bold;
                            }

                            /* Tabs 内容 */
                            .tabs-items-content {
                                display: none; /* 默认隐藏 */
                                justify-content: center; /* 横向居中 */
                                flex-wrap: wrap; /* 允许换行 */
                                border-radius: 0 0 5px 5px;
                                padding: 10px;
                                margin-top: 10px;
                            }

                            .tabs-items-content.active {
                                display: flex;
                            }

                            .tabs-items-content li {
                                cursor: pointer;
                                background-color: #444;
                                border-radius: 5px;
                                color: #fff;
                                border: 1px solid #fff;
                                transition: all 0.3s ease;
                                padding: 10px;
                                margin: 5px;
                            }

                            .tabs-items-content li:hover {
                                background-color: #666;
                            }

                            .tabs-items-content li.active {
                                background-color: #d32f2f;
                                color: #fff;
                                font-weight: bold;
                            }

                            /* 电脑端 */
                            @media (min-width: 769px) {
                                .tabs_items li {
                                    width: calc(23% - 10px); /* 每行显示 4 个 tab */
                                }

                            }

                            /* 手机端 */
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
                                .tabs_items li {
                                    width: calc(20% - 10px); /* 每行显示 4 个 tab */
                                    text-align: center;
                                    font-size: 14px;
                                    border-radius: 5px;
                                }

                                .tabs-items-content {
                                    font-size: 14px;
                                }

                                .tabs_items li.active {
                                    border-bottom: none;
                                    background-color: #d32f2f;
                                }
                            }

                            /* 小屏手机进一步优化 */
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
                                .tabs_items li {
                                    font-size: 12px;
                                }

                                .tabs-items-content {
                                    font-size: 12px;
                                }
                            }
                        </style>
                    <body>
                        <div class="tabs">
                            <div class="tabs_items">
                                <ul>
                                    <li id="tab1" class="active">업데이트</li>
                                    <li id="tab2">배우별</li>
                                    <li id="tab3">취향별</li>
                                    <li id="tab4">인기100</li>
                                </ul>
                            </div>
                        </div>

                        <div class="tabs-content">
                            <div id="content1" class="tabs-items-content active">
                                <li>전체</li>
                                <li>한국</li>
                                <li>일본</li>
                                <li>서양</li>
                                <li>중화권</li>
                                <li>동남아</li>
                            </div>
                            <div id="content2" class="tabs-items-content">
                                <li>전체1</li>
                                <li>한국</li>
                                <li>일본</li>
                                <li>서양</li>
                                <li>중화권</li>
                                <li>동남아</li>
                            </div>
                            <div id="content3" class="tabs-items-content">
                                <li>전체</li>
                                <li>한국</li>
                                <li>일본</li>
                                <li>서양</li>
                                <li>중화권</li>
                                <li>동남아</li>
                            </div>
                            <div id="content4" class="tabs-items-content">
                                <li>전체</li>
                                <li>한국</li>
                                <li>일본</li>
                                <li>서양</li>
                                <li>중화권</li>
                                <li>동남아</li>
                            </div>
                        </div>
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
                        <script>
                            // 监听每个 tab 的点击事件
                            document.querySelectorAll('.tabs_items li').forEach(tab => {
                                tab.addEventListener('click', function () {
                                    // 移除所有 tab 的选中状态
                                    document.querySelectorAll('.tabs_items li').forEach(item => {
                                        item.classList.remove('active');
                                    });
                                    // 设定当前 tab 为选中
                                    this.classList.add('active');
                                    
                                    // 隐藏所有内容区域
                                    document.querySelectorAll('.tabs-items-content').forEach(content => {
                                        content.classList.remove('active');
                                    });
                                    
                                    // 获取对应的内容区域并显示
                                    let targetContent = document.getElementById('content' + this.id.slice(3)); // 获取对应的 content
                                    targetContent.classList.add('active');
                                });
                            });
                        </script>
                    </body>
                </html>`;

            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });
        } catch (error) {
            return new Response(`Error: ${error.message}`, { status: 500 });
        }
    },
};
