window.addEventListener('DOMContentLoaded', function() {
    // Animação de abertura
    if (!localStorage.getItem('visited')) {
        document.body.classList.add('show-anim');
        localStorage.setItem('visited', 'true');
    }

    // Slider (só roda se existir na página)
    const slidesTrack = document.querySelector('.slides-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    let current = 0;
    let autoSlideInterval;

    if (slidesTrack && slides.length > 0 && nextBtn && prevBtn) {
        function updateSlider() {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === current);
            });
            slidesTrack.style.transform = `translateX(-${current * 100}%)`;
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            current = (current - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 6000);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        updateSlider();
        startAutoSlide();
    }

    // Modal de imagem fullscreen (roda sempre)
    document.querySelectorAll('.open-img-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const modal = document.getElementById('imgModal');
            const modalImg = document.getElementById('imgModalContent');
            modalImg.src = imgSrc;
            modal.classList.add('open');
        });
    });
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            document.getElementById('imgModal').classList.remove('open');
        });
    }
    const imgModal = document.getElementById('imgModal');
    if (imgModal) {
        imgModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('open');
        });
    }
});