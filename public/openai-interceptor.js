// OpenAI API Key Interceptor
(function() {
  // Obter a chave API da variável global definida em index.html
  const OPENAI_API_KEY = window.ENV?.OPENAI_API_KEY || '';
  
  // Salva a função fetch original
  const originalFetch = window.fetch;
  
  // Sobrescreve a função fetch
  window.fetch = function(url, options) {
    // Verifica se é uma chamada para a API da OpenAI
    if (url && url.toString().includes('api.openai.com')) {
      options = options || {};
      options.headers = options.headers || {};
      
      // Converte headers para formato padrão (caso seja Headers object)
      if (options.headers instanceof Headers) {
        const headerObj = {};
        options.headers.forEach((value, key) => {
          headerObj[key.toLowerCase()] = value;
        });
        options.headers = headerObj;
      }
      
      // Corrige o cabeçalho de autorização se estiver vazio ou incompleto
      if (!options.headers.authorization && !options.headers.Authorization) {
        options.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
        console.log('Interceptor: Added missing Authorization header');
      } else if (options.headers.authorization === 'Bearer' || options.headers.Authorization === 'Bearer') {
        // Se o header existe mas não tem o token
        options.headers.Authorization = `Bearer ${OPENAI_API_KEY}`;
        console.log('Interceptor: Fixed incomplete Authorization header');
      }
      
      console.log('Intercepted OpenAI API call - headers present:', !!options.headers.Authorization);
    }
    
    // Chama a função fetch original
    return originalFetch.call(this, url, options);
  };
  
  console.log('OpenAI API interceptor initialized');
})();
