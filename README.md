# Landing Page — Marcus Souza Advogado

Landing page estática feita em HTML + CSS + JavaScript para captação de leads jurídicos.

## Arquivos principais

- `index.html`: estrutura da página, áreas jurídicas, histórias curtas e formulário.
- `style.css`: layout responsivo, identidade visual, cards, gráficos e Visual Law.
- `script.js`: menu mobile, abas, validação do formulário, máscara de WhatsApp e botão de WhatsApp.
- `obrigado.html`: página de confirmação após envio.
- `assets/`: logomarca, fotos e ilustrações gratuitas em SVG.

## Identificação profissional

Incluído no site:

**OAB/RJ 250.430**

## WhatsApp configurado

Número usado no código:

`(21) 96534-8183` → `https://wa.me/5521965348183`

## Envio do formulário para e-mail

O formulário “Quero receber conteúdos jurídicos” foi configurado para enviar os dados para:

`adv.souzamarcus@gmail.com`

Implementação usada:

```html
<form action="https://formsubmit.co/adv.souzamarcus@gmail.com" method="POST">
```

### Atenção importante

Na primeira submissão, o FormSubmit costuma exigir confirmação do e-mail destinatário. Faça um teste preenchendo o formulário publicado e confirme o recebimento no e-mail `adv.souzamarcus@gmail.com`.

O redirecionamento após envio está configurado para:

`https://marcussouzaadvocacia.netlify.app/obrigado.html`

Se publicar em outro domínio, altere o campo `_next` dentro do `index.html`.

## Campos obrigatórios do formulário

- Nome
- Sobrenome
- WhatsApp com DDD
- E-mail
- Cidade
- Conteúdo de interesse
- Consentimento para contato

## Imagens gratuitas

Foram incluídas ilustrações vetoriais em SVG criadas para este projeto:

- `assets/area-previdenciario.svg`
- `assets/area-trabalhista.svg`
- `assets/area-consumidor.svg`

Elas exemplificam as áreas de Direito Previdenciário, Direito do Trabalho e Direito do Consumidor sem depender de banco externo de imagens.

## Conteúdo jurídico incluído

A página inclui histórias curtas de situações recorrentes:

- Benefício previdenciário negado mesmo com laudos médicos.
- Rescisão trabalhista sem pagamento correto.
- Cobrança, fraude ou falha de serviço em relação de consumo.

Os textos foram redigidos sem promessa de resultado e com ressalva de que cada caso depende da análise individual dos documentos, fatos e prazos.
