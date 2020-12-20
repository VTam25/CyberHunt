# CyberHunt

Stuck inside? Miss your friends? Feeling the quarantine blues? Meet Coddiwomple: A virtual scavenger hunt!

The word Coddiwomple means "to travel in a purposeful manner towards a vague destination". Given the pandemic, many of us have had fewer chances to go out or interact with friends in a safe and fun way. A lack of social interaction, a lack of vitamin D, and growing anxiety in the year 2020; sometimes this year has felt like we're all a little lost. This can really take a toll on your mental and physical health. So how about we coddiwomple our way to 2021 instead? Using the radar API which we first heard of at HackUMass, we wanted to create a fun activity that would get people moving and have fun while staying COVID-safe. 

How Do You Play?
There are two sides, a creator can use the website to create a scavenger hunt and clues for players to find in the real world. Players then access that scavenger hunt by entering a game code on the website and can check off clues by visiting those locations.

How Was This Built?
We used Radar API, Google Maps API, GCP, HTML/CSS, bootstrap, and javascript to build our web app and it is hosted through Google Cloud services. When a creator creates a new scavenger hunt, all clues are tagged with Radar IDs and tags that are also saved to a MYSQL database hosted on GCP. We use a GCP Cloud function to make updates to the database each time new clues are added. We also used an amazingly awesome domain name from domain.com. 

What's Next?
A future step would be moving this over to a modern web-dev framework like React to help with the back end and for better security practices. We also want to add more features to Coddiwomple for creators of scavenger hunts to keep track of where all their players are with the Radar API, as well as more fitness trackers for the players to see their total distance and time walked during a game!
