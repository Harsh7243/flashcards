import React, { useState } from 'react';
import './Dashboard.css'; // Create a separate CSS file for dashboard styles

function Dashboard({ flashcardsData, setFlashcardsData, onLogout }) {
  const [newFlashcard, setNewFlashcard] = useState({ front: '', back: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editFlashcard, setEditFlashcard] = useState({ front: '', back: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setFlashcardsData([...flashcardsData, newFlashcard]);
    setNewFlashcard({ front: '', back: '' });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedFlashcards = flashcardsData.map((card, index) =>
      index === editIndex ? editFlashcard : card
    );
    setFlashcardsData(updatedFlashcards);
    setEditIndex(null);
    setEditFlashcard({ front: '', back: '' });
  };

  const handleDelete = (index) => {
    setFlashcardsData(flashcardsData.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard">
      <button onClick={onLogout}>Logout</button>

      <div className="formContainer">
        <h3>Add Flashcard</h3>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Front"
            value={newFlashcard.front}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, front: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Back"
            value={newFlashcard.back}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, back: e.target.value })}
            required
          />
          <button type="submit">Add Flashcard</button>
        </form>

        {editIndex !== null && (
          <div>
            <h3>Edit Flashcard</h3>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                placeholder="Front"
                value={editFlashcard.front}
                onChange={(e) => setEditFlashcard({ ...editFlashcard, front: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Back"
                value={editFlashcard.back}
                onChange={(e) => setEditFlashcard({ ...editFlashcard, back: e.target.value })}
                required
              />
              <button type="submit">Update Flashcard</button>
            </form>
          </div>
        )}

        <h3>Flashcards</h3>
        <ul>
          {flashcardsData.map((card, index) => (
            <li key={index}>
              <p>{card.front} - {card.back}</p>
              <button onClick={() => {
                setEditIndex(index);
                setEditFlashcard(card);
              }}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
