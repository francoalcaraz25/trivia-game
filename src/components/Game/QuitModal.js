import './QuitModal.css';

function QuitModal({ setQuitting, setAppSection }) {

    return (
        <div className='modal QuitModal'>
            <h2>Giving Up?</h2>
            <h4>Are you sure you want to quit the game?</h4>
            <div className='modal-buttons'>
                <button className='btn yes'
                    onClick={() => setAppSection("menu")}
                >Yes
                </button>
                <button className='btn no'
                    onClick={() => setQuitting(false)}
                >No</button>
            </div>
        </div>
    )
}

export default QuitModal;