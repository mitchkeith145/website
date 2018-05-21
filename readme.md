# Mitchell Keith's Personal Website

This website is built with NodeJS + React, and sits atop AWS infrastructure.
 - The site is deployed to an EC2 box.
 - All images are stored in S3 buckets and distributed via CloudFront.
 - A simple NoSQL DB is used (DynamoDB).
 - Route53 is used to point www.mitchkeith.com to the EC2 box.

### Front End Portion

The front end is built using React, and packed via webpack prior to deployment.

  - src/public/javascript/app.js is the main react app file and initializes the application, sets the mobile device flag, and renders the page with all of its subcomponents.
  - src/public/javascript/components contain the subcomponents that make up most of the application functionality. Notable components are
    - **navigationComponent** is the simple navigation element that is visible at all times at the top left of the application and is used to toggle between the main components, **aboutPageComponent** and **travelPageComponent**
    - **aboutPageComponent** is a container component that holds a number of **aboutElementComponent**, which is a configurated component that displays information about me.
    - **travelPageComponent** holds the interactive map feature, which uses a customized SVG of the United States. Additional functionality was added to for hover-over events on states and national parks, which are denoted on the map as green dots. When a visitor to the site clicks on one of the green dots, the 4-digit national park code is retrieved from the data stored in the SVG file, and a call to the back end is made to fetch the image file names associated with that national park. An image gallery is then rendered displaying all of those images, which are hosted on AWS infrastructure as was mentioned previously.

### Back End Portion
    
The back end is a very simple NodeJS+Express server.

- **src/server.js** contains the Node server code. It has the following routes:
    - "**/**" is configured to serve the main html file for the application, src/html/home.html.
    - "**/photos/:code**" is the simple call to fetch photos for a specific National Park (designated by the code passed in to the URL). It invokes the getPhotos method of the photoController.
    - All files within src/public are set up to be served as the static assets.
- **src/photoController.js** contains the functionality to fetch the image file names associated with a certain National Park from the DynamoDB NoSQL database.
