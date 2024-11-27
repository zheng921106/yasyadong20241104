// src/pages/items.js
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

            const header = renderHeader(result.items_name);

            let html = `
      ${header}
        <div class="video-player">
          <video controls autoplay>
            <source src="${result.items_serial}" type="video/mp4">
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
