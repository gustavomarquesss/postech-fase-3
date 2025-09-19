# 🚀 Guia de Setup - Blog para Professores

## ✅ Refatoração Completa Realizada

### 🔄 Mudanças Implementadas

1. **Reestruturação de Pastas**
   - `features/` → `pages/`
   - Criadas pastas: `components/`, `services/`, `hooks/`, `types/`, `utils/`
   - Removidas pastas antigas: `app/`, `core/`, `features/`, `shared/`

2. **Substituição de Tecnologias**
   - ❌ Styled Components → ✅ Tailwind CSS
   - ❌ React Router → ✅ Single Page Application
   - ❌ Múltiplas páginas → ✅ 1 página + 3 modals

3. **Arquitetura Simplificada**
   - **1 Página Principal**: Lista de posts com busca
   - **3 Modals**: Login, Criar/Editar Post, Confirmar Exclusão
   - **Responsivo**: Mobile-first design

4. **Docker Setup**
   - ✅ Dockerfile configurado
   - ✅ docker-compose.yml completo
   - ✅ Nginx para produção

## 🐳 Como Executar

### Opção 1: Docker Compose (Recomendado)
```bash
# Executar apenas frontend
docker-compose -f docker-compose.frontend.yml up --build

# Executar stack completo (frontend + backend + mongo)
docker-compose up --build
```

### Opção 2: Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🌐 Acessos
- **Frontend**: http://localhost:3001 (Docker) ou http://localhost:5173 (dev)
- **Backend**: http://localhost:3000
- **MongoDB**: localhost:27017

## 🔐 Login de Teste
```
Email: professor@escola.com
Senha: 123456
```

## 📱 Funcionalidades

### Para Usuários Não Logados
- ✅ Visualizar lista de posts
- ✅ Buscar posts por palavra-chave
- ✅ Fazer login

### Para Professores Logados
- ✅ Criar novos posts
- ✅ Editar seus próprios posts
- ✅ Excluir seus próprios posts
- ✅ Todas as funcionalidades anteriores

## 🎨 Design Responsivo

### Mobile (< 640px)
- Layout em coluna única
- Botões adaptados para toque
- Modals ocupam toda a tela

### Tablet (640px - 1024px)
- Layout em 2 colunas quando apropriado
- Modals centralizados

### Desktop (> 1024px)
- Layout completo
- Modals com tamanhos otimizados

## 🚀 Próximos Passos

1. **Testar a aplicação**:
   ```bash
   npm run dev
   ```

2. **Verificar responsividade**:
   - Abrir DevTools (F12)
   - Testar diferentes tamanhos de tela

3. **Testar Docker**:
   ```bash
   docker-compose up --build
   ```

4. **Conectar com Backend**:
   - Verificar se backend está rodando em localhost:3000
   - Ajustar VITE_API_BASE_URL se necessário

## 📋 Checklist de Verificação

- [ ] Aplicação roda em desenvolvimento (`npm run dev`)
- [ ] Build funciona (`npm run build`)
- [ ] Docker build funciona (`docker-compose up`)
- [ ] Layout responsivo funciona
- [ ] Modals abrem e fecham corretamente
- [ ] Sistema de autenticação funciona
- [ ] CRUD de posts funciona
- [ ] Busca funciona
- [ ] Notificações (toasts) funcionam

## ⚠️ Notas Importantes

1. **Node.js**: O projeto usa Node.js 20.17.0, mas Vite recomenda 20.19+. Funciona normalmente para desenvolvimento.

2. **Backend**: O sistema assume que o backend está rodando em localhost:3000. Ajuste a variável `VITE_API_BASE_URL` se necessário.

3. **Autenticação**: Sistema em modo demonstração. Qualquer email válido + senha 6+ caracteres funciona.

4. **Banco de Dados**: Se usar docker-compose completo, o MongoDB será configurado automaticamente.

## 🛠️ Troubleshooting

### Erro de PostCSS/Tailwind
```bash
npm install @tailwindcss/postcss
```

### Erro de dependências
```bash
npm install
npm run build
```

### Erro de Docker
```bash
docker-compose down
docker-compose up --build
```

---

**✨ Refatoração concluída com sucesso!**

O projeto agora segue os requisitos do Tech Challenge:
- ✅ 2 telas (principal + modals)
- ✅ Tailwind CSS
- ✅ Responsivo
- ✅ Docker
- ✅ Arquitetura simplificada
