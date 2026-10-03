---
name: supabase-automation
description: "Habilidade para que o agente possa usar o Supabase CLI para automatizar banco de dados, auth e storage."
---

# Supabase Automation Skill

Esta habilidade permite que o agente gerencie o projeto Supabase diretamente via linha de comando (`npx supabase`).

## Regras de Uso:
1. Sempre use `npx supabase` no terminal em vez de instalar o CLI globalmente.
2. Para inicializar, use `npx supabase init`.
3. Para linkar a um projeto existente, use `npx supabase link --project-ref <REF_DO_PROJETO>`, solicitando ao usuário a senha do DB caso necessário.
4. Para aplicar mudanças de banco de dados, sempre crie uma migração com `npx supabase migration new <nome>` e rode `npx supabase db push`.
