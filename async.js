window.onload = function(){
  /*
  let http = new XMLHttpRequest();

  http.onreadystatechange = function(){
    //console.log(http);
    if (http.readyState == 4 && http.status == 200){
      console.log(JSON.parse(http.response));
    }
  };
  http.open("GET", "data/tweets.json", true); // true if async
  // sending the request
  http.send();

  console.log("test");
  */

  // async javascript
  /*
  $.get("data/tweets.json", function(data){
    console.log(data);
  });

  console.log("test");
  */


  /***********************
   Callbacks
  */
  /*
  let fruits = ["banana", "apple",  "pear"];

  function callback(val){
    console.log(val)
  }

  fruits.forEach(callback);

  console.log("Done");
  */

  /*
  function cb(data){
    console.log(data);
  }

  $.get("data/tweets.json", cb);
  console.log("Done");
  */

  // read 3 data sources (the silly edition :D, callback hell)
  /*
  $.ajax({
    type: "GET",
    url: "data/tweets.json",
     success: function(data){
       console.log(data);
       $.ajax({
         type: "GET",
         url: "data/fb-friends.json",
          success: function(data){
            console.log(data);
            $.ajax({
              type: "GET",
              url: "data/yt-vids.json",
               success: function(data){
                 console.log(data);

               },
               error: function(jqXHR, testStatus, error){
                 console.log(error);
               }
            });
          },
          error: function(jqXHR, testStatus, error){
            console.log(error);
          }
       });
     },
     error: function(jqXHR, testStatus, error){
       console.log(error);
     }
  });
  */

  // read 3 data sources (the refactored edition :D)
  /*
  function handleError(jqXHR, testStatus, error){
    console.log(error);
  }

  function cbTweets(data){
    console.log(data);
    $.ajax({
      type: "GET",
      url: "data/fb-friends.json",
       success: cbFriends,
       error: handleError
    });
  }

  function cbFriends(data){
    console.log(data);
    $.ajax({
      type: "GET",
      url: "data/yt-vids.json",
       success: function(data){
         console.log(data);
       },
       error: handleError
    });
  }

  $.ajax({
    type: "GET",
    url: "data/tweets.json",
     success: cbTweets,
     error: handleError
  });
  */

  /**************
    Promises ES6 native
  */
  /*
  function get(url){
    return new Promise(function(resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.onload = function(){
        if (xhttp.status == 200){
          resolve(JSON.parse(xhttp.response));
        } else {
            reject(xhttp.statusText);
          }
      };
      xhttp.onerror = function(){
        reject(xhttp.statusText);
      };
      xhttp.send();
    });
  }

  var promise = get("data/tweets.json");
  promise.then(function(tweets){
    console.log(tweets);
    return get("data/fb-friends.json"); // return a new promise
  }).then(function(friends){  // deal with the returned promise
    console.log(friends);
    return get("data/yt-vids.json");
  }).then(function(videos){
    console.log(videos);
  }).catch(function(error){
    console.log(error);
  });
  */

  /*
  $.get("data/tweets.json").then(function(tweets){
    console.log(tweets);
    return $.get("data/fb-friends.json"); // return a new promise
  }).then(function(friends){
    console.log(friends);
    return $.get("data/yt-vids.json");
  }).then(function(videos){
    console.log(videos);
  });
  */


  /*
    Generators: pausable functions
  */
  /*
  function* gen(){
    var x = yield 10;
    console.log(x);
  }

  var myGen = gen();
  console.log(myGen.next());

  console.log(myGen.next(22));
  */

  genWrap(function*(){
    var tweets = yield $.get("data/tweets.json");
    console.log(tweets);

    var friends = yield $.get("data/fb-friends.json");
    console.log(friends);

    var videos = yield $.get("data/yt-vids.json");
    console.log(videos);
  });

  function genWrap(generator){
    var gen = generator();

    function handle(yieldData){
      if (!yieldData.done){
        yieldData.value.then(function(data){
          return handle(gen.next(data));
        });
      }
    }
    return handle(gen.next());
  }
};
