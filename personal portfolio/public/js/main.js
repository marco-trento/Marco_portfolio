const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    navMenu.classList.toggle('open');
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const explorer = document.getElementById('journey-explorer');
if (explorer) {
  const nodes = Array.from(explorer.querySelectorAll('.map-node'));
  const segments = Array.from(explorer.querySelectorAll('.route-seg'));
  const chips = Array.from(explorer.querySelectorAll('.step-chip'));

  const titleNode = document.getElementById('journey-title');
  const locationNode = document.getElementById('journey-location');
  const dateNode = document.getElementById('journey-date');
  const bodyNode = document.getElementById('journey-body');

  const setActiveNode = (node) => {
    nodes.forEach((item) => item.classList.toggle('active', item === node));
    chips.forEach((chip) =>
      chip.classList.toggle('active', chip.dataset.target === node.dataset.node)
    );

    const activeSegments = new Set(
      (node.dataset.segments || '')
        .split(',')
        .map((segment) => segment.trim())
        .filter(Boolean)
    );
    segments.forEach((seg) =>
      seg.classList.toggle('active', activeSegments.has(seg.dataset.seg))
    );

    if (titleNode) titleNode.textContent = node.dataset.title || '';
    if (locationNode) locationNode.textContent = node.dataset.location || '';
    if (dateNode) dateNode.textContent = node.dataset.date || '';
    if (bodyNode) bodyNode.textContent = node.dataset.body || '';
  };

  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => setActiveNode(node));
    node.addEventListener('focus', () => setActiveNode(node));
    node.addEventListener('click', () => setActiveNode(node));
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const target = nodes.find((node) => node.dataset.node === chip.dataset.target);
      if (target) setActiveNode(target);
    });
  });

  const defaultNode = nodes.find((node) => node.dataset.node === '4') || nodes[0];
  if (defaultNode) setActiveNode(defaultNode);
}

const typewriterNode = document.getElementById('home-typewriter');
if (typewriterNode) {
  const fullText =
    typewriterNode.dataset.text || 'Marco Trento Engineering Physicist';
  let index = 0;

  typewriterNode.textContent = '';

  const timer = window.setInterval(() => {
    index += 1;
    typewriterNode.textContent = fullText.slice(0, index);
    if (index >= fullText.length) {
      window.clearInterval(timer);
    }
  }, 52);
}
