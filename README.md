# Junior Design Project

App Name:  Game of Gains

Version: 0.1

-------------

Team Name: Gym Rats

Team Members:
- Brody Johnstone
- Brandon Manuel
- Grayson Bianco
- Jessica Chen
- Will Stith

# Release Notes
This section details the new features in version 0.1, the fixed bugs from older versions of the app, as well as current known bugs and missing features expected to be due in version 0.1.
## NEW FEATURES
- Added a search bar for exercises to more easily filter all of the available options
- Added a quick log feature to allow users to quickly input their own exercises instead of choosing from a list
- Added a robust point system to reward users for completing exercises
- Finished challenge functionality so users can complete specific challenges to earn extra points
- Added the ability for users to change their profile pictures
- Updated information displayed on the cards on the home page to better reflect those pages

## BUG FIXES
- Entering in the number of reps for an exercise no longer displays 'NaN' when empty
- Fixed a bug that allowed for users to submit a challenge more than once
- Fixed a naming convention bug that sometimes caused the app to crash when quick selecting an exercise
- Fixed a bug that caused certain exercises to be interpreted as the wrong type, i.e. bench press as cardio

## KNOWN BUGS
- Exercises are dependent on their name instead of a unique ID, so a 'Push-Up' is different from a 'Pushup'
- Exercises in the 'Quick Picks' section are not always in the global exercise list
- The search bar on the Add Friends page sometimes autocorrects input and causes a light crash
- The recent tab on the friends page renders people in sections even though there are no defined sections

## MISSING FEATURES
- All earned points are considered 'all-time' and there is no deeper granularity such as daily, weekly, and monthly points
- Users cannot create routines consisting of various exercises and submit it all at once
- The leaderboard cannot be filtered by when points were earned, i.e. 'daily', 'weekly', or 'monthly'
- The settings page does not change any actual settings and is currently just a mock-up. Subsequently, there are no privacy or anonymity settings in the app
- Sign-up and sign-in are restricted to usernames and passwords; there is no functionality to login 3rd party services such as Google
- There is no password recovery in the app
-------------

# Install Information
Since the application is still in an early state, we recommend utilizing <a href="https://expo.io/" title="Expo Link">
expo</a> as a means to quickly build and demo the app. If you would rather build natively to iOS or Android, a link with instructions will be provided at the end of this section.
## Pre-requisites
- an Android or iOS device (or emulator)
- <a href="https://nodejs.org/en/" title="Node Link">Node.js</a> and <a href="https://www.npmjs.com/" title="NPM Link">Node Package Manager (npm)</a> (NOTE: we recommend using brew to do this. Instructions can be found <a href="https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew" title="Brew Link">here</a>.
- <a href="https://git-scm.com/downloads" title="Git Link">git</a>

## Dependencies
- a full list of dependencies can be found in Junior-Design-Project/Game_of_Gains/package.json

## Download Instructions
- Navigate to the filepath in which you want to create the project, and run:
```
git clone https://github.com/BrodyJack/Junior-Design-Project.git
```

## Build Instructions
- Once you have downloaded the project, you need to download all dependencies. This can be done by navigating to Junior-Design-Project/Game_of_Gains and running:
```
npm install
```

## Run Instructions
- After installing and dependencies, run the project with
```
npm start
```
Wait for the packager to finish, and then either:
1) Download the expo client app on your mobile device, scan the QR code from your terminal, and open in Expo
2) Press 'i' to open in iOS emulator
3) Press 'a' to open in either Android emulator or connected Android device

NOTE: You may need to have your devices on the same network as one another for the expo project to successfully build and run on your mobile device.

## Native App
- If you want to run a native application outside of Expo, please read through <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" title="Eject Link">Expo's instructions</a>, specifically noting the section which describes Ejecting to ExpoKit

## Backend Information
- The backend of our application uses <a href="https://firebase.google.com/" title="Firebase">Firebase</a>. This is where information about users, exercises, and more is stored. Please contact "brodyjackj@gatech.edu" if you would like access to this. Currently, the team uses their Google accounts to like into Firebase as it is a Google product, but the owner of the app's instance is Brody and therefore he must grant access for other users to read/write to the server.

## Troubleshooting
- Typing "R" in terminal after the packager finishes will restart the packager and clear the cache, fixing occasional issues that may occur with the app hanging or otherwise crashing
- Email inquiries can be directed to "brodyjackj@gatech.edu"

-------------
