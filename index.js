//getting all the required elements
const searchForm = document.querySelector("form");
const movieBox = document.querySelector(".main-container");
const inputBox = document.querySelector(".input-box");

const getMovieDetails = async (movieName) => {
    try {
        const myApiKey = "88ed39e0";
        const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${myApiKey}`);
//check for valid response
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Movie not found");
            } else {
                throw new Error("Unable to fetch movie data. Please try again later."); 
            }
        }
        
        const data = await response.json();  // converting data into json formate 

        if (data.Response === 'False') {
            showError(data.Error); 
        } else {
            showMovieData(data);
        }

    } catch (error) {
        showError(error.message);
    }
};

//function to display elements
const showMovieData = (movieData) => {
    movieBox.classList.remove("nobg");
    movieBox.innerHTML = "";
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = movieData;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title} </h2>`;

    const ratingGenreContainer = document.createElement('div');
    ratingGenreContainer.classList.add('rating-genre');

    const ratingElement = document.createElement('p');
    ratingElement.classList.add('imdb-rating');
    ratingElement.innerHTML = `<strong>Rating: &#11088; </strong> ${imdbRating}`;
    ratingGenreContainer.appendChild(ratingElement);

    const genreList = document.createElement('span');
    genreList.classList.add('genre-list');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim();
        genreList.appendChild(p);
    });
    ratingGenreContainer.appendChild(genreList);

    movieElement.appendChild(ratingGenreContainer);
    movieElement.classList.add("movieElements");

    movieElement.innerHTML += `
        <p> <strong>Release Date:</strong> ${Released}</p>
        <p> <strong>Duration: </strong> ${Runtime}</p>
        <p> <strong>Cast:</strong> ${Actors}</p>
        <p> <strong>Plot:</strong> ${Plot}</p>
    `;

    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title}">`;
    movieBox.appendChild(moviePosterElement);

    movieBox.appendChild(movieElement);
};

const showError = (message) => {
    movieBox.innerHTML = `<div class="error-message"><h2>${message}</h2></div>`; 
    movieBox.classList.add("nobg");
};

//adding event listener
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== "") {
        getMovieDetails(movieName);
    } else {
        showError("Please enter a movie name");
    }
});
