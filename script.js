fetch("TVData.json")
    .then(response => response.json())
    .then(data => {
        const watchingShows = [];
        const notStartedShows = [];
        const endedShows = [];

        data.forEach(show => {
            const hasWatchedEpisodes = show.episodes.some(episode => episode.watched);
            const allEpisodesWatched = show.episodes.every(episode => episode.watched);

            if (hasWatchedEpisodes) {
                watchingShows.push(show);
            } else if (allEpisodesWatched) {
                endedShows.push(show);
            } else {
                notStartedShows.push(show);
            }
        });

        displayShows("watchingShows", watchingShows);
        displayShows("notStartedShows", notStartedShows);
        displayShows("endedShows", endedShows);
    });

function displayShows(containerId, shows) {
    const container = document.getElementById(containerId);

    shows.forEach(show => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("tv-show");
        showDiv.innerHTML = `
            <h3>${show.title}</h3>
            <p>Genre: ${show.genre}</p>
            <p>Network: ${show.network}</p>
            <button onclick="openShowPage(${JSON.stringify(show)})">View Details</button>
        `;
        container.appendChild(showDiv);
    });
}

function openShowPage(tvShow) {
    // Implement logic to open an individual show page with detailed information
    // Pass the relevant show data to the individual show page
    // You can use a modal, a new page, or any other UI element for this purpose
    displayIndividualShowPage(tvShow);
}

function displayIndividualShowPage(tvShow) {
    // Implement logic to display detailed information about the show, including seasons and episodes
    // Allow users to toggle the watched property of episodes
    // Update the JSON file or store the data persistently in another way to reflect the changes
    // You can use a modal, a new page, or any other UI element for this purpose
    alert(`Details for ${tvShow.title}:\n${JSON.stringify(tvShow, null, 2)}`);
}