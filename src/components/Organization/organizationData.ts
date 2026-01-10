import { USER_PROFILE } from "../../data/userProfile";

export interface User {
  id: string;
  name: string;
  username?: string;
  role: string;
  status: "online" | "offline" | "dnd";
  avatar: string;
  access_token?: string;
  refresh_token?: string;
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

const AVATARS = ["/favicon.ico", "/favicon.ico"];

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
  const generated = Array.from({ length: count }, (_, i) => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const role = ROLES[Math.floor(Math.random() * ROLES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    return {
      id: `${i + 2}`,
      name: `${name}_${role.split(" ")[0]}`,
      username: name.toLowerCase() + (i + 2),
      role: role,
      status: status,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    };
  });

  // Prepend the detailed mock user
  const currentUser: User = {
    id: USER_PROFILE.id.toString(),
    name: USER_PROFILE.first_name + " " + USER_PROFILE.last_name,
    username: USER_PROFILE.username,
    role: USER_PROFILE.role,
    status: "online",
    avatar: USER_PROFILE.avatar,
  };

  return [currentUser, ...generated];
};

const generateMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  const baseTime = new Date();
  baseTime.setHours(9, 0, 0, 0); // Start at 9:00 AM today

  for (let i = 0; i < count; i++) {
    const isMe = Math.random() > 0.95; // 5% chance it's the current user
    const isSystem = !isMe && Math.random() > 0.95;

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
        name: isMe
          ? `${USER_PROFILE.username} (You)`
          : isSystem
          ? "System"
          : `${name}_${role.split(" ")[0]}`,
        avatar: isMe
          ? USER_PROFILE.avatar
          : isSystem
          ? ""
          : AVATARS[Math.floor(Math.random() * AVATARS.length)],
        color: isMe
          ? "text-primary"
          : isSystem
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
