// Muestra un mensaje de que el formulario se envio correctamente
function mostrarMensajeDeEnviado(e) {
  e.preventDefault();

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "2000",
    "hideDuration": "0",
    "timeOut": "2000",
    "extendedTimeOut": "0",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.success("Su datos seran enviados a la brevedad")

  setTimeout(() => e.target.submit(), 2000);

}

function main() {
  let form = document.getElementById("contacto-form");

  form.addEventListener("submit", (e) => mostrarMensajeDeEnviado(e));
}

main();