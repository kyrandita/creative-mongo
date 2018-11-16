var Lab5 = function() {
  
  var self = this;
  //Your submitted/base URL should be of the form: xxx.xxx:3004
  self.lab5URL = "/";
  
  //Comments Form:
  self.name = $('#name'); //The first input field for the name
  self.comment = $('#comment'); //The second input field for their comment

  //Buttons:
  self.post = $('#postComment'); //Text can be anything, but this ID is for the button that will send the comment to the server
  self.get = $('#getComments'); //Text can be anything, but this ID is for the button that will retrieve from the server
  self.deleteAll = $('#deleteComments'); //Text can be anything, but this ID is for the button that will delete all the comments

  //Output Divs:
  self.jsonForm = $('#json'); //Displays something of the form: `{"Name":"Jordan","Comment":"HI"}`
  self.statusSpot = $('#done'); //Displays success (or fail if it fails for some reason?)
  self.commentsList = $('#comments'); //Displays the comments retrieved in the form: `Name: Jordan -- Comment: Hello There!`

  //route URL (when appended to the base one)
  self.commentRoute = "/comment"; //MUST work for all (GET, POST, DELETE)
}

module.exports = new Lab5();
/**
 * For more information about the test driver used, check out: protractortest.org
 * For information about page objects: http://www.protractortest.org/#/page-objects
 */