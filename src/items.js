
import { renderHeader } from './components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const url = new URL(request.url);
            const items_id = url.searchParams.get('items_id');

            if (!items_id) {
                return new Response('Invalid Request: Missing items_id parameter', { status: 400 });
            }

            const query = `SELECT * FROM od_items WHERE items_id = ?`;
            const result = await env.DB.prepare(query).bind(items_id).first();

            if (!result) {
                return new Response('Item not found', { status: 404 });
            }

            const header = renderHeader();
            const html = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${result.items_name}</title>
                <link rel="stylesheet" href="./styles/header.css">
                <link rel="stylesheet" href="./styles/items.css">
            </head>
            <body>
                ${header}
                <div class="video-player">
                    <video controls autoplay>
                        <source src="https://www.yasyadong.com/data/upload/store/items/1/${result.items_serial}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="video-details">
                    <h1>${result.items_name}</h1>
                    <p>${result.goods_custom || 'No description available'}</p>
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
