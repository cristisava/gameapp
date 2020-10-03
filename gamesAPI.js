var baseUrl = "https://games-world.herokuapp.com";

//RegenerateGames()
ListGames().then(
    function (jsonResp) {
        jsonResp.forEach(function (element) {
            displayGame(element);
        })
    })

function displayGame(game) {
    var gameList = document.getElementById("api");
    var item = document.createElement("li");
    var imgGrup = document.getElementById("imgs");
    var img = document.createElement("img");

    img.src = game.imageUrl;
    item.innerHTML = game.title + "  -  " + " ID: " + game._id;
    gameList.appendChild(item);
    imgGrup.appendChild(img); 
}

//refresh games
function RegenerateGames() {
    const promise = fetch(baseUrl + "/regenerate-games", {
        method: "GET"
    })
        .then(
            function (response) {
                return response.json();
            }
        );
    return promise;
}


//get
function ListGames() {
    const promise = fetch(baseUrl + "/games", {
        method: "GET"
    })
        .then(
            function (response) {
                return response.json();
            }
        );
    return promise;
}

//post



//delete

const deleteGameButton = document.getElementById("deleteGame");
deleteGameButton.addEventListener('click', deleteGame);

function deleteGame() {
    const gameId = document.getElementById("gameId").value;

    DeleteGame(gameId);
}


function DeleteGame(gameId) {
    return fetch(baseUrl + `/games/${gameId}`, {
        method: 'DELETE'
    }).then(function (response) {
        location.reload();
        return response.json();
    })
}


const addGameButton = document.getElementById("addGame");
addGameButton.addEventListener('click', AddGame);

function AddGame() {

    const game = getGameData() 
    
    console.log(game)
  
    saveGameOnServer(game)
      .then(function (response) {
        console.log(response)
        location.reload();
      }).catch(function (err) {
        console.log(err)
      })
  
  }

  const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

  
  function saveGameOnServer(game) {
    const promise = fetch("https://games-world.herokuapp.com/games", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-url-encoded', 'Accept': 'application/json'
      },
      body: encodeFormData(game)
    }).then(function(response){
      return response.json()
    });
  
   return promise;
  }
  
  function getGameData() {
    const gameTitle = document.getElementById("title").value;
    const gameReleaseDate = document.getElementById("relDate").value;
    const gameGenre = document.getElementById("genre").value;
    const gamePublisher = document.getElementById("title").value;
  
    return {
      title: gameTitle,
      releaseDate: gameReleaseDate,
      genre: gameGenre,
      publisher: gamePublisher
    }
  }





