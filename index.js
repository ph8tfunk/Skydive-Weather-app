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

    const schools = document.querySelectorAll(".BPAItem");

    return Array.from(schools).map((school) => {
    const name = school.querySelector(".BPAOrgName").innerText.trim();
    const address = school.querySelector(".OMDirectoryResultAddress").innerText.trim();

    //if next is null skip else parse next ones
    const contactDetails = school.querySelectorAll(".OMDirectoryResultCommunication");

    if (contactDetails.length == 0){
      const email = "";
      const tel = "";
      const web = "";
      return { name, address, email, tel, web};
    } else {
      //return Array.from(contactDetails).map((contact) => {
      const email = "email";
      const tel = "tel";
      const web = "web";
      
      return { name, address, email, tel, web};
        // if (email!==null) {
        //   email = school.querySelector(".OMDirectoryResultCommunication").innerText.trim();
        // }
        
        // const phone = map.querySelector(".OMDirectoryResultCommunication").innerText;
        // const website = map.querySelector(".OMDirectoryResultCommunication").innerText;
  
    }
  });
  });
 
  console.log(list);
await browser.close();
};

// Start the scraping
getSkydiveList();