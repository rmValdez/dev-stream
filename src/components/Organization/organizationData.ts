export interface User {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "dnd";
  avatar: string;
}

export interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
    color: string;
  };
  content: string;
  timestamp: string;
  isSystem?: boolean;
}

const ROLES = [
  "Lead Engineer",
  "DevOps",
  "UI/UX",
  "PM",
  "React Specialist",
  "Node.js Guru",
  "Infosec",
  "Automation",
  "Intern",
  "Data Scientist",
];

const NAMES = [
  "Sarah",
  "Alex",
  "Mike",
  "Jessica",
  "David",
  "Emily",
  "Chris",
  "System_Bot",
  "Ryan",
  "Lisa",
  "Tom",
  "Anna",
  "James",
  "Sophie",
  "Dan",
  "Emma",
  "Rob",
  "Kate",
  "Nick",
  "Olivia",
];

const COLORS = [
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
  "text-yellow-400",
  "text-red-400",
  "text-pink-400",
  "text-cyan-400",
  "text-orange-400",
];

const AVATARS = [
  "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
];

const MESSAGE_TEMPLATES = [
  "Has anyone reviewed the latest PR?",
  "Deploying to staging in 10 mins.",
  "Can we check the logs for error 500?",
  "Coffee break anyone?",
  "The new design looks slick!",
  "I'm stuck on this bug, help appreciated.",
  "Meeting in 5.",
  "Did you see the latest tech news?",
  "Optimizing the database queries now.",
  "Security patch applied.",
  "Who broke the build?",
  "Tests are passing green.",
  "Need access to the S3 bucket.",
  "Updating dependencies...",
  "LGTM!",
];

const STATUSES: ("online" | "offline" | "dnd")[] = [
  "online",
  "offline",
  "dnd",
  "online",
  "online",
];

const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    return {
      id: `${i + 1}`,
      name: `${name}_${role.split(" ")[0]}`,
      role: role,
      status: status,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    };
  });
};

const generateMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  const baseTime = new Date();
  baseTime.setHours(9, 0, 0, 0); // Start at 9:00 AM today

  for (let i = 0; i < count; i++) {
    const isSystem = Math.random() > 0.95;
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    const content =
      MESSAGE_TEMPLATES[Math.floor(Math.random() * MESSAGE_TEMPLATES.length)];

    // Increment time by 1-5 minutes for each message
    baseTime.setMinutes(
      baseTime.getMinutes() + Math.floor(Math.random() * 5) + 1
    );

    // Format timestamp
    const hour = baseTime.getHours();
    const minute = baseTime.getMinutes().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;

    messages.push({
      id: `${i + 1}`,
      user: {
        name: isSystem ? "System" : `${name}_${role.split(" ")[0]}`,
        avatar: isSystem
          ? ""
          : AVATARS[Math.floor(Math.random() * AVATARS.length)],
        color: isSystem
          ? "text-primary"
          : COLORS[Math.floor(Math.random() * COLORS.length)],
      },
      content: isSystem
        ? `System Alert: Process ${Math.floor(Math.random() * 9000)} started.`
        : content,
      timestamp: `${hour12}:${minute} ${ampm}`,
      isSystem: isSystem,
    });
  }
  return messages;
};

export const MOCK_USERS = generateUsers(100);
export const MOCK_MESSAGES = generateMessages(500);
