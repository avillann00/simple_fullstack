import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'
        axios.post(`${apiUrl}/api/notes/`, { text })
            .then((response) => {
                console.log('note added: ', response.data);
                setText('');
                navigate('/');
            })
            .catch(error => console.error('error adding note: ', error));
    };

    return (
        <div>
            <h1>Add Note</h1>
            <form onSubmit={handleSubmit} className="add-note-form">
                <input
                    type="text"
                    placeholder="Enter your message"
                    aria-label="Add Note"
                    name="note"
                    value={text}
                    onChange={e => setText(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Add;

