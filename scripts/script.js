// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

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
          setState({page: 'entry', number: newPost.number})
        });
        document.querySelector('main').appendChild(newPost);
        count++;
      });
    });
});

const settings = document.querySelector('header img');
const title = document.querySelector("header h1");

// If the user clicks on the settings icon we should go to settings.
settings.addEventListener('click', () => {
  setState({page: 'settings'});
});

// If the user clicks on the title we should return to homepage. 
title.addEventListener('click', () => {
  setState({page: 'home'});
});
