export default {
	async fetch(request, env, ctx) {
		try {
			// 从 D1 数据库中获取视频数据
			const { results } = await env.DB.prepare('SELECT * FROM data_videos').all();

			// 生成 HTML 页面
			let html = `<!DOCTYPE html> 
      <html>
      <head>
        <title>视频网站</title>
        <style>
          /* 页面样式 */
          body { font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 0; }
          .header { background-color: #1c1c1c; padding: 10px; text-align: center; font-size: 24px; }
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
        <div class="header">欢迎来到我的视频网站</div>
        <div class="video-container">
      `;

			// 遍历视频数据，添加到 HTML 中
			results.forEach(video => {
				html += `
          <div class="video-item">
            <div class="video-thumbnail">
              <img src="${video.thumbnail_url}" alt="${video.title}">
              <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-info">
              <div class="video-title">${video.title}</div>
              <div class="video-meta">观看次数 ${video.views} · ${video.upload_date}</div>
              <p>${video.description}</p>
            </div>
          </div>
        `;
			});

			html += `
        </div>
      </body>
      </html>`;

			// 返回生成的 HTML 页面
			return new Response(html, {
				headers: { 'Content-Type': 'text/html;charset=UTF-8' },
			});

		} catch (error) {
			// 错误处理
			return new Response(`数据库连接出错: ${error.message}`, { status: 500 });
		}
	},
};
