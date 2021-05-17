// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;


document.addEventListener('DOMContentLoaded', () => {
  let count = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.number = count;
        newPost.addEventListener('click', () => {
          setState({page: 'entry', number: newPost.number, 'entryActual': entry});
        });
        document.querySelector('main').appendChild(newPost);
        count++;
      });
    });   

    // Make sure you register your service worker here too
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
});

const settings = document.querySelector('header img');
const title = document.querySelector("header h1");

// If the user clicks on the settings icon we should go to settings.
settings.addEventListener('click', () => {
  router.setState({page: 'settings'});
});

// If the user clicks on the title we should return to homepage. 
title.addEventListener('click', () => {
  router.setState({page: 'home'});
});

// Back button functionality.
// onpopstate is fired when the active history entry changes while the user navigates the session history.
window.addEventListener('popstate', (event) => {
  if(history.state !== null ) {
    router.setState(history.state);
  } else {
    router.setState({page: 'home'}, '', ' ');
  }
});
