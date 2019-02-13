/*
 * Timer
 */
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;

function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

/*
 * Create a list that holds all of your cards
 */
var lista = $('.card');
var openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function addCounter() {
    var tentativas = $('.moves');
    var stars = $('.stars');
    tentativas.text(parseInt(tentativas.text()) + 1);

    if (tentativas.text() == '15' || tentativas.text() == '30') {
        stars.children()[0].remove();
    }
}

function vitoria() {
    if ($('.match').length == 16) {
        clearInterval(timerVar);
        $('.tempo-final').text($('#timer').text());
        $('.moves-final').text($('.moves').text());
        $('.stars-final').append($('.stars').html());
        $('#myModal').modal();
    }
}

$('.card').on('click', function () {
    if (openCards.length <= 1) {
        if (!$(this).find('.closed').hasClass('desabilitado')) {
            $(this).toggleClass('girar');
            openCards.push($(this));
            $(this).find('.closed').addClass('desabilitado');

            if (openCards.length == 2) {
                setTimeout(function () {
                    if (openCards[0].find('i').attr('class') == openCards[1].find('i').attr('class')) {
                        openCards[0].find('.open').toggleClass('match');
                        openCards[1].find('.open').toggleClass('match');
                        setTimeout(function () {
                            vitoria();
                        }, 500);
                    } else {
                        openCards[0].toggleClass('girar');
                        openCards[1].toggleClass('girar');
                        openCards[0].find('.closed').removeClass('desabilitado');
                        openCards[1].find('.closed').removeClass('desabilitado');
                    }
                    openCards.pop();
                    openCards.pop();
                    addCounter();
                }, 1000);
            }

        }
    }
});

$('.restart').on('click', function () {
    location.reload();
});