# NBA Scrape

A web app that lets users view and leave comments on the latest news by scraping news from https://nba.com.

### The App should

*Scrape NBA.com news stories and return:*
- Headline - the title of the article
- Link - the url to the original article
- Summary - short summary of the articl
- Image - image of the related image source


## Set Up
. Run `npm init`. When that's finished, install and save these npm packages:

   1. express

   2. express-handlebars

   3. mongoose

   4. cheerio

   5. axios

  Clone repository. ```git clone``` https://github.com/BVega03/News-Scrape.git
  
  (Once functional) GitHub link. ``` gitHub``` https://bvega03.github.io/News-Scrape/
  
  (Once functional) Heroku app ``` heroku ``` https://git.heroku.com/news-scrape-2019.git

## Getting Started

  1. Whenever a user visits the site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. The app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

## Built With
- ```JavaScript```
- ```HTML```
- ```Bootstrap```
- ```Materialize```
- ```Bootstrap```
- ```Node.js```
- ```Heroku```
- ```MongoDB```
- ```Express```
- ```Mongoose```
- ```Cheerio```
- ```Axios```
- ```JSON```
- ```jQuery```
- ```Router```
- ```Path```
- ```Request```
- ```Promise```

## Issues/ Future Features
- The html pages were viewable in the browser but I had issues connecting the rendering the scrape data articles when the button on the buttons were clicked. 

- Will continue to troubleshoot to access the database and return the news articles

- The code is still missing a few key pieces on the back end in order to have a fully functional app. Will continue to work on getting it up and running correctly

## Author
- Ben Vega

