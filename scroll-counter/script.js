// caching DOM
const $countersContainer = $('#counters-container');
const $counter1 = $('#counter1');
const $counter2 = $('#counter2');
const $counter3 = $('#counter3');

// endValue - number at which counter stops; $counter - place in DOM to which updated number is rendered
const values = [
    {endValue: 6032, $counter: $counter1},
    {endValue: 29, $counter: $counter2},
    {endValue: 31668, $counter: $counter3}
];

// this will be updated to true upon counter initialization to prevent initializing counter more than once
let wasCounterInitialized = false;

// adjust speed to endValue - higher number means faster counting
const adjustSpeed = endValue => {

    let speed;

    if (endValue <= 10) { speed = 200 }
    else if (endValue > 10 && endValue <= 50) { speed = 100 }
    else if (endValue > 50 && endValue <= 100) { speed = 50 }
    else if (endValue > 100 && endValue <= 500) { speed = 15 }
    else if (endValue > 500 && endValue <= 1000) { speed = 5 }
    else if (endValue > 1000) { speed = 1 }

    return speed

}

const increment = (endValue, $counter) => {

    let init = 0;
    const speed = adjustSpeed(endValue);

    const interval = setInterval(() => {

        if (endValue <= 1000) { init++ }
        // Additional speeding up for big numbers by usining higher incrementation (also better performance):
        else if (endValue > 1000 && endValue <= 10000) { init += 5 }
        else { init += 25 } // over 10 000

        $counter.text(init);

        if (init >= endValue) {
            clearInterval(interval);
            /* 
            Additional speeding might cause counter to go a little beyond endValue. 
            Rendering endValue itself after counter stops fixes this problem:
            */
            $counter.text(endValue);
        }

    }, speed);

};

const initializeCounter = () => {

    if ( scrollY > ($countersContainer.offset().top - window.innerHeight) && !wasCounterInitialized ) {

        values.forEach(value => increment(value.endValue, value.$counter)) // initialize incrementation for each value
        wasCounterInitialized = true; // prevents initializing counter more than once

    }

};

$(window).on('scroll', initializeCounter)