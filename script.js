
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.fade-up');
  nodes.forEach((el, i) => {
    el.style.animationDelay = (i * 80) + 'ms';
  });
});


document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const firstLink = card.querySelector('a');
      if (firstLink) firstLink.click();
    }
  });
});


document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Improve external link security
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  a.setAttribute('rel', 'noopener noreferrer');
});
