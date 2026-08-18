let currentPage = 1;
const totalPages = 6;

document.addEventListener("DOMContentLoaded", () => {
    triggerAnimations(document.getElementById('page-1'));
});

function nextPage(pageNum) {
    const currentEl = document.getElementById(`page-${currentPage}`);
    currentEl.classList.remove('active');

    currentPage = pageNum;

    const dots = document.querySelectorAll('.page-indicator .dot');
    dots.forEach((dot, index) => {
        if (index < currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    const nextEl = document.getElementById(`page-${currentPage}`);
    nextEl.classList.add('active');

    nextEl.scrollTo(0, 0);

    triggerAnimations(nextEl);
}

function triggerAnimations(page) {
    const elements = page.querySelectorAll('.fade-text');
    let cumulativeDelay = 200; // Base start delay

    elements.forEach((el) => {
        const delay = parseInt(el.getAttribute('data-delay')) || 1000;
        cumulativeDelay += delay;

        setTimeout(() => {
            el.classList.add('visible');
        }, cumulativeDelay);
    });
}

document.addEventListener('click', function (e) {

    if (e.target.tagName.toLowerCase() === 'button') return;

    const heart = document.createElement('div');
    heart.innerHTML = '♡';
    heart.style.position = 'fixed';
    heart.style.left = (e.clientX - 10) + 'px';
    heart.style.top = (e.clientY - 15) + 'px';
    heart.style.color = 'var(--soft-red)';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease-out';

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform = 'translateY(-60px) scale(1.5)';
        heart.style.opacity = '0';
    });

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

async function startCamera() {
    const btn = document.getElementById('camera-btn');
    const cameraContainer = document.getElementById('camera-container');
    const video = document.getElementById('camera-feed');
    const errorContainer = document.getElementById('camera-error');
    const postCameraText = document.getElementById('post-camera-text');

    btn.style.display = 'none';

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });

        video.srcObject = stream;
        errorContainer.style.display = 'none';

    } catch (err) {
        console.warn("Camera access denied or unavailable: ", err);
        video.style.display = 'none';
        errorContainer.style.display = 'flex';
        errorContainer.innerHTML = "Ah, couldn't access the camera.<br><br>That's okay though.<br><br>Just imagine I'm holding up a mirror to you right now. ♡";
    }

    cameraContainer.style.display = 'block';
    postCameraText.style.display = 'block';

    setTimeout(() => {
        document.getElementById('page-6').scrollTo({
            top: window.innerHeight * 0.4,
            behavior: 'smooth'
        });
    }, 500);

    const elements = postCameraText.querySelectorAll('.cam-fade-text');
    let cumulativeDelay = 1000;

    elements.forEach((el) => {
        const delay = parseInt(el.getAttribute('data-delay')) || 1200;
        cumulativeDelay += delay;

        setTimeout(() => {
            el.classList.add('visible');
        }, cumulativeDelay);
    });
}