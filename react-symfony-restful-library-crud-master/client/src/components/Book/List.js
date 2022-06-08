import React, {useEffect, useState}  from "react"

import './Book.scss';

import { Link } from "react-router-dom";

import Utils from "../../Utils";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { MdSearch, MdCached, MdEdit, MdDelete } from "react-icons/md";

function List(props) {
  const pageSize = 10;

  const urlQuery = new URLSearchParams(props.location.search);

  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurredLoading, setErrorOccurredLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(parseInt(urlQuery.get('page')) || 1);
  const [currentPageInputValue, setCurrentPageInputValue] = useState(currentPage);
  const [searchString, setSearchString] = useState(urlQuery.get('search') || '');
  const [booksData, setBooksData] = useState({
    books: [],
    numberOfBooks: 0,
    numberOfPages: 1,
  });

  useEffect(() => {
    if(currentPage > booksData.numberOfPages){
      setCurrentPage(booksData.numberOfPages || 1);
    }
  }, [booksData]);

  useEffect(() => {
    fetchBooks(currentPage, searchString);

    setCurrentPageInputValue(currentPage);

    props.history.push({
      pathname:'/book',
      search:`?page=${currentPage}`
    });
  }, [currentPage])

  function fetchBooks(page = currentPage, searchFor = searchString){
    setIsLoading(true);
    axios.get(Utils.buildGetUrl("/books", {
      page: page,
      properties: [
        "id",
        "title",
        "isbn",
        "authors",
        "categories",
        "thumbnailUrl"
      ],
      itemsPerPage: pageSize,
      title: searchFor
    })).then(response => {
      const data = response.data;
      setIsLoading(false);
      setErrorOccurredLoading(false);
      setBooksData({
          books: data['hydra:member'],
          numberOfBooks: data['hydra:totalItems'],
          numberOfPages: Math.ceil(data['hydra:totalItems']/pageSize) || 1
        }
      );
    }).catch(error => {
      setIsLoading(false);
      setErrorOccurredLoading(true);
      if (error.response) {
        setErrorMessage(`Error ${error.response.status} | ${error.response.statusText}`);
      } else{
        setErrorMessage(`Unknown Error`);
      }
    });
  }

  function deleteBook(book){
      if(window.confirm(`Do you really want to delete the book "${book.title}"?`)){
        axios.delete(Utils.buildGetUrl(book['@id'])).then(response => {
          fetchBooks();
        });
      }
  }

  function handleSearchChange(event) {
    const newSearchString = event.target.value;

    setSearchString(newSearchString);

    fetchBooks(currentPage, newSearchString);
  }

  function handlePageInputChange(event) {
    setCurrentPageInputValue(event.target.value);
  }

  function handlePageInputBlur(event) {
    setCurrentPage(event.target.value);
  }
  
  function firstPage(event){
    setCurrentPage(1);
  }
  function prevPage(event){
    if(currentPage > 1) setCurrentPage(currentPage-1);
  }
  function nextPage(event){
    if(currentPage < booksData.numberOfPages) setCurrentPage(currentPage+1);
  }
  function lastPage(event){
    setCurrentPage(booksData.numberOfPages);
  }
  
  return (
      <div>
        <Container>
          <h1>Books</h1>
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-input"
                value={searchString}
                onChange={handleSearchChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <MdSearch />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <Table className="book-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author(s)</th>
                <th>ISBN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading || errorOccurredLoading ? 
              <tr>
                <td colSpan="5">
                  {isLoading ?
                    <Spinner animation="border" role="status" className="table-loading-spinner">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <Alert variant="danger">
                      <Alert.Heading>
                        An error occurred while fetching the API
                      </Alert.Heading>
                      <p>{errorMessage}</p>
                      <div className="d-flex justify-content-center">
                        <Button onClick={fetchBooks} variant="outline-danger">
                          Try Again <MdCached />
                        </Button>
                      </div>
                    </Alert>
                  }
                </td>
              </tr>
              :
              booksData.books.map(book => {
                let authorCounter=0;
                return (
                  <tr key={book['@id']}>
                    <td>
                      <div className="book-thumb-wrapper">
                        <img src={book.thumbnailUrl} alt="Book thumbnail"></img>
                      </div>
                    </td> 
                    <td>  
                      {book.title}
                    </td>
                    <td className="text-left">
                      <ul>
                        {book.authors.map(author => (
                          <li key={`author-${++authorCounter}-${book['@id']}`}>{author}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{book.isbn}</td>
                    <td>
                        <ButtonGroup vertical>
                            <Button as={Link} to={`/book/edit/${book['id']}`} variant="primary">
                                <MdEdit />
                            </Button>
                            <Button onClick={() => {deleteBook(book)}} variant="danger">
                                <MdDelete />
                            </Button>
                        </ButtonGroup>  
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
            <Pagination.First onClick={firstPage} />
            <Pagination.Prev onClick={prevPage}/>
            <input type="number" className="form-control page-input" value={currentPageInputValue} onChange={handlePageInputChange} onBlur={handlePageInputBlur}></input>
            <Pagination.Item disabled><b>/</b></Pagination.Item>
            <input type="number" className="form-control page-input" value={booksData.numberOfPages} disabled></input>
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={lastPage} />
          </Pagination>
        </Container>
      </div>
  );
}

export default List;