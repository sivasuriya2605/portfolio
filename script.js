
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

  
  function setActive(id) {
    navLinks.forEach(a => a.classList.remove('active-link'));
    const link = document.querySelector(`#nav a[href="#${id}"]`);
    if (link) link.classList.add('active-link');
  }

  
  let observer = null;
  function createObserver() {
    if (observer) observer.disconnect();

    const options = {
      root: det,
      rootMargin: '0px 0px -40% 0px', 
      threshold: 0.4               
    };

    observer = new IntersectionObserver((entries) => {
     
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length === 0) return;

     
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const mostVisible = visible[0].target;
      if (mostVisible && mostVisible.id) setActive(mostVisible.id);
    }, options);

   
    sections.forEach(sec => observer.observe(sec));
  }

 
  function init() {
   
    navLinks = Array.from(document.querySelectorAll(navSelector));
    collectSections();
    createObserver();
    setTimeout(() => {
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

 
  init();

  window.addEventListener('resize', () => {
    init();
  }, { passive: true });


  const mo = new MutationObserver(muts => {
    // small debounce
    if (mo._timer) clearTimeout(mo._timer);
    mo._timer = setTimeout(() => init(), 80);
  });

  mo.observe(det, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });

 
  window.__refreshScrollSpy = init;

})();

const cvButton = document.getElementById('cv');

cvButton.ondblclick = function() {
    const link = document.createElement('a');
    link.href = 'suriya Resume (2).pdf'; 
    link.download = 'Suriya_Resume.pdf';
    link.click();}

    // project section

   document.addEventListener('DOMContentLoaded', () => {
    const projectHeaders = document.querySelectorAll('.project');
    const projectLinks = document.querySelectorAll('.image-div a');

    // Default view setup: Sets Project 1 as active and visible
    projectHeaders.forEach((h, i) => {
        h.classList.remove('active'); 
    });
    if (projectHeaders.length > 0) {
        projectHeaders[0].classList.add('active'); 
    }

    projectLinks.forEach((link, i) => {
        link.style.display = 'none'; 
    });
    if (projectLinks.length > 0) {
        projectLinks[0].style.display = 'block'; 
    }

    // // Click handler for project topics
    projectHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            // Logic to add underline to the active topic
            projectHeaders.forEach(h => {
                h.classList.remove('active'); // Remove underline from all
            });
            header.classList.add('active'); // Add underline to the clicked topic

            // Logic to switch images
            projectLinks.forEach((link, linkIndex) => {
                if (index === linkIndex) {
                    link.style.display = 'block';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    });
});

const projectHeaders = document.querySelectorAll('.project');

projectHeaders.forEach(header => {
    header.addEventListener('click', () => {
        projectHeaders.forEach(h => {
            h.style.textDecoration = 'none';
            h.style.color = 'white';
            h.style.textDecorationColor = '';
             h.style.fontsize = 'large';
        });
        header.style.textDecoration = 'underline';
        header.style.color = 'antiquewhite';
        header.style.textDecorationColor = '#e7ff7b';
    });
});
