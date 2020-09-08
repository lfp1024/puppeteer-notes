# Puppeteer-notes

### 安装
`npm i puppeteer` `yarn add puppeteer`
- 第一次安装会安装一个最新版本的 Chromium, 如果直接通过上述命令安装失败，则采取手动安装方式
  - 设置环境临时变量，跳过安装 Chromium
    `export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true; yarn add puppeteer`
  - 去官网下载 Chromium: https://npm.taobao.org/mirrors/chromium-browser-snapshots/
  - 放入指定目录 `node_modules\puppeteer.local-chromium\win64-526987(系统类型-版本号)\chrome-win32(下载的文件名)\`
    > 或放入其他目录，在文件中通过 `puppeteer.executablePath()`引入
    > 需要指出可执行文件的路径
    > - Ubuntu ../chrome-linux/chrome
    > - windows ../chrome-win/chrome.exe
    > 参考 https://juejin.im/post/6844903678936104968#heading-4
