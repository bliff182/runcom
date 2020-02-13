import React, { Component } from "react";
import Axios from "axios";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
class Search extends Component {
	state = {
		book: "",
		results: []
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.setState({ results: [] });
		if (this.state.book) {
			this.searchBooks(this.state.book);
		}
	};

	searchBooks = query => {
		const apiKey = process.env.REACT_APP_API_KEY;
		Axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
		).then(res => {
			// console.log(res.data);
			const bookInfo = res.data.items;
			const len = bookInfo.length;
			let resultArray = [];
			for (let i = 0; i < len; i++) {
				const { title, authors, description, imageLinks, infoLink } = bookInfo[
					i
				].volumeInfo;
				let resultObject = {
					title: title,
					authors: authors,
					description: description,
					image: imageLinks.thumbnail,
					link: infoLink
				};
				// console.log(resultObject);
				resultArray.push(resultObject);
			}
			this.setState({ results: resultArray });
			console.log(this.state.results);
		});
		// .catch(err => console.log(err));
	};

	render() {
		return (
			<Container>
				{/* <Row> */}
				{/* <Col size="md-6"> */}
				<Jumbotron>
					<h1>(React) Google Books Search</h1>
					<h4>Search For and Save Books of Interest</h4>
				</Jumbotron>
				{/* <Row> */}
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
				{this.state.results.length ? (
					<List>
						{this.state.results.map(result => (
							<ListItem>
								<h3>{result.title}</h3>
								<h5>Written by: {result.authors}</h5>
								<p>{result.description}</p>
								<img src={result.image}></img>
								<p>More info here: {result.link}</p>
							</ListItem>
						))}
					</List>
				) : (
					<h3>No Results</h3>
				)}
			</Container>
		);
	}
}

export default Search;
