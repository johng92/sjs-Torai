document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav
  const sectionStats = document.querySelector('.admin-stats');
  const adminMain   = document.querySelector('.admin-main');

  if (sectionStats && adminMain) {
    const obs = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];
        adminMain.classList.toggle('sticky', !ent.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-120px'
      }
    );
    obs.observe(sectionStats);
  }

  // Search Icon
  const toggleBtn  = document.getElementById('searchToggle');
  const searchForm = document.getElementById('searchForm');

  if (toggleBtn && searchForm) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = searchForm.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        searchForm.querySelector('input[type="search"]').focus();
      }
    });

    // Optional: close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && !toggleBtn.contains(e.target)) {
        searchForm.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
// ------------------------------------------------------
// ======== Quill INIT ==========
// -------------- Quill + Editor features (SAFE) --------------
const editorContainer = document.querySelector('#editor-container');

if (editorContainer && typeof Quill !== 'undefined') {

  const toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ align: [] }],
  ];

  const quill = new Quill("#editor-container", {
    theme: "snow",
    placeholder: "Write your blog content here...",
    modules: {
      toolbar: toolbarOptions,
      imageResize: {
        modules: ["Resize", "DisplaySize", "ImageResize"]
      },
    },
  });

  const previewBtn = document.querySelector("#preview-button");
  const previewBox = document.querySelector("#editor-preview");

  if (previewBtn && previewBox) {
    previewBtn.addEventListener("click", () => {
      const html = quill.root.innerHTML;

      if (previewBox.classList.contains("active")) {
        previewBox.classList.remove("active");
        previewBtn.textContent = "Preview Content";
        previewBox.innerHTML = "";
      } else {
        previewBox.classList.add("active");
        previewBtn.textContent = "Hide Preview";
        previewBox.innerHTML = `<div class="ql-editor">${html}</div>`;
      }
    });
  }

  const form = document.querySelector(".blog-form");
  const hiddenInput = document.querySelector("#hidden-body");

  if (form && hiddenInput) {
    form.addEventListener("submit", () => {
      hiddenInput.value = quill.root.innerHTML;
    });
  }
}
// ----------------------------------------------------------------------
// Accordion (Nav-Menu) Dropdowns
// ----------------------
const dropdownButtons = document.querySelectorAll(".admin-nav__toggle");

dropdownButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const subnav = btn.nextElementSibling;

    // Close other open dropdowns (accordion behavior)
    dropdownButtons.forEach(other => {
      if (other !== btn) {
        other.classList.remove("open");
        const otherSub = other.nextElementSibling;
        if (otherSub?.classList.contains("admin-subnav")) {
          otherSub.classList.remove("open");
          otherSub.style.maxHeight = null;
        }
      }
    });

    // Toggle current
    btn.classList.toggle("open");

    if (subnav?.classList.contains("admin-subnav")) {
      if (btn.classList.contains("open")) {
        subnav.classList.add("open");
        subnav.style.maxHeight = subnav.scrollHeight + "px";
      } else {
        subnav.classList.remove("open");
        subnav.style.maxHeight = null;
      }
    }
  });
});

// ----------------------
// Mobile Sidebar Toggle
// ----------------------
const adminNav = document.getElementById("adminNav");
const adminNavToggle = document.getElementById("adminNavToggle");
const adminNavOverlay = document.getElementById("adminNavOverlay");

// open mobile sidebar
adminNavToggle?.addEventListener("click", () => {
  adminNav.classList.add("open");
  adminNavOverlay.classList.add("active");
});

// close sidebar
adminNavOverlay?.addEventListener("click", () => {
  adminNav.classList.remove("open");
  adminNavOverlay.classList.remove("active");
});

// ===============================================================
// 🚀 BADGE UPDATE SYSTEM (Add this at the end of admin.js)
// ===============================================================
document.addEventListener("DOMContentLoaded", () => {

  function updateBadge(buttonId, count) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.setAttribute("data-count", count);

    if (count > 0) {
      btn.classList.add("has-notification");
    } else {
      btn.classList.remove("has-notification");
    }
  }

  // DEMO NUMBERS — replace with PHP later
  updateBadge("notifBtn", 5); 
  updateBadge("inboxBtn", 2); 
});
