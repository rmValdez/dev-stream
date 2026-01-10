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

const MOCK_IMAGES = [
  "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
];

export const generateMockPosts = (page: number, limit: number): FeedPost[] => {
  return Array.from({ length: limit }).map((_, i) => {
    const isEven = i % 2 === 0;
    return {
      id: `post-${page}-${i}-${Date.now()}`,
      author: {
        initials: isEven ? "SD" : "RK",
        name: isEven ? "Sarah_Dev" : "Ryan_K",
        role: isEven ? "Master Engineer" : "DevOps Lead",
      },
      timestamp: `${Math.floor(Math.random() * 60)}m ago`,
      content: isEven
        ? "Testing out the new UI grid system for the dashboard components. Everything is aligning perfectly in the latest build."
        : "Just deployed the new microservices architecture. Latency dropped by 40% across the board! 🚀",
      tags: isEven
        ? ["#designsystem", "#frontend", "#ui"]
        : ["#devops", "#k8s", "#performance"],
      image:
        Math.random() > 0.3 ? MOCK_IMAGES[i % MOCK_IMAGES.length] : undefined,
      stats: {
        likes: Math.floor(Math.random() * 500) + 10,
        comments: Math.floor(Math.random() * 100) + 2,
      },
    };
  });
};
