import { renderHeader } from '../components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const header = renderHeader("Home Page", true); // 开启 Banner
            const url = new URL(request.url);
            const page = parseInt(url.searchParams.get('page')) || 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            const query = `SELECT * FROM od_items LIMIT ${pageSize} OFFSET ${offset}`;
            const results = await env.DB.prepare(query).all();

            let html = `<!DOCTYPE html>
                ${header}
            <body>
                <div class="video-container">
                    ${results.results.map(row => `
                        <div class="video-item">
                            <a href="/items?items_id=${row.items_id}">
                                <img src="https://www.yasyadong.com/data/upload/store/items/1/${row.items_image || 'https://via.placeholder.com/365x200'}" alt="${row.items_name || 'No Title'}">
                            </a>
                        </div>
                    `).join('')}
                </div>
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
