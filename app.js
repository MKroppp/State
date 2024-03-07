const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const port = 5500;

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

// Создание схемы пользователя
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const app = express();

// Парсинг данных в формате application/json
app.use(bodyParser.json());

// Парсинг данных в формате application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Создание модели пользователя
const User = mongoose.model('User', userSchema);

// Middleware для обработки тела запроса в формате JSON
app.use(express.json());

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        if (!password) {
            return res.status(400).send("Password is required");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login.html');
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
    }
});

app.post('/login', async (req, res) => {
    // Получение данных из запроса
    const { username, password } = req.body;

    try {
        // Найти пользователя в базе данных по имени пользователя
        const user = await User.findOne({ username });

        // Проверить, найден ли пользователь и совпадает ли пароль
        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect('/profile.html'); // Перенаправление на index.html при успешном входе
        } else {
            res.status(401).send('Invalid username or password'); // Отправка ошибки авторизации
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error'); // Отправка сообщения об ошибке сервера
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});