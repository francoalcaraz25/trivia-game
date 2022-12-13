import "./ProfilesModal.css";
import NewProfileModal from "./NewProfileModal.js";
import { useState } from 'react'

function ProfilesModal(props) {
    const {
        setMenuSection,
        selectedProfile,
        setSelectedProfile,
        profiles,
        setProfiles
    } = props;

    //--Flag state for when to show NewProfileModal
    const [ newProfileModal, setNewProfileModal ] = useState(false);
    //--Flag state for when to show Delete Confirmation Modal
    const [ deleteConfirmModal, setDeleteConfirmModal ] = useState(false);

    //--Changes Selected Profile based on unique profile name
    const selectProfile = profName => {
        const selectedProf = profiles.find(prof => {
            return prof.name === profName;
        });
        if (selectedProf) {
            setSelectedProfile(() => {
                localStorage.setItem("selectedProfile", JSON.stringify(selectedProf));
                return selectedProf;
            });
        }
    }

    //--Deletes Current Selected Profile
    const deleteSelectedProfile = () => {
        //--Deleting from profiles
        setProfiles(prevProfs => {
            const newProfs = prevProfs.filter(prof => prof.name !== selectedProfile.name);

            //--Auto select first profile
            let newSelectedProf = {};
            if (newProfs.length > 0) {
                newSelectedProf = newProfs[0];
            }

            //--Updating State and Local Stoarge
            setSelectedProfile(() => {
                localStorage.setItem("selectedProfile", JSON.stringify(newSelectedProf));
                return newSelectedProf;
            });

            localStorage.setItem("profiles", JSON.stringify(newProfs));
            return [...newProfs];
        });

        //--Close Delete Confirm Modal
        setDeleteConfirmModal(false);
    }

    return (
        <div className="modal ProfilesModal">
            <button className='close-button'
                onClick={() => setMenuSection("")}
            >&times;</button>

            <h2 className='profiles-title'>Profiles</h2>

            <div className="profiles-crud">
                <h4>Select Profile</h4>

                <button className="btn profile-new"
                    onClick={() => setNewProfileModal(true)}
                >New</button>

                <select className='selector profile-selector'
                    //defaultValue={selectedProfile.name}
                    value={selectedProfile.name}
                    onChange={ev => selectProfile(ev.target.value)}
                    >
                    {profiles.map((prof, index) =>
                        <option key={index} value={prof.name}>
                            {prof.name}
                        </option>
                    )}
                </select>

                <button className="btn profile-delete"
                    onClick={() => setDeleteConfirmModal(true)}
                >Delete</button>

            </div>

            <h4>Stats</h4>
            <div className="profiles-info">
                <h5>Points</h5>
                <p>{selectedProfile.points} pts</p>
                <h5>Games Played</h5>
                <p>{selectedProfile.gamesPlayed}</p>
                <h5>Correct Answers</h5>
                <p>{selectedProfile.corrects}</p>
                <h5>Wrong Answers</h5>
                <p>{selectedProfile.wrongs}</p>
                <h5>Perfect Games</h5>
                <p>{selectedProfile.perfects}</p>
            </div>

            {newProfileModal
                ? <NewProfileModal
                    setNewProfileModal={setNewProfileModal}
                    setSelectedProfile={setSelectedProfile}
                    profiles={profiles}
                    setProfiles={setProfiles}
                />
                : null
            }

            {deleteConfirmModal
                ? <div className='modal delete-modal'>
                    <h2>Delete Profile</h2>
                    <h4>Are you sure you want to DELETE this Profile?</h4>
                    <div className='modal-buttons'>
                        <button className='btn yes'
                            onClick={deleteSelectedProfile}
                        >Yes
                        </button>
                        <button className='btn no'
                            onClick={() => setDeleteConfirmModal(false)}
                        >No</button>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default ProfilesModal;