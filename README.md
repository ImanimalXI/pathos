#Pathos
====================
![Pathos](https://github.com/ImanimalXI/pathos/raw/develop/dev/img/pathos.png)


The purpose of this project is to create a space to showcase and test design frames for web applications.
Think of it as a replacement of Photoshop (PSD docs) where frames normally are separated by layers and where each layer visualise a page/state of the application.

This tools aim:

* Prototyping and presentation of web applications
* Prototyping of new features
* Promoting the Front End first approach and use of the final tools from start and then continuously working with the application UI and design instead of relying on PSD docs.
* Reviewing and updating the current HTML markup and CSS
* CSS Overview
* Desktop tool for testing responsive design, different viewports and media queries

##Demo
---

##How it works
---
Creating a new project to showcase should be a piece of cake if you're familiar with HTML and CSS.
Just design your project by creating regular html markup, apply your css and stack all the pieces into one html file.
The Pathos pages are then created by adding a data-frame attribute to the wrapping element you want to highlight. Like this...
`div data-frame='{"title":"Example"}'`
   
That's the basics and pretty much all you need to apply in order to create the separation. You can then add additional javascript if you want to demonstrate different states depending on user actions. Actually you can continue to implement the other parts of the application from here and use use this tool as an overview.

##Install & Setup
====================
 Clone the <a href="https://github.com/ImanimalXI/pathos">project repository</a> from Github if you want to run from a local environment.
Put the project files in your localhost and open the root index.html file in your browser.
The default location for project frames is the <i>/frames</i> sub folder. Create a folder here to start a new project.
The new folder should at least include a index.html (for the project markup) and a package.json file with the meta data.


##TODO / Contribute
====================
Add any ideas, issues or suggestion to the Git project issue tracker.
Visit the git project pages to check for ideas that are listed for upcoming updates and feel free to pick any topic if you would like to contribute
to the project development.This code is still in it's infancy. There's lots to do.

Here's a few things I'd like to fix and add:

### Bugs
* space chars in project title json parse error
* better package.json meta data iteration
* pages not loaded onload, sometimes
* show first page in list as default
* fonts placed locally in project

### Future updates
* (On load ist f�r timeout vid project load)
* Developer info page in Example/Demo and Readme file
* Web dev checklist check - http://webdevchecklist.com/
* Devices / Projects in a select tag
* Random device on load
* Settings json (slideshow framerate, theme, colors)
* Highlight selected page in nav
* Improved error handling
* Glypth icons
* key commands
* more data-frame parameters
* Note board
* Nav link tooltip (for controls)
* check if link when getting data from package.json
* Document on how to add device
* Themes
* Release log
* Bandy about / Hash out function
* upload file
* Footer info
* cross browser support

##Development How to work with the repository
---
TBA
