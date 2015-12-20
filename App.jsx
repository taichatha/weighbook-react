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
      sets: Sets.find({}, {sort: {createdAt: -1}}).fetch(),
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

  renderAllLifts: function() {

    var logs = this.data.logs;
    var sets = this.data.sets;;
    var thisSets = [];
    var thisLifts = [];
    for(var i = 0; i<logs.length; i++){
      thisLifts.push(logs.text);
      for(var j =0; j<sets.length; j++){
        if(sets[j].log== logs[i]._id){
          console.log("match");
          thisSets.push(sets[j]);
        }
      }
    // return this.data.sets.map((set) => {
    //   return (
    //     <Set key={set._id} log={set} />
    //     );
    // });
    }

    console.log(thisLifts);
    console.log(thisSets);
    console.log(logs);
    console.log(Meteor.userId());
    
    // console.log(lifts[1].owner);
    // console.log(lifts[1].sets);
    var show = [];
    var counter = 0;
  //   for(var i= 0; i<sets.length; i++){
  //     // console.log("true");
  //     // show.push(<div>Logs.find({id: sets[i]._id)}
  //     show.push(<Set key={sets[i]._id} sets={sets[i]} />);
      
  //   };
  //   console.log(show);
  //   return (<div>{show}</div>)


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

      { this.data.currentUser ?
        <div>
          Hanh!
          {this.renderAllLifts()}
          </div>: ''
      }

      </div>
    );
  }
});