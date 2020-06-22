const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Métodos HTTP:
 *
 * GET: Buscar informações do back-end;
 * POST: Criar uma informação no back-end;
 * PUT/PATCH: Alterar uma informação no back-end;
 * DELETE: Deletar uma informação no back-end;
 */

/**
 * Tipos de parâmetros:
 *
 * Query params: Filtros e paginação;
 * Route Params: Identificar recursos (Atualizar/Deletar);
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON);
 */

/**
 * Middleware:
 *
 * Interceptador de requisições que pode interromper totalmente a requisição e
 * Alterar os dados da requisição
 */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); // Ir para o proximo middleware
}

app.use(logRequests);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }

  const newProject = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = newProject;

  return response.json(newProject);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚨 Back-end started!');
});
