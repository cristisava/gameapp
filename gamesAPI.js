var baseUrl = "https://games-world.herokuapp.com";

const game1 = new Game("Valorant", "First Person Shooter", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theverge.com%2F2020%2F3%2F30%2F21199452%2Fvalorant-multiplayer-shooter-riot-closed-beta-date&psig=AOvVaw3PdnYQfqqgZ83kPIaonSKJ&ust=1600354234779000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCn6rL27esCFQAAAAAdAAAAABAD");
const game3 = new Game("Minecraft", "Survival");

//RegenerateGames()

ListGames().then(
    function (jsonResp) {
        jsonResp.forEach(function (element) {
            displayGame(element);
        })
    })

AddGame(game1);
AddGame(game2);
AddGame(game3);


DeleteGame("5f621b4d5fb6bc00208a7840");
DeleteGame("5f621b4d5fb6bc00208a7841");
DeleteGame("5f621b4d5fb6bc00208a7846");

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
function AddGame(game) {
    const promise = fetch(baseUrl + "/games", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    }).then(function (response) {
        return response.json()
    });
    return promise;
}


//delete
function DeleteGame(gameId) {
    return fetch(baseUrl + `/games/${gameId}`, {
        method: 'DELETE'
    }).then(function (response) {
        return response.json();
    })
}


function Game(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
}

Game.prototype.getSummary = function () {
    return this.title + this.description + this.imageUrl;
}

Game.prototype.displayGame = function (game) {
    var gameList = document.getElementById("api");
    var item = document.createElement("li");
    var imgGrup = document.getElementById("imgs");
    var img = document.createElement("img");

    img.src = game.imageUrl;
    item.innerHTML = game.title + "  -  " + " ID: " + game._id;
    gameList.appendChild(item);
    imgGrup.appendChild(img);
}