(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const state = {
    view: "home", // home | chapter | reader
    activeChapterId: null,
    currentPage: 1,
    zoomScale: 1.0,
    panX: 0,
    panY: 0,
  };

  const LAST_PAGE_KEY = "hizb-last-page";
  const savedPage = parseInt(localStorage.getItem(LAST_PAGE_KEY) || "0", 10);

  function chapterForPage(page) {
    return BOOK.chapters.find((c) => page >= c.start && page <= c.end) || BOOK.chapters[0];
  }

  function pageSrc(n) {
    const num = String(n).padStart(2, "0");
    return `assets/pages/page-${num}.jpg`;
  }

  // ---------------- Rendering: Home ----------------
  function renderHome() {
    const chapters = BOOK.chapters;
    const dayChapters = chapters.filter((c) => c.day);
    const frontMatter = chapters.filter((c) => !c.day);

    const continueBlock = savedPage
      ? `<div class="continue-card" id="continueCard">
           <div class="cc-icon">۞</div>
           <div class="cc-text">
             <b>Lanjutkan membaca</b>
             <span>Halaman ${savedPage} — ${chapterForPage(savedPage).title}</span>
           </div>
           <div style="color:var(--gold-soft);font-size:1.1rem;">›</div>
         </div>`
      : "";

    const frontCards = frontMatter
      .map(
        (c) => `
      <div class="day-card" data-open-chapter="${c.id}" style="grid-column:1 / -1;">
        <div class="dc-day">${c.label}</div>
        <div class="dc-title">${c.title}</div>
        <div class="dc-pages">Hal. ${c.start === c.end ? c.start : c.start + "–" + c.end}</div>
      </div>`
      )
      .join("");

    const dayCards = dayChapters
      .map(
        (c) => `
      <div class="day-card" data-open-chapter="${c.id}">
        <div class="dc-day">${c.label}</div>
        <div class="dc-title">${c.title.replace(/^Hizb [A-Za-z]+ — /, "")}</div>
        <div class="dc-pages">Hal. ${c.start}–${c.end}</div>
      </div>`
      )
      .join("");

    $("#home .home-scroll").innerHTML = `
      <div class="cover-card">
        <h1>${BOOK.title}</h1>
        <p>${BOOK.subtitle}</p>
        <div class="cover-divider"></div>
        <p style="font-size:.82rem;">Panduan zikir &amp; doa tujuh hari, Jumat hingga Kamis</p>
      </div>
      ${continueBlock}
      <div class="section-h">Pembukaan</div>
      <div class="day-grid" style="margin-bottom:1.4rem;">${frontCards}</div>
      <div class="section-h">Amalan 7 Hari</div>
      <div class="day-grid">${dayCards}</div>
    `;
  }

  // ---------------- Rendering: Drawer TOC ----------------
  function renderDrawer() {
    const html = BOOK.chapters
      .map((c, i) => {
        const active = c.id === state.activeChapterId ? "active" : "";
        return `
        <button class="toc-item ${active}" data-open-chapter="${c.id}">
          <span class="num">${c.day ? c.day.slice(0, 2) : "—"}</span>
          <span class="txt">
            <span class="t1">${c.title}</span>
            <span class="t2">Halaman ${c.start === c.end ? c.start : c.start + "–" + c.end}</span>
          </span>
        </button>`;
      })
      .join("");
    $("#drawerList").innerHTML = html;
  }

  // ---------------- Rendering: Chapter detail ----------------
  function renderChapter(chapter) {
    const highlights = (chapter.highlights || [])
      .map(
        (h) => `<div class="highlight-card"><h3>${h.h}</h3><p>${h.body}</p></div>`
      )
      .join("");

    $("#chapter .chapter-scroll").innerHTML = `
      <div class="chapter-hero">
        ${chapter.day ? `<div class="ch-day">Hari ${chapter.day}</div>` : ""}
        <h2>${chapter.title}</h2>
        <p>${chapter.note || ""}</p>
        <button class="read-btn" id="openReaderBtn">📖 Baca halaman ${chapter.start}–${chapter.end}</button>
      </div>
      ${highlights ? `<div class="section-h" style="color:var(--teal-700);">Sorotan Doa &amp; Faidah</div>${highlights}` : ""}
      <p style="font-size:.74rem; color:var(--ink-soft); text-align:center; margin-top:.4rem;">
        Teks Arab lengkap, terjemahan, dan seluruh faidah tersedia utuh pada tampilan halaman asli.
      </p>
    `;

    $("#openReaderBtn").addEventListener("click", () => openReader(chapter.start));
  }

  // ---------------- Reader ----------------
  const track = () => $("#pageTrack");

  function buildReaderPages() {
    let html = "";
    for (let i = 1; i <= BOOK.totalPages; i++) {
      html += `<div class="page-slide" data-page="${i}"><img loading="lazy" src="${pageSrc(i)}" alt="Halaman ${i}"></div>`;
    }
    track().innerHTML = html;
  }

  function applyZoom() {
    state.zoomScale = Math.max(1.0, Math.min(2.5, state.zoomScale));
    if (state.zoomScale === 1.0) {
      state.panX = 0;
      state.panY = 0;
    }
    const activeImg = $(`.page-slide[data-page="${state.currentPage}"] img`);
    if (activeImg) {
      activeImg.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoomScale})`;
    }
  }

  function goToPage(n, animate = true) {
    // Reset previous image zoom transform
    const prevImg = $(`.page-slide[data-page="${state.currentPage}"] img`);
    if (prevImg) {
      prevImg.style.transform = "";
    }

    n = Math.max(1, Math.min(BOOK.totalPages, n));
    state.currentPage = n;
    const t = track();
    t.style.transition = animate ? "" : "none";
    t.style.transform = `translateX(-${(n - 1) * 100}%)`;
    if (!animate) requestAnimationFrame(() => (t.style.transition = ""));
    $("#pageSlider").value = n;
    $("#pageCount").textContent = `${n} / ${BOOK.totalPages}`;
    const ch = chapterForPage(n);
    $("#readerTitle").textContent = ch.title;
    if (ch.id !== state.activeChapterId) openChapter(ch.id);
    localStorage.setItem(LAST_PAGE_KEY, String(n));
    state.zoomScale = 1.0;
    state.panX = 0;
    state.panY = 0;
  }

  function openReader(page) {
    setView("reader");
    goToPage(page, false);
  }

  function initReaderGestures() {
    const stage = $("#readerStage");
    let startX = 0, startY = 0, dragging = false, baseTranslate = 0;
    let isPanning = false;
    let startPanX = 0, startPanY = 0;

    stage.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;

      if (state.zoomScale > 1.0) {
        isPanning = true;
        dragging = false;
        startPanX = state.panX;
        startPanY = state.panY;
        const activeImg = $(`.page-slide[data-page="${state.currentPage}"] img`);
        if (activeImg) activeImg.style.transition = "none";
      } else {
        isPanning = false;
        dragging = true;
        baseTranslate = -(state.currentPage - 1) * stage.clientWidth;
        track().style.transition = "none";
      }
    }, { passive: true });

    stage.addEventListener("touchmove", (e) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (isPanning) {
        state.panX = startPanX + dx;
        state.panY = startPanY + dy;
        applyZoom();
      } else if (dragging) {
        if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll wins
        track().style.transform = `translateX(${baseTranslate + dx}px)`;
      }
    }, { passive: true });

    stage.addEventListener("touchend", (e) => {
      if (isPanning) {
        isPanning = false;
        const activeImg = $(`.page-slide[data-page="${state.currentPage}"] img`);
        if (activeImg) activeImg.style.transition = "transform 0.25s ease";

        const limitX = stage.clientWidth * (state.zoomScale - 1) / 2;
        const limitY = stage.clientHeight * (state.zoomScale - 1) / 2;
        state.panX = Math.max(-limitX, Math.min(limitX, state.panX));
        state.panY = Math.max(-limitY, Math.min(limitY, state.panY));
        applyZoom();
      } else if (dragging) {
        dragging = false;
        track().style.transition = "";
        const dx = (e.changedTouches[0].clientX - startX);
        const threshold = stage.clientWidth * 0.16;
        if (dx < -threshold) goToPage(state.currentPage + 1);
        else if (dx > threshold) goToPage(state.currentPage - 1);
        else goToPage(state.currentPage);
      }
    });

    $(".reader-tap-zone.left").addEventListener("click", () => {
      if (state.zoomScale > 1.0) return; // Prevent tap navigation when zoomed
      goToPage(state.currentPage - 1);
    });
    $(".reader-tap-zone.right").addEventListener("click", () => {
      if (state.zoomScale > 1.0) return; // Prevent tap navigation when zoomed
      goToPage(state.currentPage + 1);
    });

    // Double-tap to zoom
    let lastTap = 0;
    stage.addEventListener("click", (e) => {
      if (e.target.closest(".icon-btn") || e.target.closest(".page-slider") || e.target.closest(".reader-topbar") || e.target.closest(".reader-bottombar")) return;

      const now = Date.now();
      if (now - lastTap < 300) {
        state.zoomScale = state.zoomScale > 1.0 ? 1.0 : 1.9;
        applyZoom();
      }
      lastTap = now;
    });

    $("#zoomInBtn").addEventListener("click", () => {
      state.zoomScale += 0.25;
      applyZoom();
    });

    $("#zoomOutBtn").addEventListener("click", () => {
      state.zoomScale -= 0.25;
      applyZoom();
    });

    $("#pageSlider").addEventListener("input", (e) => goToPage(parseInt(e.target.value, 10), false));

    document.addEventListener("keydown", (e) => {
      if (state.view !== "reader") return;
      if (e.key === "ArrowLeft") goToPage(state.currentPage + 1);
      if (e.key === "ArrowRight") goToPage(state.currentPage - 1);
      if (e.key === "Escape") setView(state.activeChapterId ? "chapter" : "home");
    });
  }

  // ---------------- View switching ----------------
  function setView(view) {
    state.view = view;
    $$(".view").forEach((v) => v.classList.remove("visible"));
    $("#" + view).classList.add("visible");
    $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === view));

    if (view === "home") {
      $("#topbarTitle").textContent = BOOK.title;
      $("#topbarEyebrow").textContent = BOOK.subtitle;
    } else if (view === "chapter") {
      const ch = BOOK.chapters.find((c) => c.id === state.activeChapterId);
      $("#topbarTitle").textContent = ch ? ch.title : "";
      $("#topbarEyebrow").textContent = ch && ch.day ? `Hari ${ch.day}` : "Bagian";
    }
  }

  function openChapter(id) {
    const chapter = BOOK.chapters.find((c) => c.id === id);
    if (!chapter) return;
    state.activeChapterId = id;
    renderChapter(chapter);
    renderDrawer();
  }

  // Tapping a day/section anywhere (drawer, home cards) should land the
  // reader directly on that chapter's first page — not on an in-between screen.
  function jumpToChapter(id) {
    openChapter(id);
    const chapter = BOOK.chapters.find((c) => c.id === id);
    openReader(chapter.start);
    closeDrawer();
  }

  // ---------------- Drawer open/close ----------------
  function openDrawer() {
    $("#drawer").classList.add("open");
    $("#scrim").classList.add("open");
  }
  function closeDrawer() {
    $("#drawer").classList.remove("open");
    $("#scrim").classList.remove("open");
  }

  // ---------------- Global click delegation ----------------
  function initDelegation() {
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest("[data-open-chapter]");
      if (openBtn) {
        jumpToChapter(openBtn.dataset.openChapter);
        return;
      }
      if (e.target.id === "continueCard" || e.target.closest("#continueCard")) {
        openReader(savedPage || 1);
        return;
      }
      const tab = e.target.closest(".tab-btn");
      if (tab) {
        if (tab.dataset.view === "reader" && !state.activeChapterId) {
          openReader(state.currentPage || 1);
        } else if (tab.dataset.view === "chapter") {
          if (!state.activeChapterId) openChapter(chapterForPage(state.currentPage || 1).id);
          setView("chapter");
        } else {
          setView(tab.dataset.view);
        }
        return;
      }
    });

    $("#hamburgerBtn").addEventListener("click", openDrawer);
    $("#scrim").addEventListener("click", closeDrawer);
    $("#closeDrawerBtn").addEventListener("click", closeDrawer);
    $("#readerBackBtn").addEventListener("click", () => setView(state.activeChapterId ? "chapter" : "home"));
  }

  // ---------------- Install prompt (PWA) ----------------
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    $("#installBtn").classList.add("show");
  });
  function initInstall() {
    $("#installBtn").addEventListener("click", async () => {
      if (!deferredPrompt) {
        showToast("Gunakan menu browser \u2192 \u201cAdd to Home Screen\u201d untuk memasang aplikasi.");
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") showToast("Aplikasi berhasil dipasang \u2728");
      deferredPrompt = null;
      $("#installBtn").classList.remove("show");
    });
    window.addEventListener("appinstalled", () => {
      $("#installBtn").classList.remove("show");
      showToast("Aplikasi berhasil dipasang \u2728");
    });
  }

  function showToast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ---------------- Service worker ----------------
  function initServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("sw.js")
          .then((reg) => {
            // Actively ask the browser to re-check sw.js against the server
            // (bypasses the update-hell of an old worker sitting in "waiting").
            reg.update().catch(() => {});
            if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
            reg.addEventListener("updatefound", () => {
              const fresh = reg.installing;
              if (!fresh) return;
              fresh.addEventListener("statechange", () => {
                if (fresh.state === "installed" && navigator.serviceWorker.controller) {
                  fresh.postMessage({ type: "SKIP_WAITING" });
                }
              });
            });
          })
          .catch(() => {});

        // When the new worker takes control, reload exactly once so the page
        // picks up the matching app.js/data.js instead of stale cached assets.
        let reloaded = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (reloaded) return;
          reloaded = true;
          location.reload();
        });
      });
    }
  }


  // ---------------- Init ----------------
  function init() {
    if (window.hizbLoadTimeout) clearTimeout(window.hizbLoadTimeout);
    renderHome();
    renderDrawer();
    buildReaderPages();
    initReaderGestures();
    initDelegation();
    initInstall();
    initServiceWorker();
    setView("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
