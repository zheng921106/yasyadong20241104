import homeHandler from './pages/home.js';
import itemsHandler from './pages/items.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 静态资源路由
        if (url.pathname.startsWith('/css/') || url.pathname.startsWith('/images/')) {
            return this.serveStaticFile(url.pathname);
        }

        // 动态页面路由
        if (url.pathname === '/' || url.pathname === '/index') {
            return homeHandler.fetch(request, env, ctx);
        } else if (url.pathname === '/items') {
            return itemsHandler.fetch(request, env, ctx);
        } else {
            return new Response('Page not found', { status: 404 });
        }
    },

    // 静态文件服务
    async serveStaticFile(pathname) {
        try {
            const filePath = `./public${pathname}`; // 静态文件路径
            const fileType = this.getContentType(pathname);

            // 确保路径正确，读取文件
            const fileContent = await Deno.readFile(filePath); // 或者使用其他文件读取方法
            return new Response(fileContent, {
                headers: { 'Content-Type': fileType },
            });
        } catch (error) {
            console.error('Static file error:', error, 'Path:', pathname);
            return new Response('Static file not found', { status: 404 });
        }
    },

    // 根据文件扩展名返回 MIME 类型
    getContentType(pathname) {
        if (pathname.endsWith('.css')) return 'text/css';
        if (pathname.endsWith('.js')) return 'application/javascript';
        if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
        if (pathname.endsWith('.png')) return 'image/png';
        return 'application/octet-stream';
    },
};
