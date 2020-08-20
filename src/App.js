import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const  [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Novo repo',
      url: 'myurl.com',
      techs: 'ReactNative',
      likes: 0
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const repoIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repoIndex, 1)
    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map( project => {
            return (
                <div key={project.id}>
                  <li>{project.title}</li>
                  <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
                </div>
              )
          })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
