---
name: vercel-automation
description: "Habilidade para que o agente possa usar o Vercel CLI para configurar hospedagem e variáveis de ambiente."
---

# Vercel Automation Skill

Esta habilidade ensina o agente a usar o Vercel CLI (`npx vercel`) para configurar o projeto.

## Regras de Uso:
1. Sempre use `npx vercel` via terminal para comandos da Vercel.
2. Para linkar o projeto localmente, rode `npx vercel link` e siga as instruções (pode requerer interação via token).
3. Para definir variáveis de ambiente, use `npx vercel env add <nome> <ambiente>`.
4. Para fazer deploy, use `npx vercel` (preview) ou `npx vercel --prod` (produção).
5. Peça o `VERCEL_TOKEN` ao usuário e passe via flag `-t` caso a autenticação local não esteja configurada.
