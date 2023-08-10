import {Browser, chromium, Page} from "@playwright/test";

async function scrapeIdsFromReactPage(url: string) {
    let browser: Browser;
    let page: Page;
    try {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(url);
        return await page.evaluate(() => {
            const elementsWithIds = document.querySelectorAll('[id]');
            const idsArray: Record<string, string> = {};
            elementsWithIds.forEach((element) => {
                const id = element.getAttribute('id');
                const title = element.getAttribute('data-name');
                if (id) {
                    idsArray[title] = id;
                }
            });
            return idsArray;
        });
    } catch (error) {
        console.error('Error scraping React page for IDs:', error);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

const pageUrl = 'https://thenishant.github.io/react-redux-todo-app/';

const scrapedIdsPromise = scrapeIdsFromReactPage(pageUrl);

scrapedIdsPromise
    .then((ids) => {
        processIds(ids);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function processIds(ids: Record<string, string> | any[]): void {
    console.log('IDs with key value:', ids);
}
