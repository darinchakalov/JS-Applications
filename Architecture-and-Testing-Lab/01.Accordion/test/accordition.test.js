const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

let browser, page; // Declare reusable variables

describe("E2E tests", function () {
	this.timeout(6000);

	before(async () => {
		browser = await chromium.launch({ headless: false });
	});

	after(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		page = await browser.newPage();
	});

	afterEach(async () => {
		await page.close();
	});

	it("loads all titles", async function () {
		await page.goto('http://localhost:3000/');
        let content = await page.content()

        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
	});

    it('should get content from server on button click', async function () {
        await page.goto('http://localhost:3000/')
        await page.click('text=More')

        let exist = await page.isVisible('.extra p')
        expect(exist).to.be.true;

        let buttonLess = await page.textContent('text=LESS');
        expect(buttonLess).to.be.not.undefined;
    })

    it('should change button back to MORE on click after we it\'s been changed to LESS', async function () {
        await page.goto('http://localhost:3000/')
        await page.click('text=More');
        await page.click('text=Less');

        let buttonMore = await page.textContent('text=More');
        expect(buttonMore).to.be.not.undefined;
    });
});
