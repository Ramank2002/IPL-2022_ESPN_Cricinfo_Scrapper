const url="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423";
// Venue date opponent result runs balls fours sixes sr
const request=require("request");
const cheerio=require("cheerio");
const allMatchObj=require("./allMatch")
request(url,cb);

function cb(err,response,html)
{
    if(err)
        console.log(err);
    else
    {
        extractLink(html);
    }
}

function extractLink(html)
{
    let $=cheerio.load(html);
    let anchorElem=$("a[class='ds-inline-flex ds-items-start ds-leading-none']");
    let link=anchorElem.attr("href");
    // console.log(link);
    let fullLink="https://www.espncricinfo.com"+link;
    // console.log(fullLink);
    
    allMatchObj.allMatches(fullLink);
}

