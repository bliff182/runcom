import React, { Component } from "react";
import Axios from "axios";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
	state = {
		book: ""
	};

	componentDidMount() {
		console.log(process.env.REACT_APP_API_KEY);
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.book) {
			this.searchBooks(this.state.book);
		}
	};

	searchBooks = query => {
		const apiKey = process.env.REACT_APP_API_KEY;
		Axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
		)
			.then(res => {
				console.log(res.data);
			})
			.catch(error => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log("---------------Data---------------");
					console.log(error.response.data);
					console.log("---------------Status---------------");
					console.log(error.response.status);
					console.log("---------------Status---------------");
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an object that comes back with details pertaining to the error that occurred.
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
				console.log(error.config);
			});
	};

	render() {
		return (
			<form>
				<Input
					value={this.state.book}
					onChange={this.handleInputChange}
					name="book"
					placeholder="Search for books."
				/>
				<FormBtn disabled={!this.state.book} onClick={this.handleFormSubmit}>
					Search
				</FormBtn>
			</form>
		);
	}
}

export default Search;
