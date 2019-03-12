import React from 'react';

//Props: onTermSubmit function (API Call) from App component is passed as a prop to this SearchBar component as onFormSubmit
class SearchBar extends React.Component {

	//State of this SearchBar component is a 'term' that the user has inputted. This user input is controlled by the function onInputChange. 
	state = {term:''};

	//An input element from render invokes this function onChange. It sets the state of this SearchBar component to what the user has typed.
	onInputChange = (event) => {
		//console.log({term:event.target.value});
		this.setState({term:event.target.value});
	}; 

	//When form is submitted with the 'term' entered, the form submit function(API Call) from the App component is invoked with this.state.term('term')
	onFormSubmit = (event) => {
		event.preventDefault(); 
		this.props.onFormSubmit(this.state.term);
	};

	//This SearchBar component has a form and one input. The input is a search 'term'. onChange handles the event for the user text input, by invoking onInputChange function.


	render(){
		return (
		<div className="search-bar ui segment">
		<form className="ui form" onSubmit={this.onFormSubmit}>
		<div className="field">
		<label>Enter Location</label>
		<input type="text" value={this.state.term} onChange={this.onInputChange} />
		</div>
		</form>


			</div>
			);
	}


}


export default SearchBar;