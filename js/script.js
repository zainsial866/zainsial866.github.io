/* ============================================================
   NAV + FOOTER (every page)
   ============================================================ */
document.querySelectorAll("[data-nav-handle]").forEach(el => el.textContent = SITE_DATA.handle);
document.querySelectorAll("[data-footer-name]").forEach(el => el.textContent = SITE_DATA.name);

const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav__link").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("is-active");
  }
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal(root = document) {
  const targets = root.querySelectorAll(".reveal:not(.is-visible)");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   TERMINAL TYPE EFFECT — reusable
   ============================================================ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeLine(container, cmd, output) {
  return new Promise(resolve => {
    const line = document.createElement("div");
    line.className = "term-line";
    const promptSpan = document.createElement("span");
    promptSpan.className = "term-line__prompt";
    promptSpan.textContent = "$ ";
    const cmdSpan = document.createElement("span");
    cmdSpan.className = "term-line__cmd";
    line.append(promptSpan, cmdSpan);
    container.appendChild(line);

    if (prefersReducedMotion) {
      cmdSpan.textContent = cmd;
      const out = document.createElement("span");
      out.className = "term-line__output";
      out.textContent = output;
      line.appendChild(out);
      resolve();
      return;
    }

    let i = 0;
    const typeInterval = setInterval(() => {
      cmdSpan.textContent = cmd.slice(0, i + 1);
      i++;
      if (i >= cmd.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          const out = document.createElement("span");
          out.className = "term-line__output";
          line.appendChild(out);
          let j = 0;
          const outInterval = setInterval(() => {
            out.textContent = output.slice(0, j + 1);
            j++;
            if (j >= output.length) {
              clearInterval(outInterval);
              setTimeout(resolve, 220);
            }
          }, 10);
        }, 180);
      }
    }, 28);
  });
}

function formatRelativeDate(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)} yr ago`;
}

function projectCardHTML(p) {
  const meta = [];
  if (typeof p.stars === "number") meta.push(`<span class="project-card__stars">${p.stars}</span>`);
  if (p.updated) meta.push(`<span class="project-card__updated">${formatRelativeDate(p.updated)}</span>`);
  return `
    <a class="project-card reveal" href="${p.url}" target="_blank" rel="noopener noreferrer">
      <div class="project-card__dir">${p.dir}</div>
      <div class="project-card__name">${p.name}</div>
      <div class="project-card__desc">${p.description}</div>
      <div class="project-card__tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      ${meta.length ? `<div class="project-card__meta">${meta.join("")}</div>` : ""}
    </a>`;
}

function certCardHTML(cert) {
  const media = cert.image
    ? `<img class="cert-card__img" src="${cert.image}" alt="${cert.name}">`
    : `<div class="cert-card__img" style="display:flex;align-items:center;justify-content:center;background:var(--grad-primary);color:var(--bg-void);font-family:var(--font-mono);font-weight:700;">${cert.name.charAt(0)}</div>`;
  const inner = `
    ${media}
    <div>
      <div class="cert-card__name">${cert.name}</div>
      <div class="cert-card__meta">${cert.issuer} · ${cert.date}</div>
      <div class="cert-card__desc">${cert.description}</div>
      ${cert.credentialId ? `<div class="cert-card__desc" style="margin-bottom:2px;">ID: ${cert.credentialId}</div>` : ""}
      ${cert.url ? `<span class="cert-card__link">Verify credential</span>` : `<span class="verified-badge">✓ RECORDED</span>`}
    </div>`;
  if (cert.url) {
    return `<a class="cert-card reveal" href="${cert.url}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  return `<div class="cert-card reveal">${inner}</div>`;
}

function renderMiniTerminal(containerId, cmd, output) {
  const el = document.getElementById(containerId);
  if (!el) return;
  typeLine(el.querySelector(".terminal__body"), cmd, output);
}

async function renderMiniTerminalSequence(containerId, lines) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const body = el.querySelector(".terminal__body");
  for (const line of lines) {
    await typeLine(body, line.cmd, line.output);
  }
}

document.querySelectorAll(".nav__brand").forEach(el => {
  el.addEventListener("click", () => { window.location.href = "index.html"; });
});

/* ============================================================
   FLOATING COMMAND DECORATIONS — fills side margins on wide screens
   ============================================================ */

function initFloatingCommands() {
  if (prefersReducedMotion) return;
  const page = document.body.dataset.page || "home";
  const commands = SITE_DATA.floatingCommandsByPage[page] || SITE_DATA.floatingCommandsByPage.home;
  const wrap = document.createElement("div");
  wrap.className = "floating-cmds";
  const colorClasses = ["", "floating-cmd--magenta", "floating-cmd--amber"];
  const brightnessTiers = ["floating-cmd--dim", "", "floating-cmd--bright"];
  const count = Math.min(commands.length, 18);

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    // Zones: even index -> far left band, odd -> far right band, last few -> bottom spread
    let leftPos, topPos;
    if (i >= count - 4) {
      // bottom spread across the width
      leftPos = 8 + (i - (count - 4)) * 26 + Math.random() * 6;
      topPos = 86 + Math.random() * 10;
    } else {
      const inLeftMargin = i % 2 === 0;
      leftPos = inLeftMargin ? Math.random() * 11 : Math.random() * 11 + 89;
      topPos = Math.random() * 80 + 4;
    }
    const rot = Math.floor(Math.random() * 30) - 15;
    const duration = 16 + Math.random() * 14;
    const delay = Math.random() * -20;
    const size = 11 + Math.random() * 5;
    span.className = `floating-cmd ${colorClasses[i % colorClasses.length]} ${brightnessTiers[i % brightnessTiers.length]}`;
    span.textContent = commands[i];
    span.style.left = `${leftPos}%`;
    span.style.top = `${topPos}%`;
    span.style.fontSize = `${size}px`;
    span.style.setProperty("--rot", `${rot}deg`);
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;
    wrap.appendChild(span);
  }
  document.body.insertBefore(wrap, document.body.firstChild);
}
initFloatingCommands();

/* ============================================================
   HUD SIDEBARS — left (environment, all pages) + right (page-specific)
   ============================================================ */
function hudRow(label, value) {
  return `<div class="hud__row"><span>${label}</span><span>${value}</span></div>`;
}

function injectLeftHud() {
  const stack = document.createElement("div");
  stack.className = "hud-stack hud-stack--left reveal";

  const env = document.createElement("div");
  env.className = "hud";
  env.innerHTML = `<div class="hud__title">ENVIRONMENT</div>${SITE_DATA.environmentHud.map(r => hudRow(r.label, r.value)).join("")}`;

  const skills = document.createElement("div");
  skills.className = "hud";
  skills.innerHTML = `<div class="hud__title">SKILLS</div><div class="hud__tags">${SITE_DATA.environmentTags.map(t => `<span class="hud__tag">${t}</span>`).join("")}</div>`;

  const process = document.createElement("div");
  process.className = "hud";
  process.innerHTML = `<div class="hud__title">PROCESS</div>${SITE_DATA.processList.map(p => hudRow(p.pid, p.name)).join("")}`;

  const net = document.createElement("div");
  net.className = "hud";
  net.innerHTML = `<div class="hud__title">$ netstat -tulpn</div>${SITE_DATA.networkPorts.map(p => `<div class="hud__term-line"><b>tcp ${p.port}</b> ${p.label}</div>`).join("")}`;

  stack.append(env, skills, process, net);
  document.body.appendChild(stack);
}

function injectRightHud(page) {
  const stack = document.createElement("div");
  stack.className = "hud-stack hud-stack--right reveal";

  const primary = document.createElement("div");
  primary.className = "hud";
  if (page === "home") {
    primary.innerHTML = `
      <div class="hud__title">CURRENT FOCUS</div>
      ${SITE_DATA.currentFocus.map((f, i) => `<div class="hud__focus-item"><b>0${i + 1}</b>${f}</div>`).join("")}
      <div class="hud__ping"><span class="nav__status-dot" style="width:6px;height:6px;"></span> currently learning</div>`;
  } else if (page === "about") {
    primary.innerHTML = `
      <div class="hud__title">SYSTEM</div>
      ${hudRow("USER", SITE_DATA.handle)}
      ${hudRow("ROLE", "STUDENT")}
      ${hudRow("FOCUS", "RESEARCH")}
      ${hudRow("STATUS", "ACTIVE")}`;
  } else if (page === "projects") {
    primary.innerHTML = `<div class="hud__title">REPOSITORIES</div><div id="hud-repo-stats"><div class="hud__row"><span>loading</span><span>…</span></div></div>`;
  } else if (page === "certs") {
    const verified = SITE_DATA.certifications.filter(c => c.url).length;
    const security = SITE_DATA.certifications.filter(c => c.category === "Cybersecurity").length;
    primary.innerHTML = `
      <div class="hud__title">CREDENTIALS</div>
      ${hudRow("VERIFIED", verified)}
      ${hudRow("SECURITY", security)}
      ${hudRow("LATEST", "2026")}
      ${hudRow("STATUS", "✓")}`;
  } else if (page === "contact") {
    primary.innerHTML = `
      <div class="hud__title">CHANNEL</div>
      ${hudRow("GITHUB", "OPEN")}
      ${hudRow("LINKEDIN", "OPEN")}
      ${hudRow("EMAIL", "OPEN")}
      ${hudRow("STATUS", "ONLINE")}`;
  } else {
    return;
  }

  const toolchain = document.createElement("div");
  toolchain.className = "hud";
  toolchain.innerHTML = `<div class="hud__title">TOOLCHAIN</div><div class="hud__tags">${SITE_DATA.toolchain.map(t => `<span class="hud__tag">${t}</span>`).join("")}</div>`;

  const target = document.createElement("div");
  target.className = "hud";
  target.innerHTML = `<div class="hud__title">TARGET</div>${SITE_DATA.target.map(r => hudRow(r.label, r.value)).join("")}`;

  const gitStatus = document.createElement("div");
  gitStatus.className = "hud";
  gitStatus.innerHTML = `<div class="hud__title">$ git status</div><div class="hud__term-line">On branch main</div><div class="hud__term-line">working tree clean</div>`;

  stack.append(primary, toolchain, target, gitStatus);
  document.body.appendChild(stack);
}

const currentDataPage = document.body.dataset.page;
if (currentDataPage === "home") {
  injectLeftHud();
  injectRightHud(currentDataPage);
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
async function initHomePage() {
  document.getElementById("hero-tagline").textContent = SITE_DATA.tagline;
  document.getElementById("hero-location").textContent = SITE_DATA.location;
  document.getElementById("about-teaser").textContent = SITE_DATA.aboutShort;

  const chipsEl = document.getElementById("status-chips");
  if (chipsEl) chipsEl.innerHTML = SITE_DATA.statusChips.map(c => `<span class="status-chip">${c}</span>`).join("");

  const logEl = document.getElementById("activity-log");
  if (logEl) {
    SITE_DATA.activityLog.forEach((entry, i) => {
      const line = document.createElement("div");
      line.className = "activity-log__line";
      line.style.animationDelay = `${i * 0.4 + 1.4}s`;
      line.innerHTML = `<span class="time">[${entry.time}]</span>${entry.msg}`;
      logEl.appendChild(line);
    });
  }

  const termBody = document.getElementById("terminal-body");
  const taglineWrap = document.querySelector(".hero__tagline-wrap");
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  termBody.appendChild(cursor);
  for (const line of SITE_DATA.bootLines) {
    cursor.remove();
    await typeLine(termBody, line.cmd, line.output);
    termBody.appendChild(cursor);
  }
  taglineWrap.classList.add("is-visible");

  document.getElementById("stat-certs").textContent = SITE_DATA.certifications.length;
  document.getElementById("stat-skills").textContent = SITE_DATA.skills.length;

  try {
    const projects = await fetchProjects();
    document.getElementById("stat-projects").textContent = projects.length;
    const featured = projects.slice(0, 3);
    document.getElementById("featured-projects").innerHTML = featured.map(projectCardHTML).join("");
  } catch (e) {
    document.getElementById("stat-projects").textContent = "—";
    const msg = e.message === "RATE_LIMITED"
      ? "GitHub's public API rate limit was hit — try again in a bit, or"
      : "couldn't reach the GitHub API right now —";
    document.getElementById("featured-projects").innerHTML =
      `<p class="loading-state">${msg} <a href="projects.html" style="color:var(--accent-cyan)">view projects directly on GitHub →</a></p>`;
  }

  initReveal();
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function initAboutPage() {
  const aboutBody = document.getElementById("about-body");
  SITE_DATA.about.forEach(paragraph => {
    const p = document.createElement("p");
    p.className = "reveal";
    p.textContent = paragraph;
    aboutBody.appendChild(p);
  });

  const profileEl = document.getElementById("profile-panel");
  if (profileEl) {
    profileEl.innerHTML = SITE_DATA.profilePanel.map(r =>
      `<div class="profile-panel__row"><span>${r.label}</span><span>${r.value}</span></div>`
    ).join("");
  }

  const trajectoryEl = document.getElementById("trajectory");
  if (trajectoryEl) {
    trajectoryEl.innerHTML = SITE_DATA.trajectory.map((step, i, arr) => {
      const isLast = i === arr.length - 1;
      const arrow = isLast ? "" : `<div class="trajectory__arrow">↓</div>`;
      return `<div class="trajectory__step ${isLast ? "trajectory__step--last" : ""}">${step}</div>${arrow}`;
    }).join("");
  }

  const focusTerminalEl = document.getElementById("focus-terminal-list");
  if (focusTerminalEl) {
    focusTerminalEl.innerHTML = SITE_DATA.currentFocus.map(f => `<div class="term-line__output" style="padding-left:0;">${f}</div>`).join("");
  }

  const skillsGrid = document.getElementById("skills-grid");
  SITE_DATA.skills.forEach(skill => {
    skillsGrid.innerHTML += `
      <div class="skill-card reveal">
        <div class="skill-card__name">${skill.name}</div>
        <div class="skill-card__note">${skill.note}</div>
      </div>`;
  });

  const timeline = document.getElementById("timeline");
  SITE_DATA.timeline.forEach(item => {
    timeline.innerHTML += `
      <div class="timeline__item reveal">
        <div class="timeline__date">${item.date}</div>
        <div class="timeline__label">${item.label}</div>
        <div class="timeline__detail">${item.detail}</div>
      </div>`;
  });

  initReveal();
}

/* ============================================================
   PAGE: PROJECTS
   ============================================================ */
async function initProjectsPage() {
  const grid = document.getElementById("projects-grid");
  const termBody = document.getElementById("loading-terminal");
  await typeLine(termBody, "curl api.github.com/users/" + SITE_DATA.githubUser + "/repos", "fetching…");

  try {
    const projects = await fetchProjects();
    grid.innerHTML = projects.map(projectCardHTML).join("");
    await typeLine(termBody, "echo $?", `done — ${projects.length} repos found`);

    // Stats panel
    const statsEl = document.getElementById("projects-stats");
    if (statsEl) {
      const langs = new Set(projects.flatMap(p => p.tags));
      const securityCount = projects.filter(p => p.tags.some(t => /pentest|security|evasion|c2|forensic/i.test(t))).length;
      statsEl.innerHTML = `
        <div class="mini-stat"><div class="mini-stat__value">${projects.length}</div><div class="mini-stat__label">PUBLIC REPOS</div></div>
        <div class="mini-stat"><div class="mini-stat__value">${langs.size}</div><div class="mini-stat__label">TAGS/LANGUAGES</div></div>
        <div class="mini-stat"><div class="mini-stat__value">${securityCount}</div><div class="mini-stat__label">SECURITY PROJECTS</div></div>
        <div class="mini-stat"><div class="mini-stat__value">${projects.filter(p => (Date.now() - new Date(p.updated)) < 7776000000).length}</div><div class="mini-stat__label">ACTIVE (90d)</div></div>`;
    }

    // Right HUD repo stats
    const hudStats = document.getElementById("hud-repo-stats");
    if (hudStats) {
      const langs = new Set(projects.flatMap(p => p.tags));
      const securityCount = projects.filter(p => p.tags.some(t => /pentest|security|evasion|c2|forensic/i.test(t))).length;
      hudStats.innerHTML = `
        ${hudRow("PUBLIC", projects.length)}
        ${hudRow("SECURITY", securityCount)}
        ${hudRow("TAGS", langs.size)}
        ${hudRow("SYNC", "✓")}`;
    }

    // Filter pills
    const filterEl = document.getElementById("projects-filter");
    if (filterEl) {
      const allTags = ["ALL", ...new Set(projects.flatMap(p => p.tags))];
      filterEl.innerHTML = allTags.map((t, i) =>
        `<button class="filter-pill ${i === 0 ? "is-active" : ""}" data-filter="${t}">${t}</button>`
      ).join("");
      filterEl.querySelectorAll(".filter-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          filterEl.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          const filter = btn.dataset.filter;
          const filtered = filter === "ALL" ? projects : projects.filter(p => p.tags.includes(filter));
          grid.innerHTML = filtered.map(projectCardHTML).join("");
          initReveal();
        });
      });
    }
  } catch (e) {
    const msg = e.message === "RATE_LIMITED"
      ? "GitHub's public API rate limit was hit — refresh in a bit, or"
      : "Error: couldn't reach the GitHub API.";
    termBody.innerHTML += `<div class="term-line__output" style="color:var(--accent-magenta)">${msg} <a href="https://github.com/${SITE_DATA.githubUser}" style="color:var(--accent-cyan)">View repos directly on GitHub →</a></div>`;
  }
  initReveal();
}

/* ============================================================
   PAGE: CERTS
   ============================================================ */
function initCertsPage() {
  const list = document.getElementById("certs-list");
  list.innerHTML = SITE_DATA.certifications.map(certCardHTML).join("");
  document.getElementById("stat-certs-page").textContent = SITE_DATA.certifications.length;

  const statsEl = document.getElementById("certs-stats");
  if (statsEl) {
    const security = SITE_DATA.certifications.filter(c => c.category === "Cybersecurity").length;
    const dev = SITE_DATA.certifications.filter(c => c.category === "Development").length;
    const y2026 = SITE_DATA.certifications.filter(c => c.date.includes("2026")).length;
    statsEl.innerHTML = `
      <div class="mini-stat"><div class="mini-stat__value">${SITE_DATA.certifications.length}</div><div class="mini-stat__label">CERTIFICATIONS</div></div>
      <div class="mini-stat"><div class="mini-stat__value">${security}</div><div class="mini-stat__label">SECURITY</div></div>
      <div class="mini-stat"><div class="mini-stat__value">${dev}</div><div class="mini-stat__label">DEVELOPMENT</div></div>
      <div class="mini-stat"><div class="mini-stat__value">${y2026}</div><div class="mini-stat__label">IN 2026</div></div>`;
  }

  const filterEl = document.getElementById("certs-filter");
  if (filterEl) {
    const categories = ["ALL", ...new Set(SITE_DATA.certifications.map(c => c.category.toUpperCase()))];
    filterEl.innerHTML = categories.map((c, i) =>
      `<button class="filter-pill ${i === 0 ? "is-active" : ""}" data-filter="${c}">${c}</button>`
    ).join("");
    filterEl.querySelectorAll(".filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        filterEl.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        const filtered = filter === "ALL" ? SITE_DATA.certifications : SITE_DATA.certifications.filter(c => c.category.toUpperCase() === filter);
        list.innerHTML = filtered.map(certCardHTML).join("");
        initReveal();
      });
    });
  }

  initReveal();
}

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
function initContactPage() {
  const links = document.getElementById("contact-links");
  SITE_DATA.socials.forEach(social => {
    const a = document.createElement("a");
    a.className = "contact__link reveal";
    a.href = social.url;
    if (!social.url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    const statusSpan = document.createElement("span");
    statusSpan.className = "link-status";
    statusSpan.textContent = "connection available";
    a.append(document.createTextNode(social.label), statusSpan);

    a.addEventListener("mouseenter", () => {
      statusSpan.textContent = "connecting...";
      setTimeout(() => { statusSpan.textContent = "connection available"; }, 400);
    });

    links.appendChild(a);
  });
  initReveal();
}

/* ============================================================
   BOOT
   ============================================================ */
if (document.getElementById("terminal-body")) initHomePage();
if (document.getElementById("about-body")) {
  initAboutPage();
  renderMiniTerminal("about-mini-terminal", "cat status.txt", "Cybersecurity student, learning in public.");
}
if (document.getElementById("projects-grid") && document.getElementById("loading-terminal")) initProjectsPage();
if (document.getElementById("certs-list")) {
  initCertsPage();
  renderMiniTerminal("certs-mini-terminal", "ls -la ~/certifications | wc -l", `${SITE_DATA.certifications.length} credentials found`);
}
if (document.getElementById("contact-links")) {
  initContactPage();
  renderMiniTerminalSequence("contact-mini-terminal", [
    { cmd: "./contact --open-channel", output: "channel status: OPEN" },
    { cmd: "echo $ENCRYPTION", output: "encryption: ENABLED" },
    { cmd: "echo $RESPONSE_TIME", output: "response: whenever possible" }
  ]);
}

initReveal();
