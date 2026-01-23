Widget IA (Embed)

Widget de atendimento/assistente em React empacotado como bundle IIFE para ser embutido em qualquer site (ex.: Angular) via uma única tag <script>.
O loader cria um container fixo no canto da tela, aplica estilos isolados com Shadow DOM e monta o React dentro do host.

Como foi feito

O projeto gera 3 arquivos públicos:

public/ia.js → loader do widget (usado no site cliente)

public/widget-entry.iife.js → bundle final (React empacotado em IIFE via tsup)

public/ia-widget.css (ou widget.css) → estilos do widget (carregados dentro do Shadow DOM)

Arquitetura (resumo)

O site do cliente adiciona:

<script src=".../ia.js" data-color="#0044cc" data-logo="..." data-agents="financeiro,suporte"></script>


O ia.js:

lê as configs data-*

cria o host fixo (#ia-widget-host)

cria shadowRoot (para isolar CSS do cliente)

injeta o CSS do widget via <link rel="stylesheet">

carrega o bundle widget-entry.iife.js

O bundle expõe:

window.IAWidget.mount(el, options)


e monta o React no el.

Como rodar localmente
1) Instalar
npm install

2) Rodar o projeto (Next)
npm run dev

3) Gerar o bundle do widget (IIFE)
npm run build:embed


Ao final, os arquivos gerados ficam em public/.

Como usar em outro projeto (ex.: Angular)

No index.html do projeto cliente, coloque:

<script
  src="http://localhost:3000/ia.js"
  data-color="#0044cc"
  data-logo="https://sistema.com/logo.png"
  data-agents="financeiro,suporte,relatorios">
</script>


✅ Quando a página carregar, o widget aparece no canto inferior direito.