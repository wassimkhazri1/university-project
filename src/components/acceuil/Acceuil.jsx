import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const API = "http://localhost:8080";

const Acceuil = () => {
   const [ /*user,*/setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch(API + '/api/etudiants');
                const usersData = await usersResponse.json();
                setUser(usersData);
                console.log("listUser", { usersData });
            } catch (error) {
                setError('');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setUser]);
    return (
        <div >    
            <table className="table" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
{/* 
CreatedAndDevelopedByWassimKhazri
https://www.linkedin.com/in/wassim-khazri-ab923a14b/
*/}
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
            {/* Contenu de la page */}
            <Container className="mt-4">
                {loading && <p>Chargement...</p>}
                {error && <p className="text-danger">{error}</p>}
            </Container>
        </div>
    );
};

export default Acceuil;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/