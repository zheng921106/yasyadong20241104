
import { renderHeader } from './components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const header = renderHeader();
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get('page')) || 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            const query = `SELECT * FROM od_items LIMIT ${pageSize} OFFSET ${offset}`;
            const results = await env.DB.prepare(query).all();

            const html = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>홈페이지</title>
                <link rel="stylesheet" href="./styles/header.css">
                <link rel="stylesheet" href="./styles/index.css">
            </head>
            <body>
                ${header}
                <div class="video-container">
                    ${results.results.map(row => `
                        <div class="video-item">
                            <a href="/items?items_id=${row.items_id}">
                                <div class="video-thumbnail">
                                    <img src="https://www.yasyadong.com/data/upload/store/items/1/${row.items_image || 'placeholder.jpg'}" alt="${row.items_name || 'No Title'}">
                                </div>
                                <div class="video-info">${row.items_name || 'NoData'}</div>
                            </a>
                        </div>
                    `).join('')}
                </div>
                <div class="pagination">
                    <a href="?page=${page > 1 ? page - 1 : 1}" class="prev">Previous</a>
                    <a href="?page=${page + 1}" class="next">Next</a>
                </div>
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
