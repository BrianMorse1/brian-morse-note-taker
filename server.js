const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const noteArr = require('./db/db.json')
const path = require('path');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// get route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

 //catch-all route
 app.get('*', (req, res) => {
     res.sendFile(__dirname + '/public/index.html');
 });

//route for post requests to /api/notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(req.body);
    noteArr.push(newNote);
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteArr), (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'Note successfully saved.' })
        };
})});

// app.delete('/')




app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
});





