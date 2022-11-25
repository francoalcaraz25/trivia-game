import './App.css';
import Game from './components/Game/Game.js';
import Menu from './components/Menu/Menu.js';
import { useState } from 'react';

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

  /****ADD PROFILE SYSTEM HERE. CURRENT PROFILE AND A LIST OF PROFILES (LOCAL STORAGE)******/

  return (
    <div className="App">
      {appSection === 'game'
        ? <Game 
          categoryNumber={category.id}
          categoryName={category.name}
          difficulty={difficulty}
          totalQuestions={totalQuestions}
          setAppSection={setAppSection}
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
        />
      }
    </div>
  );
}

export default App;
