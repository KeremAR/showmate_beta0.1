const storedData = JSON.parse(localStorage.getItem('TVData'));

// Fetch data if local storage is empty
if (!storedData) {
    fetch("TVData.json")
        .then(response => response.json())
        .then(data => {
            updateLocalStorage(data); // Save the fetched data to local storage
            console.log("Fetched Data:", data); // Log fetched data to console
            displayShowsByStatus();
        })
        .catch(error => console.error("Fetch Error:", error)); // Log any fetch errors
} else {
    console.log("Stored Data:", storedData); // Log stored data to console
    displayShowsByStatus();
}

function displayShowsByStatus() {
    console.log("Displaying shows by status"); // Log that the display function is called
    const watchingShows = storedData.filter(show => show.status === "Watching");
    const notStartedShows = storedData.filter(show => show.status === "Not Started Yet");
    const endedShows = storedData.filter(show => show.status === "Ended");

    console.log("Watching Shows:", watchingShows);
    console.log("Not Started Shows:", notStartedShows);
    console.log("Ended Shows:", endedShows);

    displayShows("watchingShows", watchingShows);
    displayShows("notStartedShows", notStartedShows);
    displayShows("endedShows", endedShows);
}

function displayShows(containerId, shows) {
    const container = document.getElementById(containerId);

    shows.forEach(show => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("tv-show");
        showDiv.innerHTML = `
            <h3>${show.title}</h3>
            <p>Genre: ${show.genre}</p>
            <p>Network: ${show.network}</p>
            <a href="showpage.html?show=${encodeURIComponent(JSON.stringify(show))}" target="_blank">View Details</a>
        `;
        container.appendChild(showDiv);
    });
}

function updateLocalStorage(data) {
    localStorage.setItem('TVData', JSON.stringify(data));
}