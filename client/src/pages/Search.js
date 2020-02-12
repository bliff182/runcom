import React, { Component } from "react";
import Axios from "axios";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
	state = {
		book: ""
	};

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
			<Container fluid>
				{/* <Row> */}
				{/* <Col size="md-6"> */}
				<Jumbotron>
					<h1>(React) Google Books Search</h1>
					<h4>Search For and Save Books of Interest</h4>
				</Jumbotron>
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
				{/* </Col> */}
				{/* </Row> */}
			</Container>
		);
	}
}

export default Search;
