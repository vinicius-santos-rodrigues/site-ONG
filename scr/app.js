const { json } = require("express");

function templateHome() {
  return `
    <section aria-labelledby="home-titulo">
      <h1 id="home-titulo">Bem-vindo à ONG</h1>
      <p>Conheça nossos projetos e participe!</p>
    </section>
  `;
}


function templateCadastro() {
  return `
    <section aria-labelledby="cadastro-titulo">
      <h2 id="cadastro-titulo">Cadastro</h2>
      <form id="form-cadastro" aria-label="Formulário de cadastro">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" required />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />

        <button type="submit">Enviar</button>
      </form>
      <div id="feedback" aria-live="polite"></div>
    </section>
  `;
}


function templateProjetos() {
  return `
    <section aria-labelledby="projetos-titulo">
      <h2 id="projetos-titulo">Projetos</h2>
      <p>Veja os cadastros realizados:</p>
      ${listarCadastros()}
    </section>
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
    <ul aria-label="Lista de cadastros realizados">
      ${cadastros.map(c => `<li>${c.nome} - ${c.email}</li>`).join('')}
    </ul>
  `;
}

function alternarTema() {
    document.body.classList.toggle('tema-escuro');
}

navegar('home');
