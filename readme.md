THE MAGIC CARD BUILDER WEBSITE

is a website where you can create an account and generate your own personal magic cards for your enjoyment.

Technologies used include:
  "bcrypt": "^1.0.2",
  "body-parser": "^1.17.1",
  "express": "^4.15.2",
  "express-session": "^1.15.2",
  "method-override": "^2.3.8",
  "multer": "^1.3.0",
  "mustache-express": "^1.2.4",
  "pg-promise": "^5.6.4"
  also animate.css for the main page animations
  I used the magicthegathering.io api for magic card information  to see examples of cards and also bring up that specific card's info on magiccards.info.
  Sample card text is also pulled in when you are creating a card just to get ideas of what it should say if you want it to be similar to real cards
  
Approach taken
  It was difficult to keep track of all the different things that went into building the website.  I resorted to listing objectives out to keep myself organized.  I started with setting up the customizable card data, then explored multer for the image upload.  There is still more i can do with the image upload such as letting you resize and crop the image.  Right now the image is just contained in its boundaries.
  Positioning the elements on the card was a hassle.
  Once the card was set up i created the other routes for your profile, cards built, show html for the single card, and login/signup.
  calling the API and ajax was fairly easy as the API was in a really good format.  The hardest part was having the animation occur at the right time.
  
Tutorial:
  Create an account, sign in
  click on "Build a card HERE" to create a new card
  click on the card background you want, upload a picture, and fill in the info you want to appear on the card
  click new card to generate!
  this will bring you to your page with all created cards, click on any of them to edit or delete the card
  
Issues:
  -need ability to crop/resize uploaded image
  -just remembered i need to check if a username is already taken in the database
  -the card to jpg doesn't work

Future ideas:
  -different layout for the card background choices, where you would click on a color (red, blue, white) and that field would expand to show the different backgrounds you could choose from
  -add more card backgrounds to choose from
  -do more css, redesign the buttons into a nav bar
  -fix the rarity emblems, they are off by a few pixels
  -share buttons to imgur, reddit, facebook