import "./NewProfileModal.css";
import { useState, useRef } from 'react';

function NewProfileModal(props) {
    const {
        setMenuSection, //--Is recieved when called from New Game with no Profiles
        setNewProfileModal, //--Is recieved when called from Profiles Menu
        setSelectedProfile,
        profiles,
        setProfiles
    } = props;

    //--State used for when showing Confirm Modal
    const [ confirmModal, setConfirmModal ] = useState(false);
    //--Confirm  Modal message----
    const [ confirmMessage, setConfirmMessage ] = useState("...")

    //--Profile Name input
    const [profileName, setProfileName ] = useState("");
    //--Flag checking if profile submitted is valid/available
    const valid = useRef(false);

    //--Create Profile button handler
    const handleCreateProfile = () => {
        if (profileName === "") {
            valid.current = false;
            setConfirmMessage("Please enter a name for your Profile.")
            setConfirmModal(true);
            return;
        }

        //--Checking if profile already exists
        if (profiles.length > 0
        && profiles.find(prof => prof.name === profileName)) {
            valid.current = false;
            setConfirmMessage("Profile name already exists.")
        } else { //--About to create new profile
            valid.current = true;
            setConfirmMessage("Are you sure you want this Profile name?")
        }

        setConfirmModal(true);
    }

    //--confirm Creation of New Profile---------
    const confirmNewProfile = () => {
        const newProfile = {
            name: profileName,
            points: 0,
            corrects: 0,
            wrongs: 0,
            perfects: 0,
            gamesPlayed: 0
        }

        //--Update Selected Profile
        setSelectedProfile(() => {
            localStorage.setItem("selectedProfile", JSON.stringify(newProfile));
            return {...newProfile};
        });
        //--Update Profiles
        setProfiles(prevProfs => {
            localStorage.setItem("profiles", JSON.stringify([...prevProfs, newProfile]));
            return [...prevProfs, newProfile];
        });

        //--Close Confirm Modal
        setConfirmModal(false);

        //--Open New Game Modal or Go back To Profiles Menu
        if (setNewProfileModal) {
            setNewProfileModal(false);
        } else {
            setMenuSection("newgame");
        }
    }

    const handleCLoseNewProfileModal = () => {
        if (setNewProfileModal) {
            setNewProfileModal(false);
        } else {
            setMenuSection("");
        }
    }

    return (
        <div className="modal NewProfileModal">
            <button className='close-button'
                onClick={handleCLoseNewProfileModal}
            >&times;</button>
            <h2>NEW PROFILE</h2>

            <label htmlFor="newprofile">Name</label>
            <input className="newname"
                id="newprofile"
                value={profileName}
                onChange={ev => setProfileName(ev.target.value)}
            ></input>

            <button className="btn create-profile"
                onClick={handleCreateProfile}
            >Create</button>

            {confirmModal
                ? <div className="modal confirm-modal">
                    <button className='close-button'
                        onClick={() => setConfirmModal(false)}
                    >&times;</button>
                    <h4>{confirmMessage}</h4>
                    {valid.current
                        ? <button className="btn confirm"
                            onClick={confirmNewProfile}
                        >OK</button>
                        : null
                    }
                </div>
                : null
            }
        </div>
    )
}

export default NewProfileModal;