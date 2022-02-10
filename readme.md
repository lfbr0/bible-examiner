# Bible Examiner

## Quick Guide

### What is it?

Bible Examiner is a web application with REST capabilities, using Express.js and Node.js, that allows for comparison between commentary by several theologists on The Bible. In other others, it's like a theology compass with theologists as reference points. \
***Now available for usage on https://bible-examiner.herokuapp.com/ !***

### Program design
Put very simply, the program is divided into several layers that deal only with a certain part of the process.
- The "server" creates the routes and injects the dependencies used by the "website" that is the layer that deals with HTTP requests.
- The "services" layer is the broker between the website and the "scrapers", which are nothing more than databases that return commentary objects.\
All HTML is generated using the Handlebars Template Engine.

### How to build it
Simply run ```npm install``` to install the dependencies then run ```npm start``` to open the application in the port 8080.\
All tests can be run with Jest using ```npm run test```.

### How can I contribute?
Making the application prettier is a big help.\
Also, we need more scrapping modules for more commentary on The Bible.

## Specifications

### Scrapers
All scrapers must be modules that take fetch as a parameter and return an object with the function ```getCommentary```. The function takes in a book (name of a book in the bible, consult the "books" module for examples), a chapter, and a verse.
It should return a Promise of an object with the format:
```
{
    comment [string], 
    author [object]: { 
        name [string], 
        image_url [string],
        biography_link [string] 
    }, 
    source: source_link [string]
}
```
**Please note that the promise is never rejected. Instead, if there is no commentary or an error, it just returns a null object/null.**