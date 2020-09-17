# Puppeteer-notes

### 安装
`npm i puppeteer` `yarn add puppeteer`
- 第一次安装会安装一个最新版本的 Chromium, 如果直接通过上述命令安装失败，则采取手动安装方式
  - 设置临时环境变量，跳过安装 Chromium
    `export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true; yarn add puppeteer`
  - 去淘宝镜像下载 Chromium: https://npm.taobao.org/mirrors/chromium-browser-snapshots/
  - 放入指定目录 `node_modules\puppeteer.local-chromium\`
    > 或放入其他目录，在文件中通过 `puppeteer.executablePath()`引入
    > 需要指出可执行文件的路径，例如放在当前项目根目录下的导入路径为
    > - Ubuntu '../chrome-linux/chrome'
    > - windows '../chrome-win/chrome.exe'
    > 参考 https://juejin.im/post/6844903678936104968#heading-4
