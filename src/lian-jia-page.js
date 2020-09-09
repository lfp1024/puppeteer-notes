/* eslint-disable no-await-in-loop */
/*
 * 网站 https://sz.lianjia.com/ershoufang/
 * 多页数据：50页
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

const browserPath = '../chrome-linux/chrome'
const dataFile = 'data-LianJia/homeInfo2.json'

const cardEleSelectors = '.info.clear'
const pageNum = 10
const url = 'https://sz.lianjia.com/ershoufang/'

const scrape = async () => {
  const executablePath = path.join(__dirname, browserPath)
  const browser = await puppeteer.launch({
    // headless: false,
    executablePath
  })
  const page = await browser.newPage()

  // page.on('console', (msg) => { console.log(msg._text) })

  let totalData = []

  await page.goto(url)
  await page.waitFor(10000)
  // await page.waitForNavigation()

  for (let i = 1; i < pageNum; i += 1) {
    const showPages = await page.$$('[comp-module="page"] a')
    // 获取 '下一页'
    await showPages[showPages.length - 1].click()
    // await page.waitFor(10000)
    await page.waitForNavigation()

    // 获取数据
    const result = await page.evaluate((cardEleSelectors) => {
      const data = []
      const cardElements = document.querySelectorAll(cardEleSelectors)
      cardElements.forEach((item) => {
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
    // 用于 node 层 和 DOM 层传输数据，通过 websocket 传递
    }, cardEleSelectors)

    totalData = totalData.concat(result)
  }

  browser.close()
  return totalData
}

async function scrapeAndSaveToLocal() {
  await fse.ensureFile(dataFile)
  const data = await scrape()
  console.log('The number of data is', data.length)
  await fse.writeJSON(dataFile, { homeInfo: data })
}

scrapeAndSaveToLocal().catch((e) => { console.log(e) })
