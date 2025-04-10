import vituum from "vituum";
import pages from 'vituum/plugins/pages.js'
import pug from "@vituum/vite-plugin-pug";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const timestamp = new Date().getTime();

const htmlTransformPlugin = () => {
  return {
    name: 'html-transform',
    enforce: 'post',
    transformIndexHtml(html) {
      // 1. 在 js/css 上加上 timestamp query
      html = sourceAddTimestamp(html);

      // 2. 移動 <script> 到 body 底部
      html = moveScriptToBottom(html)

      return html;
    }
  };
};

function sourceAddTimestamp(html) {
  return html.replace(/(src|href)="([^"]+\.(css|js))"/g, (match, attr, url) => {
    // 避免重複加 ?v=xxx
    if (url.includes('?v=')) return match;
    return `${attr}="${url}?v=${timestamp}"`;
  });
}

function moveScriptToBottom(html) {
  // 1. 先找出 head 標籤內的內容
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  
  if (headStart === -1 || headEnd === -1) {
    return html; // 如果沒有找到 head 標籤，直接返回
  }
  
  // 提取 head 內容
  const headContent = html.substring(headStart + '<head>'.length, headEnd);
  
  // 2. 找出所有 script 標籤
  const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>/g;
  let scripts = [];
  let headWithoutScripts = headContent;
  let match;
  
  // 收集所有指令碼
  while ((match = scriptRegex.exec(headContent)) !== null) {
    scripts.push(match[0]);
    // 從 head 內容中移除該指令碼
    headWithoutScripts = headWithoutScripts.replace(match[0], '');
  }
  
  // 如果沒有找到指令碼，直接返回
  if (scripts.length === 0) {
    return html;
  }
  
  // 3. 更新 HTML - 替換 head 內容
  let newHtml = html.substring(0, headStart + '<head>'.length) + 
                headWithoutScripts + 
                html.substring(headEnd, html.length);
  
  // 4. 在 body 底部或指定位置插入指令碼
  // 在 body 標籤結束前插入
  const bodyEndIndex = newHtml.lastIndexOf('</body>');
  if (bodyEndIndex !== -1) {
    newHtml = newHtml.substring(0, bodyEndIndex) + 
             '\n' + scripts.join('\n') + '\n' + 
             newHtml.substring(bodyEndIndex);
  }
  
  return newHtml;
}

export default {
  base: "./",
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    vituum(),
    isProd && pages({
      normalizeBasePath: isProd,
    }),
    pug({
      root: "./src",
      options: {
        pretty: true,
      }
    }),
    htmlTransformPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
      inject: 'body-last', // 插入 <body> 最後
      customDomId: '__svg__icons__dom__' // 你可以自己命名這個 ID
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (name?.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          if (name?.match(/\.(png|jpe?g|svg|gif|webp)$/)) {
            return 'images/[name][extname]';
          }
          if (name?.match(/\.(woff2?|eot|ttf|otf)$/)) {
            return 'font/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
};
