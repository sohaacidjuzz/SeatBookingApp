// Movies data
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

// Variables for DOM elements
const selectMovie = document.getElementById("selectMovie");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const seatContainer = document.getElementById("seatCont");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatElement = document.getElementById("numberOfSeat");
const cancelButton = document.getElementById("cancelBtn");
const proceedButton = document.getElementById("proceedBtn");

// State variables
let selectedSeats = [];
let currentMoviePrice = 7; // Default price for "Flash"

// Populate the movie dropdown
moviesList.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = movie.movieName;
    selectMovie.appendChild(option);
});

// Set default movie details
movieNameElement.textContent = "Flash";
moviePriceElement.textContent = `$ ${currentMoviePrice}`;

// Update movie details when dropdown changes
selectMovie.addEventListener("change", (e) => {
    const selectedMovie = moviesList[e.target.value];
    currentMoviePrice = selectedMovie.price;
    movieNameElement.textContent = selectedMovie.movieName;
    moviePriceElement.textContent = `$ ${currentMoviePrice}`;
    updateTotalPrice();
});

// Add event listeners to seats
const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");
seats.forEach((seat) => {
    seat.addEventListener("click", () => {
        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            selectedSeats = selectedSeats.filter((s) => s !== seat);
        } else {
            seat.classList.add("selected");
            selectedSeats.push(seat);
        }
        updateSelectedSeats();
        updateTotalPrice();
    });
});

// Update selected seats display
function updateSelectedSeats() {
    if (selectedSeats.length > 0) {
        selectedSeatsHolder.innerHTML = selectedSeats
            .map((seat, index) => `<span>Seat ${index + 1}</span>`)
            .join(", ");
    } else {
        selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
    }
    numberOfSeatElement.textContent = selectedSeats.length;
}

// Update total price
function updateTotalPrice() {
    const totalPrice = selectedSeats.length * currentMoviePrice;
    totalPriceElement.textContent = `$ ${totalPrice}`;
}

// Handle cancel button click
cancelButton.addEventListener("click", () => {
    selectedSeats.forEach((seat) => seat.classList.remove("selected"));
    selectedSeats = [];
    updateSelectedSeats();
    updateTotalPrice();
});

// Handle proceed button click
proceedButton.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
        return;
    }
    alert("Yayy! Your Seats have been booked");
    selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
    });
    selectedSeats = [];
    updateSelectedSeats();
    updateTotalPrice();
});
