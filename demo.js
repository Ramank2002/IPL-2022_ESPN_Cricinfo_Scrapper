let allRows = $(innings[i]).find("div[class='wrap batsmen']");
for (let j = 0; j < allRows.length; j++) {
  let batsmanRows = $(allRows[j]).find("div[class='cell batsmen']");
  batsmanRows.each(function () {
    let name = $(this).find("a").text().trim();
    let runs = $(this).find("div[class='cell runs']").text().trim();
    let balls = $(this).find("div[class='cell balls']").text().trim();
    let fours = $(this).find("div[class='cell fours']").text().trim();
    let sixes = $(this).find("div[class='cell sixes']").text().trim();
    let strikeRate = $(this).find("div[class='cell strike rate']").text().trim();
    console.log(name, "\t", runs, "\t", balls, "\t", fours, "\t", sixes, "\t", strikeRate);
  });}