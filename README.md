# 🎨 Blog para Professores - Frontend

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
- ✅ Tailwind CSS v3 para estilização responsiva
- ✅ Context API para gerenciamento de estado
- ✅ React Hook Form + Zod para validação
- ✅ React Query para cache e sincronização
- ✅ Axios com interceptors automáticos
- ✅ Sistema de notificações (Toast)
- ✅ Loading states com skeletons
- ✅ Design responsivo (Web e Mobile)
- ✅ Docker e Docker Compose
- ✅ Autenticação JWT integrada com backend

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho da aplicação
│   ├── Modal.tsx        # Modal base
│   ├── LoginModal.tsx   # Modal de login/registro
│   ├── PostFormModal.tsx # Modal criar/editar post
│   ├── DeleteConfirmModal.tsx # Modal confirmação exclusão
│   ├── PostViewModal.tsx # Modal visualização de post
│   ├── RegisterModal.tsx # Modal de registro
│   ├── Router.tsx       # Sistema de roteamento
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
└── assets/              # Assets do projeto
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

## 🔐 Autenticação

### Sistema Integrado com Backend
- **Login**: Username + senha
- **JWT**: Tokens com expiração de 1 hora
- **Interceptors**: Automáticos para requests/responses
- **Logout**: Automático quando token expira

### Exemplo de Usuário de Teste
```
Username: professor1
Senha: 123456
```

## 🔌 Integração com Backend

### Endpoints Utilizados
```typescript
// Autenticação
POST /auth/login    - Login com username/password
POST /auth/register - Registro de novo usuário

// Posts
GET    /posts       - Lista todos os posts (público)
GET    /posts/:id   - Busca post por ID (público)
GET    /posts/search?q=termo - Busca por termo (público)
POST   /posts      - Cria novo post (requer auth)
PUT    /posts/:id  - Atualiza post (requer auth)
DELETE /posts/:id  - Deleta post (requer auth)
```

### JWT Token Structure
```typescript
interface JWTPayload {
  id: string;
  username: string;
  exp: number;
}
```

## 🎨 Design System

### Wallpaper Educacional
- Imagem de fundo temática com 30% de opacidade
- Localizada em `public/wallpaper-education.png`
- Responsiva e otimizada para todos os dispositivos

### Glassmorphism Design
- Fundos semi-transparentes (`bg-white/95`)
- Efeitos de backdrop-blur nos cards e header
- Bordas sutis e sombras suaves
- Hierarquia visual clara com z-index

### Sistema de Cores
```css
Primary: #2563eb (Blue 600)
Success: #10b981 (Emerald 500)
Warning: #f59e0b (Amber 500)
Error: #ef4444 (Red 500)

/* Fundos */
Card Background: rgba(255, 255, 255, 0.95)
Header Background: rgba(255, 255, 255, 0.95)
```

### Componentes Customizados
```css
.btn-primary    - Botão principal azul
.btn-secondary  - Botão secundário cinza
.btn-danger     - Botão de perigo vermelho
.input-field    - Campo de entrada estilizado
.card          - Card com glassmorphism
.modal-overlay  - Overlay de modais
```

## 📱 Responsividade

A aplicação foi desenvolvida com **mobile-first** e é totalmente responsiva:

- **Mobile** (< 640px): Layout otimizado para telas pequenas
- **Tablet** (640px - 1024px): Adaptação para telas médias
- **Desktop** (> 1024px): Layout completo para telas grandes

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
- Cache de assets estáticos (1 ano para imagens)
- Headers de segurança
- Suporte a SPA (Single Page Application)

### Variáveis de Ambiente
```bash
# Frontend (.env.local)
VITE_API_BASE_URL=http://localhost:3000
VITE_NODE_ENV=development
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Estilização**: Tailwind CSS v3, Inter Font
- **Estado**: React Query, Context API
- **Formulários**: React Hook Form + Zod
- **HTTP**: Axios com interceptors
- **Build**: Vite
- **Container**: Docker + Nginx
- **Linting**: ESLint

## 🔒 Segurança Implementada

- ✅ JWT tokens com expiração (1 hora)
- ✅ Senhas hasheadas no backend (bcrypt)
- ✅ Validação de entrada client-side (Zod)
- ✅ Headers de segurança no Nginx
- ✅ Interceptors para tratamento de token expirado
- ✅ HTTPS pronto (configuração)

## 🧪 Como Testar

### 1. Teste de Funcionalidades
```bash
# Iniciar aplicação
npm run dev

# Testar fluxo completo:
1. Acessar http://localhost:5173
3. Fazer login
4. Criar post
5. Editar post
6. Excluir post
7. Fazer logout
8. Verificar permissões
```

### 2. Teste de Build
```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Teste Docker
docker-compose up --build
```

### 3. Teste de Responsividade
- Abrir DevTools (F12)
- Testar breakpoints: Mobile, Tablet, Desktop
- Verificar wallpaper e glassmorphism

## 🚀 Roteamento

### Sistema Customizado
- ✅ **Redirecionamento automático**: `/` → `/home`
- ✅ **History API**: Suporte a botões voltar/avançar
- ✅ **URL atualizada**: Reflete a rota atual na barra de endereços
- ✅ **Navegação programática**: Função `navigateTo()` disponível
- ✅ **Fallback**: Rotas não encontradas redirecionam para `/home`

## 🔧 Troubleshooting

### Erro de Tailwind CSS
```bash
# Se classes não funcionarem
npm uninstall tailwindcss
npm install tailwindcss@^3.4.0
npm run dev
```

### Erro de Dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Docker
```bash
docker-compose down
docker system prune -f
docker-compose up --build
```

### Wallpaper não Aparece
- Verificar se arquivo existe: `public/wallpaper-education.png`
- Verificar nome sem espaços
- Cache: Ctrl+F5 para reload completo

## 📋 Checklist de Verificação

- [x] Aplicação roda em desenvolvimento (`npm run dev`)
- [x] Build funciona (`npm run build`)
- [x] Docker build funciona (`docker-compose up`)
- [x] Layout responsivo funciona
- [x] Modais abrem e fecham corretamente
- [x] Sistema de autenticação funciona
- [x] CRUD de posts funciona
- [x] Busca funciona
- [x] Notificações (toasts) funcionam
- [x] Wallpaper educacional carrega
- [x] Glassmorphism aplicado
- [x] Roteamento automático funciona

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

**✨ Sistema completo e funcional!**

Este frontend oferece uma experiência moderna e intuitiva para o compartilhamento de conhecimento entre professores, com foco em usabilidade, performance e acessibilidade.