//count-up animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // tốc độ tăng (số càng nhỏ thì chạy càng nhanh)

    const startCounting = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, ''); // bỏ dấu , hoặc +
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    // 👇 chỉ bắt đầu khi phần tử .stats xuất hiện trên màn hình
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounting();
            observer.disconnect(); // chỉ chạy 1 lần
        }
    });

    observer.observe(document.querySelector('.stats'));
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Create particle effect
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card, .timeline-content, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto slide
setInterval(() => {
    changeSlide(1);
}, 5000);

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg');
    const footerLogoImg = document.getElementById('footerLogoImg');

    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '☀️';
        logoImg.src = '/assets/img/logo_chuden.png'; // Logo sáng
        footerLogoImg.src = '/assets/img/logo_chuden.png'; // Logo sáng ở footer
        localStorage.setItem('theme', 'light');
        shapes.forEach((shape, index) => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        themeIcon.textContent = '🌙';
        logoImg.src = '/assets/img/logo_chutrang.png'; // Logo tối
        footerLogoImg.src = '/assets/img/logo_chutrang.png'; // Logo tối ở footer
        localStorage.setItem('theme', 'dark');
        shapes.forEach((shape) => {
            shape.style.filter = 'brightness(1)';
        });
    }
}

// Load saved theme - GỘP CHUNG VÀO 1 DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg');
    const footerLogoImg = document.getElementById('footerLogoImg');

    // Load theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
        logoImg.src = '/assets/img/logo_chuden.png';
        footerLogoImg.src = '/assets/img/logo_chuden.png'; // Logo sáng ở footer
        shapes.forEach((shape) => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        // Đảm bảo theme tối hiển thị đúng logo
        logoImg.src = '/assets/img/logo_chutrang.png';
        footerLogoImg.src = '/assets/img/logo_chutrang.png'; // Logo tối ở footer
    }

    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        simulateLogin(user.name, user.role, user.avatarUrl);
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('mobileMenuToggle');

    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('mobileMenuToggle');

    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('nav');

    if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Login/Logout Functions
function handleLogin() {
    // Simulate login - Replace with your actual login logic
    window.location.href = '/login.html'; // Redirect to login page            
    // Example: Show logged in state (remove this in production)
    // simulateLogin('Nguyễn Văn A', 'Khách hàng VIP', 'https://i.pravatar.cc/150?img=12');
}

function handleLogout() {
    // Simulate logout - Replace with your actual logout logic
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('userProfile').style.display = 'none';

        // Clear user data
        localStorage.removeItem('userData');

        alert('Đã đăng xuất thành công!');
    }
}

// Simulate login (for testing - remove in production)
function simulateLogin(name, role, avatarUrl = '') {
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('userName').textContent = name;
    document.getElementById('userRole').textContent = role;

    // Set avatar
    if (avatarUrl) {
        document.getElementById('avatarImg').src = avatarUrl;
        document.getElementById('avatarImg').style.display = 'block';
        document.getElementById('avatarPlaceholder').style.display = 'none';
    } else {
        document.getElementById('avatarPlaceholder').textContent = name.charAt(0).toUpperCase();
    }

    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify({ name, role, avatarUrl }));
}

// Navigation functions
function goToProfile() {
    // alert('Chuyển đến trang cá nhân');
    window.location.href = '/Profile.html';
}

function goToSettings() {
    alert('Chuyển đến cài đặt');
    // window.location.href = '/settings';
}

function goToHistory() {
    alert('Chuyển đến lịch sử tư vấn');
    // window.location.href = '/history';
}

function goToAppointments() {
    alert('Chuyển đến lịch hẹn');
    // window.location.href = '/appointments';
}
