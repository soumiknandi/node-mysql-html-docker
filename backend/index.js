const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


const connect = () => {
    if (db && db.state !== 'authenticated') {
        db.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL database: ' + err.stack);
                return;
            }
            console.log('Connected to MySQL database as id ' + db.threadId);
        });
    }
}
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors("*"));

// Create a new user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            console.error('Error creating user: ' + err.stack);
            res.status(500).json({ msg: 'Error creating user' });
        } else {
            res.status(201).json({ msg: 'User created successfully' });
        }
    });
});

// Get all users
app.get('/users', (req, res) => {
    connect();

    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users: ' + err.stack);
            res.status(500).json({ msg: 'Error fetching users' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update a user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, result) => {
        if (err) {
            console.error('Error updating user: ' + err.stack);
            res.status(500).json({ msg: 'Error updating user' });
        } else {
            res.status(200).json({ msg: 'User updated successfully' });
        }
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user: ' + err.stack);
            res.status(500).json({ msg: 'Error deleting user' });
        } else {
            res.status(200).json({ msg: 'User deleted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
