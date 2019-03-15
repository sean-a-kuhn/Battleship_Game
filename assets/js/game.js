
//imports
// const uuidv1 = require('uuid/v1'); // will need this statement when running on node.js; remove <script> tag referencing uuid

// Initialize Firebase

var config = {
apiKey: "AIzaSyA6RscDIpg1oaenBiItz7UDvCSqbv-JJH8",
authDomain: "battleship-game-c8eb8.firebaseapp.com",
databaseURL: "https://battleship-game-c8eb8.firebaseio.com",
projectId: "battleship-game-c8eb8",
storageBucket: "battleship-game-c8eb8.appspot.com",
//messagingSenderId: "91898474036"
};
firebase.initializeApp(config);

// object to reference firebase db
var database = firebase.database();

// build database record for player
// generate UUID for player record
var playerId = uuidv1();

// commenting this out so it doesn't keep making records in firebase while testing
/*
database.ref("Player/"+playerId).set({
   id: playerId,
   shipsAll: ["A1", "A2", "A3", "A4", "A5"], //All coordinates occupied by player's ships
   shipsHit: [], //Damaged ship coordinates
   shipAir: [], //Aircraft carrier coordinates
   shipBat: [], //Battleship coordinates
   shipDes: [], //Destroyer coordinates
   shipSub: [], //Submarine coordinates
   shipPtrl: [], //Patrol Boat coordinates
   targetsHit: [], //offensive strikes
   targetsMissed: [] //offensive misses
});
*/

// game logic contained in object 'battleShip'
var battleShip = {
   //variables
   player: 0,
   shipsHit: [], //hits on own grid
   shipsAll: [],
   shipAir: [], //5
   shipBat: [], //4
   shipDes: [], //3
   shipSub: [], //3
   shipPtrl: [], //2
   targetsHit: [], //offensive hits
   targetsMissed: [], //offensive misses
   wins: 0,
   losses: 0,
   currentBoard: "ships", // value is "ships" or "targets", indicating which board is active--defense or offense
   gameMode: "setup", // value is "setup" or "live", indicating if player is setting up board or if game has started
   
   // function to populate grid with cells; id's match grid location
   buildGrid: function () {

      //hide build button
      $(".buildButton").addClass("hide");

      // loop to build column headings
      for (var i=0; i<12; i++) {
         var headingLabel = i;
         if (i === 0 || i === 11) {
            headingLabel = "";
         }
         var addColHeading = $('<div class="col-xs-1 cell">' + headingLabel + '</div>');
         $(".colHeadings").append(addColHeading);
      }

      // loop to add cells to grid
      for (var i=0; i<10; i++) {

         // add row heading at start of row
         var headingLabel = battleShip.convertNumberToLetter(i+1);
         var addRowHeading = $('<div class="col-xs-1 rowHeading cell">' + headingLabel + '</div>');
         $(".grid").append(addRowHeading);

         for (var j=0; j<10; j++) {

            var addCell = $('<div class="col-xs-1 gridCell cell"></div>');
            $(".grid").append(addCell);

            // Assign numerical id to each gridBox.
            var id = battleShip.convertNumberToLetter(i+1) + (j+1);
            addCell.attr('id', id);
         }

         // add row heading at end of row
         var headingLabel = battleShip.convertNumberToLetter(i+1);
         var addRowHeading = $('<div class="col-xs-1 rowHeading cell">' + headingLabel + '</div>');
         $(".grid").append(addRowHeading);
         // bootstrap 4 element to create break between rows
         var addBreak = $('<div class="col w-100"></div>');
         $(".grid").append(addBreak);
      }

      // deselect radio buttons and show ship selector menu
      battleShip.resetRadio();
      battleShip.toggleShipSelect();
   },

   // function to return letter A-J given a number 1-10; return -1 if num<1 or num>10
   convertNumberToLetter: function (num) {
      switch(num) {
         case 1:
            return 'A';
            break;
         case 2:
            return 'B';
            break;
         case 3:
            return 'C';
            break;
         case 4:
            return 'D';
            break;
         case 5:
            return 'E';
            break;
         case 6:
            return 'F';
            break;
         case 7:
            return 'G';
            break;
         case 8:
            return 'H';
            break;
         case 9:
            return 'I';
            break;
         case 10:
            return 'J';
            break;
         default:
            return '';
      }
   },

   // function to add cell coloring class to gridCell
   highlightCell: function () {
      if (battleShip.currentBoard==="ships") {
         if (battleShip.gameMode==="setup") {
            battleShip.highlightCellsByShip(this);
         }
      }
      else {
         $(this).addClass("target");
      }
   },

   // function to show player where ship will be placed
   highlightCellsByShip: function (element) {
      // need to add highlight to other ship cells, based on what ship is selected
      // will probably need new array variable indicating cells where ship will be placed
      $(element).addClass("cellShipOpt");
   },

   // function to remove cell coloring class to gridCell
   removeHighlight: function () {
      if (battleShip.currentBoard==="ships") {
         if (battleShip.gameMode==="setup") {
            battleShip.removeHighlightByShip(this);
         }
      }
      else {
         $(this).removeClass("target");
      }
   },

   // function to remove highlights on cells showing where ship will be placed
   removeHighlightByShip: function (element) {
      // need to incorporate loop that removes class from all cells indicating where ship will be placed
      // will probably need new array variable indicating cells where ship will be placed
      $(element).removeClass("cellShipOpt");
   },

   // function to clear radio button selections
   resetRadio: function () {
      $(".radioBtn").prop("checked", false);
      // default radio selections
      $("input[value='shipAir']").prop("checked", true);
      $("input[value='vertical']").prop("checked", true);
      $("input[value='ships']").prop("checked", true);
   },

   // function to show/hide ship selector menu
   toggleShipSelect: function () {
      if ($(".shipSelect").hasClass("hidden")) {
         $(".shipSelect").removeClass("hidden");
      }
      else {
         $(".shipSelect").addClass("hidden");
      } 
   },

   // function to switch between ships board and targets board
   toggleBoard: function () {
      battleShip.currentBoard = this.value;
   },

   // function to place ship on board: make gridCells gray, identify gridCell IDs to populate shipsAll and ship___ arrays
   placeShip: function () {

   },

   
   // function to test click event assignment, element ID reference, and UUID generation
   alertIdAndUUID: function () {
      alert("This is cell " + this.id + "\nUUID: " + uuidv1());
   }

};

$(document).ready( function() {
   $(".buildButton").click(battleShip.buildGrid);
   $("input[name='board']").on("click", battleShip.toggleBoard);
   $(".grid").on("mouseenter", ".gridCell", battleShip.highlightCell);
   $(".grid").on("mouseleave", ".gridCell", battleShip.removeHighlight);
   $(".grid").on("click", ".gridCell", battleShip.alertIdAndUUID);
});