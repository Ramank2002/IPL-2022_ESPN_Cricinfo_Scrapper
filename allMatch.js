const request=require("request");
const cheerio=require("cheerio");
const scorecardObj=require("./scorecard");
function getAllMatchesLink(url)
{
    request(url,function(err,response,html){
        if(err)
            console.log(err);
        else
            extractAllLinks(html);
    })
}
function extractAllLinks(html)
{
    let $=cheerio.load(html);
    let scoreCardElems=$("a[class='ds-no-tap-higlight']");
    
    for(let i=0;i<scoreCardElems.length;i++)
    {
        let link=$(scoreCardElems[i]).attr("href");
        // console.log(link);
        let fullLink="https://www.espncricinfo.com"+link;
        console.log(fullLink);
        scorecardObj.ps(fullLink);
    }
}
module.exports={
    allMatches:getAllMatchesLink
}