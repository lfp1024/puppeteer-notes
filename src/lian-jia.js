/*
 * 网站 https://sz.lianjia.com/ershoufang/
 * 爬取内容
 * 1. 标题
 * 2. 房屋面积（平米）
 * 3. 房屋朝向（东南西北）
 * 4. 房屋总价（万）
 * 5. 房屋单价（元/平米）
*/

const puppeteer = require('puppeteer')
const path = require('path')
const fse = require('fs-extra')

const url = 'https://sz.lianjia.com/ershoufang/'
const browserPath = '../chrome-linux/chrome'
const dataFile = 'data-LianJia/homeInfo.json'

const scrape = async () => {
  const executablePath = path.join(__dirname, browserPath)
  const browser = await puppeteer.launch({
    // headless: false,
    executablePath
  })
  const page = await browser.newPage()
  await page.goto(url)

  // page.on('console', (msg) => { console.log(msg._text) })

  const result = await page.evaluate(() => {
    const data = []
    const elements = document.querySelectorAll('.info.clear')
    elements.forEach((item) => {
      const title = item.childNodes[0].firstChild.textContent
      const address = item.childNodes[2].firstChild.textContent
      const totalPrice = item.childNodes[5].firstChild.textContent
      const unitPrice = item.childNodes[5].lastChild.textContent

      const addrInfoArr = address.split('|')
      const area = addrInfoArr[1].trim()
      const orientation = addrInfoArr[2].trim()

      data.push({
        title,
        area,
        orientation,
        totalPrice,
        unitPrice
      })
    })
    return data
  })

  browser.close()
  return result
}

async function scrapeAndSaveToLocal() {
  await fse.ensureFile(dataFile)
  const data = await scrape()
  await fse.writeJSON(dataFile, { homeInfo: [data] })
}

scrapeAndSaveToLocal().then((value) => { console.log(value) }).catch((e) => { console.log(e) })
