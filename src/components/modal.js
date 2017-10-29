import localStorageDB from 'localstoragedb';

const db = new localStorageDB('playstore', localStorage);

export const modal = () => {

  if ( db.isNew() ) {

    // fetching data from API
    fetch('http://starlord.hackerearth.com/gamesarena').then(function(response) {
      const contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(json) { 
        // processing and adding JSON to database
        db.createTableWithData('games', json.slice(1));
        
        // commit the database to localStorage
        db.commit();
      
      })
      .catch(function(error) { console.log(error); });

  }

  return db;
};