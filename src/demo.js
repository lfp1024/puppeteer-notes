const puppeteer = require('puppeteer')
const path = require('path')

async function getPic() {
  const executablePath = path.join(__dirname, '../chrome-linux/chrome')
  const browser = await puppeteer.launch({
    executablePath
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1000, height: 500 })
  await page.goto('https://www.baidu.com')

  await page.screenshot({ path: 'baidu.png' })

  await browser.close()
}

getPic()
