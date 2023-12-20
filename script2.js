console.log("Script is running");

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
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Show basic information (title, genre, network, year)
    const showInfoDiv = document.createElement("div");
    showInfoDiv.innerHTML = `
        <h2>${tvShow.title}</h2>
        <p>Genre: ${tvShow.genre}</p>
        <p>Network: ${tvShow.network}</p>
        <p>Year: ${tvShow.year}</p>
    `;
    modalContent.appendChild(showInfoDiv);

    // Show seasons and episodes
    tvShow.seasons.forEach((season, seasonIndex) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season");

        const seasonHeader = document.createElement("h3");
        seasonHeader.textContent = `Season ${seasonIndex + 1}`;
        seasonHeader.addEventListener("click", function() {
            toggleSeason(seasonDiv);
        });

        const episodeList = document.createElement("ul");
        season.episodes.forEach((episode, episodeIndex) => {
            const episodeItem = document.createElement("li");
            episodeItem.innerHTML = `
                <span>${episode.title}</span>
                <span>Status: ${episode.watched ? 'Watched' : 'Not Watched'}</span>
            `;
            episodeList.appendChild(episodeItem);
        });

        seasonDiv.appendChild(seasonHeader);
        seasonDiv.appendChild(episodeList);
        modalContent.appendChild(seasonDiv);
    });

    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

function toggleSeason(seasonDiv) {
    seasonDiv.classList.toggle("expanded");
}