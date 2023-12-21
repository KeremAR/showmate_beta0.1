document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const episodeData = JSON.parse(decodeURIComponent(queryParams.get("episode")));

    displayEpisodeInfo(episodeData);
});

function displayEpisodeInfo(episode) {
    const episodeInfoContainer = document.getElementById("episodeInfo");
    episodeInfoContainer.innerHTML = `

        <h2>${episode.title}</h2>
        <p>Description: ${episode.description}</p>
        <p>Air Date: ${episode.airDate}</p>
        <p>Watched: ${episode.watched ? 'Yes' : 'No'}</p>
    `;
}