document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const episodeData = JSON.parse(decodeURIComponent(queryParams.get("episode")));

    displayEpisodeInfo(episodeData);
});

function displayEpisodeInfo(episode) {
    const key = `episode_${episode.id}`;
    const localData = localStorage.getItem("watched")
    const wEpisodes = localData ? localData.split(",") : []
    const isWatched = wEpisodes.some(id => id == key)

    const episodeInfoContainer = document.getElementById("episodeInfo");
    episodeInfoContainer.innerHTML = `
        <h2>${episode.title}</h2>
        <p> ${episode.description}</p>
        <p> ${episode.airDate}</p>
        <p>Watched: ${isWatched ? 'Yes' : 'No'}</p>
        `;
}