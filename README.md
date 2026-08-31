# Finanças — painel financeiro pessoal

App de uma página só. Roda no navegador, lê extrato do Itaú em PDF, concilia com o
banco e guarda os dados num repositório privado seu no GitHub.

## O que tem aqui

```
index.html              o app inteiro (Chart.js e pdf.js embutidos, sem CDN)
manifest.webmanifest    faz virar app instalável no celular
sw.js                   service worker: abre offline
icon-*.png              ícones da tela de início
```

**No ar em:** https://eduaraujogh.github.io/financas.appedu/

## Passo 1 — repositório PÚBLICO para o app ✅ feito

No plano grátis do GitHub, o Pages só publica de repositório público. Por isso o
app e os dados moram separados: aqui vai só o código, que não tem nada seu dentro.

Já está no ar em `eduaraujogh/financas.appedu`, com Pages ligado no ramo `main`, raiz.
Para atualizar depois, suba o `index.html` novo por cima.

## Passo 2 — repositório PRIVADO para os dados

1. Crie um repositório **privado** chamado `financas-dados`. **Este passo ainda falta.**
2. Não precisa colocar nada dentro. O app cria o arquivo `dados/estado.json` sozinho no primeiro salvamento.

Cada alteração vira um commit nesse repositório. O histórico do Git é o seu backup:
dá para abrir qualquer versão anterior pelo site do GitHub e recuperar.

## Passo 3 — token de acesso

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access**: *Only select repositories* → escolha **apenas** `financas-dados`.
3. **Permissions → Repository permissions → Contents**: `Read and write`. Só isso.
4. Escolha a validade que preferir e gere. Copie o token — ele só aparece uma vez.

O token dá acesso a esse repositório e a mais nada. Se vazar, você revoga na mesma tela.

## Passo 4 — conectar

Abra o site, vá em **Configurações → Sincronização** e preencha:

| campo | valor |
|---|---|
| Token | o token que você copiou |
| Usuário | seu usuário do GitHub |
| Repositório | `financas-dados` |
| Arquivo | `dados/estado.json` |
| Ramo | `main` |

Clique em **Conectar**. O selo no canto inferior esquerdo passa a mostrar
*Salvo no GitHub* a cada alteração.

**Repita isso em cada aparelho.** O token fica guardado só no navegador daquele
aparelho, nunca no repositório.

## Passo 5 — instalar no celular

Abra o link no celular e escolha:

- **Android/Chrome**: menu ⋮ → *Adicionar à tela inicial*
- **iPhone/Safari**: botão compartilhar → *Adicionar à Tela de Início*

Vira ícone, abre em tela cheia sem barra de navegador e funciona sem internet
(sem conexão ele usa a cópia local e sincroniza quando a rede voltar).

## Passo 6 — trazer seus dados

No painel antigo: **Configurações → Exportar backup (.json)**.
No app novo: **Configurações → Importar backup**.

## Atualizar o app depois

Suba o `index.html` novo no repositório público. Os aparelhos pegam a versão nova
na próxima vez que abrirem com internet — o service worker busca a rede primeiro e
só cai no cache quando está offline.

## Uso normal do mês

1. Baixe o extrato do mês em PDF no app do Itaú.
2. No painel, botão **Extrato** no topo.
3. Ensine as lojas que ele ainda não conhece (uma vez cada — vira regra permanente).
4. Clique em **Deixar o painel igual ao banco**.
5. No Dashboard, **Baixar relatório** se quiser o fechamento do mês.

## Privacidade

- O repositório do app é público, mas não contém nenhum dado seu — só código.
- Seus lançamentos ficam no repositório privado.
- O extrato em PDF é lido dentro do navegador. Ele não é enviado para lugar nenhum.
- O token fica no `localStorage` do aparelho. Em computador compartilhado, use
  **Desconectar** em Configurações ao terminar.
