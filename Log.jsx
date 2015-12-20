// Log component - represents a single todo item
Log = React.createClass({
  propTypes: {
    // This component gets the log to display through a React prop.
    // We can use propTypes to indicate it is required
    log: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      sets: Sets.find({log: this.props.log._id}, {sort: {createdAt: -1}}).fetch()
    }
  },

  renderSets() {
    return this.data.sets.map((set) => {
      return (
        <Set key={set._id} set={set} />
        );
    });
  },

  
  deleteThisLog() {
    Logs.remove(this.props.log._id);
  },

  addToWeight(event) {
    event.preventDefault();
    var weight = Number(React.findDOMNode(this.refs.weight).value.trim());
    weight+= 5;
    React.findDOMNode(this.refs.weight).value=weight;
  },

  subtractFromWeight(event) {
    event.preventDefault();
    var weight = Number(React.findDOMNode(this.refs.weight).value.trim());
    if(weight>0){
      weight-= 5; 
    }
    React.findDOMNode(this.refs.weight).value=weight;
  },


  addToReps(event) {
    event.preventDefault();
    var reps = Number(React.findDOMNode(this.refs.reps).value.trim());
    reps+= 1;
    React.findDOMNode(this.refs.reps).value=reps;
  },

  subtractFromReps(event) {
    event.preventDefault();
    var reps = Number(React.findDOMNode(this.refs.reps).value.trim());
    if(reps>0){
      reps-= 1;  
    }
    
    React.findDOMNode(this.refs.reps).value=reps;
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var reps = Number(React.findDOMNode(this.refs.reps).value.trim());
    var weight = Number(React.findDOMNode(this.refs.weight).value.trim());
    if(reps>= 0 && weight >= 0 ){

      Sets.insert({
        reps: reps,
        weight: weight,
        log: this.props.log._id,
        createdAt: new Date() // current time
      });
       
    }
    // Clear form
    React.findDOMNode(this.refs.reps).value = "";
    React.findDOMNode(this.refs.weight).value = "";
  },
 
  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisLog}>
          &times;
        </button>
 
        <span className="text">{this.props.log.text}</span>
        <ul>
          {this.renderSets()}
        </ul>
        <form className="new-set">
            <button type='button' onClick={this.subtractFromWeight}>-</button>
            <input
              type="number"
              min="0"
              ref="weight"
              placeholder="Weight" />
            <button type='button' onClick={this.addToWeight}>+</button>
            <br/>
            <button type='button' onClick={this.subtractFromReps}>-</button>
            <input
              type="number"
              min="0"
              ref="reps"
              placeholder="# of reps" />
            <button type='button' onClick={this.addToReps}>+</button>
            <br/>
            <button type="submit" onClick={this.handleSubmit}>Add Set</button>
          </form>
        
      </li>
    );
  }
});