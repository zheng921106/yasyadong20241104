import homeHandler from './pages/home.js'; // 导入 home.js 的处理逻辑
import itemsHandler from './pages/items.js'; // 导入 items.js 的处理逻辑

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 静态资源路由 - 处理 CSS、图片等
        if (url.pathname.startsWith('/css/') || url.pathname.startsWith('/images/')) {
            return this.serveStaticFile(url.pathname);
        }

        // 动态页面路由
        if (url.pathname === '/' || url.pathname === '/index') {
            return homeHandler.fetch(request, env, ctx); // 调用 home.js 的逻辑
        } else if (url.pathname === '/items') {
            return itemsHandler.fetch(request, env, ctx); // 调用 items.js 的逻辑
        } else {
            // 默认 404 页面
            return new Response('Page not found', { status: 404 });
        }
    },

    // 静态文件处理逻辑
    async serveStaticFile(pathname) {
        try {
            const filePath = `./public${pathname}`; // 静态文件存放在 public 目录
            const fileType = this.getContentType(pathname);

            // 使用 Deno 或其他支持的方法读取文件
            const fileContent = await Deno.readFile(filePath);
            return new Response(fileContent, {
                headers: { 'Content-Type': fileType },
            });
        } catch (error) {
            console.error('Static file not found:', pathname);
            return new Response('Static file not found', { status: 404 });
        }
    },

    // 根据扩展名返回 MIME 类型
    getContentType(pathname) {
        if (pathname.endsWith('.css')) return 'text/css';
        if (pathname.endsWith('.js')) return 'application/javascript';
        if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
        if (pathname.endsWith('.png')) return 'image/png';
        return 'application/octet-stream';
    },
};
