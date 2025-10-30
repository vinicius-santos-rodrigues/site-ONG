
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Servir arquivos estáticos (index.html, css, imagens, etc.) a partir da raiz do projeto
app.use(express.static(path.join(__dirname)));

// Rota fallback para index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
