const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    headless: true, // Run in headful mode
    defaultViewport: null, // Use default viewport size
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    // Set cookies as an array
    const cookies = [
      {
        name: 'PHPSESSID',
        value: '8cc1c418e61d6badd634309a42225cb8',
        domain: '.noxtools.com',
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: '_ga',
        value: 'GA1.1.726707103.1721404607',
        domain: '.noxtools.com',
        path: '/',
        httpOnly: false,
        secure: true,
      },
      {
        name: '_ga_M2C66L2Z09',
        value: 'GS1.1.1727964630.14.0.1727964630.0.0.0',
        domain: '.noxtools.com',
        path: '/',
        httpOnly: false,
        secure: true,
      },
      {
        name: '_gcl_au',
        value: '1.1.1974811588.1721404607',
        domain: '.noxtools.com',
        path: '/',
        httpOnly: false,
        secure: true,
      },
      {
        name: 'amember_nr',
        value: '2ac81bea8411a59a2e51514b423f587f',
        domain: '.noxtools.com',
        path: '/',
        httpOnly: false,
        secure: true,
      },
    ];

    await page.setCookie(...cookies); // Spread operator to pass array

    await page.goto('https://noxtools.com/secure/protect/new-rewrite?f=125&url=/&host=quillbot.noxtools.com&ssl=on', {
      waitUntil: 'networkidle0',
    });

    res.send('Thank you for visiting');
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).send('An error occurred during scraping');
  }
  // Removed the close browser line
};

module.exports = { scrapeLogic };
