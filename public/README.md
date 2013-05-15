License: (MIT)
Copyright (C) 2013 Scott Gay

Underpin Javascript Structured Framework
- Underpin is a structured framework for front-end development which accelerates the process of setting up a scalable architecture to support dynamic web applications.  Through the use of object oriented design a variety of site navigation styles can be implemented.  Using backbone.js for navigation and views along with dynamically designed page controllers and sub-page controllers allows for easy navigation and dom manipulation.  

Requires:
- jquery
- lowpro.jquery
- backbone.js
- underscore.js
- 960 grid

Demo:
- http://underpin.blackcloudconcepts.com

GitHub:
- https://github.com/BlackCloudConcepts/underpin

What Underpin really is, is a working example of a simple site using a few different commonly used libraries, along with a few more home grown constructs, that makes getting a site up and running quickly a snap. The key is that even though its fast to get going, there is a solid foundation in place for further advanced development down the road.

From a layout perspective this site is broken into Page Controls and Subpage Controls. Page Controls (as you can visibly see by clicking the top left button) are the main parts of a site. The header, main area, and footer. Adjust this to your own needs. In this case the main section of the site is the only part effected by user input but this could be easily adjusted for other applications. As such the main section Page Control is also the section that coorelates to url hashes and the use of backbone.js for routing and history.

Subpage Controls are the sections that exist within a Page Control. For example in this case there are 5 Subpage Controls, green, blue, yellow, red, and orange. They are seen in main, section one, and section two visually or by clicking the top right button on one of those pages. They are reusable sections which can be laid out in a variety of ways provided they are built to the right dimensions to fit together properly. For example, what if you had left nav on the main page, and then wanted to reuse that on section two without rebuilding it and this time wanted it on the right side of the page. With the use of a Subpage Control this is not an issue. In fact since the page is never refreshing, you could even clone or move the navigation to the other Page Control where it could maintain state if need be. You can also easily have Subpage Controls effect other Subpage Controls through the use of callbacks to the Page Controller in a similar way to how Page Controls effect each other in the use of a callback to the controller.

The building and layout options are aided by the use of the 960 grid system. In this case the page is divided into 16 sections horizontally, each sections being 40 pixels wide with a 20 pixel gutter separating each section. Read more about it to find out its advanced uses, but know that it makes the layout and dimensional uniformity between all controls very easy.

At the end of the day, Underpin makes it quick to get started and easy to scale in more advanced features later. Enjoy!
