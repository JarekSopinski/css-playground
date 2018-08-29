// caching DOM
const $countersContainer = $('#counters-container');
const $counters = $('.counter');

// this will be updated to true upon counter initialization to prevent initializing counter more than once
let finishedCounting = false;  

const runCounters = () => {  

    if ( scrollY > ($countersContainer.offset().top - window.innerHeight) && !finishedCounting ) {

        $counters.each(function() {

            const $this = $(this);
    
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
              duration: 3000,
              easing: 'swing',
              step: function() {
                $this.text(Math.ceil(this.Counter));
              }
            });
    
          });

        finishedCounting = true;

    }

};

$(window).on('scroll', runCounters);