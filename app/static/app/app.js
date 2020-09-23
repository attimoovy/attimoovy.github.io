document.addEventListener('DOMContentLoaded', function() {
if (document.querySelector('form')) {
    document.querySelector('form').onsubmit = function() {

        // Send a GET request to the URL
        fetch('https://api.covid19api.com/summary')
        // Put response into json form
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Get currency from user input and convert to upper case
            const currency = document.querySelector('#country_input').value;

            // Get rate from data
            const rate = data.Countries;
            const length = rate.length;

            for (i = 0; i < length; i++) {
                if (data.Countries[i].Country == currency) {
                    console.log(currency);
                    document.querySelector('#country').innerHTML = data.Countries[i].Country;
                    document.querySelector('#new_cases').innerHTML = data.Countries[i].NewConfirmed;
                    document.querySelector('#total_cases').innerHTML = data.Countries[i].TotalConfirmed;
                    document.querySelector('#new_deaths').innerHTML = data.Countries[i].NewDeaths;
                    document.querySelector('#total_deaths').innerHTML = data.Countries[i].TotalDeaths;
                    document.querySelector('#new_recover').innerHTML = data.Countries[i].NewRecovered;
                    document.querySelector('#total_recover').innerHTML = data.Countries[i].TotalRecovered;
                    return;
                }
                else if(i == length-1){
                    document.querySelector('#country_input').style.border = '2px solid red';
                }
            }
            
        })
        // Catch any errors and log them to the console
        .catch(error => {
            console.log('Error:', error);
        });
        // Prevent default submission
        return false;
    }
}

if (document.querySelector('.global')) {
    document.querySelector('.global').addEventListener('click', event => {
        fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#country').innerHTML = "Global";
            document.querySelector('#new_cases').innerHTML = data.Global.NewConfirmed;
            document.querySelector('#total_cases').innerHTML = data.Global.TotalConfirmed;
            document.querySelector('#new_deaths').innerHTML = data.Global.NewDeaths;
            document.querySelector('#total_deaths').innerHTML = data.Global.TotalDeaths;
            document.querySelector('#new_recover').innerHTML = data.Global.NewRecovered;
            document.querySelector('#total_recover').innerHTML = data.Global.TotalRecovered;
            document.querySelector('#country_input').style.border = '1px solid black';
            document.getElementById('country_input').value = '';
        })
    })
}
if (document.querySelector('#country_input')) {
    document.querySelector('#country_input').addEventListener('click', e => {
        document.querySelector('#country_input').style.border = '1px solid black';
    });
}
    //learn page
    document.querySelectorAll('.learn_buttons').forEach(button => {
        button.onclick = function() {
            showPage(this.dataset.page);
        }
    });
});

function showPage(page) {
    document.querySelectorAll('.learn_content').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelectorAll(`.learn_buttons`).forEach(button => {
        button.classList.remove('learn_active');
    });
    document.querySelector(`#${page}`).style.display = 'block';
    document.querySelector(`#button${page}`).classList.add('learn_active');
}








//navbar
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-list');
    const navList = document.querySelectorAll('.nav-list li');
    const carousel_ting = document.querySelector('body');

    burger.addEventListener('click',()=> {
        nav.classList.toggle('nav-toggle');
        carousel_ting.classList.toggle('carousel-index');
        navList.forEach((item, index) => {
            if (item.style.animation){
                item.style.animation = '';
                
            }
            else {
            item.style.animation = `listSlide 0.5s ease forwards ${index / 7 + 0.4}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
    
};

const carousel = () => {
    
    //select elements
    const track = document.querySelector('.carousel__track');
    if (track == null) {
        return;
    }
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);

    //get width of slides
    const slideWidth = slides[0].getBoundingClientRect().width;

    //adjust initial position of slides
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    //create function to move slides
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
        else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        }
        else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    }

    //when i click left, move slides left
    prevButton.addEventListener('click', event => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    //when i click right, move slides right
    nextButton.addEventListener('click', event => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });


    //when i click nav indicators, move to that slide

    dotsNav.addEventListener('click', event => {
        //what indicator was clicked on
        const targetDot = event.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
        
        
    });

    
};

const quiz = () => {

    function buildQuiz(){
        
        // variable to store the HTML output
        const output = [];
    
        // for each question...
        myQuestions.forEach(
          (currentQuestion, questionNumber) => {
    
            // variable to store the list of possible answers
            const answers = [];
    
            // and for each available answer...
            for(letter in currentQuestion.answers){
    
              // ...add an HTML radio button
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  
                  ${currentQuestion.answers[letter]}
                </label>`
              );
            }
    
            // add this question and its answers to the output
            output.push(
              `<div class="slide">
              <progress class="progress" value="${questionNumber}" max="${myQuestions.length}"> </progress>
                <div class="question">${currentQuestion.question}</div>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
            );
          }
        );
    
        // finally combine our output list into one string of HTML and put it on the page
        if (quizContainer == null) {
            return;
        }
        quizContainer.innerHTML = output.join('');
      }
    
      function showResults(){
        
        document.querySelector('.quiz-content').style.display = "none";
        document.querySelector('#restartQuiz').style.display = "block";

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');
    
        // keep track of user's answers
        let numCorrect = 0;
    
        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {
    
          // find selected answer
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
          // if answer is correct
          if(userAnswer === currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;
    
            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
          }
          // if answer is wrong or blank
          else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
          }
        });
    
        // show number of correct answers out of total
        resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length}`;
      }
    
      function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0){
          previousButton.style.display = 'none';
        }
        else{
          previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
          nextButton.style.display = 'none';
          submitButton.style.display = 'inline-block';
        }
        else{
          nextButton.style.display = 'inline-block';
          submitButton.style.display = 'none';
        }
      }
    
      function showNextSlide() {
        showSlide(currentSlide + 1);
      }
    
      function showPreviousSlide() {
        showSlide(currentSlide - 1);
      }
    
      // Variables
      const quizContainer = document.getElementById('quiz');
      const resultsContainer = document.getElementById('results');
      const submitButton = document.getElementById('submitQuiz');
      const myQuestions = [
        {
          question: "What is the recommended amount of time to wash your hands for?",
          answers: {
            a: "30 seconds",
            b: "5 minutes",
            c: "2 minutes"
          },
          correctAnswer: "c"
        },
        {
          question: "Which animal was assumed to have caused COVID-19?",
          answers: {
            a: "A bat",
            b: "A dog",
            c: "A giraffe"
          },
          correctAnswer: "a"
        },
        {
          question: "Which country did COVID-19 first originate from?",
          answers: {
            a: "USA",
            b: "India",
            c: "China",
            d: "Japan"
          },
          correctAnswer: "c"
        },
        {
          question: "What is the recommended distance between every two people in compliance with social distancing procedures?",
          answers: {
            a: "2 metres",
            b: "6 feet",
            c: "6 metres",
            d: "5 feet"
          },
          correctAnswer: "b"
        },
        {
          question: "Which individuals or groups are most at risk of contracting COVID-19?",
          answers: {
            a: "Teenagers",
            b: "Toddlers",
            c: "Elderly",
            d: "Adults"
          },
          correctAnswer: "c"
        },
        {
          question: "How long does it usually take for symptoms of COVID-19 to appear after contracting it?",
          answers: {
            a: "14 days",
            b: "1 week",
            c: "10 days",
            d: "Immediately"
          },
          correctAnswer: "a"
        },
        {
          question: "Should one wear a mask in order to reduce his/her chances of contracting COVID-19?",
          answers: {
            a: "Yes",
            b: "No",
          },
          correctAnswer: "a"
        },
        {
            question: "What was the city called where COVID-19 was assumed to have originated from?",
            answers: {
              a: "Tokyo",
              b: "New York",
              c: "Beijing",
              d: "Wuhan"
            },
            correctAnswer: "d"
          },
          {
            question: "How can COVID-19 spread from one person to another?",
            answers: {
              a: "Coughing",
              b: "Sneezing",
              c: "Close Contact",
              d: "All of the above"
            },
            correctAnswer: "d"
          },
          {
            question: "How has 2020 been so far?",
            answers: {
              a: "Pretty good actually",
              b: "Absolutely Horrible",
              c: "Absolutely Amazing",
              d: "Best year of my life"
            },
            correctAnswer: "b"
          },
      ];
    
      // Kick things off
     buildQuiz();
      
    
      // Pagination
      const previousButton = document.getElementById("previous");
      if (previousButton == null) {
          return;
      }
      const nextButton = document.getElementById("next");
      const slides = document.querySelectorAll(".slide");
      let currentSlide = 0;
    
      // Show the first slide
      showSlide(currentSlide);
    
      // Event listeners
      submitButton.addEventListener('click', showResults);
      previousButton.addEventListener("click", showPreviousSlide);
      nextButton.addEventListener("click", showNextSlide);
    };

    function showQuiz() {
        document.getElementById('startQuiz').style.display = "none";
        document.querySelector('.quiz-content').style.display = "block";
    }

    function reshowQuiz() {
        
        location.reload();
    }

quiz();
navSlide();
carousel();




