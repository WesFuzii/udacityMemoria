var cartas = [];

$('.carta').on('click', function () {
    $(this).toggleClass('hover').delay(500).queue(function () {
        cartas.push($(this));
        if (cartas.length == 2) {
            validar(cartas);
            cartas = [];
        }        
    });


    // cartas.push($(this).find('.atras').html());

});

function validar(cartas) {
    if (cartas[0] == cartas[1]) {
        alert('acertou');
    } else {
        alert('errou');
        cartas[0].toggleClass('hover');
        cartas[1].toggleClass('hover');            
    }    
}

function iniciarJogo() {
    let cartas = [];
    cartas = $('.painel').find('.atras');
    let valores = ['fa-cat', 'fa-dog', 'fa-dove', 'fa-fish', 'fa-frog', 'fa-spider', 'fa-hippo', 'fa-horse'];

    cartas.each(function () {
        if (valores.length == 0) {
            valores = ['fa-cat', 'fa-dog', 'fa-dove', 'fa-fish', 'fa-frog', 'fa-spider', 'fa-hippo', 'fa-horse'];
        }
        let indice = Math.floor(Math.random() * (valores.length));
        $(this).append('<i class="fas ' + valores[indice] + '"></i>');
        valores.splice(indice, 1);
    });
};

$(document).ready(
    iniciarJogo()
);