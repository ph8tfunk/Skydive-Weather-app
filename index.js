import puppeteer from "puppeteer";

const getSkydiveList = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  //await page.goto("https://britishskydiving.org/where-can-i-skydive", {
  await page.goto("https://webtools.britishskydiving.org/DirectorySearchResult.aspx?newsearch=1", {
    waitUntil: "domcontentloaded",
    waitUntil: "networkidle0"
  });
  
  await page.waitForSelector('.BPAMap');

  await page.screenshot({ path: "./screenshot.jpg", type: "jpeg", fullPage: true });


  const list = await page.evaluate(() =>{

    const map = document.querySelectorAll(".BPAItem");
   // const listItem2 = document.querySelector(".BPAItem"); 
   
  //  const text = listItem2.querySelector(".OMDirectoryResultAddress").innerText;
  //  const author = listItem2.querySelector(".BPAOrgName").innerText;

   //const listItem = document.querySelector(".BPAOrgName");

   //const text = listItem2.querySelector(".OMDirectoryResultAddress").innerText;
   //const author = listItem.querySelector(".author").innerText;

  //  const listItem3 = document.querySelector(".tb_text_wrap");

   
  //  //const text = listItem.querySelector(".OMDirectoryResultAddress").innerText;
  //  //const author = listItem.querySelector(".author").innerText;

   return { map};

  });

  console.log(list);
 

await browser.close();
};

// Start the scraping
getSkydiveList();