describe('Fluxo de Login', () => {
  beforeEach(() => {
    // Limpa cookies e localStorage antes de cada teste
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Visita a página inicial
    cy.visit('http://localhost:3000');
  });

  it('deve exibir o formulário de login na página inicial', () => {
    cy.contains('h1', 'Bem-vindo ao ÁlissonPixFácil').should('be.visible');
    cy.contains('p', 'Por favor, faça o login para continuar.').should('be.visible');
    cy.get('form').should('exist');
  });

  it('deve validar campos obrigatórios', () => {
    // Tenta submeter sem preencher
    cy.get('button[type="submit"]').click();
    
    // Verifica validação HTML5 (required)
    cy.get('input#cpf_cnpj:invalid').should('exist');
    cy.get('input#senha:invalid').should('exist');
  });

  it('deve mostrar erro com credenciais inválidas', () => {
    // Preenche com credenciais inválidas
    cy.get('input#cpf_cnpj').type('00000000000');
    cy.get('input#senha').type('senhaerrada');
    
    // Submete o formulário
    cy.get('button[type="submit"]').click();
    
    // Verifica mensagem de erro
    cy.contains('Credenciais inválidas', { timeout: 5000 }).should('be.visible');
  });

  it('deve realizar login com sucesso e redirecionar para dashboard', () => {
    // Intercepta a requisição de login
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token-for-testing',
      },
    }).as('loginRequest');

    // Preenche credenciais válidas (mocked)
    cy.get('input#cpf_cnpj').type('12345678900');
    cy.get('input#senha').type('senha123');
    
    // Submete o formulário
    cy.get('button[type="submit"]').click();
    
    // Aguarda a requisição
    cy.wait('@loginRequest');
    
    // Verifica redirecionamento para dashboard
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    
    // Verifica que o token foi salvo
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken');
      expect(token).to.equal('fake-jwt-token-for-testing');
    });
  });

  it('deve navegar para a página de registro', () => {
    // Clica no link de cadastro
    cy.contains('a', 'Não tem uma conta? Cadastre-se').click();
    
    // Verifica redirecionamento
    cy.url().should('include', '/register');
    cy.contains('h2', 'Criar conta').should('be.visible');
  });
});

describe('Fluxo de Registro', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:3000/register');
  });

  it('deve exibir o formulário de registro', () => {
    cy.contains('h2', 'Criar conta').should('be.visible');
    cy.get('input#nome').should('exist');
    cy.get('input#cpf_cnpj').should('exist');
    cy.get('input#numero_conta').should('exist');
    cy.get('input#senha').should('exist');
  });

  it('deve validar todos os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('input#nome:invalid').should('exist');
    cy.get('input#cpf_cnpj:invalid').should('exist');
    cy.get('input#numero_conta:invalid').should('exist');
    cy.get('input#senha:invalid').should('exist');
  });

  it('deve cadastrar usuário com sucesso', () => {
    // Intercepta a requisição de cadastro
    cy.intercept('POST', '**/usuarios', {
      statusCode: 201,
      body: {
        id: 1,
        nome: 'Teste Usuario',
        cpf_cnpj: '12345678900',
      },
    }).as('registerRequest');

    // Preenche o formulário
    cy.get('input#nome').type('Teste Usuario');
    cy.get('input#cpf_cnpj').type('12345678900');
    cy.get('input#numero_conta').type('123456');
    cy.get('input#senha').type('senha123');
    
    // Submete
    cy.get('button[type="submit"]').click();
    
    // Aguarda requisição
    cy.wait('@registerRequest');
    
    // Verifica mensagem de sucesso
    cy.contains('Cadastro realizado com sucesso', { timeout: 5000 }).should('be.visible');
    
    // Verifica redirecionamento para login após 2 segundos
    cy.url({ timeout: 3000 }).should('eq', 'http://localhost:3000/');
  });
});

describe('Navegação Protegida', () => {
  it('deve redirecionar para login ao acessar dashboard sem autenticação', () => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:3000/dashboard');
    
    // Deve redirecionar para a página inicial
    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:3000/');
  });

  it('deve permitir acesso ao dashboard com token válido', () => {
    // Define um token falso no localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'fake-jwt-token');
    });

    // Intercepta a requisição do usuário
    cy.intercept('GET', '**/auth/me', {
      statusCode: 200,
      body: {
        id: 1,
        nome: 'Usuário Teste',
        cpf_cnpj: '12345678900',
      },
    }).as('getMeRequest');

    // Visita dashboard
    cy.visit('http://localhost:3000/dashboard');
    
    // Verifica que permanece no dashboard
    cy.url().should('include', '/dashboard');
    
    // Aguarda carregamento
    cy.wait('@getMeRequest');
    
    // Verifica conteúdo
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Seja bem-vindo, Usuário Teste').should('be.visible');
  });
});