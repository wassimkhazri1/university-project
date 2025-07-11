import { useEffect, useState } from 'react';
import { getStudentAbsences } from '../services/api';

export default function AbsenceList({ studentId }) {
    const [absences, setAbsences] = useState([]);

    useEffect(() => {
        const fetchAbsences = async () => {
            const data = await getStudentAbsences(studentId);
            setAbsences(data);
        };
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
        fetchAbsences();
    }, [studentId]);

    return (
        <div>
            <h3>Liste des absences</h3>
            <ul>
                {absences.map((absence) => (
                    <li key={absence.id}>
                        {absence.date} - {absence.reason} 
                        ({absence.justified ? 'Justifiée' : 'Non justifiée'})
                    </li>
                ))}
            </ul>
        </div>
    );
}

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/