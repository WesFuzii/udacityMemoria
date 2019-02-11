var lista = $('.card');
var contador = $('.moves');
var openCards = [];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

lista = shuffle(lista);
$('.card').remove();
var deck = $('.deck');
$.each(lista, function (index, value) {
    deck.append(value);
});

function show(e) {
    e.toggleClass('show');
    e.toggleClass('open');
}

function match(e) {
    e.toggleClass('match');
}

function pushCard(e) {
    openCards.push(e);
}

function addCounter() {
    contador.text(parseInt(contador.text()) + 1);
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
}

function victory() {
    var msg = 'Venceu!\nTentativas: '+contador.text();
    alert(msg);
}

$('.card').click(function () {
    if (!$(this).hasClass('open') && !$(this).hasClass('match')) {
        show($(this));
        pushCard($(this));
        addCounter();
        if (openCards.length > 1) {
            if (openCards[0][0].children[0].className == openCards[1][0].children[0].className) {
                match(openCards[0]);
                match(openCards[1]);
            } else {
                show(openCards[0]);
                show(openCards[1]);
            }            
            openCards = [];
        }
        if ($('.card.open').length == 16) {
            victory();
        }
    }
});

$('.restart').click(function () {
    location.reload();
});