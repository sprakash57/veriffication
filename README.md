# Veriffication

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is a demonstration of stepwise verification system. UI is responsive and can be run on mobile devices.

## How to setup

Clone this repo and run `yarn install` to install all dependencies. After that you can use below scripts.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technology Stack

- React
- TypeScript
- CSS Modules

## What to expect

Since APIs are fake (using `Math.random` wrapped in 500 ms delay timer) sometimes it takes 4 or 5 clicks to see the checklist. Once the verification 
checklist can be seen, you can start selecting the checks that will enable/disable the next check. Final submit is possible only if you have atleast 
one `No` or all `Yes` as selection.

