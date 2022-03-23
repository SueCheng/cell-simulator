# Purpose

Tis project was a code-challenge for a job interview.
The task is to simulate a cell auto generation game.
It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Stories

- Initially, there is a chess like board wit all cells dead.
- User can click a cell to make cell live or dead; when live, it's dark blue, when dead, it's light blue.
- Use can reset the wole board status to be all dead.
- Usre can click the `Next Generation` button to make cells update its live status depends on how their neighbours are.

# Rules of next generation

- A Cell with fewer than two live neighbours dies of under-population.
- A Cell with 2 or 3 live neighbours lives on to the next generation.
- A Cell with more than 3 live neighbours dies of overcrowding.
- An empty Cell with exactly 3 live neighbours "comes to life".
- A Cell who "comes to life" outside the board should wrap at the other side of the
board.


## How to see its working

First, please run `npm i` to install all the dependancy packages into your `node_modules` directory, then you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
