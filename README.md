<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1lFYysrmIIkFcnnBq8l_w-wvs-vEutB2R

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

```bash
cat > README.md << 'EOF'
# 🚀 Sabor & Herança - Dashboard Transformação Digital

Dashboard **React/Vite** 100% interativo: **Kanban PDCA**, **Antes/Deois** todas sections, **Edição NCs**, **Chat IA Gemini**.

[![Dashboard Live](https://img.shields.io/badge/Live-GitHub_Pages-cyan?style=flat&logo=github)](https://SEU_USUARIO.github.io/dashboard-sabor-heranca)

## ⚡ UP LOCAL (VS Code/Codespaces) - 30s

```bash
# 1. Node 20+ (Codespaces 1ª vez)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && source ~/.bashrc
nvm install 20 && nvm use 20
node --version  # ✅ v20.x

# 2. Sempre
npm install
npm run dev
```

**🔗 Abre**: `http://localhost:5173` ou **Codespaces URL automática**

## ☁️ UP GitHub Pages AUTOMÁTICO - 10s

```bash
git add .
git commit -m "Update $(date +%Y-%m-%d)"
git push
```

✅ **Deploy instantâneo** - URL atualiza sozinha!

## ⬇️ DOWN / Parar
```
Ctrl+C
```

## 🤖 Chat IA Gemini
```
# LOCAL (.env raiz projeto)
VITE_GEMINI_API_KEY=sua_chave_aqui

# GITHUB (Settings > Secrets > Actions)
Name: GEMINI_API_KEY | Value: sua_chave
```

## 📊 Comandos Úteis
```bash
npm run build      # Produção
npm run preview    # Teste build
npm audit fix      # Security (ignora warnings)
```

## 🎯 Features 100% Ativas
- ✅ **Kanban** drag/edit PDCA (4 colunas)
- ✅ **Antes🟥/Deois🟩** (Visão Geral, KPIs, Portfolio, ISO, DX Maturity, ESG)
- ✅ **+Nova NC** + Edição (5W2H, Ishikawa, SWOT, PDCA, Quality)
- ✅ **ISO Resumos** tooltips
- ✅ **Chat IA** Governança (Gemini)
- ✅ **Mobile-first** 60fps
- ✅ **Performance** otimizado (memo/lazy)

## 📱 Estrutura Sidebar (App.tsx)
```
📋 ESTRATÉGIA
  ├── Visão Geral
  ├── 5W2H
  ├── SWOT
  └── Ishikawa

⚙️ EXECUÇÃO
  ├── PDCA
  ├── Kanban PDCA
  ├── Roadmap Gantt
  └── Portfolio

🛡️ GOVERNANÇA
  ├── KPIs & Resultados
  ├── Riscos
  ├── Conformidade ISO
  ├── Quality & NCs
  ├── Maturidade DX
  ├── Ética & ESG
  └── Chat IA
```

## 🚀 Jornada Completa - 18 Meses
```
M0: 35% Market Share → M18: 43% (constants.ts)
ROI Acumulado: 350% (R$2.3M → R$8M)
OEE: 65% → 84% | NPS: 6.2 → 8.4
```

**Autor**: Raphael Serafim, CDO | **Fevereiro 2026**

---
**De protótipo Vite → Hub C-Level executiva**
EOF
```

**Cole no terminal** → **Enter** → **README perfeito salvo**!

```
git add README.md
git commit -m "README produção-ready"
git push
```

**🎉 PRONTO!** Dashboard + documentação **C-Level**! 🚀
