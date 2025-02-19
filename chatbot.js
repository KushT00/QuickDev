(function() {
    const chatbox = document.createElement("div");
    chatbox.style.position = "fixed";
    chatbox.style.bottom = "20px";
    chatbox.style.right = "20px";
    chatbox.style.width = "300px";
    chatbox.style.height = "400px";
    chatbox.style.border = "1px solid #ccc";
    chatbox.style.background = "#fff";
    chatbox.style.padding = "10px";
    chatbox.innerHTML = `<strong>${window.ChatBot.role}</strong><br>${window.ChatBot.instructions}<br><input type='text' placeholder='Ask something...'>`;

    document.body.appendChild(chatbox);
})();
