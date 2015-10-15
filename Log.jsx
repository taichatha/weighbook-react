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


  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var reps = React.findDOMNode(this.refs.reps).value.trim();
    var weight = React.findDOMNode(this.refs.weight).value.trim();
    Sets.insert({
      reps: reps,
      weight: weight,
      log: this.props.log._id,
      createdAt: new Date() // current time
    });
 
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
        <form className="new-set" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref="weight"
              placeholder="Weight" />
            <input
              type="text"
              ref="reps"
              placeholder="# of reps" />
            <button type="submit">Add Set</button>
          </form>
        
      </li>
    );
  }
});