# 🎨 Blog para Professores - Frontend

Frontend React + TypeScript para o sistema de blog dos professores da rede pública. Interface moderna e responsiva para compartilhamento de conteúdo educacional.

## 🚀 Funcionalidades

### 📱 Páginas da Aplicação
- **Página Principal** (`/`) - Lista de posts com busca
- **Página de Login** (`/login`) - Autenticação de professores
- **Criar Post** (`/create-post`) - Criação de novos posts
- **Editar Post** (`/edit-post/:id`) - Edição de posts existentes

### ✨ Recursos Técnicos
- ✅ React 18 + TypeScript + Vite
- ✅ React Router DOM para navegação
- ✅ Tailwind CSS para estilização
- ✅ React Query para cache e estado
- ✅ Axios para requisições HTTP
- ✅ Autenticação JWT
- ✅ Docker e Docker Compose

## 🏗️ Arquitetura da Aplicação

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── LoginModal.tsx   # Modal de autenticação
│   ├── PostFormModal.tsx # Modal criar/editar post
│   ├── PostViewModal.tsx # Modal visualização de post
│   ├── DeleteConfirmModal.tsx # Modal confirmação exclusão
│   ├── Router.tsx       # Configuração React Router
│   ├── Toast.tsx        # Sistema de notificações
│   └── Loading.tsx      # Componentes de loading
├── pages/               # Páginas da aplicação
│   ├── HomePage.tsx     # Página principal (lista posts)
│   ├── LoginPage.tsx    # Página de login
│   ├── CreatePostPage.tsx # Página criar post
│   └── EditPostPage.tsx # Página editar post
├── hooks/               # Hooks customizados
│   ├── useAuth.ts       # Gerenciamento de autenticação
│   ├── usePosts.ts      # Operações CRUD de posts
│   └── useToast.ts      # Sistema de notificações
├── config/              # Configurações
│   └── api.ts           # Configuração da API
├── services/            # Serviços
│   └── api.ts           # Cliente HTTP (Axios)
└── types/               # Tipos TypeScript
    └── index.ts         # Definições de tipos
```

### Roteamento
A aplicação utiliza React Router DOM com as seguintes rotas:
- `/` - Página principal (lista de posts)
- `/login` - Página de autenticação
- `/create-post` - Criação de posts (requer autenticação)
- `/edit-post/:id` - Edição de posts (requer autenticação)

## ⚙️ Setup e Instalação

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)

### 🐳 Execução com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd frontend

# 2. Execute com Docker Compose
docker-compose up --build

# 3. Acesse a aplicação
# Frontend: http://localhost:5000
```

### 🔧 Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Executar em desenvolvimento
npm run dev

# 3. Acessar: http://localhost:5175
```

### 🏗️ Build para Produção

```bash
# Build local
npm run build
npm run preview

# Docker build
docker-compose up --build
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

- **Tokens**: Armazenados no localStorage
- **Interceptors**: Adicionam automaticamente o token nas requisições
- **Redirects**: Usuários não autenticados são redirecionados para `/login`
- **Logout**: Automático quando token expira

### Fluxo de Autenticação
1. Usuário acessa `/login`
2. Insere username e senha
3. Backend retorna JWT token
4. Token é armazenado no localStorage
5. Requisições subsequentes incluem o token no header Authorization

## 🔌 Integração com Backend

### API Endpoints
```bash
# Autenticação
POST /auth/login     # Login de usuário

# Posts (CRUD)
GET    /posts        # Listar posts
POST   /posts        # Criar post (requer auth)
PUT    /posts/:id    # Atualizar post (requer auth)
DELETE /posts/:id    # Deletar post (requer auth)
GET    /posts/search # Buscar posts
```

### Configuração da API
A aplicação se conecta automaticamente com o backend:
- **Desenvolvimento**: Usa proxy Vite (`/api`)
- **Docker**: Usa proxy Vite Preview (`/api`)
- **Produção**: URL direta para a API

## 🎨 Interface e Design

### Design System
- **Framework**: Tailwind CSS
- **Tema**: Educacional com wallpaper temático
- **Estilo**: Glassmorphism com transparências
- **Ícones**: React Icons (substituindo emojis)
- **Responsividade**: Mobile-first design

### Componentes Principais
- **Header**: Navegação e autenticação
- **Cards**: Listagem de posts com glassmorphism
- **Modais**: Visualização e confirmações
- **Forms**: Criação e edição de posts
- **Toast**: Notificações do sistema

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Roteamento**: React Router DOM
- **Estilização**: Tailwind CSS
- **Estado**: React Query, useState/useContext
- **HTTP**: Axios
- **Ícones**: React Icons
- **Container**: Docker + Vite Preview
- **Build**: Vite

## 🧪 Guia de Uso

### 1. Fluxo de Navegação
```bash
1. Acesse http://localhost:5000
2. Visualize a lista de posts (público)
3. Clique em "Login" para autenticar
4. Após login, use "Novo Post" para criar
5. Use ações de editar/deletar nos seus posts
6. Use a busca para encontrar posts específicos
```

### 2. Teste das Funcionalidades
- **Lista de Posts**: Visualização pública
- **Busca**: Campo de pesquisa por título/conteúdo
- **Autenticação**: Login/logout
- **CRUD**: Criar, editar, deletar posts (requer auth)
- **Navegação**: Entre páginas usando React Router

## 🚧 Desafios e Soluções

### 1. CORS em Docker
**Problema**: Requests diretos para API externa bloqueados por CORS
**Solução**: Implementação de proxy no Vite Preview para ambiente Docker

### 2. Transição Modal → Páginas  
**Problema**: Cliente solicitou mudança de modais para páginas separadas
**Solução**: Refatoração usando React Router DOM mantendo funcionalidades

### 3. Gerenciamento de Estado
**Problema**: Estados complexos de autenticação e posts
**Solução**: Uso de React Query para cache + hooks customizados

### 4. Responsividade
**Problema**: Interface funcional em diferentes dispositivos
**Solução**: Design mobile-first com Tailwind CSS

## 📋 Experiências da Equipe

### Pontos Positivos
- **React Query**: Facilitou muito o gerenciamento de estado server
- **Tailwind CSS**: Agilizou o desenvolvimento da interface
- **TypeScript**: Preveniu muitos bugs durante o desenvolvimento
- **Docker**: Simplificou o deployment e ambiente consistente

### Aprendizados
- **Proxy Configuration**: Configuração de proxy para resolver CORS
- **React Router**: Migração de modals para pages com roteamento
- **State Management**: Uso eficiente de hooks para estado local
- **Container Strategy**: Docker sem nginx usando Vite Preview

## 👥 Equipe de Desenvolvimento

**Desenvolvido como Tech Challenge FIAP - Pós-Tech Fase 3:**
- Thomaz Moreira
- Mateus Jesus  
- João Casemiro
- Gustavo Marques
- Guilherme Belmonte

---

## 🎯 Conclusão

Este frontend oferece uma solução moderna e funcional para o compartilhamento de conhecimento entre professores, implementando todas as funcionalidades solicitadas com foco em usabilidade, performance e manutenibilidade.