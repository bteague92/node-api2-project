const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(Posts);
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving posts',
            });
        });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the post',
            });
        });
});

server.get('/api/posts/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: 'Posts comments not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the comments',
            });
        });
});

server.post('/api/posts', (req, res) => {
    db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error adding the post',
            });
        });
});

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been removed' });
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error removing the post',
            });
        });
});

server.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error updating the post',
            });
        });
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub
const port = 4002;

server.listen(port, () => {
    console.log(`*** Server Running on http://localhost:${port} ***`);
});