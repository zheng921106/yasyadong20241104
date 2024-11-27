import homeHandler from './pages/home.js'; // 导入 home.js 的处理逻辑
import itemsHandler from './pages/items.js'; // 导入 items.js 的处理逻辑

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 路由逻辑
        if (url.pathname === '/' || url.pathname === '/index') {
            // 如果路径是 / 或 /index，调用 home.js 的逻辑
            return homeHandler.fetch(request, env, ctx);
        } else if (url.pathname === '/items') {
            // 如果路径是 /items，调用 items.js 的逻辑
            return itemsHandler.fetch(request, env, ctx);
        } else {
            // 默认的 404 响应
            return new Response('Page not found', { status: 404 });
        }
    },
};
