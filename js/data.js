/*
  ============================================================
  SITE CONTENT — edit this file to update the site.
  ============================================================
  - Projects are pulled LIVE from the GitHub API (see js/github.js),
    so pushing a new public repo makes it appear automatically.
  - "projectOverrides" below lets you give any repo a nicer name,
    a hand-written description, and tags — keyed by the exact
    GitHub repo name. Repos with no override still show up
    automatically, using GitHub's own description as a fallback.
  - Certifications and everything else is manual — add a new
    object to the relevant array and drop images in assets/certs/.
  ============================================================
*/

const SITE_DATA = {
  name: "Muhammad Zain-Ul-Abdin",
  handle: "zainsial866",
  tagline: "Exploring Offensive Security, Windows Internals & Malware Dev",
  location: "Islamabad, Pakistan",
  githubUser: "zainsial866",

  bootLines: [
    { cmd: "whoami", output: "Muhammad Zain-Ul-Abdin" },
    { cmd: "cat role.txt", output: "Cybersecurity Student — Offensive Security" },
    { cmd: "cat status.txt", output: "Heading toward cloud security next." },
  ],

  aboutShort: "I like taking things apart to understand how they break. I'm a cybersecurity student, not an expert — and I'd rather show you the actual work than talk myself up.",

  about: [
    "I like taking things apart to understand how they break. That's turned into building Windows stealth primitives in C and x86-64 Assembly, a C2/RAT research platform to study red team infrastructure, and a multithreaded HTTP server paired with a live dashboard for tracking suspicious traffic.",
    "I'm early in this — a cybersecurity student, not an expert — and I'd rather show you the actual work than talk myself up. Right now that work is Windows internals and malware development fundamentals. Cloud security is where I'm headed next.",
    "Alongside my own projects, I'm a Red Team Intern at Fortivra Tech, working on vulnerability assessment and penetration testing in controlled environments, and I compete in CTFs whenever I get the chance — most recently placing 1st in Fortivra Tech's internal Samurai Mini CTF.",
    "If you're working in offensive security or just curious how any of this stuff works, I'm always up for talking shop."
  ],

  skills: [
    { name: "C / C++", note: "primary systems language" },
    { name: "x86-64 Assembly", note: "GAS / Intel syntax" },
    { name: "Python", note: "tooling & scripting" },
    { name: "Windows Internals", note: "Nt-level APIs, PE format" },
    { name: "Reverse Engineering", note: "x64dbg, IDA" },
    { name: "Malware Analysis", note: "FLARE-VM" },
    { name: "Penetration Testing", note: "network & web" },
    { name: "Network Security", note: "Wireshark" }
  ],

  timeline: [
    { date: "Sept 2025", label: "Started BS Cybersecurity", detail: "Sir Syed CASE Institute of Technology" },
    { date: "Apr 2026", label: "Red Team Intern", detail: "Fortivra Tech" },
    { date: "2026", label: "1st Position", detail: "Samurai Mini CTF, Fortivra Tech" }
  ],

  socials: [
    { label: "github", url: "https://github.com/zainsial866" },
    { label: "linkedin", url: "https://www.linkedin.com/in/muhammad-zain-ul-abdin-1b4073375/" },
    { label: "hashnode", url: "https://hashnode.com/@iamzainsial" },
    { label: "dev.to", url: "https://dev.to/iamzsial" },
    { label: "bluesky", url: "https://bsky.app/profile/iamzsial.bsky.social" },
    { label: "email", url: "mailto:zainsial866@gmail.com" }
  ],

  // Left HUD — same on every page (desktop only)
  environmentHud: [
    { label: "OS", value: "Linux" },
    { label: "SHELL", value: "zsh" },
    { label: "ARCH", value: "x86_64" },
    { label: "MODE", value: "RESEARCH" },
    { label: "STATUS", value: "ONLINE" }
  ],
  environmentTags: ["LINUX", "C/C++", "ASM", "RE", "WINAPI", "CLOUD", "MALDEV", "NETWORK"],
  processList: [
    { pid: "1337", name: "zsh" },
    { pid: "2048", name: "nvim" },
    { pid: "4096", name: "tmux" }
  ],
  networkPorts: [
    { port: "22", label: "SSH" },
    { port: "80", label: "HTTP" },
    { port: "443", label: "HTTPS" }
  ],
  toolchain: ["Ghidra", "WinDbg", "x64dbg", "Burp Suite", "Wireshark", "GDB", "Nmap", "Git"],
  target: [
    { label: "PLATFORM", value: "Windows" },
    { label: "ARCH", value: "x86 / x64" },
    { label: "NETWORK", value: "TCP/IP" },
    { label: "NEXT", value: "Cloud Sec" }
  ],

  // Page-specific floating background fragments — same visual system, different content per page
  floatingCommandsByPage: {
    home: [
      "$ whoami", "$ uname -a", "$ nmap -sC -sV target", "$ ps aux", "$ sudo -l",
      "C++", "Linux", "Windows", "RE", "Cloud Security",
      "$ git status", "0x00401000", "kernel32.dll", "ELF64", "TCP/443"
    ],
    about: [
      "C++", "Assembly", "Windows Internals", "Reverse Engineering",
      "Offensive Security", "Cloud Security", "currently_learning", "roadmap",
      "$ cat status.txt", "mov rax, 0x1", "push rbp", "x86_64", "syscall"
    ],
    projects: [
      "$ git clone", "$ git status", "$ git commit -m", "$ git push",
      "cmake", "gcc", "g++", "./binary", "GitHub API", "repository",
      "commit", "branch", "$ make", "0x7fffffffe120"
    ],
    certs: [
      "verify", "credential", "certificate", "SHA256", "SHA512",
      "issuer", "security", "networking", "incident response", "OSINT",
      "$ gpg --verify", "cert.pem", "x509", "CVE-2026"
    ],
    contact: [
      "$ curl -s api", "$ ping -c4", "TCP", "HTTPS", "DNS", "SSH",
      "connection", "channel", "encrypted", "online", "available",
      "$ nc -zv host 443", "handshake", "ACK"
    ]
  },

  // Home page terminal activity log + status chips
  activityLog: [
    { time: "11:42:08", msg: "system initialized" },
    { time: "11:42:09", msg: "security modules loaded" },
    { time: "11:42:10", msg: "awaiting input..." }
  ],
  statusChips: ["OFFENSIVE SECURITY", "WINDOWS INTERNALS", "REVERSE ENGINEERING", "C/C++", "ASSEMBLY", "CLOUD SECURITY"],

  // About page — right profile panel + learning trajectory
  profilePanel: [
    { label: "role", value: "student" },
    { label: "focus", value: "offensive" },
    { label: "platform", value: "Windows" },
    { label: "lang", value: "C/C++" },
    { label: "arch", value: "x86/x64" },
    { label: "next", value: "cloud" }
  ],
  trajectory: ["Foundation", "C / C++", "Windows Internals", "Reverse Engineering", "Offensive Security", "Cloud Security"],
  currentFocus: ["Windows Internals", "Reverse Engineering", "Malware Development Fundamentals"],

  projectOverrides: {
    "selfDELETION": {
      description: "Windows stealth primitives written in C and x86-64 Assembly. Implements anti-forensic and evasion techniques mapped to MITRE ATT&CK — file deletion, indicator removal, process injection, persistence.",
      tags: ["C", "x86-64 Assembly", "Evasion", "MITRE ATT&CK"]
    },
    "RAT1": {
      description: "Custom command-and-control research project in C, including keylogging and registry-based persistence (HKCU\\...\\Run). Built to study Windows internals and red team infrastructure patterns.",
      tags: ["C", "C2", "Windows Internals"]
    },
    "HttpServer": {
      niceName: "HttpServer — Sentinel SOC Dashboard",
      description: "Multithreaded HTTP server in C using POSIX sockets and pthreads, paired with a React dashboard for live IP tracking, rate-limit detection, and flood alerting.",
      tags: ["C", "POSIX", "pthreads", "React"]
    },
    "Kioptrix-Level-4": {
      description: "Full walkthrough of the Kioptrix Level 4 boot2root VM: enumeration, exploitation, privilege escalation, documented start to finish.",
      tags: ["Pentest", "Writeup", "VulnHub"]
    },
    "Kioptrix-Level-3": {
      description: "Boot2root walkthrough of Kioptrix Level 3 — enumeration through privilege escalation.",
      tags: ["Pentest", "Writeup", "VulnHub"]
    },
    "Kioptrix-Level-2": {
      description: "Boot2root walkthrough of Kioptrix Level 2 — enumeration through privilege escalation.",
      tags: ["Pentest", "Writeup", "VulnHub"]
    },
    "Kioptrix-Level-1": {
      description: "Boot2root walkthrough of Kioptrix Level 1 — enumeration through privilege escalation.",
      tags: ["Pentest", "Writeup", "VulnHub"]
    },
    "timestomper": {
      description: "Windows file timestamp manipulation tool built directly against Native APIs — reads and rewrites MACE timestamps.",
      tags: ["C", "Windows API", "Anti-forensics"]
    },
    "adstream": {
      description: "NTFS Alternate Data Streams manipulation utility for exploring and abusing hidden data streams on Windows filesystems.",
      tags: ["C", "NTFS", "Windows Internals"]
    },
    "WinLoadLab": {
      description: "Compares embedded vs. on-disk shellcode loading techniques through the Win32 API — a hands-on lab for understanding loader behavior.",
      tags: ["C", "Shellcode", "Win32 API"]
    },
    "infraHub": {
      description: "Security research platform for endpoint telemetry, detection engineering, and defensive infrastructure analysis.",
      tags: ["PHP", "Detection Engineering"]
    },
    "DSA": {
      description: "Data structures and algorithms implementations in C++.",
      tags: ["C++", "DSA"]
    }
  },

  excludedRepos: ["zainsial866", "github-readme-stats", "why-me"],

  certifications: [
    {
      name: "Certified Cybersecurity Foundations (CORE)",
      issuer: "Hackviser",
      date: "Jul 24, 2026",
      image: "assets/certs/hackviser-core.jpg",
      url: "https://hackviser.com/verify?id=HV-CORE-I106VP2F",
      credentialId: "HV-CORE-I106VP2F",
      category: "Cybersecurity",
      description: "Awarded for completing Hackviser's CORE training modules and practical security exercises, covering foundational cybersecurity competence across network and web security, OWASP Top 10, social engineering, OSINT, cryptology, incident response, and LLM security."
    },
    {
      name: "Cyber Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      date: "Jun 30, 2026",
      image: "assets/certs/deloitte.png",
      url: null,
      credentialId: "vwyF6puQDoZDb2772",
      category: "Cybersecurity",
      description: "A hands-on cybersecurity investigation modeled on a real incident response scenario. Completed practical tasks in cyber security over the course of the simulation, including web server log analysis to identify an anomalous session."
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Jun 29, 2026",
      image: "assets/certs/cisco-intro.jpeg",
      url: null,
      credentialId: "c2c7d7c1-8067-4f2d-a998-5de702de11e9",
      category: "Networking",
      description: "Foundational course covering core cybersecurity concepts, network security basics, and the modern threat landscape."
    },
    {
      name: "Introduction to Critical Infrastructure Protection",
      issuer: "OPSWAT Academy",
      date: "Jul 19, 2025",
      image: "assets/certs/opswat-icip.png",
      url: "https://learn.opswatacademy.com/certificate/zNd33DcHWg",
      credentialId: "zNd33DcHWg",
      category: "Cybersecurity",
      description: "Graduate-level completion of OPSWAT's Introduction to CIP program (0.50 CPE credits), covering the standards and fundamentals of protecting critical infrastructure systems."
    },
    {
      name: "MetaCTF Flash CTF — Participant",
      issuer: "MetaCTF",
      date: "Apr 23, 2026",
      image: "assets/certs/metactf.png",
      url: null,
      credentialId: null,
      category: "Cybersecurity",
      description: "Competed in the April 2026 MetaCTF Flash CTF, a 2-hour timed capture-the-flag event."
    },
    {
      name: "Samurai Mini CTF '26 — 1st Position",
      issuer: "Fortivra Tech",
      date: "2026",
      image: "assets/certs/samurai-ctf.jpeg",
      url: null,
      credentialId: null,
      category: "Cybersecurity",
      description: "Secured 1st position in the Samurai Mini CTF hackathon organized by Fortivra Tech, competing as team \"The AAR PAARS.\""
    }
  ]
};
