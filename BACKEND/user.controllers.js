const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const users = [
    { id: 1, username: 'user1', password: 'pass1', role: 'admin' },
    { id: 2, username: 'user2', password: 'pass2', role: 'user' }
];

const utilisateurController = {
    login: (req, res) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            const userData = { id: user.id, username: user.username, role: user.role };
            const token = jwt.sign({ user: userData }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Credentials are incorrect');
        }
    },
    register: (req, res) => {
        const { username, password } = req.body;
        if (username && password) {
            res.status(201).json({ message: "User registered successfully", username });
        } else {
            res.status(400).send("Required fields are missing");
        }
    },
    disconnect: (req, res) => {
        res.json({ message: "User disconnected successfully" });
    },
    updateProfil: (req, res) => {
        const { username, newPassword } = req.body;
        if (username && newPassword) {
            res.json({ message: "Profile updated successfully", username });
        } else {
            res.status(400).send("Required information is missing");
        }
    },
    fetchData: (req, res) => {
        try {
            const data = fetchData();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    protectedRoute: (req, res) => {
        res.json({ message: "Success", yourSessionData: req.user });
    }
};

module.exports = utilisateurController;