
# 🚀 Sabor & Herança - Dashboard de Transformação Digital

Este é um Dashboard Executivo interativo desenvolvido para a gestão da jornada de 18 meses de transformação digital da Sabor & Herança.

## 🛠️ Tecnologias Utilizadas
- **React 19** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (Estilização)
- **Lucide React** (Ícones)
- **Recharts** (Gráficos)
- **Google Gemini API** (Inteligência Artificial)
- **Dnd-kit** (Kanban Interativo)

## 🚀 Como Rodar Localmente (VS Code / Codespaces)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/sabor-heranca-dashboard.git
   cd sabor-heranca-dashboard
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure sua API Key:**
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave do Gemini:
   ```env
   API_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🤖 GitHub Actions (Deploy Automático)
Este projeto já está configurado para o **GitHub Pages**. 
Toda vez que você enviar um código para a branch `main`, o GitHub Actions irá:
1. Instalar as dependências.
2. Gerar a versão de produção (`dist`).
3. Publicar automaticamente no seu link do GitHub Pages.

---
*Desenvolvido para Sabor & Herança - Estratégia por Raphael Serafim.*
