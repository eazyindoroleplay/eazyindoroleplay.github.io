// Fungsi untuk menampilkan pesan berdasarkan grup yang dipilih
function selectGroup(groupName) {
    document.getElementById('groupName').innerText = groupName;
    // Simulasi mengambil pesan dari localStorage
    let storedMessages = JSON.parse(localStorage.getItem(groupName)) || [];
    renderMessages(storedMessages);
}

// Fungsi untuk mengirim pesan baru
function sendMessage() {
    let messageInput = document.getElementById('messageInput').value;
    if (messageInput.trim() === '') {
        alert('Masukkan pesan terlebih dahulu');
        return;
    }
    let groupName = document.getElementById('groupName').innerText;
    let message = {
        text: messageInput,
        time: getCurrentTime(),
        user: document.getElementById('username').innerText,
        isAdmin: false // Periksa apakah pengguna adalah admin (harus diimplementasikan di backend)
    };
    // Simpan pesan ke localStorage agar tidak hilang saat di-refresh
    let storedMessages = JSON.parse(localStorage.getItem(groupName)) || [];
    storedMessages.push(message);
    localStorage.setItem(groupName, JSON.stringify(storedMessages));
    // Render ulang pesan
    renderMessages(storedMessages);
    // Bersihkan input pesan
    document.getElementById('messageInput').value = '';
}

// Fungsi untuk mengganti username
function changeUsername() {
    let newUsername = document.getElementById('usernameInput').value.trim();
    if (newUsername === '') {
        alert('Masukkan username baru');
        return;
    }
    document.getElementById('username').innerText = newUsername;
}

// Fungsi untuk mendapatkan waktu saat ini dalam format hh:mm AM/PM
function getCurrentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Jam 0 akan diubah menjadi 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// Fungsi untuk merender pesan ke dalam chat
function renderMessages(messages) {
    let chatMessagesDiv = document.getElementById('chatMessages');
    chatMessagesDiv.innerHTML = '';
    messages.forEach(message => {
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (message.isAdmin) {
            messageDiv.classList.add('admin');
        }
        messageDiv.innerHTML = `
            <p>${message.text}</p>
            <div class="meta">Time: ${message.time} - ${message.user}</div>
        `;
        chatMessagesDiv.appendChild(messageDiv);
    });
}

// Panggil fungsi selectGroup saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    selectGroup('group1'); // Ganti dengan grup default atau grup terakhir yang dilihat pengguna
});
