# WorldQuest

Repository for the WorldQuest game

## Tech Stack

The following technologies are used in this repo

### Client

- React Native
- Typescript
- Axios
- Expo

### API

- Node.js
- MongoDB
- Express
- Passport - for authentication

## Getting Started

1.  Install dependencies
    - API `cd api; npm install;`
    - Client `cd client; npm install;`
2.  Run the API `cd api; npm start`
3.  Add the API url to the Client config
    - Copy the IP Address from the terminal window `Metro waiting on exp://???.???.???.???:8081`
    - Open `/client/src/constants/config.tsx`
    - Add this IP address into the `apiUrl` constant `http://???.???.???.???:5001/api/`, maintaining the socket
    - Save the file
4.  Run the client `cd client; NODE_OPTIONS=--openssl-legacy-provider npm start;`
5.  From the options displayed in the terminal window, run the app either on your desktop, or by scanning the QR code with Expo installed on a mobile device
