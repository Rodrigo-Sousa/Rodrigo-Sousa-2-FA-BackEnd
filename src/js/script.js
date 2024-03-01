// Desabilitando o envio do formulário, se houver campos inválidos
(function () {
    // Auxiliando na captura de erros
    'use strict'
  
    // Buscando todos os formulários que desejamos aplicar este estilo de validação
    var forms = document.querySelectorAll('.precisarValidar');
  
    // Verificando o formulário e evitando o envio
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
        //   Adicionando classe direto do bootstrap, quando o objeto for validado
          form.classList.add('was-validated')
        }, false);
      });
  })();