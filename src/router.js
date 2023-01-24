const { Router } = require('express');
const { v4: uuid } = require('uuid');

const route = Router();

const projects = [];

route.get('/projects', (req, res) => {

    const {
        title
    } = req.query;
    
    try {

        const results = title ?
            projects.filter(project => project.title.includes(title))
            :
            projects;

        return res.status(200).json({
            projects: results
        });

    } catch(e) {

        return res.status(400).json({
            message: 'Erro list projects! :('
        });

    }
});

route.post('/projects', (req, res) => {

    const {
        title,
        owner
    } = req.body;

    try {

        const project = {
            owner,
            title,
            id: uuid()
        }
    
        projects.push(project);
    
        return res.status(201).json({ project });

    } catch(e) {

        return res.status(400).json({ message: 'Not create project! :('});

    }

});


route.put('/projects/:id', (req, res) => {

    const {
        id
    } = req.params;

    const {
        title,
        owner
    } = req.body;

    try {

        const projectIndex = projects.findIndex(project => project.id === id);

        if(projectIndex < 0) {
            throw "Project not found! :("
        }

        const project = {
            id,
            title,
            owner
        }

        projects[projectIndex] = project;

        return res.status(200).json({ project });

    } catch(e) {

        return res.status(400).json({ message: 'Project not found! :('});

    }

});

route.delete('/projects/:id', (req, res) => {

    const {
        id
    } = req.params;

    try {

        const projectIndex = projects.findIndex(project => project.id === id);

        if(projectIndex < 0) {
            throw "Project not found! :("
        }

        projects.splice(projectIndex, 1);

        return res.status(204).json({});

    } catch(e) {

        return res.status(400).json({ message: 'Project not found! :('});

    }

});


module.exports = route;