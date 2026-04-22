const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to simulate a desktop application window
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  
  console.log('Navigating to Phoenix Recovery...');
  await page.goto('http://localhost:5199', { waitUntil: 'networkidle2' });
  
  // Wait a moment for any animations/renders to finish
  await new Promise(r => setTimeout(r, 4000));
  
  console.log('Capturing real screenshot...');
  // Save as a new filename to bypass Next.js image cache
  await page.screenshot({ path: 'public/phoenix-utility.png' });
  
  await browser.close();
  console.log('Done!');
})();
