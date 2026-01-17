export interface FeedPost {
  id: string;
  author: {
    initials: string;
    name: string;
    role: string;
  };
  timestamp: string;
  content: string;
  tags: string[];
  image?: string;
  stats: {
    likes: number;
    comments: number;
  };
}

const MOCK_IMAGES = ["/favicon.ico", "/favicon.ico"];

export const generateMockPosts = (page: number, limit: number): FeedPost[] => {
  return Array.from({ length: limit }).map((_, i) => {
    const isEven = i % 2 === 0;
    const globalIndex = (page - 1) * limit + i;
    return {
      id: `post-${page}-${i}-${globalIndex}`, // Stable ID
      author: {
        initials: isEven ? "SD" : "RK",
        name: isEven ? "Sarah_Dev" : "Ryan_K",
        role: isEven ? "Master Engineer" : "DevOps Lead",
      },
      timestamp: `${(globalIndex % 60) + 1}m ago`, // Stable timestamp
      content: isEven
        ? "Testing out the new UI grid system for the dashboard components. Everything is aligning perfectly in the latest build."
        : "Just deployed the new microservices architecture. Latency dropped by 40% across the board! 🚀",
      tags: isEven
        ? ["#designsystem", "#frontend", "#ui"]
        : ["#devops", "#k8s", "#performance"],
      image:
        globalIndex % 3 !== 0 ? MOCK_IMAGES[i % MOCK_IMAGES.length] : undefined, // Deterministic image
      stats: {
        likes: ((globalIndex * 13) % 500) + 10, // Deterministic likes
        comments: ((globalIndex * 7) % 100) + 2, // Deterministic comments
      },
    };
  });
};
