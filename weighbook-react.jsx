//Define a coolection to hold our logs
Logs = new Mongo.Collection("logs");
Sets = new Mongo.Collection("sets");
Lifts = new Mongo.Collection("lifts");

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}