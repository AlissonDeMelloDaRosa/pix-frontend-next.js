Sistema PIX - Frontend
Sistema de gerenciamento de transações PIX desenvolvido com Next.js, TypeScript e validação com Zod.
👥 Integrantes do Projeto

Álisson De Mello Da Rosa - Matrícula: 204716

📋 Descrição
Aplicação web frontend para gerenciamento de:

Autenticação de usuários (Login/Registro)
Cadastro e gerenciamento de chaves PIX
Realização de transações PIX
Listagem de transações com paginação

🚀 Tecnologias Utilizadas

Next.js 15.5.4 - Framework React
React 19.1.0 - Biblioteca para interfaces
TypeScript - Tipagem estática
Zod - Validação de formulários
Axios - Cliente HTTP
Cypress - Testes E2E
JWT - Autenticação

📦 Pré-requisitos

Node.js 18.18.0 ou superior
npm ou yarn
Backend da API rodando em http://localhost:7500

⚙️ Configuração e Instalação
1. Clone o repositório
git clone https://github.com/AlissonDeMelloDaRosa/pix-frontend-next.js.git
cd pix-frontend-next.js
2. Instale as dependências
npm install
3. Instale o Zod (validação de formulários)
npm install zod
4. Instale o Cypress (testes E2E)
npm install --save-dev cypress
5. Configure as variáveis de ambiente
Crie um arquivo .env.local na raiz do projeto:
envNEXT_PUBLIC_API_URL=http://localhost:7500/v1
🎮 Como Executar
Modo Desenvolvimento
npm run dev
A aplicação estará disponível em: http://localhost:3000
Build de Produção
npm run build
npm run start
🧪 Testes
Executar Testes E2E (Cypress)
Interface Gráfica
npx cypress open
Modo Headless (CI/CD)
npx cypress run
Testes Implementados

Fluxo de Login

Validação de campos obrigatórios
Erro com credenciais inválidas
Login bem-sucedido e redirecionamento


Fluxo de Registro

Validação de formulário
Cadastro bem-sucedido


Navegação Protegida

Redirecionamento sem autenticação
Acesso autorizado com token



📁 Estrutura do Projeto
src/
├── app/
│   ├── (main)/                    # Rotas protegidas
│   │   ├── dashboard/             # Dashboard do usuário
│   │   ├── chaves-pix/            # Gerenciamento de chaves PIX
│   │   │   ├── page.tsx           # Listagem
│   │   │   └── cadastrar/         # Cadastro de nova chave
│   │   └── transacoes/            # Transações PIX
│   │       ├── page.tsx           # Listagem com paginação ✅
│   │       └── nova/              # Nova transação
│   ├── register/                  # Página de registro
│   ├── api/lib/                   # Configuração Axios
│   ├── globals.css                # Estilos globais
│   └── layout.tsx                 # Layout raiz
├── components/
│   ├── LoginForm.tsx              # Formulário de login
│   ├── RegistrationForm.tsx       # Formulário de registro
│   ├── Pagination.tsx             # Componente de paginação
│   └── Navbar/                    # Barra de navegação
├── context/
│   └── AuthContext.tsx            # Context de autenticação
├── schemas/                       # Schemas Zod ✅
│   ├── login.schema.ts
│   ├── usuario.schema.ts
│   ├── chavePix.schema.ts
│   └── transacao.schema.ts
└── middleware.ts                  # Middleware de autenticação

cypress/
├── e2e/
│   └── login.cy.ts                # Testes E2E ✅
├── support/
│   ├── commands.ts                # Comandos customizados
│   └── e2e.ts                     # Configurações globais
└── cypress.config.ts              # Configuração do Cypress
🔐 Funcionalidades Implementadas
✅ Autenticação

 Login com CPF/CNPJ e senha
 Registro de novo usuário
 Proteção de rotas com JWT
 Context API para gerenciamento de estado

✅ Validação de Dados (Zod)

 Validação de formulário de login
 Validação de formulário de registro
 Validação de cadastro de chave PIX
 Validação de nova transação

✅ Chaves PIX

 Listagem de chaves cadastradas
 Cadastro de nova chave (CPF, CNPJ, E-mail, Telefone, Aleatória)
 Exclusão de chave

✅ Transações

 Listagem de transações com paginação (requisito obrigatório)
 Realização de nova transação
 Formatação de valores monetários
 Exibição de status

✅ Testes E2E

 Pelo menos 1 teste E2E implementado (Cypress)
 Testes de login, registro e navegação protegida

🎨 Layout e Usabilidade

Design responsivo (mobile-first)
Componentes reutilizáveis
Feedback visual de erros e sucessos
Loading states
Navegação intuitiva com Navbar
Menu hamburger para mobile

🔗 Integração com Backend
A aplicação se comunica com a API através do arquivo src/app/api/lib/api.ts:
typescript// Configuração base
baseURL: 'http://localhost:7500/api'

// Interceptor automático de token JWT
Authorization: `Bearer ${token}`
Endpoints Utilizados

POST /auth/login - Autenticação
GET /auth/me - Dados do usuário
POST /usuarios - Cadastro de usuário
GET /chaves-pix - Listar chaves
POST /chaves-pix - Cadastrar chave
DELETE /chaves-pix/:id - Excluir chave
GET /transacoes - Listar transações (com paginação)
POST /transacoes - Nova transação

📊 Critérios de Avaliação
CritérioPesoStatusIntegração front/back com JWT2,5✅ ImplementadoLayout e usabilidade2,5✅ ImplementadoValidação de dados (Zod)1,0✅ ImplementadoPaginação de dados1,0✅ ImplementadoTestes E2E1,0✅ ImplementadoApresentação em vídeo1,0⏳ Link abaixoEntrega e documentação1,0✅ Implementado
🎥 Vídeo de Apresentação
Link do vídeo: [Adicionar link aqui após gravação]
O vídeo demonstra:

Inicialização da aplicação
Telas construídas
Funcionamento da autenticação
Integração com a API
Testes E2E executados

📝 Scripts Disponíveis
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npx cypress open     # Abre interface do Cypress
npx cypress run      # Executa testes E2E em modo headless
🐛 Solução de Problemas
Erro de conexão com a API

Verifique se o backend está rodando em http://localhost:7500
Confirme que as rotas da API estão corretas

Teste E2E falhando

Certifique-se de que a aplicação está rodando em http://localhost:3000
Limpe o cache do Cypress: npx cypress cache clear

Token não persiste após reload

Verifique se o localStorage está habilitado no navegador
Confirme que o middleware está configurado corretamente

📄 Licença
Este projeto foi desenvolvido para fins acadêmicos na disciplina de Tópicos Especiais em Desenvolvimento de Software II.
👨‍🏫 Professor
Prof. Diego A. Lusa
E-mail: diegolusa@upf.br

Data de Entrega: 01/12/2025