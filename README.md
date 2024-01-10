# URL shortener project

This is a basic url shortener project created using mysql and nodejs without express.

### Usage

Make sure you have MySQL install on your computer and use the following queries.

#### Commands
```sh
CREATE DATABASE url_shortener;

USE url_shortener;
CREATE TABLE urls(
id VARCHAR(7) NOT NULL,
site VARCHAR(50) NOT NULL,
created_date DATETIME NOT NULL,
expiration_date DATETIME, PRIMARY KEY(id))
```
Provide your Database connection infos and settings such as password,hostname,.... within dbmodel.js file.


run these following commands.
```sh
$ npm install
# install all packages used
$ npm run start
# Visit http://localhost:5000
```
