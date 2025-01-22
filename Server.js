const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to check for header display
app.use((req, res, next) => {
    res.locals.showHeader = true; // Assume you want to show the header on all pages
    next();
});

// Character Index dynamic rendering
app.get('/character-index', function (req, res) {
    const ciPath = path.join(__dirname, 'views', 'CI');
    const ouiPath = path.join(__dirname, 'views', 'OUI'); // Add OUI path

    fs.readdir(ciPath, function (err, ciFiles) {
        if (err) {
            console.log('Error reading CI directory.');
            res.status(500).send('Failed to load character index');
        } else {
            fs.readdir(ouiPath, function (err, ouiFiles) { // Read OUI folder
                if (err) {
                    console.log('Error reading OUI directory.');
                    res.status(500).send('Failed to load out-of-universe characters');
                } else {
                    // Process filenames
                    const characters = ciFiles.map(file => file.replace('.ejs', ''));
                    const outOfUniverseCharacters = ouiFiles.map(file => file.replace('.ejs', ''));

                    // Pass both lists to EJS
                    res.render('Character-Index', {
                        characters: characters,
                        outOfUniverseCharacters: outOfUniverseCharacters,
                        title: 'Character Index | Endless Moonverse'
                    });
                }
            });
        }
    });
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login', { error: null }); // Initially, error is null
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid username or password' }); // Pass error
    }
});

// Felix page route
app.get('/CI/Felix', (req, res) => {
    res.render('CI/Felix', {
        title: 'Felix Asteroid | Endless Moonverse',
        showHeader: true,
        showGifOverlay: false, // or true, if you want it toggled initially
    });
});

// Dynamic routing for other pages
app.get('/:page', (req, res) => {
    const page = req.params.page;

    // Check if the EJS file exists
    const filePath = path.join(__dirname, 'views', `${page}.ejs`);
    if (fs.existsSync(filePath)) {
        res.render(page, { title: `${page.charAt(0).toUpperCase() + page.slice(1)} | Endless Moonverse` });
    } else {
        res.status(404).send('Page not found');
    }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
