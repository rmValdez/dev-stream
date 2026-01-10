export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  duration: string;
  status: "playing" | "pending" | "queued";
  cover: string;
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
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
  },
  {
    id: "t2",
    title: "Kernel Panic Rhythms",
    artist: "Root_Access",
    bpm: 140,
    key: "A Minor",
    duration: "04:12",
    status: "pending",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  },
  {
    id: "t3",
    title: "Null Pointer Exception",
    artist: "The Debuggers",
    bpm: 95,
    key: "C Major",
    duration: "02:45",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  },
  {
    id: "t4",
    title: "Cyberpunk City Lights",
    artist: "Neon_Drifter",
    bpm: 110,
    key: "E Minor",
    duration: "03:30",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
  },
  {
    id: "t5",
    title: "Mainframe Breach",
    artist: "Zero_Day",
    bpm: 174,
    key: "F Minor",
    duration: "04:05",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  },
  {
    id: "t6",
    title: "Quantum Healing Frequencies",
    artist: "Bio_Hacker",
    bpm: 80,
    key: "G Major",
    duration: "05:12",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
  },
  {
    id: "t7",
    title: "Recursive Funk",
    artist: "Algo_Rhythm",
    bpm: 115,
    key: "Bb Minor",
    duration: "03:45",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  },
  {
    id: "t8",
    title: "Blockchain Beats",
    artist: "Crypto_Miner",
    bpm: 130,
    key: "Eb Major",
    duration: "03:15",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
  },
  {
    id: "t9",
    title: "Server Room Ambient",
    artist: "Sys_Admin",
    bpm: 60,
    key: "C Minor",
    duration: "10:00",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
  },
  {
    id: "t10",
    title: "DDOS Attack (Drop It)",
    artist: "White_Hat",
    bpm: 150,
    key: "F# Minor",
    duration: "03:55",
    status: "queued",
    cover:
      "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
  },
];
