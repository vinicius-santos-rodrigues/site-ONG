const { json } = require("express");

function templateHome() {
    return '<h1>Bem-vindo à ONG</h1><p>Conheça nossos projetos e participaçipe!</p>';
}

function templateCadastro() {
    return `
    <h2>Cadastro</h2>
    <form id="form-cadastro">
        <input type="text" name="nome" placeholder="Nome" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Enviar</button>
    </form>
    <div id="feedback"></div>
    `;
}

function templateProjetos() {
    return `
    <h2>Projetos</h2>
    <p>Veja os cadastros realizados:</p>
    ${listarCadastros()}
    `;
}

function navegar(pagina) {
    const app = document.getElementById('app');
    switch (pagina) {
        case 'home':
            app.innerHTML = templateHome();
            break;
        case 'cadastro':
            app.innerHTML = templateCadastro();
            break;
        case 'projetos':
            app.innerHTML = templateProjetos();
            break;
    }
}

doxument.addEventListener('submit' , function(e) {
    if (e.target.id === 'form-cadastro') {
        e.preventDefault();
        
        const nome = e.target.nome.value.trim();
        const email = e.target.email.value.trim();
        const feedback = document.getElementById('feedback');

        if (nome === '' || !email.includes('@')) {
            feedback.innerHTML = '<p class="error">Preencha os dados corretamente.</p>';
        } else {
            const cadastro = { nome, email };
            let cadastros = json.parse(localStorage.getItem('cadastros')) || [];
            cadastros.push(cadastro);
            localStorage.setItem('cadastros', JSON.stringify(cadastro));

            feedback.innerHTML = '<p class="success">Cadastro salvo com sucesso!</p>';
            e.target.reset();
        }

    }
});

function listarCadastros() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    return `
    <ul>
        ${cadastros.map(c => `<li>${c.nome} - ${c.email}</li>`).join('')}
        </ul>
        `;
}

navegar('home');
