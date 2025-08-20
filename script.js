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
    function showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function copyToClipboard(textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Đã sao chép: ' + textToCopy);
        }).catch(err => {
            console.error('Lỗi khi sao chép:', err);
            const tempInput = document.createElement('textarea');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                showToast('Đã sao chép: ' + textToCopy);
            } catch (err) {
                showToast('Lỗi khi sao chép!');
            }
            document.body.removeChild(tempInput);
        });
    }

    document.getElementById('ip-pc').addEventListener('click', () => copyToClipboard('vietnamsmp.fun'));
    document.getElementById('ip-pe').addEventListener('click', () => copyToClipboard('vietnamsmp.fun'));
    document.getElementById('port-pe').addEventListener('click', () => copyToClipboard('27191'));

    // --- LOGIC: ĐIỀU KHIỂN MODAL "CÁCH VÀO" ---
    const howToJoinModal = document.getElementById('how-to-join-modal');
    const howToJoinBtn = document.getElementById('how-to-join-btn');
    const howToJoinCloseBtn = howToJoinModal.querySelector('.close-button');
    const modalTabs = howToJoinModal.querySelectorAll('.modal-tab');
    const modalContents = howToJoinModal.querySelectorAll('.modal-tab-content');

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

    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const currentActiveContent = howToJoinModal.querySelector('.modal-tab-content.active');
            if(currentActiveContent) {
                currentActiveContent.classList.remove('active');
            }
            
            modalTabs.forEach(t => t.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const newActiveContent = howToJoinModal.querySelector(`#${targetId}`);
            
            if(newActiveContent) {
                 newActiveContent.classList.add('active');
            }
        });
    });

    // --- LOGIC: MỞ LIVECHAT KHI NHẤN NÚT HỖ TRỢ ---
    const supportButton = document.getElementById('support-btn');

    // Chờ cho LiveChat sẵn sàng rồi mới gán sự kiện
    window.addEventListener('load', function() {
        if (supportButton && window.LiveChatWidget) {
            supportButton.addEventListener('click', function(event) {
                // Ngăn trang nhảy lên đầu khi nhấn vào link #
                event.preventDefault(); 
                
                // Gọi API của LiveChat để mở cửa sổ chat
                window.LiveChatWidget.call('maximize');
            });
        }
    });
});
