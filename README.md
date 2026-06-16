# Landing Page - Marcus Souza Advogado

Landing Page objetiva para captação de contatos e atendimento inicial em Direito Previdenciário, Direito do Trabalho e Direito do Consumidor.

## Arquivos principais

- `index.html` — página principal.
- `style.css` — layout, responsividade e identidade visual.
- `script.js` — menu mobile, validação do formulário, máscara de WhatsApp e botão de envio pelo WhatsApp.
- `obrigado.html` — página de confirmação após envio, quando o redirecionamento estiver ativo.
- `assets/` — logo, favicon e fotos institucionais.

## Alterações desta versão

- Removida a frase solicitada do cartão principal da página.
- Inserida a OAB/RJ 250.430 em pontos estratégicos.
- Site encurtado e organizado em seções objetivas: início, áreas, casos comuns, Visual Law, formulário e CTA final.
- Incluídas imagens ilustrativas de pessoas reais via Pexels para os casos comuns.
- Formulário configurado para enviar os dados ao e-mail `adv.souzamarcus@gmail.com` via FormSubmit.
- Mantido botão de WhatsApp clicável para `(21) 96534-8183`.

## Observação sobre o formulário

O formulário usa o serviço externo FormSubmit:

```html
<form method="POST" action="https://formsubmit.co/adv.souzamarcus@gmail.com">
```

No primeiro envio, o FormSubmit pode solicitar confirmação no e-mail destinatário. Confirme no e-mail `adv.souzamarcus@gmail.com` para liberar os próximos recebimentos.

## Imagens gratuitas

As imagens dos cards de casos comuns são carregadas remotamente do Pexels. Elas são ilustrativas e não representam clientes reais do escritório.

Páginas de referência das imagens:

- Previdenciário: Pexels ID 7545305.
- Trabalhista: Pexels ID 5668795.
- Consumidor: Pexels ID 8111860.

## Publicação no Netlify

1. Envie a pasta `marcus-souza-landing` para um repositório no GitHub.
2. No Netlify, crie um novo site conectado ao repositório.
3. Configure o diretório de publicação como a raiz da pasta.
4. Faça um teste real do formulário após publicar.

## Publicação no GitHub Pages

1. Suba os arquivos para o repositório.
2. Ative GitHub Pages em `Settings > Pages`.
3. Selecione a branch principal e a pasta raiz.
4. Teste o formulário e o WhatsApp após a publicação.
