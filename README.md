Picture Perfect

Picture Perfect is a application leveraging Node.js and Underpin Javascript Structured Framework to provide a easy to use and interface to viewing your millions of unorganized digital photographs. 

Structure
Under public there is a folder called photos.  This is where all the photos you want included in your site go.  The ideal organizations is as follows:

Level 1
- year (such as 2013)

Level 2
- month/event
- ex. 201303CAL
- YYYYMMEEE (year, month, event identifier which is 3 char long)

Level 3
- images
- 201303CAL-001-JES_WIL_MIK-Beach.jpg
- YYYYMMEEE-CCC-PPP_PPP_PPP-DESC.jpg (broken into 4 segments ... folder, counter (to keep images in order), initials of people in photo, anything else about the photo (app will ignore it)

Note:
Until a better solution arises, you need to run the pictureperfect-webserver.js node from its directory.  Running it from somewhere else will result in a 404 error.
