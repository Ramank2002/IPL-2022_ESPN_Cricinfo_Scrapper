// const url="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/gujarat-titans-vs-rajasthan-royals-final-1312200/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");

function processScoreCard(url) {
    request(url, cb);
}

function cb(err, response, html) {
    if(err)
        console.log(err);
    else 
        extractMatchDetails(html);
}

function extractMatchDetails(html) {
    // ipl
    // team 
    // player
    // runs balls fours sixes sr opponent venue date

    let $ = cheerio.load(html);
    // venue date 
    // ds-text-tight-m ds-font-regular ds-text-typo-mid3
    let descElem = $("div[class='ds-text-tight-m ds-font-regular ds-text-typo-mid3']");
    // result -> ds-text-tight-m ds-font-regular ds-truncate ds-text-typo
    let result = $("p[class='ds-text-tight-m ds-font-regular ds-truncate ds-text-typo']");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    // console.log("Venue : ",venue);
    // console.log("Date : ",date);
    // console.log(result.text());
    let inings = $("div[class='ds-rounded-lg ds-mt-2']");
    // let htmlString = "";
    for (let i = 0; i < inings.length; i++) {
        // htmlString+=$(inings[i]).html();
        //team opponent
        let teamName = $(inings[i]).find("span[class='ds-text-title-xs ds-font-bold ds-capitalize']").text();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(inings[opponentIndex]).find("span[class='ds-text-title-xs ds-font-bold ds-capitalize']").text();

        // console.log("Team Name : ",teamName);
        // console.log("Opponent Name : ",opponentName);
        // console.log(`
        // Venue : ${venue}
        // Date : ${date}
        // Result : ${result.text()}
        // Team Name : ${teamName} 
        // Opponent Name : ${opponentName}`);
        // break;
        let cInning = $(inings[i]);
        console.log("Team Name : ", teamName);
        console.log("Opponent Name : ", opponentName);
        console.log(`
        Venue : ${venue}
        Date : ${date}
        Result : ${result.text()}
        Team Name : ${teamName} 
        Opponent Name : ${opponentName}`);

        let allRows = cInning.find("table[class='ds-w-full ds-table ds-table-md ds-table-auto  ci-scorecard-table']")
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center")
            if (isWorthy == true) {
                let playerName = $(allCols[0]).text().trim();
                // let bowlerName = $(allCols[1]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let strikeRate = $(allCols[7]).text().trim();
                console.log(`${playerName}  ${runs} ${balls} ${fours} ${sixes} ${strikeRate}`)
                // console.log(allCols.text());
                // console.log("\n");
            }
        }
        //player runs balls fours sixes sr
    }
    // console.log(htmlString);
}
module.exports={
    ps:processScoreCard
}