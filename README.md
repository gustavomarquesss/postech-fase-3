# 🎨 Frontend - Blog para Professores

Frontend React + TypeScript para o sistema de blog dos professores da rede pública. Interface moderna, responsiva e acessível para compartilhamento de conteúdo educacional.

## 🚀 Funcionalidades

### 📱 Telas Principais
- **Página Principal** - Lista de posts com busca e funcionalidades de CRUD
- **Modals**:
  - Modal de Login para autenticação de professores
  - Modal para criar/editar posts
  - Modal de confirmação para exclusão de posts

### ✨ Recursos Técnicos
- ✅ React 19 + TypeScript + Vite
- ✅ Tailwind CSS para estilização responsiva
- ✅ Context API para gerenciamento de estado
- ✅ React Hook Form + Zod para validação
- ✅ React Query para cache e sincronização
- ✅ Axios com interceptors automáticos
- ✅ Sistema de notificações (Toast)
- ✅ Loading states com skeletons
- ✅ Design responsivo (Web e Mobile)
- ✅ Docker e Docker Compose

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho da aplicação
│   ├── Modal.tsx        # Modal base
│   ├── LoginModal.tsx   # Modal de login
│   ├── PostFormModal.tsx # Modal criar/editar post
│   ├── DeleteConfirmModal.tsx # Modal confirmação exclusão
│   ├── Toast.tsx        # Sistema de notificações
│   └── Loading.tsx      # Componentes de loading
├── pages/               # Páginas principais
│   └── HomePage.tsx     # Página principal
├── hooks/               # Hooks customizados
│   ├── useAuth.ts       # Hook de autenticação
│   ├── usePosts.ts      # Hooks para posts (CRUD)
│   └── useToast.ts      # Hook para notificações
├── services/            # Serviços de API
│   └── api.ts           # Configuração Axios e serviços
├── types/               # Tipos TypeScript
│   └── index.ts         # Tipos principais
└── utils/               # Utilitários gerais
```

## ⚙️ Setup e Instalação

### Pré-requisitos
- Docker e Docker Compose
- Node.js 20+ (apenas para desenvolvimento)

### 🐳 Execução com Docker (Recomendado)

#### 1. Executar apenas o Frontend
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd frontend

# Execute com Docker Compose
docker-compose -f docker-compose.frontend.yml up --build
```

#### 2. Executar Frontend + Backend + MongoDB
```bash
# Execute o stack completo
docker-compose up --build
```

### 🔧 Desenvolvimento Local

#### 1. Instalar Dependências
```bash
npm install
```

#### 2. Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Edite as variáveis conforme necessário
VITE_API_BASE_URL=http://localhost:3000
VITE_NODE_ENV=development
```

#### 3. Rodar em Desenvolvimento
```bash
npm run dev
```

#### 4. Build para Produção
```bash
npm run build
npm run preview
```

## 🌐 Acesso à Aplicação

- **Frontend**: http://localhost:3001 (Docker) ou http://localhost:5173 (dev)
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

## 🔐 Autenticação (Modo Demonstração)

### Sistema Integrado com Backend
- **Registro**: Criar nova conta via interface
- **Login**: Username + senha (mínimo 6 caracteres)
- **JWT**: Tokens com expiração de 1 hora

### Como Criar uma Conta
1. Clicar em "Entrar"
2. Clicar em "Não tem uma conta? Criar nova conta"
3. Preencher username e senha
4. Login automático após registro

### Exemplo de Usuário
```
Username: professor1
Senha: 123456
```

## 🔌 Integração com Backend

### Endpoints Utilizados
```typescript
// GET /posts - Lista todos os posts
// GET /posts/:id - Busca post por ID  
// GET /posts/search?q=termo - Busca por termo
// POST /posts - Cria novo post (auth)
// PUT /posts/:id - Atualiza post (auth)
// DELETE /posts/:id - Deleta post (auth)
```

### Autenticação
- ✅ Sistema JWT integrado com backend real
- ✅ Registro de usuários via POST /auth/register
- ✅ Login via POST /auth/login
- ✅ Token JWT armazenado no localStorage
- ✅ Interceptors automáticos para requests/responses
- ✅ Logout automático quando token expira

## 📱 Responsividade

A aplicação foi desenvolvida com **mobile-first** e é totalmente responsiva:

- **Mobile**: Layout otimizado para telas pequenas
- **Tablet**: Adaptação para telas médias
- **Desktop**: Layout completo para telas grandes

### Breakpoints (Tailwind CSS)
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

## 🚀 Deploy

### Docker Production
```bash
# Build da imagem
docker build -t blog-frontend .

# Executar container
docker run -p 3001:80 blog-frontend
```

### Nginx Configuration
A aplicação usa Nginx para servir os arquivos estáticos com:
- Compressão Gzip
- Cache de assets estáticos
- Headers de segurança
- Suporte a SPA (Single Page Application)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Estilização**: Tailwind CSS
- **Estado**: React Query, Context API
- **Formulários**: React Hook Form + Zod
- **HTTP**: Axios
- **Build**: Vite
- **Container**: Docker + Nginx
- **Linting**: ESLint

## 👥 Equipe de Desenvolvimento

**Desenvolvido por:**
- Thomaz Moreira
- Mateus Jesus  
- João Casemiro
- Gustavo Marques
- Guilherme Belmonte

## 📄 Licença

Este projeto foi desenvolvido como parte do **Tech Challenge da FIAP - Pós-Tech Fase 3**.

**🎯 Objetivo**: Criar uma plataforma moderna e intuitiva para que professores da rede pública possam compartilhar conhecimento e recursos educacionais de forma eficiente e colaborativa.

## 🚀 Próximos Passos

- [ ] Implementar sistema de comentários
- [ ] Adicionar categorias para posts
- [ ] Implementar sistema de favoritos
- [ ] Adicionar editor rich text
- [ ] Implementar notificações push
- [ ] Adicionar modo escuro
- [ ] Implementar PWA (Progressive Web App)