const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const Tor = require('tor-control-promise')

const solve = require('../index.js')

async function run () {
  const tor = new Tor({
    host: '127.0.0.1',
    port: 9051,
    password: 'tor'
  })

  try {
    await tor.connect()
    await tor.signalNewnym()
  } catch (e) {
    console.error(e)
    console.log('tor control is off!')
    process.exit()
  }

  puppeteer.use(pluginStealth())

  const browser1 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=0,0']
  })

  const browser2 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=360,0']
  })

  const browser3 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=720,0']
  })

  const browser4 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=0,500']
  })

  const browser5 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=360,500']
  })

  const browser6 = await puppeteer.launch({
    headless: false,
    args: ['--window-size=360,500', '--proxy-server=socks5://127.0.0.1:9050', '--window-position=720,500']
  })

  const page1 = await browser1.newPage()
  const page2 = await browser2.newPage()
  const page3 = await browser3.newPage()
  const page4 = await browser4.newPage()
  const page5 = await browser5.newPage()
  const page6 = await browser6.newPage()

  await page1.setDefaultNavigationTimeout(0)
  await page2.setDefaultNavigationTimeout(0)
  await page3.setDefaultNavigationTimeout(0)
  await page4.setDefaultNavigationTimeout(0)
  await page5.setDefaultNavigationTimeout(0)
  await page6.setDefaultNavigationTimeout(0)

  page1.goto('https://www.google.com/recaptcha/api2/demo')
  page2.goto('https://www.google.com/recaptcha/api2/demo')
  page3.goto('https://www.google.com/recaptcha/api2/demo')
  page4.goto('https://www.google.com/recaptcha/api2/demo')
  page5.goto('https://www.google.com/recaptcha/api2/demo')
  page6.goto('https://www.google.com/recaptcha/api2/demo')

  solve(page1)
  solve(page2)
  solve(page3)
  solve(page4)
  solve(page5)
  solve(page6)
}

console.log('`ctrl + c` to exit')
process.on('SIGINT', () => {
  console.log('bye!')
  process.exit()
})

run()
