const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: null,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/wishlist');

  await page.waitForTimeout(2000);
  await page.$eval('nextjs-portal', (el) => el.remove());

  page
    .waitForSelector('[data-avb-product-add-to-cart-btn]')
    .then(() => page.click('[data-avb-product-add-to-cart-btn]'));
  await page.waitForTimeout(1000);
  page
    .waitForSelector('[data-avb-product-add-to-cart-modal-go-to-btn]')
    .then(() => page.click('[data-avb-product-add-to-cart-modal-go-to-btn]'));

  await page.waitForTimeout(3000);
  page
    .waitForSelector('[data-avb-checkout-cart-proceed-btn]')
    .then(() => page.click('[data-avb-checkout-cart-proceed-btn]'));
  await page.waitForTimeout(6500);
  page
    .waitForSelector('input[name="telephone"]')
    .then(() =>
      page.$eval('input[name="telephone"]', (el) => (el.value = '2319448792')),
    );
  await page.waitForTimeout(1500);

  page
    .waitForSelector('input[name="fullname"]')
    .then(() =>
      page.$eval(
        'input[name="fullname"]',
        (el) => (el.value = 'Approved High'),
      ),
    );
  await page.waitForTimeout(1500);

  page
    .waitForSelector('input[name="street1"]')
    .then(() =>
      page.$eval('input[name="street1"]', (el) => (el.value = '350 Hope Ave')),
    );
  await page.$eval('input[name="city"]', (el) => (el.value = 'Salt Lake City'));
  await page.$eval('input[name="postcode"]', (el) => (el.value = '84115'));

  await page.type('input[name="country_id"]', 'United States');

  const MaterialSelect = async (page, cssSelector) => {
    await page.evaluate((cssSelector) => {
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('mousedown', true, true);
      var selectNode = document.querySelector(cssSelector);
      selectNode.dispatchEvent(clickEvent);
    }, cssSelector);
  };
  await MaterialSelect(page, '#mui-component-select-region');
  await page.click('li[data-value="Utah"]');

  await page.waitForTimeout(1000);
  await page.click('.MuiButton-containedPrimary');

  await page.waitForTimeout(3000);

  const elements = await page.$x(
    '//*[@id="__next"]/div[4]/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div/div/div',
  );
  await elements[0].click();
  await page.waitForTimeout(3500);

  await page.click('[value="brandsource_storepickup_Pro_Test_pickup1"]');

  await page.waitForTimeout(4000);

  await MaterialSelect(page, '#payment-select');
  await page.click('input[value=acimacheckout]');

  await page.waitForTimeout(8000);

  const elementHandle = await page.waitForSelector('#iframe');
  const frame = await elementHandle.contentFrame();

  await frame.waitForSelector('#last-four-ssn');
  const ssn = await frame.$('#last-four-ssn');
  await ssn.type('7991');
  await page.waitForTimeout(1000);
  await frame.click('.mt-3[type="submit"]');

  await page.waitForTimeout(3000);
  await frame.click('.mt-3[type="submit"]');

  //your details page
  await page.waitForTimeout(3000);
  await frame.type('#view-ssn', '255557991');
  await page.waitForTimeout(500);
  await frame.type('#ssn-confirm', '255557991');
  await page.waitForTimeout(500);
  await frame.$eval('#drivers-license', (el) => (el.value = '12345678'));
  await page.waitForTimeout(5000);
  await frame.click('.mt-4');
  await page.waitForTimeout(4000);
  await frame.click('button[type="submit"]');
  await page.waitForTimeout(6000);
  await frame.click('.mt-4');

  //signature page
  await page.waitForTimeout(6000);
  await frame.waitForSelector('input[type=checkbox]');
  await frame.click('input[type=checkbox]');
  await page.waitForTimeout(1500);
  await frame.click('.btn-accept');
  await page.waitForTimeout(6000);
  await frame.click('.signature-input');
  await page.waitForTimeout(300);
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(300);
  await frame.type('.signature-input', 'h');
  await page.waitForTimeout(1500);
  await frame.click('.btn-accept');

  await page.waitForTimeout(3500);
  await frame.click('.form-check-input');
  await page.waitForTimeout(3000);

  await frame.click('#credit_card_divtokenframe_value');
  await frame.type('#credit_card_divtokenframe_value', '4111111111111111');
  await page.waitForTimeout(300);

  await frame.type('#credit_card_expMonth', '12');
  await page.waitForTimeout(300);
  await frame.type('#credit_card_expYear', '2025');
  await page.waitForTimeout(300);
  await frame.type('#credit_card_cvvInput', '554');
  await page.waitForTimeout(300);
  await frame.click('.btn-block[type="button"]:last-of-type');
  await page.waitForTimeout(25000);
  await frame.click('[type="button"]:last-of-type');
  await page.waitForTimeout(50000);
  await browser.close();
};

main();
main();
main();
main();
