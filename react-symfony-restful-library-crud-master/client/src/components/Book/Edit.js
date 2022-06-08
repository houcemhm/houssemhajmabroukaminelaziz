import React, {useEffect, useState}  from "react"

import './Book.scss';

import Utils from "../../Utils";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Edit(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurredLoading, setErrorOccurredLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [bookData, setBookData] = useState({});

  function fetchBook(id){
    setIsLoading(true);
    axios.get(Utils.buildGetUrl(`/books/${id}`)).then(response => {
      const data = response.data;

      data.publishedDate = data.publishedDate.split("T")[0];

      setIsLoading(false);
      setErrorOccurredLoading(false);
      setBookData(response.data);

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
  
  useEffect(() => {
    const bookId = props.match.params.bookId;

    fetchBook(bookId);
  }, []);

  return (
      <div>
        <Container>
          <h1>Edit Book</h1>
          { isLoading ?
          <Spinner animation="border" role="status" className="table-loading-spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
          :
          <Form className="text-left">
            <Form.Group controlId="form-title">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Title" defaultValue={bookData.title}/>
            </Form.Group>

            <Form.Group controlId="form-isbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control placeholder="ISBN" defaultValue={bookData.isbn} />
            </Form.Group>

            <Form.Group controlId="form-short-description">
              <Form.Label>Short Description</Form.Label>
              <Form.Control as="textarea" rows={2} defaultValue={bookData.shortDescription} />
            </Form.Group>

            <Form.Group controlId="form-long-description">
              <Form.Label>Long Description</Form.Label>
              <Form.Control as="textarea" rows={4} defaultValue={bookData.longDescription} />
            </Form.Group>

            <Form.Group controlId="form-page-count">
              <Form.Label>Page Count</Form.Label>
              <Form.Control type="number" min="0" defaultValue={bookData.pageCount} />
            </Form.Group>

            <Form.Group controlId="form-published-date">
              <Form.Label>Published Date</Form.Label>
              <Form.Control type="date" defaultValue={bookData.publishedDate} />
            </Form.Group>

            <Form.Group controlId="form-thumbnail-url">
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control type="url" placeholder="https://example.com/thumb.jpg" defaultValue={bookData.thumbnailUrl}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          }
        </Container>
      </div>
  );
}

export default Edit;