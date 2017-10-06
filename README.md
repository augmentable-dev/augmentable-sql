![Preview](/build/icon.ico)
# Augmentable SQL

Desktop UI for [AlaSQL](http://alasql.org/). Query local files with SQL.

![Preview](/docs/preview.png)


## [Download Latest](https://github.com/augmentable-opensource/augmentable-sql/releases)

### Basic Instructions

[AlaSQL](http://alasql.org/) is a really cool library that brings SQL querying capability to local text, json, excel and csv files (among other functionality). This project is a [desktop](https://electron.atom.io/) UI, to make that capability a bit easier, for anyone who works with a lot of local data files.

To get started, select "Load File" to pick one or more data files. Write some SQL, passing in file references as query parameters (`$1`, `$2`). If you chose a single csv file, for instance, you could enter `SELECT * FROM CSV($1)`.


### Road Map

- Query againt remote files (API endpoints, public S3 data)
- Export result sets to various file formats
- Graphing/visualizations?
