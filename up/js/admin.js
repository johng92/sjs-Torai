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
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
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
        previewBox.innerHTML = html;
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
// Admin Nav Toggle


document.querySelectorAll(".admin-nav__toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    btn.nextElementSibling.classList.toggle("open");
  });
});
