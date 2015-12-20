// Data = React.createClass({

// 	mixins: [ReactMeteorData],

// 	getMeteorData: function() {
// 		return {
// 			lifts: Logs.find({}, {sort: {createdAt: -1}}).fetch(),
// 			currentUser: Meteor.user()
// 		}
// 	},

// 	getInitialState: function() {
// 		return {the_date: new Date(), showPast: false};
// 	},
// 	//Show all lifts, and their progression, date by date.
// 	renderAllLifts: function() {

// 		var lifts = this.data.lifts;
// 		var show = [];
// 		for(var i= 0; i<lifts.lenght; i++){
// 			if(lifts[i].owner === Meteor.userId()){
// 				show.push(<Log key={lifts[i]._id} log={lifts[i]} />);
// 			};
// 		};

// 		return (<div>{show}</div>)


// 	},

// 	render(){
// 		<div>
// 			HANH!
// 			{this.renderAllLifts()}
// 		</div>
// 	}
// });