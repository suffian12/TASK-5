document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const typingIndicator = document.getElementById('typingIndicator');
    const clearChatButton = document.getElementById('clearChat');
    
    loadMessages();
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    clearChatButton.addEventListener('click', clearChat);
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'sent');
        chatInput.value = '';
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'received');
        }, 1500);
    }
    
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(timestamp);
        
        chatbox.appendChild(messageDiv);
        scrollToBottom();
        saveMessage(content, type);
    }
    
    function getBotResponse(userMessage) {
        const responses = [
            "That's interesting! Tell me more.",
            "I see what you mean.",
            "How does that make you feel?",
            "I'm here to help!",
            "That's a great point!",
            "Let me think about that...",
            "I understand completely.",
            "Thanks for sharing that with me.",
            "What do you think about that?",
            "I'm always learning from our conversations."
        ];
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! How can I help you today?";
        } else if (lowerMessage.includes('how are you')) {
            return "I'm doing great, thanks for asking! How about you?";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help with?";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Have a great day!";
        } else if (lowerMessage.includes('help')) {
            return "I'm here to assist you. What do you need help with?";
        } else if (lowerMessage.includes('name')) {
            return "I'm a simple chatbot. You can call me ChatBot!";
        } else if (lowerMessage.includes('weather')) {
            return "I don't have access to weather data, but I hope it's nice where you are!";
        } else if (lowerMessage.includes('joke')) {
            return "Why don't scientists trust atoms? Because they make up everything!";
        }
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    function scrollToBottom() {
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    }
    
    function saveMessage(content, type) {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push({ content, type, timestamp: getCurrentTime() });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    
    function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = msg.content;
        
        const timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.textContent = msg.timestamp;
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(timestamp);
        chatbox.appendChild(messageDiv);
    });

    scrollToBottom();
}

    
    function clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            localStorage.removeItem('chatMessages');
            chatbox.innerHTML = '';
            chatbox.appendChild(typingIndicator);
            hideTypingIndicator();
            setTimeout(() => {
                addMessage("Hello! I'm your friendly chatbot. How can I help you today?", 'received');
            }, 500);
        }
    }
});
