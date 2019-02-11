var carta1 = "";
var carta2 = "";
var aux = 1;

$('.carta').on('click', function(){
    $(this).toggleClass('hover');
    if (aux == 1){
        carta1 = $(this).find('.atras').html();
        aux ++;
    }else{
        carta2 = $(this).find('.atras').html();
        aux = 1;
    }

    if (carta1 == carta2){
        alert("Acertou");
    } else {
        $(this).toggleClass('hover');
    }
});

function iniciarJogo(){    
    let cartas = [];
    cartas = $('.painel').find('.atras');
    let valores = ['fa-cat','fa-dog','fa-dove','fa-fish','fa-frog','fa-spider','fa-hippo','fa-horse'];
    
    cartas.each(function(){      
        if (valores.length == 0){
            valores = ['fa-cat','fa-dog','fa-dove','fa-fish','fa-frog','fa-spider','fa-hippo','fa-horse'];
        }  
        let indice = Math.floor(Math.random()*(valores.length));
        $(this).append('<i class="fas '+valores[indice]+'"></i>');
        valores.splice(indice,1);
    });
};

$(document).ready(
    iniciarJogo()
);