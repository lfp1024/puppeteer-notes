const fs = require('fs');
const path = require('path');
const useragent = require('useragent');
const nodexlsx = require('node-xlsx');
const UserAgents = require('user-agents');
const randomInt = require('random-int');

const browser = ['Chrome', 'Firefox'];
const xlslpath = path.join(__dirname, '../../file/aaaa.xlsx');
const mewxlslpath = path.join(__dirname, '../../file/mewaaaa.xlsx');

// fse.ensureFileSync(path.join(__dirname, '../file/aaaa.xlsx'));
const workSheetsFromBuffer = nodexlsx.parse(fs.readFileSync(xlslpath));

const sheet1 = workSheetsFromBuffer[0];
const newUa = [];
function crearteUa() {
  const browserIndex = randomInt(0, browser.length - 1);
  const userAgent = new UserAgents([new RegExp(browser[browserIndex]), { platform: 'Win32', deviceCategory: 'desktop' }]);
  return userAgent.toString();
}
for (const line of sheet1.data) {
  const oldua = line[0];
  const olduapase = useragent.parse(oldua);
  switch (olduapase.family) {
    case 'Firefox':
      if (Number(olduapase.major) < 30) {
        const newc = crearteUa();
        newUa.push([oldua, newc]);
      }
      break;
    case 'Chrome':
      if (Number(olduapase.major) < 44) {
        const newc = crearteUa();
        newUa.push([oldua, newc]);
      }
      break;
    case 'IE':
      if (Number(olduapase.major) <= 9) {
        const newc = crearteUa();
        newUa.push([oldua, newc]);
      }
      break;
    default: break;
  }
}

const buffer = nodexlsx.build([{ name: '差异', data: newUa }]); // Returns a buffer

// 生成excel the_content是excel的名字，大家可以随意命名
fs.writeFileSync(mewxlslpath, buffer, { flag: 'w' });

console.log(newUa.length);
