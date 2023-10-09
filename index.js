const chromium = require('chrome-aws-lambda');

async function monitor(url, content, otprr) {
  // const browser = await puppeteer.launch({headless:'new'});
  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  try {
  // Navigate the page to a URL
  await page.goto(url);

  const title = await page.title()
  if (otprr) {
    await page.click('.from-form-control')
    await page.waitForTimeout(300)

    await page.click('.to-form-control')
    await page.waitForTimeout(300)

    // Fill in new origin
    await page.hover('.from-form-control')
    await page.focus('.from-form-control')
    // FIXME: Characters are typed very fast, but each stroke still triggers a geocoder call.
    await page.keyboard.type('100', { delay: 100 })
    await page.waitForTimeout(2000)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.keyboard.press('Enter')

    // Fill in new destination
    await page.focus('.to-form-control')
    await page.keyboard.type('200', { delay: 100 })
    await page.waitForTimeout(2000)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.keyboard.press('Enter')
  }

  if (content) {
    await page.waitForXPath(`//*[contains(text(), "${content}")]`)
  }



  return title
  } catch {
    // TODO: Determine where in the process it failed and what exactly failed
    return false
  } finally {
    await browser.close();
  }
}

module.exports.monitor = monitor