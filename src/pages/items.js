import { renderHeader } from '../components/header/header.js';

export default {
    async fetch(request, env, ctx) {
        try {
            const url = new URL(request.url);
            const items_id = url.searchParams.get('items_id');

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

            // 检测终端是否为手机端
            const userAgent = request.headers.get('user-agent') || '';
            const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

            // 设置视频 URL 根据终端类型选择格式
            let videoUrl = escapeHtml(result.items_serial || '');
            if (isMobile) {
                if (videoUrl.endsWith('.shtml')) {
                    videoUrl = videoUrl.replace(/\.shtml$/, '.m3u8'); // 手机端使用 m3u8
                }
            } else {
                if (!videoUrl.endsWith('.shtml')) {
                    throw new Error(`Invalid video URL for desktop: ${videoUrl}`);
                }
            }

            // 设置封面图片 URL
            const posterUrl = escapeHtml(
                result.items_image
                    ? `https://www.yasyadong.com/data/upload/store/items/1/${result.items_image}`
                    : 'https://via.placeholder.com/720x405'
            );

            // 构建安全的 HTML
            const header = renderHeader(escapeHtml(result.items_name), true);
            const description = escapeHtml(result.goods_custom || 'No description available');

            const html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    ${header}
                    <link href="https://vjs.zencdn.net/7.20.3/video-js.css" rel="stylesheet">
                    <style>
                        .video-player {
                            max-width: 960px;
                            width: 100%;
                            margin: 20px auto;
                        }

                        .video-js {
                            width: 100%;
                            height: auto;
                        }

                        .video-details {
                            text-align: center;
                            margin: 20px;
                        }

                        .video-details h1 {
                            font-size: 24px;
                        }

                        .video-details p {
                            font-size: 16px;
                            color: #ccc;
                        }
                    </style>
                </head>
                <body>
                    <div class="video-player">
                        <video
                            id="video-player"
                            class="video-js vjs-default-skin"
                            controls
                            preload="auto"
                            autoplay
                            poster="${posterUrl}"
                            data-setup='{"responsive": true, "aspectRatio": "16:9"}'>
                            <source src="${videoUrl}" type="${isMobile ? 'application/x-mpegURL' : 'text/html'}">
                            <p class="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a
                                web browser that
                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                            </p>
                        </video>
                    </div>
                    <div class="video-details">
                        <h1>${escapeHtml(result.items_name)}</h1>
                        <p>${description}</p>
                    </div>
                    <script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script>
                    <script>
                        document.addEventListener('DOMContentLoaded', function () {
                            const player = videojs('video-player', {
                                controls: true,
                                autoplay: true,
                                preload: 'auto',
                                responsive: true,
                            });

                            player.on('ready', function () {
                                console.log('Video.js player is ready');
                            });

                            player.on('error', function () {
                                console.error('An error occurred while playing the video');
                            });
                        });
                    </script>
                </body>
                </html>
            `;
            return new Response(html, {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            });
        } catch (error) {
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
