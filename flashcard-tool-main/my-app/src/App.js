// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [fcData, setFcData] = useState([]);
//   const [curCIndex, setCurrentCardIndex] = useState(0);
//   const [flipped, setFlipped] = useState(true);
//   const [slideDir, setSlideDir] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
//   const [showDashb, setShowDashb] = useState(false);
//   const [fData, setFData] = useState({ front: '', back: '' });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/flashcards')
//       .then(response => {
//         setFcData(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the flashcards!', error);
//       });
//   }, []);

//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };

//   const handleNext = () => {
//     setFlipped(true);
//     setSlideDir('next');
//     setTimeout(() => {
//       setCurrentCardIndex((prevIndex) =>
//         prevIndex === fcData.length - 1 ? 0 : prevIndex + 1
//       );
//       setSlideDir('');
//     }, 300);
//   };

//   const handlePrev = () => {
//     setFlipped(true);
//     setSlideDir('prev');
//     setTimeout(() => {
//       setCurrentCardIndex((prevIndex) =>
//         prevIndex === 0 ? fcData.length - 1 : prevIndex - 1
//       );
//       setSlideDir('');
//     }, 300);
//   };

//   const toggleLogin = () => {
//     setShowLogin(!showLogin);
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setShowLogin(false);
//     setShowDashb(true);
//   };

//   const handleLogout = () => {
//     setShowDashb(false);
//     setShowLogin(true);
//   };

//   const handleFormChange = (e) => {
//     setFData({ ...fData, [e.target.name]: e.target.value });
//   };

//   const handleAddFlashcard = () => {
//     axios.post('http://localhost:3001/api/flashcards', fData)
//       .then(response => {
//         setFcData([...fcData, response.data]);
//         setFData({ front: '', back: '' });
//       })
//       .catch(error => {
//         console.error('There was an error adding the flashcard!', error);
//       });
//   };

//   const handleEditFlashcard = () => {
//     axios.put(`http://localhost:3001/api/flashcards/${fcData[curCIndex].id}`, fData)
//       .then(response => {
//         const updatedFlashcards = fcData.map((card, index) =>
//           index === curCIndex ? response.data : card
//         );
//         setFcData(updatedFlashcards);
//         setFData({ front: '', back: '' });
//         setIsEditing(false);
//       })
//       .catch(error => {
//         console.error('There was an error updating the flashcard!', error);
//       });
//   };

//   const handleDeleteFlashcard = () => {
//     axios.delete(`http://localhost:3001/api/flashcards/${fcData[curCIndex].id}`)
//       .then(() => {
//         const updatedFlashcards = fcData.filter((_, index) => index !== curCIndex);
//         setFcData(updatedFlashcards);
//         setCurrentCardIndex(0);
//       })
//       .catch(error => {
//         console.error('There was an error deleting the flashcard!', error);
//       });
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//     setFData(fcData[curCIndex]);
//   };

//   return (
//     <div>
//       <button className="login" onClick={toggleLogin}>Login</button>

//       {showLogin && (
//         <div className="loginForm">
//           <h2>Login</h2>
//           <form onSubmit={handleLoginSubmit}>
//             <input type="text" placeholder="Username" required />
//             <input type="password" placeholder="Password" required />
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       )}

//       {showDashb && (
//         <div className="dashboard">
//           <button className="logoutButton" onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <div className="container">
//         {showDashb && (
//           <div className="flashcardManagement">
//             <input
//               type="text"
//               name="front"
//               placeholder="Front"
//               value={fData.front}
//               onChange={handleFormChange}
//             />
//             <input
//               type="text"
//               name="back"
//               placeholder="Back"
//               value={fData.back}
//               onChange={handleFormChange}
//             />
//             {isEditing ? (
//               <>
//                 <button onClick={handleEditFlashcard}>Update Flashcard</button>
//                 <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
//               </>
//             ) : (
//               <button onClick={handleAddFlashcard}>Add Flashcard</button>
//             )}
//             <button onClick={handleDeleteFlashcard}>Delete Flashcard</button>
//             <button onClick={startEditing} disabled={isEditing}>Edit This Flashcard</button>
//           </div>
//         )}

//         <div
//           className={`flashCards ${flipped ? 'flipped' : ''} ${slideDir}`}
//           onClick={handleFlip}
//         >
//           <div className="flashCardInner">
//             <div className="flashCardFront">
//               <p>{fcData[curCIndex]?.front}</p>
//             </div>
//             <div className="flashCardBack">
//               <p>{fcData[curCIndex]?.back}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flashCardsControls">
//           <button className="prevButton" onClick={handlePrev}>Prev</button>
//           <button className="nextButton" onClick={handleNext}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [fcData, setFcData] = useState([]);
  const [curCIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(true);
  const [slideDir, setSlideDir] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showDashb, setShowDashb] = useState(false);
  const [fData, setFData] = useState({ front: '', back: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Use the deployed backend URL for API requests
  const baseURL = 'https://flashcards-production-b9bc.up.railway.app/';

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setFcData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the flashcards!', error);
      });
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(true);
    setSlideDir('next');
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === fcData.length - 1 ? 0 : prevIndex + 1
      );
      setSlideDir('');
    }, 300);
  };

  const handlePrev = () => {
    setFlipped(true);
    setSlideDir('prev');
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? fcData.length - 1 : prevIndex - 1
      );
      setSlideDir('');
    }, 300);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setShowLogin(false);
    setShowDashb(true);
  };

  const handleLogout = () => {
    setShowDashb(false);
    setShowLogin(true);
  };

  const handleFormChange = (e) => {
    setFData({ ...fData, [e.target.name]: e.target.value });
  };

  const handleAddFlashcard = () => {
    axios.post(baseURL, fData)
      .then(response => {
        setFcData([...fcData, response.data]);
        setFData({ front: '', back: '' });
      })
      .catch(error => {
        console.error('There was an error adding the flashcard!', error);
      });
  };

  const handleEditFlashcard = () => {
    axios.put(`${baseURL}/${fcData[curCIndex].id}`, fData)
      .then(response => {
        const updatedFlashcards = fcData.map((card, index) =>
          index === curCIndex ? response.data : card
        );
        setFcData(updatedFlashcards);
        setFData({ front: '', back: '' });
        setIsEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the flashcard!', error);
      });
  };

  const handleDeleteFlashcard = () => {
    axios.delete(`${baseURL}/${fcData[curCIndex].id}`)
      .then(() => {
        const updatedFlashcards = fcData.filter((_, index) => index !== curCIndex);
        setFcData(updatedFlashcards);
        setCurrentCardIndex(0);
      })
      .catch(error => {
        console.error('There was an error deleting the flashcard!', error);
      });
  };

  const startEditing = () => {
    setIsEditing(true);
    setFData(fcData[curCIndex]);
  };

  return (
    <div>
      <button className="login" onClick={toggleLogin}>Login</button>

      {showLogin && (
        <div className="loginForm">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {showDashb && (
        <div className="dashboard">
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="container">
        {showDashb && (
          <div className="flashcardManagement">
            <input
              type="text"
              name="front"
              placeholder="Front"
              value={fData.front}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="back"
              placeholder="Back"
              value={fData.back}
              onChange={handleFormChange}
            />
            {isEditing ? (
              <>
                <button onClick={handleEditFlashcard}>Update Flashcard</button>
                <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
              </>
            ) : (
              <button onClick={handleAddFlashcard}>Add Flashcard</button>
            )}
            <button onClick={handleDeleteFlashcard}>Delete Flashcard</button>
            <button onClick={startEditing} disabled={isEditing}>Edit This Flashcard</button>
          </div>
        )}

        <div
          className={`flashCards ${flipped ? 'flipped' : ''} ${slideDir}`}
          onClick={handleFlip}
        >
          <div className="flashCardInner">
            <div className="flashCardFront">
              <p>{fcData[curCIndex]?.front}</p>
            </div>
            <div className="flashCardBack">
              <p>{fcData[curCIndex]?.back}</p>
            </div>
          </div>
        </div>

        <div className="flashCardsControls">
          <button className="prevButton" onClick={handlePrev}>Prev</button>
          <button className="nextButton" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
