// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg');
    // Xóa dòng này vì trang login không có footer
    // const footerLogoImg = document.getElementById('footerLogoImg');

    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '☀️';
        logoImg.src = '/assets/img/logo_chuden.png';
        // Xóa dòng này
        // footerLogoImg.src = '/assets/img/logo_chuden.png';
        localStorage.setItem('theme', 'light');
        shapes.forEach((shape, index) => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        themeIcon.textContent = '🌙';
        logoImg.src = '/assets/img/logo_chutrang.png';
        // Xóa dòng này
        // footerLogoImg.src = '/assets/img/logo_chutrang.png';
        localStorage.setItem('theme', 'dark');
        shapes.forEach((shape) => {
            shape.style.filter = 'brightness(1)';
        });
    }
}
// Load saved theme
// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg'); // Thêm dòng này

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
        logoImg.src = '/assets/img/logo_chuden.png'; // Thêm dòng này
        shapes.forEach((shape) => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        // Đảm bảo logo tối hiển thị đúng khi theme dark
        logoImg.src = '/assets/img/logo_chutrang.png'; // Thêm dòng này
    }
});

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    const loginBtn = document.getElementById('loginBtn');

    // Add loading state
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = ''; /* Dùng innerHTML thay vì textContent */
    setTimeout(() => {
        console.log('Login attempt:', { username, password, remember });

        alert(`Đăng nhập thành công!\n\nEmail: ${username}\nGhi nhớ: ${remember ? 'Có' : 'Không'}`);

        const userData = {
            name: username.split('@')[0],
            role: 'Khách hàng',
            avatarUrl: ''
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        goHome();
    }, 2000);
}

// Social Login Functions
function loginWithGoogle() {
    alert('Đăng nhập bằng Google\n\nTích hợp với Google OAuth API');
}

function loginWithFacebook() {
    alert('Đăng nhập bằng Facebook\n\nTích hợp với Facebook Login API');
}

function loginWithApple() {
    alert('Đăng nhập bằng Apple\n\nTích hợp với Sign in with Apple');
}

// Forgot Password
function forgotPassword() {
    const email = prompt('Nhập email của bạn để khôi phục mật khẩu:');
    if (email) {
        alert(`Đã gửi link khôi phục mật khẩu đến ${email}\n\nVui lòng kiểm tra hộp thư!`);
    }
}

// Navigation
function goHome() {
    window.location.href = 'Home.html';
}

function goToRegister() {
    alert('Chuyển đến trang đăng ký');
}
