import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Details() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'
    axios.get(`${apiUrl}/api/notes/details/${id}`)
      .then(response => setNote(response.data))
      .catch(error => console.error('error fetching note: ', error));
  }, [id]);

  function goBack() {
    navigate('/')
  }

  return (
    <div>
      <h1>Details</h1>
      {note ? <p>{note.text}</p> : <p>loading...</p>}
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Details;

