import java.util.*;

// Component interface
interface ShowComponent {
    void markWatched();
    void display();
}

// Leaf class
class Episode implements ShowComponent {
    private String name;
    private boolean watched;

    public Episode(String name) {
        this.name = name;
    }

    @Override
    public void markWatched() {
        watched = true;
    }

    @Override
    public void display() {
        System.out.println("Episode: " + name + " - Watched: " + watched);
    }
}

// Composite class
class Season implements ShowComponent {
    private String name;
    private List<ShowComponent> episodes = new ArrayList<>();

    public Season(String name) {
        this.name = name;
    }

    public void addEpisode(ShowComponent episode) {
        episodes.add(episode);
    }

    @Override
    public void markWatched() {
        for (ShowComponent episode : episodes) {
            episode.markWatched();
        }
    }

    @Override
    public void display() {
        System.out.println("Season: " + name);
        for (ShowComponent episode : episodes) {
            episode.display();
        }
    }

    public List<ShowComponent> getEpisodes() {
        return episodes;
    }
}

// Singleton class
class UserStatusManager {
    private static UserStatusManager instance;
    private Set<String> watchedShows = new HashSet<>();

    private UserStatusManager() {
        // Private constructor to prevent instantiation
    }

    public static UserStatusManager getInstance() {
        if (instance == null) {
            instance = new UserStatusManager();
        }
        return instance;
    }

    public void markShowWatched(String showName) {
        watchedShows.add(showName);
    }

    public boolean isShowWatched(String showName) {
        return watchedShows.contains(showName);
    }
}

public class showmate_beta {
    public static void main(String[] args) {
        // Create shows, seasons, and episodes
        // Simulate user interaction
        // Simulate user interaction
        Scanner scanner = new Scanner(System.in);
        UserStatusManager userStatusManager = UserStatusManager.getInstance();

// Assuming breakingBad is a ShowComponent
        ShowComponent breakingBad = new Season("Breaking Bad");

        System.out.println("Choose an action:");
        System.out.println("1. Mark an episode as watched");
        System.out.println("2. Mark a season as watched");
        System.out.println("3. Display status");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.println("Enter episode number:");
                int episodeNumber = scanner.nextInt();
                Episode episodeToMark = (Episode) ((Season) breakingBad).getEpisodes().get(episodeNumber - 1);
                episodeToMark.markWatched();
                System.out.println("Marked episode " + episodeNumber + " as watched.");
                break;

            case 2:
                System.out.println("Marking entire season as watched.");
                ((Season) breakingBad).markWatched();
                break;

            case 3:
                breakingBad.display();
                break;

            default:
                System.out.println("Invalid choice");
        }

// Additional logic for managing user status





// Additional logic for managing user status
    }
}

