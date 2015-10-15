var lifts = [
  {name: 'Bench Press'},
  {name: 'Squat'},
  {name: 'Dips'},
  {name: 'Pull Ups'},
  {name: 'Deadlift'},
  {name: 'DB Rows'},
  {name: 'BB Rows'}

];
// App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      logs: Logs.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    }
  },

  renderLogs() {
    return this.data.logs.map((log) => {
      return (
        <Log key={log._id} log={log} />
        );
    });
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.lift).value.trim();
    
    Logs.insert({
      text: text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // id of logged in user (might want to move this to daily)
      username: Meteor.user().username // username of logged in user
    });
 
    // Clear form
    React.findDOMNode(this.refs.lift).value = "0";
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Weighbook</h1>
          <AccountsUIWrapper />
 
          { this.data.currentUser ?
            <form className="new-log" onSubmit={this.handleSubmit} >
              <select name="formLift" ref="lift" >
                  <option value="0">Select a Lift</option>
                  <option value={lifts[0].name}>{lifts[0]}</option>
                  <option value={lifts[1].name}>{lifts[1]}</option>
                  <option value={lifts[2].name}>{lifts[2]}</option>
                  <option value={lifts[3].name}>{lifts[3]}</option>
                  <option value={lifts[4].name}>{lifts[4]}</option>
                  <option value={lifts[5].name}>{lifts[5]}</option>
                  <option value={lifts[6].name}>{lifts[6]}</option>
                </select> 
              
              <button type="submit">Add Lift</button>
            </form> : ''
          }

        </header>
        { this.data.currentUser ?
          <ul>
            {this.renderLogs()}
          </ul> : ''
      }
      </div>
    );
  }
});