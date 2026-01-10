export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  duration: string;
  status: "playing" | "pending" | "queued";
  file_url: string;
}

export const MOCK_TRACKS: Track[] = [
  {
    id: "t1",
    title: "SYNTH_WAVE_INIT.EXE",
    artist: "Sarah_Dev x Logic_Gate",
    bpm: 128,
    key: "D Major",
    duration: "03:52",
    status: "playing",
    file_url: "/favicon.ico",
  },
  {
    id: "t2",
    title: "Kernel Panic Rhythms",
    artist: "Root_Access",
    bpm: 140,
    key: "A Minor",
    duration: "04:12",
    status: "pending",
    file_url: "/favicon.ico",
  },
  {
    id: "t3",
    title: "Null Pointer Exception",
    artist: "The Debuggers",
    bpm: 95,
    key: "C Major",
    duration: "02:45",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t4",
    title: "Cyberpunk City Lights",
    artist: "Neon_Drifter",
    bpm: 110,
    key: "E Minor",
    duration: "03:30",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t5",
    title: "Mainframe Breach",
    artist: "Zero_Day",
    bpm: 174,
    key: "F Minor",
    duration: "04:05",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t6",
    title: "Quantum Healing Frequencies",
    artist: "Bio_Hacker",
    bpm: 80,
    key: "G Major",
    duration: "05:12",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t7",
    title: "Recursive Funk",
    artist: "Algo_Rhythm",
    bpm: 115,
    key: "Bb Minor",
    duration: "03:45",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t8",
    title: "Blockchain Beats",
    artist: "Crypto_Miner",
    bpm: 130,
    key: "Eb Major",
    duration: "03:15",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t9",
    title: "Server Room Ambient",
    artist: "Sys_Admin",
    bpm: 60,
    key: "C Minor",
    duration: "10:00",
    status: "queued",
    file_url: "/favicon.ico",
  },
  {
    id: "t10",
    title: "DDOS Attack (Drop It)",
    artist: "White_Hat",
    bpm: 150,
    key: "F# Minor",
    duration: "03:55",
    status: "queued",
    file_url: "/favicon.ico",
  },
];
