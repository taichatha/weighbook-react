Set = React.createClass({
  propTypes: {
    // This component gets the log to display through a React prop.
    // We can use propTypes to indicate it is required
    set: React.PropTypes.object.isRequired
  },

  
  deleteThisSet() {
    Sets.remove(this.props.set._id);
  },

  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisSet}>
          &times;
        </button>
 		<span className="weight">{this.props.set.weight} </span>
        <span className="set">{this.props.set.reps}</span>
      </li>
    );
  }
});
