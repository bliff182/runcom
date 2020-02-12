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
		).then(res => {
			console.log(res.data);
			let bookInfo = res.data.items;
			const len = bookInfo.length;
			for (let i = 0; i < len; i++) {
				const { title, authors, description, imageLinks, infoLink } = bookInfo[
					i
				].volumeInfo;
				console.log(
					`Title: ${title}\nAuthor(s): ${authors}\nDescription: ${description}\nImage: ${imageLinks.thumbnail}\nLink: ${infoLink}`
				);
			}
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
