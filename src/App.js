import './App.css';
import Game from './components/Game/Game.js';
import Menu from './components/Menu/Menu.js';
import { useState, useEffect } from 'react';

function App() {
  //--Track what App 'section' is currently being displayed
  const [ appSection, setAppSection ] = useState(() => "menu"); // menu, game

  //--Game Setting/Options Data--------------

  const [ category, setCategory ] = useState(() => {
    return {
        id: 9,
        name: "General Knowledge"
    }
  });
  const [ difficulty, setDifficulty ] = useState("easy");
  const [ totalQuestions, setTotalQuestions ] = useState(10);


  //--Current Selected Profile--{Object}------------
  const [ selectedProfile, setSelectedProfile ] = useState({});

  //--Profiles--(stored in localStorage)--[Array of objects]--------------
  const [ profiles, setProfiles ] = useState(() => {
    const profs = localStorage.getItem("profiles");
    if (profs) {
      return JSON.parse(profs);
    } else {
      return []
    }
  });

  //--Load Current Selected Profile on first render
  //--(after getting profiles from Local Storage)
  useEffect(() => {
    if (profiles.length > 0) {
      const selectedProf = localStorage.getItem("selectedProfile");
      setSelectedProfile(JSON.parse(selectedProf));
    }
  }, [profiles.length] )


  return (
    <div className="App">
      {appSection === 'game'
        ? <Game 
          categoryNumber={category.id}
          categoryName={category.name}
          difficulty={difficulty}
          totalQuestions={totalQuestions}
          setAppSection={setAppSection}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          setProfiles={setProfiles}
        />
        : <Menu
          gameSettings={{
            category: category,
            difficulty: difficulty,
            totalQuestions: totalQuestions,

            setCategory: setCategory,
            setDifficulty: setDifficulty,
            setTotalQuestions: setTotalQuestions
          }}
          appSection={appSection}
          setAppSection={setAppSection}

          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          profiles={profiles}
          setProfiles={setProfiles}
        />
      }
    </div>
  );
}

export default App;
