import './NewGameModal.css';
import { capitalizeWord, getCategories } from '../UtiltyFunctions.js';

function NewGameModal({ gameSettings, setMenuSection, setAppSection }) {
    //--Game Settings Data------------
    const {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        totalQuestions: selectedTotalQuestions,

        setCategory: setSelectedCategory,
        setDifficulty: setSelectedDifficulty,
        setTotalQuestions: setSelectedTotalQuestions
    } = gameSettings;

    //--Options Available------------
    const categories = getCategories();
    const difficulties = ["easy", "medium", "hard"];
    const questionQuantities = [5, 10, 15, 20, 25];

    const handleSelectCategory = index => {
        index = parseInt(index);
        setSelectedCategory({
            id: index,
            name: categories[index-9]
        })
    }

    return (
        <div className='modal NewGameModal'>
            <button className='close-button'
                onClick={() => setMenuSection("")}
            >&times;</button>
            <h2 className='newgame-title'>New Game</h2>

            <h4>Category</h4>
            <select className='newgame-category'
                defaultValue={selectedCategory.id}
                onChange={ev => handleSelectCategory(ev.target.value)}
                >
                {categories.map((category, index) =>
                    <option key={index} value={index+9}>
                        {category}
                    </option>
                )}
            </select>

            <h4>Difficulty</h4>
            <div className='newgame-difficulty-options'>
                {difficulties.map((difficulty, index) =>
                    <div className={`difficulty-option 
                        ${difficulty}
                        ${difficulty === selectedDifficulty ? 'checked' : ''}
                    `}
                    key={index}>
                        <label htmlFor={difficulty}>
                            {capitalizeWord(difficulty)}
                        </label>
                        <input type='radio'
                            name='newgame-difficulty'
                            id={difficulty}
                            value={difficulty}
                            defaultChecked={difficulty === selectedDifficulty}
                            onClick={ev => setSelectedDifficulty(ev.target.value)}
                        ></input>
                    </div>
                )}
            </div>

            <h4>Number of Questions</h4>
            <div className='newgame-number-options'>
                {questionQuantities.map((number, index) =>
                    <div className={`number-option
                        ${number === selectedTotalQuestions ? 'checked' : ''}
                    `}
                        key={index}>
                        <label htmlFor={number}>
                            {number}
                        </label>
                        <input type='radio'
                            name='newgame-number'
                            id={number}
                            value={number}
                            defaultChecked={number === selectedTotalQuestions}
                            onClick={ev =>
                                setSelectedTotalQuestions(parseInt(ev.target.value)
                            )}
                        ></input>
                    </div>
                )}
            </div>

            <button className='btn newgame-start'
                onClick={() => setAppSection("game")} //--Game Start!
            >Start Game!</button>
        </div>
    )
}

export default NewGameModal;