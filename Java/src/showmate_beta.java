import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Component interface for composite pattern
interface TV {
    void watch();
}

// Leaf class for composite pattern
class Episode implements TV {
    private final int episodeNumber;
    private final List<Integer> watchedEpisodes = new ArrayList<>();


    public Episode(int episodeNumber) {
        this.episodeNumber = episodeNumber;
    }

    @Override
    public void watch() {
        watchedEpisodes.add(episodeNumber);

        System.out.println("Watched Episode " + episodeNumber);
    }

    public boolean isWatched() {
        return !watchedEpisodes.isEmpty();
    }
    public int getEpisodeNumber() {
        return episodeNumber;
    }

}

// Composite class for composite pattern
// ...

class Season implements TV {
    private final int seasonNumber;
    private final List<TV> episodes = new ArrayList<>();

    public Season(int seasonNumber, int numEpisodes) {
        this.seasonNumber = seasonNumber;
        for (int i = 1; i <= numEpisodes; i++) {
            episodes.add(new Episode(i));
        }
    }
    public int getSeasonNumber() {
        return seasonNumber;
    }

    @Override
    public void watch() {
        System.out.println("Watching Season " + seasonNumber);
        for (TV episode : episodes) {
            if (!((Episode) episode).isWatched()) {
                episode.watch();
            }
        }
    }


    public List<TV> getEpisodes() {
        return episodes;
    }
    public boolean isSeasonWatched() {
        for (TV episode : episodes) {
            if (!((Episode) episode).isWatched()) {
                return false;
            }
        }
        return true;
    }
}


// ...


// Composite class for composite pattern
class TvShow implements TV {
    private final String title;
    private final List<TV> seasons = new ArrayList<>();

    public TvShow(String title) {
        this.title = title;
    }
    public String getTitle() {
        return title;
    }

    public void addSeason(Season season) {
        seasons.add(season);
    }

    @Override
    public void watch() {
        System.out.println("Watching TV Show: " + title);
        for (TV season : seasons) {
            season.watch();
        }
    }

    public List<TV> getSeasons() {
        return seasons;
    }
}

// Singleton class for singleton pattern
class TvShowTracker {
    private static TvShowTracker instance;
    private final List<TvShow> trackedShows = new ArrayList<>();

    private TvShowTracker() {
    }

    public static TvShowTracker getInstance() {
        if (instance == null) {
            instance = new TvShowTracker();
        }
        return instance;
    }

    public void trackShow(TvShow show) {
        trackedShows.add(show);
    }
    public List<TvShow> getTrackedShows() {
        return trackedShows;
    }

    public void displayWatchedStatus() {
        System.out.println("Watched Status:");
        for (TvShow show : trackedShows) {
            show.watch();
        }
    }
}



public class showmate_beta {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Create an empty list to store TV shows
        List<TvShow> shows = new ArrayList<>();
        // Singleton instance for tracking shows
        TvShowTracker tracker = TvShowTracker.getInstance();

        // Create TV shows, seasons, and episodes
        TvShow breakingBad = new TvShow("Breaking Bad");
        Season breakingBadSeason1 = new Season(1, 2);
        Season breakingBadSeason2 = new Season(2, 2);
        breakingBad.addSeason(breakingBadSeason1);
        breakingBad.addSeason(breakingBadSeason2);

        TvShow gameOfThrones = new TvShow("Game of Thrones");
        Season gotSeason1 = new Season(1, 2);
        Season gotSeason2 = new Season(2, 2);
        gameOfThrones.addSeason(gotSeason1);
        gameOfThrones.addSeason(gotSeason2);


        tracker.trackShow(breakingBad);
        tracker.trackShow(gameOfThrones);


        int choice;

        do {
            System.out.println("\n1. Mark Episode as Watched\n2. Display Watched Status\n0. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter TV Show index to mark episode as watched: ");
                    int showIndex = scanner.nextInt();

                    List<TvShow> trackedShows = tracker.getTrackedShows();
                    if (showIndex >= 0 && showIndex < trackedShows.size()) {
                        System.out.print("Enter Season index: ");
                        int seasonIndex = scanner.nextInt();

                        List<TV> seasons = trackedShows.get(showIndex).getSeasons();
                        if (seasonIndex >= 0 && seasonIndex < seasons.size()) {
                            System.out.print("Enter Episode index: ");
                            int episodeIndex = scanner.nextInt();

                            List<TV> episodes = ((Season) seasons.get(seasonIndex)).getEpisodes();
                            if (episodeIndex >= 0 && episodeIndex < episodes.size()) {
                                episodes.get(episodeIndex).watch();
                                System.out.println("Episode marked as watched!");
                            } else {
                                System.out.println("Invalid Episode index!");
                            }
                        } else {
                            System.out.println("Invalid Season index!");
                        }
                    } else {
                        System.out.println("Invalid TV Show index!");
                    }
                    break;

                case 2:
                    List<TvShow> trackedShowsList = tracker.getTrackedShows();
                    for (TvShow show : trackedShowsList) {
                        System.out.println("\nTV Show: " + show.getTitle());
                        List<TV> seasons = show.getSeasons();
                        for (TV season : seasons) {
                            Season s = (Season) season;
                            System.out.println("  Season " + s.getSeasonNumber() + ": " +
                                    (s.isSeasonWatched() ? "Watched" : "Not Watched"));

                            List<TV> episodes = s.getEpisodes();
                            for (TV episode : episodes) {
                                Episode e = (Episode) episode;
                                System.out.println("    Episode " + e.getEpisodeNumber() + ": " +
                                        (e.isWatched() ? "Watched" : "Not Watched"));
                            }
                        }
                    }
                    break;


            }

        } while (choice != 0);

        System.out.println("Exiting TV Show Tracker App.");
    }
}


