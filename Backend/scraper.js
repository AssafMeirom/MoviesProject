const fetch = require("node-fetch");
const cheerio = require("cheerio");
const url = "https://www.imdb.com/news/movie/?ref_=nv_nw_mv";

function getTextForNews() {
  return fetch(url)
    .then((response) => response.text())
    .then((body) => {
      console.log(
        "**************************Starting**************************"
      );
      let newsArray = [];
      let titleArray = [];
      const $ = cheerio.load(body);
      $(".news-article__header").each(function (i, element) {
        const $element = $(element);
        const $title = $element.find("header h2 a");
        titleArray.push($title.text());
      });

      $(".news-article__body").each(function (i, element) {
        const $element = $(element);
        const $image = $element.find("section img"); //images from news page
        const $links = $element.find("a.news-content__offsite-link"); //links from news
        let singleNews = {
          image: $image.attr("src"),
          links: "www.imdb.com" + $links.attr("href"),
          desc: $element.text(),
        };
        newsArray.push(singleNews);
      });
      for (i in newsArray) {
        for (j in titleArray) {
          newsArray[i].title = titleArray[i];
        }
      }
      //console.log("final list : ", newsArray);
      return newsArray;
    });
}

module.exports = {
  getTextForNews,
};
