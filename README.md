# AngularJS-santander-cycles

A simple app which lets you find find Santander cycles docking stations around you by entering your address or postcode.

The app makes a request to google maps api to geodecode the address entered, it then sends the latitude and longitude data to the tfl api which returns a list of Santander cycles docking stations within 2miles from the entered address.

Try it live: http://simonedeluca.github.io/AngularJS-santander-cycles/app/

## Requirements

- [Node and npm](http://nodejs.org)

## Installation

1. Clone the repository: `git clone https://github.com/Simonedeluca/AngularJS-santander-cycles.git`
2. Install the application: `npm install`
3. Start the server: `npm start`
4. View in browser at `http://localhost:8000`
