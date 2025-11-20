// Image preview modal logic
const previewImg = document.getElementById('previewImg');
const imageview = document.getElementById('imageview');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('close');
const btn1 = document.getElementById('btn1');
const profile = document.getElementById('profile')
const hmbtn = document.getElementById('homebtn');
const list = document.getElementById('list');   // FIXED
const navLinks = document.querySelectorAll("#nav ul li a");

// Preview Image
previewImg.onclick = function() {
    imageview.style.display = 'flex';
    modalImg.src = previewImg.src;
}

closeBtn.onclick = function() {
    imageview.style.display = 'none';
}

imageview.onclick = function(e) {
    if (e.target === imageview) {
        imageview.style.display = 'none';
    }
}

(btn1.onclick = function() {
    btn1.style.display = 'none';  
    previewImg.style.display = 'none'; 
    list.style.display = 'flex';   // show menu list
    list.style.marginTop = '90px';
    profile.style.display = 'none';
});

hmbtn.onclick = function() {
    profile.style.display = 'flex';
    previewImg.style.display = 'flex';
    list.style.display = 'none';   
    btn1.style.display = 'block';
    btn1.style.textAlign = 'center';
    list.style.marginTop = '9000px';
}

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        navLinks.forEach(l => l.classList.remove("active-link"))
        this.classList.add("active-link");
        list.style.display = "flex";
    });
});

// ===== Scroll Highlight Logic (Scroll-Spy) =====
/* ===== Robust Scroll-Spy using IntersectionObserver (root = #det) ===== */

(function () {
  const det = document.getElementById('det');
  if (!det) return;

  const navSelector = '#nav ul li a';
  let navLinks = Array.from(document.querySelectorAll(navSelector));
  let sections = [];

  // Helper: (re)collect sections that have an id and are direct children (or descendants) of #det
  function collectSections() {
    sections = Array.from(det.querySelectorAll('div[id], section[id]')).filter(el => el.id);
  }

  // Helper: remove active on all links and add to matched
  function setActive(id) {
    navLinks.forEach(a => a.classList.remove('active-link'));
    const link = document.querySelector(`#nav a[href="#${id}"]`);
    if (link) link.classList.add('active-link');
  }

  // Create observer (root is det so it watches the scrolled container)
  let observer = null;
  function createObserver() {
    if (observer) observer.disconnect();

    const options = {
      root: det,
      rootMargin: '0px 0px -40% 0px', // trigger when element enters upper ~60% of container
      threshold: 0.4                // when ~40% of section visible
    };

    observer = new IntersectionObserver((entries) => {
      // pick the entry with largest intersectionRatio that isIntersecting
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length === 0) return;

      // sort by intersectionRatio desc, so the most visible becomes active
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const mostVisible = visible[0].target;
      if (mostVisible && mostVisible.id) setActive(mostVisible.id);
    }, options);

    // observe each section
    sections.forEach(sec => observer.observe(sec));
  }

  // Initialize everything
  function init() {
    // refresh references
    navLinks = Array.from(document.querySelectorAll(navSelector));
    collectSections();
    createObserver();
    // set initial active based on current scroll position
    // small timeout allows layout to settle
    setTimeout(() => {
      // if any section already intersects, IntersectionObserver callback will run soon,
      // but we also do a fallback: pick the section whose top is nearest to container center
      const containerMid = det.scrollTop + det.clientHeight / 2;
      let best = null;
      let bestDist = Infinity;
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const mid = top + sec.offsetHeight / 2;
        const dist = Math.abs(containerMid - mid);
        if (dist < bestDist) { bestDist = dist; best = sec; }
      });
      if (best && best.id) setActive(best.id);
    }, 60);
  }

  // Run init once
  init();

  // Re-init on resize (sections may change height)
  window.addEventListener('resize', () => {
    init();
  }, { passive: true });

  // MutationObserver: if #det children change (profile hide/show, list toggles), refresh observers
  const mo = new MutationObserver(muts => {
    // small debounce
    if (mo._timer) clearTimeout(mo._timer);
    mo._timer = setTimeout(() => init(), 80);
  });

  mo.observe(det, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });

  // Optional: if you programmatically hide/show profile and want immediate recalculation, call init()
  // Expose for debugging: window.__refreshScrollSpy && window.__refreshScrollSpy()
  window.__refreshScrollSpy = init;

})();

const cvButton = document.getElementById('cv');

cvButton.ondblclick = function() {
    const link = document.createElement('a');
    link.href = 'suriya Resume (2).pdf'; // PDF file path
    link.download = 'Suriya_Resume.pdf'; // optional: rename on download
    link.click();}