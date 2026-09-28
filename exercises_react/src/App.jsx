import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import EditPage from './pages/EditPage'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <>
      <header>
        <h1>The Exercise App!</h1>
        <p>Track your exercises by creating a exercise in the table below</p>
      </header>
      <div className="app">
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
              <Route path="/create" element={ <CreatePage />}></Route>
              <Route path="/edit" element={ <EditPage exerciseToEdit={exerciseToEdit}/>}></Route>
            </Routes>
          </Router>
      </div>

      <footer>
        <p>&copy; 2026 Owen Badzinski</p>
      </footer>


    </>
  );
}

export default App
