document.addEventListener('DOMContentLoaded', () => {
  // --- FILTER & HIDDEN REPOSITORY LOGIC ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        const isHiddenRepo = item.classList.contains('is-hidden-repo');

        if (filterValue === 'all') {
          if (isHiddenRepo) {
            item.classList.add('hide');
            item.classList.remove('show-repo');
          } else {
            item.classList.remove('hide');
          }
        } else {
          if (itemCategories.includes(filterValue)) {
            item.classList.remove('hide');
            if (isHiddenRepo) {
              item.classList.add('show-repo');
            }
          } else {
            item.classList.add('hide');
            if (isHiddenRepo) {
              item.classList.remove('show-repo');
            }
          }
        }
      });
    });
  });

  // --- LIGHTBOX & MEDIA HANDLER ---
  const lightbox = document.getElementById('lightbox');
  const wrapper = document.getElementById('lightboxMediaWrapper');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let activeItems = [];
  let currentIndex = 0;

  // Render Image or Video dynamically inside Lightbox
  function updateLightbox(index) {
    if (activeItems.length === 0) return;

    if (index < 0) {
      currentIndex = activeItems.length - 1;
    } else if (index >= activeItems.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const currentItem = activeItems[currentIndex];
    const videoSrc = currentItem.getAttribute('data-video');

    // Remove old media element
    const existingMedia = wrapper.querySelector('.lightbox-img, .lightbox-video');
    if (existingMedia) existingMedia.remove();

    if (videoSrc) {
      // Inject Video Element
      const videoEl = document.createElement('video');
      videoEl.className = 'lightbox-video';
      videoEl.src = videoSrc;
      videoEl.controls = true;
      videoEl.autoplay = true;
      wrapper.appendChild(videoEl);
    } else {
      // Inject Image Element
      const imgEl = document.createElement('img');
      imgEl.className = 'lightbox-img';
      imgEl.src = currentItem.querySelector('.gallery-img').src;
      imgEl.alt = 'Modal View';
      wrapper.appendChild(imgEl);
    }

    lightboxTitle.innerText = currentItem.querySelector('h3').innerText;
    lightboxDesc.innerText = currentItem.querySelector('p').innerText;
  }

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      activeItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'))
        .filter(el => {
          return !el.classList.contains('is-hidden-repo') || el.classList.contains('show-repo');
        });

      currentIndex = activeItems.indexOf(item);
      updateLightbox(currentIndex);
      lightbox.classList.add('active');
    });
  });

  // Helper function to safely stop videos on modal close
  function closeLightboxModal() {
    lightbox.classList.remove('active');
    const videoEl = wrapper.querySelector('video');
    if (videoEl) videoEl.pause();
  }

  // Controls & Listeners
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentIndex + 1);
  });

  closeBtn.addEventListener('click', closeLightboxModal);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightboxModal();
    }
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
      updateLightbox(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateLightbox(currentIndex + 1);
    } else if (e.key === 'Escape') {
      closeLightboxModal();
    }
  });
});