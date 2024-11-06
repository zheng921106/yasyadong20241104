// src/pages/home.js
import { renderHeader } from './components/header/header.js';

export default {
	async fetch(request, env, ctx) {
		try {
			// 使用统一的 header，等待 renderHeader 完成
			const header = await renderHeader();

			// 生成 HTML 页面
			let html = `<!DOCTYPE html>
      <html>
      <head>
        <title>视频网站</title>
        <style>
          /* 页面样式 */
          body { font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0; }
          .video-container { display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; gap: 15px; }
          .video-item { width: 300px; background-color: #333; border-radius: 8px; overflow: hidden; }
          .video-thumbnail { position: relative; }
          .video-thumbnail img { width: 100%; height: auto; }
          .video-duration { position: absolute; bottom: 5px; right: 5px; background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 2px 5px; border-radius: 3px; font-size: 12px; }
          .video-info { padding: 10px; }
          .video-title { font-size: 16px; margin: 5px 0; color: #ff6b6b; }
          .video-meta { font-size: 12px; color: #aaa; }
        </style>
      </head>
      <body>
        ${header} <!-- 插入统一的 header -->
        <div class="video-container">
          <!-- 示例视频项目 -->
          <div class="video-item">
            <div class="video-thumbnail">
              <img src="https://example.com/thumbnail.jpg" alt="示例视频标题">
              <div class="video-duration">5:30</div>
            </div>
            <div class="video-info">
              <div class="video-title">示例视频标题</div>
              <div class="video-meta">观看次数 1000 · 2024-11-01</div>
              <p>这是一个示例视频描述。</p>
            </div>
          </div>
          <!-- 可以添加更多示例视频 -->
        </div>
      </body>
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
