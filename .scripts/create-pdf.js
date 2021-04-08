const { resolve } = require("path");

const puppeteer = require("puppeteer");
const { version } = require("../package.json");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:${resolve(__dirname, "..", "charakterbogen.html")}`, {
        waitUntil: 'networkidle2',
    });
    await page.pdf({
        path: `charakterbogen-${version}.pdf`,
        format: "A4",
        printBackground: true,
    });

    await browser.close();
})();