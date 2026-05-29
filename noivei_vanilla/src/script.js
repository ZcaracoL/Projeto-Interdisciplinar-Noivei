// Variável falsa para testar estado de autenticação
const usuarioLogado = false; // mude para true para simular usuário logado
const usuarioTipo = null; // use 'fornecedor' ou 'cliente' quando estiver logado

document.addEventListener('DOMContentLoaded', () => {
	setupSearch();
	setupPerfil();
	setupCadastroForm();
	checkPerfilAccess();
});

// Também inicializa quando o header é injetado dinamicamente
document.addEventListener('header:ready', () => {
	setupSearch();
	setupPerfil();
	setupCadastroForm();
	checkPerfilAccess();
});

function checkPerfilAccess(){
	const path = window.location.pathname.toLowerCase();
	if(path.includes('perfil.html')){
		if(!usuarioLogado || usuarioTipo !== 'fornecedor'){
			window.location.href = 'cadastro.html';
		}
	}
}

function abrirMenu(){
	const menu = document.querySelector('.menu-desktop');
	if(menu) menu.classList.toggle('ativo');
}

function setupSearch(){
	const forms = document.querySelectorAll('.search form');
	forms.forEach(f => {
		f.addEventListener('submit', (e) => {
			e.preventDefault();
			const input = f.querySelector('input[type="text"]');
			if(!input) return;
			console.log('Pesquisa:', input.value.trim());
			input.value = '';
		});
	});
}

function setupPerfil(){
	const perfis = document.querySelectorAll('.perfil');
	perfis.forEach(p => {
		p.innerHTML = '';
		if(usuarioLogado && usuarioTipo === 'fornecedor'){
			const a = document.createElement('a');
			a.href = 'perfil.html';
			const img = document.createElement('div');
			img.style.width = '36px';
			img.style.height = '36px';
			img.style.borderRadius = '50%';
			img.style.background = '#bbb';
			img.style.display = 'inline-block';
			img.style.verticalAlign = 'middle';
			a.appendChild(img);
			p.appendChild(a);
		} else if(usuarioLogado){
			const a = document.createElement('a');
			a.href = 'lojas.html';
			a.textContent = 'Lojas';
			p.appendChild(a);
		} else {
			const entrar = document.createElement('a');
			entrar.href = 'cadastro.html';
			entrar.textContent = 'Entrar';
			entrar.style.marginRight = '10px';
			const cadastrar = document.createElement('a');
			cadastrar.href = 'cadastro.html';
			cadastrar.textContent = 'Cadastrar';
			p.appendChild(entrar);
			p.appendChild(cadastrar);
		}
	});
}

function setupCadastroForm(){
	const form = document.getElementById('registerForm');
	if(!form) return;

	const radios = form.querySelectorAll('input[name="userType"]');
	const fornecedorFields = document.getElementById('fornecedorFields');

	function updateFornecedorFields(){
		const tipo = form.querySelector('input[name="userType"]:checked').value;
		if(tipo === 'fornecedor') fornecedorFields.style.display = 'block';
		else fornecedorFields.style.display = 'none';
	}

	radios.forEach(r => r.addEventListener('change', updateFornecedorFields));
	updateFornecedorFields();

	const btn = document.getElementById('btnRegister');
	if(btn){
		btn.addEventListener('click', () => {
			const data = {
				tipo: form.querySelector('input[name="userType"]:checked').value,
				nome: document.getElementById('nome')?.value || '',
				email: document.getElementById('email')?.value || '',
				telefone: document.getElementById('telefone')?.value || '',
				tipoServico: document.getElementById('tipoServico')?.value || '',
				portfolio: document.getElementById('portfolio')?.value || ''
			};
			console.log('Dados de cadastro (simulado):', data);
			alert('Dados coletados no console. (Simulação)');
		});
	}
}
