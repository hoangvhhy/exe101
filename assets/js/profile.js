// Tab Switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('.nav-link');

    tabs.forEach(tab => tab.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg');

    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '☀️';
        if (logoImg) logoImg.src = '/assets/img/logo_chuden.png';
        localStorage.setItem('theme', 'light');
        shapes.forEach(shape => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        themeIcon.textContent = '🌙';
        if (logoImg) logoImg.src = '/assets/img/logo_chutrang.png';
        localStorage.setItem('theme', 'dark');
        shapes.forEach(shape => {
            shape.style.filter = 'brightness(1)';
        });
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-icon');
    const shapes = document.querySelectorAll('.shape');
    const logoImg = document.getElementById('logoImg');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☀️';
        if (logoImg) logoImg.src = '/assets/img/logo_chuden.png';
        shapes.forEach(shape => {
            shape.style.filter = 'brightness(1.3)';
        });
    } else {
        if (logoImg) logoImg.src = '/assets/img/logo_chutrang.png';
    }

    // Load user data
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        const displayName = user.name || 'Nguyễn Văn A';

        document.getElementById('profileName').textContent = displayName;
        document.getElementById('fullName').value = displayName;
        document.getElementById('userName').textContent = displayName;
        document.getElementById('avatarPlaceholder').textContent = displayName.charAt(0).toUpperCase();
        document.getElementById('avatarPlaceholderNav').textContent = displayName.charAt(0).toUpperCase();

        if (user.avatarUrl) {
            document.getElementById('profileImage').src = user.avatarUrl;
            document.getElementById('profileImage').style.display = 'block';
            document.getElementById('avatarPlaceholder').style.display = 'none';

            document.getElementById('avatarImg').src = user.avatarUrl;
            document.getElementById('avatarImg').style.display = 'block';
            document.getElementById('avatarPlaceholderNav').style.display = 'none';
        }

        document.getElementById('userProfile').style.display = 'flex';
        document.getElementById('loginBtn').style.display = 'none';
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Upload Avatar
function uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const avatarUrl = e.target.result;

            document.getElementById('profileImage').src = avatarUrl;
            document.getElementById('profileImage').style.display = 'block';
            document.getElementById('avatarPlaceholder').style.display = 'none';

            document.getElementById('avatarImg').src = avatarUrl;
            document.getElementById('avatarImg').style.display = 'block';
            document.getElementById('avatarPlaceholderNav').style.display = 'none';

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            userData.avatarUrl = avatarUrl;
            localStorage.setItem('userData', JSON.stringify(userData));

            alert('✅ Ảnh đại diện đã được cập nhật thành công!');
        };
        reader.readAsDataURL(file);
    }
}

// Handle Profile Form Submit
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;

    document.getElementById('profileName').textContent = fullName;
    document.getElementById('userName').textContent = fullName;
    document.getElementById('avatarPlaceholder').textContent = fullName.charAt(0).toUpperCase();
    document.getElementById('avatarPlaceholderNav').textContent = fullName.charAt(0).toUpperCase();

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.name = fullName;
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('✅ Thông tin đã được cập nhật thành công!');
});

// Delete Account
function deleteAccount() {
    const confirmation = confirm(
        '⚠️ CẢNH BÁO: Bạn có chắc chắn muốn xóa tài khoản?\n\n' +
        'Hành động này sẽ:\n' +
        '• Xóa vĩnh viễn tất cả dữ liệu của bạn\n' +
        '• Hủy tất cả lịch hẹn đang có\n' +
        '• Không thể khôi phục\n\n' +
        'Nhấn OK để tiếp tục hoặc Cancel để hủy.'
    );

    if (confirmation) {
        const doubleCheck = prompt('Nhập "XÓA TÀI KHOẢN" để xác nhận:');
        if (doubleCheck === 'XÓA TÀI KHOẢN') {
            localStorage.clear();
            alert('✅ Tài khoản đã được xóa. Bạn sẽ được chuyển về trang chủ.');
            window.location.href = 'Home.html';
        } else {
            alert('❌ Xác nhận không đúng. Hủy xóa tài khoản.');
        }
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('mobileMenuToggle');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('mobileMenuToggle').classList.remove('active');
}

// Navigation Functions
function handleLogin() {
    window.location.href = 'login.html';
}

function handleLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('userData');
        window.location.href = 'Home.html';
    }
}

function goToProfile() {
    // Already on profile page
}

function goToSettings() {
    switchTab('settings');
    const settingsBtn = document.querySelectorAll('.nav-link')[2];
    const allBtns = document.querySelectorAll('.nav-link');
    allBtns.forEach(btn => btn.classList.remove('active'));
    settingsBtn.classList.add('active');
}

function goToHistory() {
    switchTab('history');
    const historyBtn = document.querySelectorAll('.nav-link')[1];
    const allBtns = document.querySelectorAll('.nav-link');
    allBtns.forEach(btn => btn.classList.remove('active'));
    historyBtn.classList.add('active');
}

function goToAppointments() {
    alert('📅 Chức năng đang được phát triển!');
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

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    if (form.id !== 'profileForm') {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('✅ Thay đổi đã được lưu thành công!');
        });
    }
});

// Notification settings
document.querySelectorAll('.form-check-input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const setting = this.id;
        const isChecked = this.checked;
        console.log(`Setting ${setting} changed to: ${isChecked}`);
    });
});
