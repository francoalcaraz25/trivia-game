import './Records.css'
import { useState } from 'react';

function Records(props) {
    const {
        setMenuSection,
        profiles
    } = props;

    const [ orderedProfiles, setOrderedProfiles ] = useState([...profiles]);
    const [ orderBy, setOrderBy ] = useState("");

    /// ADD ORDER PROFILES CODE
    const orderProfiles = criteria => {
        if (orderBy === criteria) {
            setOrderBy("");
            setOrderedProfiles([...profiles]); //--Default original order
        } else {
            setOrderBy(criteria);

            //--Ordering--
            setOrderedProfiles(prevProfs => {
                let orderedProfs;
                if (criteria === "name") { //--Ordering by Profiles Names
                    orderedProfs = prevProfs.sort((a, b) => {
                        a = a.name.toLowerCase();
                        b = b.name.toLowerCase();
                        if (a < b) return -1;
                        if (a > b) return 1
                        return 0;
                    });
                } else { //--Ordering by number values
                    orderedProfs = prevProfs.sort((a, b) => b[criteria] - a[criteria]);
                }
                return [...orderedProfs];
            });
        }
    }

    return (
        <div className='modal Records'>
            <button className='close-button'
                onClick={() => setMenuSection("")}
            >&times;</button>

            <h2 className='records-title'>Records</h2>

            <p className='records-tip'>Click on column title to order profiles by that criteria.</p>

            <table className='records-table'>
                <thead>
                    <tr>
                        <th className={orderBy === "name" ? "order-by" : ""}
                            onClick={() => orderProfiles("name")}
                        >Profile</th>
                        <th className={orderBy === "points" ? "order-by" : ""}
                            onClick={() => orderProfiles("points")}
                        >Points</th>
                        <th className={orderBy === "perfects" ? "order-by" : ""}
                            onClick={() => orderProfiles("perfects")}
                        >Perfects</th>
                        <th className={orderBy === "corrects" ? "order-by" : ""}
                            onClick={() => orderProfiles("corrects")}
                        >Corrects</th>
                        <th className={orderBy === "wrongs" ? "order-by" : ""}
                            onClick={() => orderProfiles("wrongs")}
                        >Wrongs</th>
                        <th className={orderBy === "gamesPlayed" ? "order-by" : ""}
                            onClick={() => orderProfiles("gamesPlayed")}
                        >Games Played</th>
                    </tr>
                </thead>
                
                <tbody>
                    {orderedProfiles.map((prof, index) =>
                        <tr key={index}>
                            <td className={orderBy === "name" ? "order-by" : ""}
                            >{prof.name}</td>
                            <td className={orderBy === "points" ? "order-by" : ""}
                            >{prof.points}</td>
                            <td className={orderBy === "perfects" ? "order-by" : ""}
                            >{prof.perfects}</td>
                            <td className={orderBy === "corrects" ? "order-by" : ""}
                            >{prof.corrects}</td>
                            <td className={orderBy === "wrongs" ? "order-by" : ""}
                            >{prof.wrongs}</td>
                            <td className={orderBy === "gamesPlayed" ? "order-by" : ""}
                            >{prof.gamesPlayed}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Records;