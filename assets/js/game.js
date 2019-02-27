// game logic contained in object 'battleShip'
var battleShip = {

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

            var addCell = $('<div class="col-xs-1 cell"></div>');
            $(".grid").append(addCell);

            // Assign numerical id to each gridBox.
            var id = battleShip.convertNumberToLetter(i+1) + (j+1);
            addCell.attr('id', id);
         }
         // bootstrap 4 element to create break between rows
         var addSpacer = $('<div class="col-xs-1 rowHeading cell"></div>')
         var addBreak = $('<div class="col w-100"></div>');
         $(".grid").append(addSpacer);
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
   }
   
}

$(".buildButton").click(battleShip.buildGrid);