# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How to Run This Project: 

1) `cd photoViewer`
2) `yarn` or `npm install`
3) `yarn start` or `npm start`

# Dependecies used in this photoViwer Project
    "axios": "^0.21.4":                   // async fetch api value
    "babel-plugin-root-import": "^6.6.0", // to avoid import like "../../"
    "connected-react-router": "^6.9.1",   // a Redux binding for React Router v4 and v5
    "reselect": "^4.0.0",
    "re-reselect": "^4.0.0",              // a lightweight wrapper around Reselect meant to enhance selectors with deeper memoization and cache management
    "react-meta-tags": "^1.0.1",          // add metaTags for pages (SEO purpose)
    "react-redux": "^7.2.5",              // Redux data management
    "redux": "^4.1.1",
    "redux-thunk": "^2.3.0", 
    "react-router": "^5.2.1",        
    "redux-logger": "^3.0.6",             // display state change logger in development mode
                 
# Features
1 User can login by username (case sensitive)
  avaiable usernames:
  1) Bret,
  2) Antonette,
  3) Samantha,
  4) Karianne,
  5) Kamren,
  6) Leopoldo_Corkery,
  7) Elwyn.Skiles,
  8) Maxime_Nienow,
  9) Delphine,
  10) Moriah.Stanton
 
2 User will re-direct to main(posts/albums/otherUsers) page after logged in, if go to url: http://localhost:3000/1 directly, the page will re-direct to login page
  1) by click post box, the page will re-redirect to post and comment page
  2) by click album box, the page will re-direct to album potos page
  3) by click other users box in the end of the page, the page will re-firect to other users' profile 

3 The Single Post page "http://localhost:3000/post2" can be accessed without login, users can read comments and posts comments to other users'posts
  1) if user has logged in, the comment "From" field will pre-fill user's email, otherwise, the user has to type by himself
  2) if user has logged in, user cannot post comment to his own post

4 Album page "http://localhost:3000/album4" cannot be accessed without login, if go to url: "http://localhost:3000/album4" directly, the page will re-direct to login page

5 User can logout

6 add mataTags in pages For SEO
    
