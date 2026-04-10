// Mock Data - Dữ liệu dùng chung
const CLASS_INFO = {
    name: "Lớp 12A1",
    school: "THPT Chuyên Lê Hồng Phong",
    year: "Niên khóa 2021 - 2024",
    slogan: "Nơi lưu giữ từng khoảnh khắc thanh xuân",
    stats: {
        members: 42,
        photos: 156,
        messages: 89
    }
};

const RANDOM_MEMORIES = [
    { image: "assets/gallery_mock.png", caption: "Giờ học Hóa cuối cùng của đời học sinh..." },
    { image: "assets/gallery_mock.png", caption: "Cả lớp trốn ngủ trưa hát ca vang trời." },
    { image: "assets/gallery_mock.png", caption: "Giây phút bế giảng đầy nước mắt." },
    { image: "assets/gallery_mock.png", caption: "Picnic dã ngoại - Cùng nhau nướng thịt cháy khét lẹt." }
];

// Xác thực (Fake Auth)
function checkAuth() {
    const isLoginPage = window.location.pathname.includes('login.html');
    const isAuthenticated = localStorage.getItem('yearbook_auth') === 'true';

    if (!isAuthenticated && !isLoginPage) {
        window.location.href = 'login.html';
    }

    if (isAuthenticated && isLoginPage) {
        window.location.href = 'index.html';
    }
}

// Hàm render Navigation và Footer động (tái sử dụng)
function renderLayout() {
    const headerHtml = `
        <header class="site-header">
            <div class="logo">
                <h1><a href="index.html">${CLASS_INFO.name}</a></h1>
            </div>
            <nav class="site-nav">
                <ul>
                    <li><a href="index.html" class="${window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') ? 'active' : ''}">Trang chủ</a></li>
                    <li><a href="timeline.html" class="${window.location.pathname.includes('timeline') ? 'active' : ''}">Timeline</a></li>
                    <li><a href="gallery.html" class="${window.location.pathname.includes('gallery') ? 'active' : ''}">Gallery</a></li>
                    <li><a href="guestbook.html" class="${window.location.pathname.includes('guestbook') ? 'active' : ''}">Lưu Bút</a></li>
                    <li><a href="#" id="btnLogout">Thoát</a></li>
                </ul>
            </nav>
        </header>
    `;

    const footerHtml = `
        <footer class="site-footer">
            <p>&copy; ${CLASS_INFO.year} - ${CLASS_INFO.school}.</p>
            <p><i>"${CLASS_INFO.slogan}"</i></p>
        </footer>
    `;

    // Chèn header vào top của page-wrapper
    const wrapper = document.querySelector('.page-wrapper');
    if (wrapper) {
        wrapper.insertAdjacentHTML('afterbegin', headerHtml);
        wrapper.insertAdjacentHTML('beforeend', footerHtml);

        // Bắt sự kiện đăng xuất
        document.getElementById('btnLogout')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('yearbook_auth');
            window.location.href = 'login.html';
        });
    }
}

// Hàm render Random Memory trên Homepage
function renderRandomMemory() {
    const memoryEl = document.getElementById('random-memory-container');
    if (!memoryEl) return;

    const randomIndex = Math.floor(Math.random() * RANDOM_MEMORIES.length);
    const mem = RANDOM_MEMORIES[randomIndex];

    memoryEl.innerHTML = `
        <div class="yearbook-border random-memory-card" style="text-align: center; max-width: 400px; margin: 0 auto;">
            <img src="${mem.image}" alt="Memory" style="width: 100%; border-radius: 4px; filter: sepia(0.3);" />
            <p style="margin-top: 15px; font-family: var(--f-heading); font-style: italic; font-size: 1.2rem;">"${mem.caption}"</p>
            <button id="btnReloadMemory" class="btn" style="margin-top: 15px; font-size: 0.9rem; padding: 0.5rem 1rem;">Xem kỷ niệm khác</button>
        </div>
    `;

    document.getElementById('btnReloadMemory').addEventListener('click', renderRandomMemory);
}

// Chạy logic khi load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    if (!window.location.pathname.includes('login.html')) {
        renderLayout();
    }
    
    // Nếu ở trang chủ thì render memory pattern
    if (document.getElementById('random-memory-container')) {
        renderRandomMemory();
    }
});
