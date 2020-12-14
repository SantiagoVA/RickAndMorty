const d = document,
$main = d.getElementById("elem"),
$links = d.querySelector(".links");
let urlAPI = "https://rickandmortyapi.com/api/character";
var section1 = document.querySelector(".section1");
var more = document.querySelector(".more");


//call API
async function loadCharacters(url) {
    try {
        $main.innerHTML = `<img class="loader" src="./assets/loader.svg">`
        
        let res = await fetch(url), 
        json = await res.json(),
        $template = "",
        $prevLink,
        $nextLink;
        console.log(json);

        if(!res.ok) throw {status: res.status, statusText: res.statusText}

        for(let i = 0; i < json.results.length; i++) {
            // console.log(json.results[i]);
            try {
                let res = await fetch(json.results[i].url),
                characters = await res.json();
                // console.log(res, characters)
                if(!res.ok) throw {status: res.status, statusText: res.statusText}

                $template += `
                <figure>
                <img src="${characters.image}" alt="${characters.name}">
                <figcaption>${characters.name}</figcaption>
                <h2>Status: ${characters.status}</h2>
                <h2>Species: ${characters.species}</h2>
                <h2>Gender: ${characters.gender}</h2>
                </figure>
                `
            }
            catch (err) {
                console.log(err);
        let message = err.statusText || "Ocurrió un error";
        $template += `
        <figure>
        <figcaption>Error ${err.status}: ${message}</figcaption>
        </figure>
        `;
            }
            $main.innerHTML = $template;
            $prevLink = json.info.prev ? `<a ><button class="previous" href="${json.info.prev}">Previous</button></a>`:"";
            $nextLink = json.info.next ? `<a > <button class="next" href="${json.info.next}">Next</button> </a>`:"";
            $links.innerHTML = $prevLink + "" + $nextLink;
        }
    } catch (err){
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        $main.innerHTML = `<p>Error${err.status} : ${message}</p>`;
        
        
    }
}

//addEventsListeners
d.addEventListener("DOMContentLoaded", e=> loadCharacters(urlAPI))
d.addEventListener("click", e=> {
    if (e.target.matches(".links a button")){
        e.preventDefault();
        loadCharacters(e.target.getAttribute("href"));z
    }
});


//Functions

//Characters smoothScroll
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease (t, b, c, d) {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}




section1.addEventListener("click", function(){
    smoothScroll(".section2", 800);
});


//purpose SmoothScroll
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease (t, b, c, d) {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}




more.addEventListener("click", function(){
    smoothScroll(".purpose", 1200);
});
