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
// ======== Toolbar Options ==========
const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  [{ align: [] }],
];

// ======== Quill Init (NO FLOAT REGISTRATION) ==========
const quill = new Quill("#editor-container", {
  theme: "snow",
  placeholder: "Write your blog content here...",
  modules: {
    toolbar: toolbarOptions,

    // WORKS PERFECTLY
    imageResize: {
      modules: ["Resize", "DisplaySize" , "ImageResize"]
    },
  },
});

// ======== Preview Toggle ==========
const previewBtn = document.querySelector("#preview-button");
const previewBox = document.querySelector("#editor-preview");

previewBtn.addEventListener("click", () => {
  const html = quill.root.innerHTML;

  if (previewBox.classList.contains("active")) {
    previewBox.classList.remove("active");
    previewBtn.textContent = "Preview Content";
    previewBox.innerHTML = "";
  } else {
    previewBox.classList.add("active");
    previewBtn.textContent = "Hide Preview";
    previewBox.innerHTML = html;
  }
});

// ======== Save On Submit ==========
document.querySelector(".blog-form").addEventListener("submit", () => {
  document.querySelector("#hidden-body").value = quill.root.innerHTML;
});
