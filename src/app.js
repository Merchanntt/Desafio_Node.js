const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = []

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const projectIndex = repositories.findIndex(project => project.id === id)
    if(projectIndex < 0) {
      return response.status(400).json({error: "Project not Found"})
    }
    const repository = {
      id,
      title,
      url,
      techs,
      likes: 0,
    }

    repositories[projectIndex] = repository

    return response.json(repository)
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const projectIndex = repositories.findIndex( project => project.id === id)
  if(projectIndex < 0){
    return res.status(400).json({error: "Project not Found"})
  }

  repositories.splice(projectIndex, 1)

  return res.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repository = repositories.find((repository) => repository.id === id) 
  if(!repository) {
    return response.status(400).send()
  }

  repository.likes += 1

  return response.json(repository)
 
});

module.exports = app;
