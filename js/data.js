/*
  ============================================================
  SITE CONTENT — REBRAND UPDATE (August 2026)
  Cloud Security Pivot — Copy this into your site's js/data.js
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
  tagline: "Cloud Security Engineer in Training | Windows Internals & Reverse Engineering Background",
  location: "Islamabad, Pakistan",
  githubUser: "zainsial866",

  bootLines: [
    { cmd: "whoami", output: "Muhammad Zain-Ul-Abdin" },
    { cmd: "cat role.txt", output: "Cloud Security Engineer in Training" },
    { cmd: "cat focus.txt", output: "Building and breaking cloud architectures. Understanding systems from kernel to cloud." },
  ],

  aboutShort: "I build and break systems to understand them. Most cloud security people don't understand Windows internals. I do. That's my advantage.",

 about: [
    "I don't just secure cloud systems — I understand what they look like when they're compromised.",
    "My foundation is in Windows Internals, reverse engineering, and low-level systems programming (C, Assembly). I've built stealth primitives, reverse-engineered malware, and designed C2 research platforms to understand how attackers operate at the kernel level. That offensive mindset is now my edge in cloud security.",
    "Right now I'm building serverless AWS architectures with threat modeling and least-privilege IAM. I'm researching container security on EKS/ECS. I'm thinking like an attacker — escaping Lambda functions, abusing IAM roles, exfiltrating data from supposedly 'secure' environments.",
    "I document everything I build: threat models, architecture decisions, security controls, what breaks and why. You'll find it on GitHub, Hashnode, and Dev.to. I compete in CTFs. I build in the open.",
    "If you're working in cloud security or want to understand the bridge between low-level systems and cloud architecture, let's talk shop."
  ],

  skills: [
    { name: "Cloud Security", note: "AWS threat modeling, IAM, architecture" },
    { name: "AWS", note: "SAA-level, Security Specialty path" },
    { name: "Threat Modeling", note: "STRIDE, abuse cases, security controls" },
    { name: "Windows Internals", note: "Nt-level APIs, PE format, kernel concepts" },
    { name: "Reverse Engineering", note: "x64dbg, IDA, Ghidra" },
    { name: "C / C++", note: "systems programming" },
    { name: "Python", note: "tooling, scripting, automation" },
    { name: "Terraform", note: "IaC, AWS infrastructure" },
    { name: "Container Security", note: "Docker, EKS, security hardening" },
    { name: "x86-64 Assembly", note: "GAS / Intel syntax" }
  ],

  timeline: [
    { date: "Sept 2025", label: "Started BS Cybersecurity", detail: "Sir Syed CASE Institute of Technology" },
    { date: "Jun 2026", label: "AWS Educate Cloud 101", detail: "Completed — earned badge" },
    { date: "2026", label: "1st Position", detail: "Samurai Mini CTF, Fortivra Tech" },
    { date: "2026", label: "Cloud Security Pivot", detail: "Building Terraform landing zones, threat modeling, AWS projects" }
  ],

  socials: [
    { label: "github", url: "https://github.com/zainsial866" },
    { label: "linkedin", url: "https://www.linkedin.com/in/iamzsial/" },
    { label: "hashnode", url: "https://hashnode.com/@iamzainsial" },
    { label: "dev.to", url: "https://dev.to/iamzsial" },
    { label: "bluesky", url: "https://bsky.app/profile/iamzsial.bsky.social" },
    { label: "email", url: "mailto:zainsial866@gmail.com" }
  ],

  // Left HUD — same on every page (desktop only)
  environmentHud: [
    { label: "FOCUS", value: "Cloud Security" },
    { label: "BACKEND", value: "AWS" },
    { label: "LANGUAGE", value: "C / Python" },
    { label: "MINDSET", value: "Threat Modeling" },
    { label: "STATUS", value: "BUILDING" }
  ],
  environmentTags: ["AWS", "CLOUD-SECURITY", "THREAT-MODELING", "IAM", "TERRAFORM", "WINDOWS-INTERNALS", "REVERSE-ENGINEERING", "C++"],
  processList: [
    { pid: "2600", name: "aws-cli" },
    { pid: "5128", name: "terraform" },
    { pid: "9001", name: "threat-model" }
  ],
  networkPorts: [
    { port: "443", label: "HTTPS / CloudFront" },
    { port: "22", label: "SSH" },
    { port: "8080", label: "API Gateway" }
  ],
  toolchain: ["Terraform", "AWS CLI", "Ghidra", "x64dbg", "Python", "Burp Suite", "Wireshark", "Git", "Docker"],
  target: [
    { label: "CLOUD", value: "AWS" },
    { label: "FOCUS", value: "Cloud Security" },
    { label: "BACKGROUND", value: "Windows + Offensive" },
    { label: "CERTS", value: "AIF-C01 → CLF-C02 → SCS-C02" }
  ],

  // Page-specific floating background fragments — same visual system, different content per page
  floatingCommandsByPage: {
    home: [
      "$ aws iam list-users", "$ terraform plan", "$ aws ec2 describe-instances", "$ aws guardduty",
      "Cloud Security", "AWS", "Threat Modeling", "IAM", "Architecture",
      "$ git status", "arn:aws:iam", "least-privilege", "STRIDE", "abuse-case"
    ],
    about: [
      "Cloud Security", "AWS", "Threat Modeling", "IAM Architecture",
      "Windows Internals", "Reverse Engineering", "Low-Level Systems", "Offensive Mindset",
      "$ terraform init", "serverless", "Lambda", "ECS", "EKS", "Container Security"
    ],
    projects: [
      "$ git clone", "$ terraform init", "$ git commit -m", "$ git push",
      "AWS Serverless", "Terraform", "Architecture Diagram", "Security Controls", "THREAT_MODEL.md",
      "commit", "branch", "$ aws s3 ls", "least-privilege"
    ],
    certs: [
      "AWS", "AIF-C01", "CLF-C02", "Security Specialty",
      "Hackviser CORE", "Cisco Networking Academy", "Cloud 101", "badge",
      "$ aws sts get-caller-identity", "credential", "verified"
    ],
    contact: [
      "$ curl -s https://api", "$ ping", "HTTPS", "CloudFront", "Lambda", "API Gateway",
      "connection", "async", "encrypted", "online", "available",
      "$ aws lambda invoke", "response", "200 OK"
    ]
  },

  // Home page terminal activity log + status chips
  activityLog: [
    { time: "11:42:08", msg: "cloud security modules initialized" },
    { time: "11:42:09", msg: "AWS credentials loaded" },
    { time: "11:42:10", msg: "awaiting architecture requirements..." }
  ],
  statusChips: ["CLOUD SECURITY", "AWS", "THREAT MODELING", "WINDOWS INTERNALS", "TERRAFORM", "ARCHITECTURE"],

  // About page — right profile panel + learning trajectory
  profilePanel: [
    { label: "role", value: "cloud security engineer" },
    { label: "focus", value: "AWS" },
    { label: "mindset", value: "Threat Modeling" },
    { label: "backend", value: "C / Python" },
    { label: "background", value: "Windows + Offensive" },
    { label: "trajectory", value: "Security Specialty (SCS-C02)" }
  ],
  trajectory: ["Foundation", "C / C++", "Windows Internals", "Reverse Engineering", "→ Offensive Systems", "→ Cloud Architecture", "→ Cloud Security"],
  currentFocus: ["AWS Serverless Architecture", "Threat Modeling", "IAM Policy Design", "Container Security"],

  projectOverrides: {
    "AWS-Serverless-Security-Architecture": {
      description: "Threat-modeled serverless AWS signup flow with least-privilege IAM policies, abuse-case analysis, and comprehensive security controls matrix. Demonstrates architecture-first security thinking.",
      tags: ["AWS", "Cloud Security", "Serverless", "IAM", "Threat Modeling"]
    },
    "selfDELETION": {
      description: "Windows stealth primitives in C and x86-64 Assembly — anti-forensic techniques mapped to MITRE ATT&CK. Foundation for understanding how attackers evade detection. Applied to cloud threat modeling.",
      tags: ["C", "x86-64 Assembly", "Windows Internals", "Evasion"]
    },
    "RAT1": {
      description: "C-based command-and-control research platform for studying red team infrastructure and Windows internals. Understanding how attackers operate informs cloud security architecture.",
      tags: ["C", "C2", "Windows Internals", "Red Team"]
    },
    "HttpServer": {
      niceName: "HttpServer — Sentinel SOC Dashboard",
      description: "Multithreaded HTTP server in C using POSIX sockets and pthreads, paired with a React dashboard for IP tracking and rate-limit detection. Foundation for understanding network fundamentals that underpin cloud security.",
      tags: ["C", "POSIX", "pthreads", "React", "Networking"]
    },
    "Kioptrix-Level-4": {
      description: "Full walkthrough of Kioptrix Level 4 boot2root VM. Demonstrates enumeration and exploitation fundamentals that translate to cloud security assessments.",
      tags: ["Pentest", "Writeup", "Security Fundamentals"]
    },
    "Kioptrix-Level-3": {
      description: "Boot2root walkthrough of Kioptrix Level 3. Security fundamentals applicable to cloud environments.",
      tags: ["Pentest", "Writeup", "Security Fundamentals"]
    },
    "Kioptrix-Level-2": {
      description: "Boot2root walkthrough of Kioptrix Level 2. Foundational security concepts.",
      tags: ["Pentest", "Writeup", "Security Fundamentals"]
    },
    "Kioptrix-Level-1": {
      description: "Boot2root walkthrough of Kioptrix Level 1. Classic penetration testing fundamentals.",
      tags: ["Pentest", "Writeup", "Security Fundamentals"]
    },
    "timestomper": {
      description: "Windows file timestamp manipulation tool via Native APIs. Demonstrates low-level forensics understanding that informs cloud audit log analysis and detection.",
      tags: ["C", "Windows API", "Forensics"]
    },
    "adstream": {
      description: "NTFS Alternate Data Streams manipulation utility. Low-level systems knowledge that strengthens cloud data hiding and detection research.",
      tags: ["C", "NTFS", "Windows Internals", "Forensics"]
    },
    "WinLoadLab": {
      description: "Compares embedded vs. on-disk shellcode loading via Win32 API. Understanding loader behavior informs cloud container and Lambda security research.",
      tags: ["C", "Shellcode", "Win32 API", "Malware Analysis"]
    },
    "infraHub": {
      description: "Security research platform for endpoint telemetry and detection engineering. Bridging offensive and defensive concepts in a cloud-ready architecture.",
      tags: ["PHP", "Detection Engineering", "Telemetry"]
    },
    "DSA": {
      description: "Data structures and algorithms implementations in C++.",
      tags: ["C++", "Algorithms"]
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
      description: "Completed Hackviser CORE training across network security, web security, OWASP Top 10, OSINT, cryptology, incident response, and LLM security — foundational knowledge for cloud security architecture."
    },
    {
      name: "Cyber Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      date: "Jun 30, 2026",
      image: "assets/certs/deloitte.png",
      url: null,
      credentialId: "vwyF6puQDoZDb2772",
      category: "Cybersecurity",
      description: "Hands-on incident response simulation. Analyzed web server logs to identify anomalous sessions — skills directly applicable to CloudTrail and AWS security log analysis."
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Jun 29, 2026",
      image: "assets/certs/cisco-intro.jpeg",
      url: null,
      credentialId: "c2c7d7c1-8067-4f2d-a998-5de702de11e9",
      category: "Networking",
      description: "Foundational cybersecurity and network security concepts. Core knowledge for understanding AWS network architecture (VPCs, security groups, NACLs)."
    },
    {
      name: "Introduction to Critical Infrastructure Protection",
      issuer: "OPSWAT Academy",
      date: "Jul 19, 2025",
      image: "assets/certs/opswat-icip.png",
      url: "https://learn.opswatacademy.com/certificate/zNd33DcHWg",
      credentialId: "zNd33DcHWg",
      category: "Cybersecurity",
      description: "Graduate-level CIP fundamentals (0.50 CPE). Understanding critical infrastructure protection principles applies to securing AWS production environments."
    },
    {
      name: "MetaCTF Flash CTF — Participant",
      issuer: "MetaCTF",
      date: "Apr 23, 2026",
      image: "assets/certs/metactf.png",
      url: null,
      credentialId: null,
      category: "Cybersecurity",
      description: "Competed in 2-hour timed CTF. Practical security problem-solving under constraints — applicable to cloud security incident response."
    },
    {
      name: "Samurai Mini CTF '26 — 1st Position",
      issuer: "Fortivra Tech",
      date: "2026",
      image: "assets/certs/samurai-ctf.jpeg",
      url: null,
      credentialId: null,
      category: "Cybersecurity",
      description: "Secured 1st position in Fortivra Tech's Samurai Mini CTF hackathon, team 'The AAR PAARS.' Demonstrated offensive security thinking that translates to cloud red teaming."
    },
    {
      name: "AWS Cloud 101",
      issuer: "AWS Educate",
      date: "Jun 2026",
      image: null,
      url: null,
      credentialId: null,
      category: "Cloud",
      description: "Foundational AWS cloud concepts and services. Earned AWS Educate badge. Unlocked AWS ETC (Education Technology Center) access for free learning resources and exam vouchers."
    }
  ]
};
