import logo from '../../trivia-logo.png';
import './Menu.css';
import NewGameModal from './NewGameModal.js';
import NewProfileModal from './NewProfileModal.js';
import ProfilesModal from './ProfilesModal.js';
import Records from './Records.js';
import { useState, useEffect } from 'react';

function Menu(props) {
    const {
        gameSettings,
        appSection,
        setAppSection,
        selectedProfile,
        setSelectedProfile,
        profiles,
        setProfiles
    } = props;

    //--Tracks what submenu modal is being displayed
    const [ menuSection, setMenuSection ] = useState(""); // newgame, profiles, records, newprofile

    //--If App sections changes. close all sub menues
    useEffect(() => {
        setMenuSection("");
    }, [appSection]);

    const handleNewGame = () => {
        if (selectedProfile.name) {
            setMenuSection('newgame');
        } else {
            setMenuSection("newprofile");
        }
    }
    
    return (
        <div className='Menu'>
            <header className='menu-title'>
                <img className='trivia-logo'
                    src={logo} alt='Trivia Game Logo'
                ></img>
                <h1 className='trivia-title'>Trivia Game</h1>
                
                {selectedProfile.name
                    ? <div className='profile'>
                        <h5>{selectedProfile.name}</h5>
                        <h5>{selectedProfile.points} pts</h5>
                    </div>
                    : <div>
                        <h5>No profiles detected</h5>
                    </div>
                }
            </header>
            <main className='menu-buttons'>
                <button className='btn menu-newgame'
                    onClick={handleNewGame}
                >New Game</button>

                <button className='btn menu-profiles'
                    onClick={() => setMenuSection("profiles")}
                >Profiles</button>

                <button className='btn menu-records'
                    onClick={() => setMenuSection("records")}
                >Records</button>
            </main>
            <footer>
                <p>By HK25 - 2022</p>
            </footer>

            {menuSection === "newgame"
                ? <NewGameModal
                    gameSettings={gameSettings}
                    setMenuSection={setMenuSection}
                    setAppSection={setAppSection}
                    selectedProfile={selectedProfile}
                />
                : null
            }

            {menuSection === "newprofile"
                ? <NewProfileModal
                    setMenuSection={setMenuSection}
                    setSelectedProfile={setSelectedProfile}
                    profiles={profiles}
                    setProfiles={setProfiles}
                />
                : null
            }

            {menuSection === "profiles"
                ? <ProfilesModal
                    setMenuSection={setMenuSection}
                    selectedProfile={selectedProfile}
                    setSelectedProfile={setSelectedProfile}
                    profiles={profiles}
                    setProfiles={setProfiles}
                />
                : null
            }

            {menuSection === "records"
                ? <Records
                    setMenuSection={setMenuSection}
                    profiles={profiles}
                />
                : null
            }
        </div>
    )
}

export default Menu;