const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Sert tes fichiers HTML/CSS depuis le dossier public

const DATA_FILE = './settings.json';

// Route pour récupérer les infos
app.get('/api/settings', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Erreur de lecture");
        res.json(JSON.parse(data));
    });
});

// Route pour sauvegarder les infos
app.post('/api/settings', (req, res) => {
    const newSettings = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(newSettings, null, 2), (err) => {
        if (err) return res.status(500).send("Erreur d'écriture");
        res.json({ message: "Succès !" });
    });
});

// Port dynamique pour l'hébergement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur prêt sur le port ${PORT}`);
});
