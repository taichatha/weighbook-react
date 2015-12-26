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
  getMeteorData: function() {
    return {
      logs: Logs.find({}, {sort: {createdAt: -1}}).fetch(),
      sets: Sets.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    }
  },

  getInitialState: function() {

    return {the_date: new Date(), showPast: false};
  },

  onPastClick: function() {
    if(this.state.showPast==false){
      this.setState({showPast: true});
    } else { 
      this.setState({showPast: false});
    }
  },

  dayBefore: function() {
    this.state.the_date.setDate(this.state.the_date.getDate() - 1);
    this.setState({the_date: this.state.the_date});
  },

  renderDate: function() {
    return this.state.the_date.toDateString();
  },

  dayAfter: function() {
    this.state.the_date.setDate(this.state.the_date.getDate() + 1);
    this.setState({the_date: this.state.the_date});
  },

  renderTheDateLog: function() {
    var d = this.state.the_date;
    var logs = this.data.logs;
    var show = [];
    for(var i = 0; i<logs.length; i++){
      if(logs[i].owner === Meteor.userId()){
        if(logs[i].createdAt.toDateString() === d.toDateString()){
          show.push(<Log key={logs[i]._id} log={logs[i]} />);
        }
      }
    }

    return (<div>{show}</div>);
  },
  renderLogs: function() {
    // get task from this.data.moods
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
    var show = [];
    //TODO: Seperate by Lifts, have subcategories by dates, with each set accompany
    //each date.
    for(var i = 0; i<logs.length; i++){
      show.push(<p>{logs[i].text}: {logs[i].createdAt.toDateString()}</p>);
      var num_set = 1;
      for(var j =0; j<sets.length; j++){
        if(sets[j].log== logs[i]._id){
          // console.log("match");
          show.push(<li>Set {num_set}: {sets[j].weight}lbs x {sets[j].reps}</li>);
          num_set+=1;
        }
      }
      
    }

    console.log(logs);
    console.log(sets);
    //assign sets to a lif
    console.log(Meteor.userId());
    
    // console.log(lifts[1].owner);
    // console.log(lifts[1].sets);
    return (<div>{show}</div>)
  },

  renderAllLogs() {
    var logs = this.data.logs;
    var show = [];
    for(var i = 0; i<logs.length; i++){
        if(logs[i].owner === Meteor.userId()){
            show.push(<Log key={logs[i]._id} log={logs[i]} />);
   
      };
    };

    return (<div>{show}</div>);
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
          <div>
            <button onClick={this.dayBefore}>[==</button>
            {this.renderDate()}
            <button onClick={this.dayAfter}>==]</button>
          </div>  : ''
      }

       { this.data.currentUser ?
          <ul>
            {this.renderTheDateLog()}
          </ul> : ''
      }

      </div>
    );
  }
});