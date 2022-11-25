import logo from '../../trivia-logo.png';
import './Menu.css';
import NewGameModal from './NewGameModal';
import { useState, useEffect } from 'react';

function Menu({ gameSettings, appSection, setAppSection }) {

    //--Tracks what submenu modal is being displayed
    const [ menuSection, setMenuSection ] = useState(""); // newgame, options, stats

    //--If App sections changes. close all sub menues
    useEffect(() => {
        setMenuSection("");
    }, [appSection]);

    
    return (
        <div className='Menu'>
            <header className='menu-title'>
                <img className='trivia-logo'
                    src={logo} alt='Trivia Game Logo'
                ></img>
                <h1 className='trivia-title'>Trivia Game</h1>
            </header>
            <main className='menu-buttons'>
                <button className='btn menu-newgame'
                    onClick={ev => setMenuSection('newgame')}
                >New Game</button>
                <button className='btn menu-options'>Options</button>
                <button className='btn menu-stats'>Statistics</button>
            </main>
            <footer>
                <p>By HK25 - 2022</p>
            </footer>

            {menuSection === "newgame"
                ? <NewGameModal
                    gameSettings={gameSettings}
                    setMenuSection={setMenuSection}
                    setAppSection={setAppSection}
                />
            : null}
        </div>
    )
}

export default Menu;