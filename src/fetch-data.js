const puppeteer = require('puppeteer')
const path = require('path')

const scrape = async () => {
  const executablePath = path.join(__dirname, '../chrome-linux/chrome')
  const browser = await puppeteer.launch({
    headless: false,
    executablePath
  })
  const page = await browser.newPage()

  // 默认 30s 没有加载完成则保存，配置 0 则无视超时限制
  await page.goto('http://books.toscrape.com/', {
    timeout: 0
  })
  await page.click(
    '#default > div.container-fluid.page > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img'
  )
  // await page.waitFor(1000)

  // 使用内置 DOM 选择器
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText
    const price = document.querySelector('.price_color').innerText

    return {
      title,
      price
    }
  })

  browser.close()
  return result
}

scrape().then((value) => {
  console.log(value)
})
