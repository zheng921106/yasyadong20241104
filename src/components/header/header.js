// src/components/header/header.js

export async function renderHeader() {
    // 加载 HTML 模板
    const responseHtml = await fetch('./header.html');  // 使用相对路径
    const htmlContent = await responseHtml.text();

    // 创建一个 div 容器插入 HTML 内容
    const container = document.createElement('div');
    container.innerHTML = htmlContent;

    // 加载并应用 CSS 文件
    const responseCss = await fetch('./header.css');  // 使用相对路径
    const cssContent = await responseCss.text();
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);

    // 返回 HTML 容器的 innerHTML，用于渲染
    return container.innerHTML;
}
