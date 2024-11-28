import homeHandler from './pages/home.js'; // 导入 home.js 的处理逻辑
import itemsHandler from './pages/items.js'; // 导入 items.js 的处理逻辑

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 静态资源路由
        if (url.pathname.startsWith('/pages/') || url.pathname.startsWith('/src/components/header/')) {
            // 根据路径加载静态资源
            return this.serveStaticFile(url.pathname);
        }

        // 动态路由逻辑
        if (url.pathname === '/' || url.pathname === '/index') {
            return homeHandler.fetch(request, env, ctx); // 调用 home.js 的逻辑
        } else if (url.pathname === '/items') {
            return itemsHandler.fetch(request, env, ctx); // 调用 items.js 的逻辑
        } else {
            return new Response('Page not found', { status: 404 }); // 404
        }
    },

    async serveStaticFile(pathname) {
        try {
            // 将路径转换为本地文件路径
            const filePath = `.${pathname}`; // 假设文件位于同级目录下
            const fileType = this.getContentType(pathname);

            // 读取文件内容
            const fileContent = await Deno.readFile(filePath); // Deno 环境下
            return new Response(fileContent, {
                headers: { 'Content-Type': fileType },
            });
        } catch (error) {
            console.error('Static file not found:', pathname);
            return new Response('Static file not found', { status: 404 });
        }
    },

    getContentType(pathname) {
        if (pathname.endsWith('.css')) {
            return 'text/css';
        } else if (pathname.endsWith('.js')) {
            return 'application/javascript';
        } else if (pathname.endsWith('.html')) {
            return 'text/html';
        }
        return 'application/octet-stream';
    },
};
