const skillNotes = {
  frontend: "Frontend implementation for responsive, maintainable pages.",
  backend: "Backend work for clear data flows and application features.",
  systems: "Systems thinking from cloud infrastructure, CI/CD pipelines, stability, and security work.",
  core: "42 Abu Dhabi training in C, C++, algorithms, and low-level problem solving.",
  people: "Delivery leadership through planning, coordination, and code review."
};

const note = document.querySelector("#skill-note");
const skills = document.querySelectorAll(".skill");

skills.forEach((skill) => {
  skill.addEventListener("click", () => {
    skills.forEach((item) => item.classList.remove("active"));
    skill.classList.add("active");
    note.textContent = skillNotes[skill.dataset.skill];
  });
});

const revealTargets = document.querySelectorAll(".work-card, .timeline-item, .skills-section, .contact-section");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  observer.observe(target);
});

const updateScrollField = () => {
  if (reduceMotion.matches) {
    return;
  }

  document.documentElement.style.setProperty("--scroll", window.scrollY.toFixed(0));
};

let scrollFrame = null;
window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame !== null) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(() => {
      updateScrollField();
      scrollFrame = null;
    });
  },
  { passive: true }
);
updateScrollField();

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });

const renderTags = (tags = []) =>
  tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const markdownToHtml = (markdown = "") =>
  String(markdown)
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();

      if (!trimmed) {
        return "";
      }

      if (trimmed.startsWith("### ")) {
        return `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
      }

      if (trimmed.startsWith("## ")) {
        return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
      }

      if (trimmed.startsWith("# ")) {
        return `<h2>${escapeHtml(trimmed.slice(2))}</h2>`;
      }

      const lines = trimmed.split("\n");
      if (lines.every((line) => line.trim().startsWith("- "))) {
        return `<ul>${lines.map((line) => `<li>${escapeHtml(line.trim().slice(2))}</li>`).join("")}</ul>`;
      }

      return `<p>${escapeHtml(trimmed).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");

const renderProjectCard = (project) => {
  const links = [
    project.liveUrl ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer">Live</a>` : "",
    project.repoUrl ? `<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noreferrer">Repo</a>` : ""
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="content-card reveal">
      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="">` : ""}
      <div class="content-card-body">
        ${project.status ? `<p class="content-status">${escapeHtml(project.status)}</p>` : ""}
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-list">${renderTags(project.tags)}</div>
        ${links ? `<div class="content-links">${links}</div>` : ""}
      </div>
    </article>
  `;
};

const renderPostCard = (post) => {
  const slug = post.slug || slugify(post.title);

  return `
  <article class="content-card clickable-card reveal">
    <div class="content-card-body">
      <p class="content-status">${escapeHtml(post.date)}</p>
      <h3><a href="post.html?slug=${escapeHtml(slug)}">${escapeHtml(post.title)}</a></h3>
      <p>${escapeHtml(post.excerpt)}</p>
      <div class="tag-list">${renderTags(post.tags)}</div>
      <div class="content-links">
        <a href="post.html?slug=${escapeHtml(slug)}">Read post</a>
      </div>
    </div>
  </article>
`;
};

const revealNewCards = (container) => {
  container.querySelectorAll(".reveal").forEach((target) => {
    observer.observe(target);
  });
};

const loadProjects = async () => {
  const targets = [
    document.querySelector("#project-preview"),
    document.querySelector("#projects-list")
  ].filter(Boolean);

  if (!targets.length) {
    return;
  }

  try {
    const response = await fetch("data/projects.json");
    const data = await response.json();
    const projects = Array.isArray(data.projects) ? data.projects : [];

    targets.forEach((target) => {
      const limit = Number(target.dataset.limit) || projects.length;
      const selected = target.id === "project-preview" ? projects.filter((project) => project.featured).slice(0, limit) : projects;
      target.innerHTML = selected.map(renderProjectCard).join("") || `<p class="empty-state">No projects added yet.</p>`;
      revealNewCards(target);
    });
  } catch (error) {
    targets.forEach((target) => {
      target.innerHTML = `<p class="empty-state">Projects could not be loaded.</p>`;
    });
  }
};

const loadPosts = async () => {
  const target = document.querySelector("#blog-list");

  if (!target) {
    return;
  }

  try {
    const response = await fetch("data/blog.json");
    const data = await response.json();
    const posts = (Array.isArray(data.posts) ? data.posts : [])
      .filter((post) => post.published)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));

    target.innerHTML = posts.map(renderPostCard).join("") || `<p class="empty-state">No posts published yet.</p>`;
    revealNewCards(target);
  } catch (error) {
    target.innerHTML = `<p class="empty-state">Posts could not be loaded.</p>`;
  }
};

loadProjects();
loadPosts();

const loadPost = async () => {
  const target = document.querySelector("#post-view");

  if (!target) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    target.innerHTML = `
      <p class="eyebrow">Blog</p>
      <h1>Post not found.</h1>
      <p class="hero-text">No post slug was provided.</p>
      <div class="section-action"><a class="button ghost" href="blog.html">Back to blog</a></div>
    `;
    return;
  }

  try {
    const response = await fetch("data/blog.json");
    const data = await response.json();
    const posts = (Array.isArray(data.posts) ? data.posts : []).filter((post) => post.published);
    const post = posts.find((item) => (item.slug || slugify(item.title)) === slug);

    if (!post) {
      target.innerHTML = `
        <p class="eyebrow">Blog</p>
        <h1>Post not found.</h1>
        <p class="hero-text">This post may be unpublished or removed.</p>
        <div class="section-action"><a class="button ghost" href="blog.html">Back to blog</a></div>
      `;
      return;
    }

    document.title = `${post.title} | Maksim Babayan`;
    target.innerHTML = `
      <a class="back-link" href="blog.html">Back to blog</a>
      <header class="post-header">
        <p class="eyebrow">${escapeHtml(post.date)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="hero-text">${escapeHtml(post.excerpt)}</p>
        <div class="tag-list">${renderTags(post.tags)}</div>
      </header>
      <div class="post-body">${markdownToHtml(post.body)}</div>
    `;
  } catch (error) {
    target.innerHTML = `<p class="empty-state">Post could not be loaded.</p>`;
  }
};

loadPost();

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        window.location.href = "/admin/";
      });
    }
  });
}

document.addEventListener("pointermove", (event) => {
  const card = document.querySelector(".hero-card");
  if (!card || reduceMotion.matches) {
    return;
  }

  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  } else {
    card.style.transform = "";
  }
});
