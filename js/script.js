/* ==========================================================
   1. CONTENT: edit everything here. Empty values are hidden.
   All content below is SAMPLE placeholder text.
   ========================================================== */
const CONFIG = {
  name: "Your Name",
  initials: "YN",
  title: "Full Stack Developer",
  roles: ["MERN Stack Developer", "Frontend Engineer", "Problem Solver"],
  availability: "Open to new opportunities", // "" hides the badge
  headline: "I build fast, reliable web products.",
  heroDescription: "Sample text: describe what you do and the value you bring in two sentences.",
  profileImage: "", // e.g. "assets/images/profile.jpg"; empty shows initials
  resume: "", // e.g. "assets/resume.pdf"; empty hides the button
  about: [
    "Sample text: introduce yourself, your background, and how you got into development.",
    "Sample text: describe your specialization, interests, and how you approach problems."
  ],
  aboutFacts: [ // replace with verified facts or leave empty
    { label: "Focus", value: "Web applications" },
    { label: "Goal", value: "Your professional goal" }
  ],
  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Express"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools": ["Git", "GitHub", "VS Code"]
  },
  projects: [
    { title: "Sample Project One", category: "Web Development", description: "Sample text: what it does and the problem it solves.",
      stack: ["React", "Node.js"], features: ["Sample feature", "Another feature"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", description: "Sample text: what it does and the problem it solves.",
      stack: ["Python", "SQL"], features: ["Sample feature"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", description: "Sample text: what it does and the problem it solves.",
      stack: ["Python", "scikit-learn"], features: [], image: "", demo: "", code: "", caseStudy: "" }
  ],
  experience: [
    { role: "Sample Role", org: "Sample Company", start: "Month YYYY", end: "Present",
      points: ["Sample responsibility or achievement."], tech: ["Tech"] },
    { role: "Sample Degree", org: "Sample University", start: "YYYY", end: "YYYY", points: [], tech: [] }
  ],
  achievements: [ // leave empty [] to hide the section
    // { title: "Certification name", issuer: "Issuer", year: "YYYY" }
  ],
  contact: { // empty values hide the card
    email: "",
    phone: "",            // international format, e.g. "+15551234567"
    whatsapp: "",         // digits only with country code, e.g. "15551234567"
    whatsappMessage: "Hi, I found your portfolio and would like to connect.",
    linkedin: "", github: "", instagram: "",
    location: ""
  }
};

/* ==========================================================
   2. RENDERING
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
const EXT = 'target="_blank" rel="noopener noreferrer"';

function socials() {
  const c = CONFIG.contact;
  return [["github", "GitHub", c.github], ["linkedin", "LinkedIn", c.linkedin], ["instagram", "Instagram", c.instagram]]
    .filter(([, , url]) => url)
    .map(([icon, label, url]) => `<li><a class="icon-btn" href="${esc(url)}" ${EXT} aria-label="${label}"><i data-lucide="${icon}"></i></a></li>`).join("");
}

function render() {
  const C = CONFIG;
  document.title = `${C.name} | ${C.title} Portfolio`;
  set("#logo", esc(C.initials));
  const links = (cls) => NAV.map(([id, l]) => `<li><a class="nav-link ${cls}" href="#${id}">${l}</a></li>`).join("");
  set("#nav-desktop", links("")); set("#nav-mobile", links(""));
  set("#footer-nav", NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join(""));
  set("#footer-name", esc(C.name));

  set("#availability", esc(C.availability));
  set("#greeting", `Hi, I'm ${esc(C.name)}.`);
  set("#headline", esc(C.headline));
  set("#hero-desc", esc(C.heroDescription));
  set("#avatar", C.profileImage ? `<img src="${esc(C.profileImage)}" alt="Portrait of ${esc(C.name)}" width="400" height="400">` : esc(C.initials));
  set("#hero-socials", socials()); set("#footer-socials", socials());

  set("#about-text", C.about.map((p) => `<p>${esc(p)}</p>`).join("") +
    (C.resume ? `<a class="btn btn-ghost mt-2" href="${esc(C.resume)}" download><i data-lucide="download"></i>Download résumé</a>` : ""));
  if (C.aboutFacts.length) set("#about-side", `<dl class="space-y-4">${C.aboutFacts.map((f) => `<div><dt class="text-sm text-muted">${esc(f.label)}</dt><dd class="font-heading text-lg font-medium">${esc(f.value)}</dd></div>`).join("")}</dl>`);
  else $("#about-side")?.remove();

  set("#skills-grid", Object.entries(C.skills).filter(([, v]) => v.length).map(([k, v]) =>
    `<div class="card reveal p-6"><h3 class="font-heading text-lg font-semibold">${esc(k)}</h3><ul class="mt-4 flex flex-wrap gap-2">${v.map((s) => `<li class="badge">${esc(s)}</li>`).join("")}</ul></div>`).join(""));

  const cats = ["All", ...new Set(C.projects.map((p) => p.category))];
  set("#filters", C.projects.length > 3 ? cats.map((c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "");
  set("#projects-grid", C.projects.map((p) => {
    const l = (url, icon, t) => url ? `<a class="link" href="${esc(url)}" ${EXT}><i data-lucide="${icon}"></i>${t}</a>` : "";
    return `<article class="project card reveal" data-category="${esc(p.category)}">
      ${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="400">` : `<div class="thumb" role="img" aria-label="Placeholder for ${esc(p.title)} screenshot">Add screenshot</div>`}
      <div class="flex flex-1 flex-col p-5">
        <h3 class="font-heading text-xl font-semibold">${esc(p.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">${esc(p.description)}</p>
        ${p.features.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <ul class="mt-4 flex flex-wrap gap-2">${p.stack.map((s) => `<li class="badge">${esc(s)}</li>`).join("")}</ul>
        <div class="mt-auto flex flex-wrap gap-4 pt-5">${l(p.demo, "external-link", "Live demo")}${l(p.code, "github", "Source code")}${l(p.caseStudy, "file-text", "Case study")}</div>
      </div></article>`;
  }).join(""));

  set("#timeline", C.experience.map((e) => `<li class="reveal"><p class="text-sm text-muted">${esc(e.start)} to ${esc(e.end)}</p>
    <h3 class="font-heading text-xl font-semibold">${esc(e.role)}</h3><p class="text-accent">${esc(e.org)}</p>
    ${e.points.length ? `<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">${e.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${e.tech.length ? `<ul class="mt-3 flex flex-wrap gap-2">${e.tech.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>` : ""}</li>`).join(""));

  if (C.achievements.length) {
    $("#achievements").hidden = false;
    set("#achievements-grid", C.achievements.map((a) => `<div class="card reveal p-5"><i data-lucide="award" class="text-accent"></i><h3 class="mt-3 font-heading font-semibold">${esc(a.title)}</h3><p class="text-sm text-muted">${esc([a.issuer, a.year].filter(Boolean).join(", "))}</p></div>`).join(""));
  }

  const k = C.contact, ext = true;
  const wa = k.whatsapp ? `https://wa.me/${k.whatsapp.replace(/\D/g, "")}${k.whatsappMessage ? "?text=" + encodeURIComponent(k.whatsappMessage) : ""}` : "";
  const cards = [
    ["mail", "Email", k.email, k.email && `mailto:${k.email}`, false],
    ["phone", "Phone", k.phone, k.phone && `tel:${k.phone.replace(/[^\d+]/g, "")}`, false],
    ["message-circle", "WhatsApp", "Message me directly", wa, ext],
    ["linkedin", "LinkedIn", "Connect professionally", k.linkedin, ext],
    ["github", "GitHub", "Browse my code", k.github, ext],
    ["instagram", "Instagram", "Follow along", k.instagram, ext],
  ].filter((c) => c[3]).map(([icon, label, desc, href, isExt]) =>
    `<a class="card reveal flex items-center gap-4 p-5" href="${esc(href)}" ${isExt ? EXT : ""}><span class="contact-icon"><i data-lucide="${icon}"></i></span><span><span class="block font-heading font-semibold">${label}</span><span class="block break-all text-sm text-muted">${esc(desc)}</span></span></a>`);
  if (k.location) cards.push(`<div class="card reveal flex items-center gap-4 p-5"><span class="contact-icon"><i data-lucide="map-pin"></i></span><span><span class="block font-heading font-semibold">Location</span><span class="block text-sm text-muted">${esc(k.location)}</span></span></div>`);
  set("#contact-grid", cards.length ? cards.join("") : `<p class="text-center text-muted sm:col-span-2 lg:col-span-3">Add your contact details in js/script.js to show them here.</p>`);
  $("#year").textContent = new Date().getFullYear();
  window.lucide?.createIcons();
}

/* ==========================================================
   3. BEHAVIOUR
   ========================================================== */
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function initMenu() {
  const btn = $("#menu-toggle"), menu = $("#mobile-menu");
  const toggle = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  btn.addEventListener("click", () => toggle(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggle(false); });
  document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#header")) toggle(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { toggle(false); btn.focus(); } });
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => e.matches && toggle(false));
}

function initTheme() {
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

function initSections() {
  const links = $$(".nav-link");
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => {
      const on = a.getAttribute("href") === "#" + en.target.id;
      a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => io.observe(s));
}

function initReveal() {
  const items = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) return items.forEach((i) => i.classList.add("in"));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  items.forEach((i) => io.observe(i));
}

function initFilters() {
  const box = $("#filters");
  box.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter", box).forEach((x) => x.setAttribute("aria-pressed", x === b));
    $$("#projects-grid .project").forEach((p) => { p.hidden = b.dataset.filter !== "All" && p.dataset.category !== b.dataset.filter; });
  });
}

function initRoles() {
  const el = $("#role-text"), roles = CONFIG.roles.length ? CONFIG.roles : [CONFIG.title];
  if (reduced || roles.length < 2) { el.textContent = roles[0]; return; }
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

function initTop() {
  $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  render(); initMenu(); initTheme(); initSections(); initReveal(); initFilters(); initRoles(); initTop();
});
window.addEventListener("load", () => window.lucide?.createIcons());
