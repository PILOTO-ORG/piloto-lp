// Este arquivo define os recursos que devem ser pré-carregados para melhorar o desempenho
// Será incluído no index.html

// Preload para fontes críticas
const fontPreloads = [
  // Adicione aqui as fontes que seu site utiliza
];

// Preload para imagens críticas
const imagePreloads = [
  { href: '/images/automation-hero.webp', as: 'image', type: 'image/webp' }
];

// Gera os elementos link para o head
const generatePreloadLinks = () => {
  return [
    ...fontPreloads.map(font => 
      `<link rel="preload" href="${font.href}" as="font" type="${font.type}" crossorigin="anonymous">`
    ),
    ...imagePreloads.map(image => 
      `<link rel="preload" href="${image.href}" as="${image.as}" type="${image.type}">`
    )
  ].join('\n  ');
};

module.exports = {
  generatePreloadLinks
};
