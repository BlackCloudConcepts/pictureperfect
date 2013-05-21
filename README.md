Picture Perfect

Picture Perfect is a application leveraging Node.js, Underpin Javascript Structured Framework, and Titan Javascript Controls to provide a easy to use and interface to viewing your millions of unorganized digital photographs. 

Why?
In thinking about the long term storage and organization of photos it became clear that we take a lot more photos in the digital age compared to the old film days where you had to purchase film, get it developed, and then store it.  With the mounting pile of digital photos it became clear there needed to be a way to organize them all or they would ultimately be useless as I would never locate a individual file among tens of thousands of photos.  

I considered many solutions for organizing photos that are already out there.  While many do a great job I wonder how many of them will still exist in 50 years.  I would bet none.  I think the one thing that might remain is that files have names.  Given that files will always have names, and some sort of file structure will likely contain those files, by naming the files and folders with information as to what the photo is actually of would be greatly useful.  This is broken down into a date, event, sequential order, people who were in the photo, and extra information.  The "Structure" listed below explains this as well as taking a look at the examplephotos folder in the project.

Once all of the files and folders are named in a useful manner I wanted a way to make use of that data and be able to look through the photos.  That is where Picture Perfect comes in.  It allows for searching based on events and people to find photos.  I am not claiming that Picture Perfect will be around in 50 years either, however by keeping with a naming scheme in the files and folders, an application similar to Picture Perfect can always be constructed to view the photos.  Enjoy!

Structure
Under public there is a symlink called photos.  Link that to whatever directory holds your photos.  For Picture Perfect to work without modifying the code, use the following photos folder structure:

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
