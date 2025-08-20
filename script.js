document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIC: CHUYỂN TAB IP ADDRESS ---
    const ipTabs = document.querySelectorAll('.tab');
    const ipContents = document.querySelectorAll('.ip-content');
    ipTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ipTabs.forEach(t => t.classList.remove('active'));
            ipContents.forEach(c => c.classList.remove('active-content'));
            const targetId = tab.getAttribute('data-target');
            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active-content');
        });
    });

    // --- LOGIC: SAO CHÉP VÀO CLIPBOARD ---
    // ... (phần này không đổi) ...
    function showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) existingToast.remove();
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    function copyToClipboard(textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Đã sao chép: ' + textToCopy);
        }).catch(err => console.error('Lỗi khi sao chép:', err));
    }
    document.getElementById('ip-pc').addEventListener('click', () => copyToClipboard('vietnamsmp.fun'));
    document.getElementById('ip-pe').addEventListener('click', () => copyToClipboard('vietnamsmp.fun'));
    document.getElementById('port-pe').addEventListener('click', () => copyToClipboard('27191'));

    // --- LOGIC: ĐIỀU KHIỂN MODAL "CÁCH VÀO" ---
    const howToJoinModal = document.getElementById('how-to-join-modal');
    const howToJoinBtn = document.getElementById('how-to-join-btn');
    const howToJoinCloseBtn = howToJoinModal.querySelector('.close-button');
    howToJoinBtn.addEventListener('click', (event) => {
        event.preventDefault();
        howToJoinModal.style.display = 'block';
    });
    howToJoinCloseBtn.addEventListener('click', () => {
        howToJoinModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target == howToJoinModal) {
            howToJoinModal.style.display = 'none';
        }
    });
    // ... (phần chuyển tab trong modal không đổi) ...
    const modalTabs = howToJoinModal.querySelectorAll('.modal-tab');
    const modalContents = howToJoinModal.querySelectorAll('.modal-tab-content');
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            modalTabs.forEach(t => t.classList.remove('active'));
            modalContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.querySelector(`#${targetId}`).classList.add('active');
        });
    });


    // === LOGIC MỚI: ĐIỀU KHIỂN MODAL CHAT DISCORD ===
    const discordChatModal = document.getElementById('discord-chat-modal');
    const supportBtn = document.getElementById('support-btn');
    const discordChatCloseBtn = discordChatModal.querySelector('.close-button');

    // Mở modal khi nhấn nút Hỗ trợ
    supportBtn.addEventListener('click', (event) => {
        event.preventDefault();
        discordChatModal.style.display = 'block';
    });

    // Đóng modal khi nhấn nút X
    discordChatCloseBtn.addEventListener('click', () => {
        discordChatModal.style.display = 'none';
    });

    // Đóng modal khi nhấn ra ngoài
    window.addEventListener('click', (event) => {
        if (event.target == discordChatModal) {
            discordChatModal.style.display = 'none';
        }
    });
    
});
