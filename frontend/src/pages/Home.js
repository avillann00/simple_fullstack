import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'
        axios.get(`${apiUrl}/api/notes`)
            .then(response => setNotes(response.data))
            .catch(error => console.error('error fetching notes: ', error));
    }, []);

    const handleDelete = (id) => {
        const apiUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'
        axios.delete(`${apiUrl}/api/notes/${id}`)
            .then(() => {
                alert('Successfully deleted');
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch(error => console.error('error deleting note: ', error));
    };

    const mappedNotes = notes.map(note => (
        <li key={note.id}>
            <button onClick={() => navigate(`/details/${note.id}`)}>View Details</button>
            {`${note.text.substring(0, 3)}...`}
            <button onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
  ));

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => navigate('add/')}>Add New Note</button>
            <ul>
                {mappedNotes}
            </ul>
        </div>
    );
}

export default Home;

