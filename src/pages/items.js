import { renderHeader } from '../components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const url = new URL(request.url);
            const items_id = url.searchParams.get('items_id');

            // 检查参数是否有效
            if (!items_id) {
                return new Response('Invalid Request: Missing items_id parameter', { status: 400 });
            }

            // 准备查询语句
            const query = `SELECT * FROM od_items WHERE items_id = ?`;
            const stmt = env.DB.prepare(query);

            // 执行查询
            const result = await stmt.bind(items_id).first();

            // 检查查询结果
            if (!result) {
                return new Response('Item not found', { status: 404 });
            }

            // 构建安全的HTML
            const header = renderHeader(escapeHtml(result.items_name));
            const videoUrl = escapeHtml(result.items_serial || ''); // 视频 URL
            const description = escapeHtml(result.goods_custom || 'No description available');

            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${escapeHtml(result.items_name)}</title>
                <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    .video-player {
                        margin: 20px auto;
                        max-width: 800px;
                    }
                    .video-details {
                        margin: 20px auto;
                        max-width: 800px;
                        text-align: left;
                    }
                    h1 {
                        font-size: 24px;
                    }
                    p {
                        font-size: 16px;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                ${header}
                <div class="video-player">
                    <video id="video-player" controls autoplay style="width: 100%; height: auto;"></video>
                </div>
                <div class="video-details">
                    <h1>${escapeHtml(result.items_name)}</h1>
                    <p>${description}</p>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const video = document.getElementById('video-player');
                        const videoUrl = "${videoUrl}";

                        if (Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(videoUrl);
                            hls.attachMedia(video);
                            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                                console.log('HLS manifest loaded');
                            });
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = videoUrl;
                        } else {
                            console.error('Your browser does not support HLS playback');
                        }
                    });
                </script>
            </body>
            </html>`;

            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });
        } catch (error) {
            console.error('Error fetching item:', error);
            return new Response(`Error: ${error.message}`, { status: 500 });
        }
    },
};

// HTML 转义工具函数，防止 XSS 注入
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
