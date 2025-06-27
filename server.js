const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const lead = {
    name: req.body.nombre || req.body.name,
    email: req.body.email,
    message: req.body.mensaje || req.body.message,
    date: new Date().toISOString(),
  };
  const logPath = path.join(__dirname, 'leads.json');
  fs.appendFile(logPath, JSON.stringify(lead) + '\n', err => {
    if (err) console.error('Error saving lead:', err);
  });
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
