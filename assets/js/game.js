$(document).ready(function(){

// Initialize Firebase
var config = {
apiKey: "AIzaSyA6RscDIpg1oaenBiItz7UDvCSqbv-JJH8",
authDomain: "battleship-game-c8eb8.firebaseapp.com",
databaseURL: "https://battleship-game-c8eb8.firebaseio.com",
projectId: "battleship-game-c8eb8",
storageBucket: "battleship-game-c8eb8.appspot.com",
messagingSenderId: "91898474036"
};
firebase.initializeApp(config);

var database = firebase.database();
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
   shipPatBoat: [], //2
   targetsHit: [], //offensive hits
   targetsMissed: [], //offensive misses
   wins: 0,
   losses: 0,
   
   // function to populate grid with cells; id's match grid location
   buildGrid: function () {

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

   highlightTarget: function () {
      $(this).addClass("target");
   },

   removeHighlight: function () {
      $(this).removeClass("target");
   }
}

$(".buildButton").click(battleShip.buildGrid);
$(".grid").on("mouseenter", ".gridCell", battleShip.highlightTarget);
$(".grid").on("mouseleave", ".gridCell", battleShip.removeHighlight);

});