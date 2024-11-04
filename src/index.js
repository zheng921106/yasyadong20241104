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
          /* 在这里添加您的样式 */
          body { font-family: Arial, sans-serif; background-color: #f0f0f0; }
          .video { margin: 20px; padding: 20px; background-color: #fff; border-radius: 8px; }
          .video h2 { margin-top: 0; }
          video { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <h1>欢迎来到我的视频网站11111</h1>
      `;

			// 遍历视频数据，添加到 HTML 中
			results.forEach(video => {
				html += `
        <div class="video">
          <h2>${video.title}</h2> 
          <video controls>
            <source src="${video.url}" type="video/mp4">
            您的浏览器不支持视频播放。
          </video>
          <p>${video.description}</p>
        </div>
        `;
			});

			html += `
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
