const UserAgent = require('user-agents');
const fse = require('fs-extra');
const path = require('path');

const userAgent = new UserAgent();
// console.log(userAgent.toString());
// console.log(JSON.stringify(userAgent.data, null, 2));
const userAgents = Array(5).fill().map(() => userAgent().toString());

// 以 txt 格式保存，数据格式需要是 string 或 buffer
// 以 `\n` 为分隔符，可以换行且没有逗号
const data = userAgents.join('\n');

fse.ensureFileSync(path.join(__dirname, '../file/ua.txt'));
fse.writeFileSync(path.join(__dirname, '../file/ua.txt'), data, { encoding: 'utf-8' });
console.log(data);
