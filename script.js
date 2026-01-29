const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

// Bot responses
const botResponses = {
    greetings: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    farewell: ['bye', 'goodbye', 'see you', 'farewell', 'take care'],
    thanks: ['thank', 'thanks', 'thank you', 'thx'],
    howAreYou: ['how are you', 'how do you do', 'how are things', 'how\'s it going'],
    name: ['what is your name', 'your name', 'who are you', 'what are you called'],
    help: ['help', 'can you help', 'i need help', 'assist'],
    time: ['what time', 'current time', 'time is it'],
    date: ['what date', 'current date', 'today\'s date', 'what day'],
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check for greetings
    if (botResponses.greetings.some(word => message.includes(word))) {
        return 'Hello! 😊 How can I assist you today?';
    }

    // Check for farewell
    if (botResponses.farewell.some(word => message.includes(word))) {
        return 'Goodbye! 👋 Have a great day!';
    }

    // Check for thanks
    if (botResponses.thanks.some(word => message.includes(word))) {
        return 'You\'re welcome! 😊 Happy to help!';
    }

    // Check for how are you
    if (botResponses.howAreYou.some(phrase => message.includes(phrase))) {
        return 'I\'m doing great, thanks for asking! 🤖 How about you?';
    }

    // Check for name
    if (botResponses.name.some(phrase => message.includes(phrase))) {
        return 'I\'m a friendly chatbot created to help you! 🤖 You can call me Bot.';
    }

    // Check for help
    if (botResponses.help.some(word => message.includes(word))) {
        return 'I\'m here to chat with you! Try asking me about the time, date, or just say hello! 😊';
    }

    // Check for time
    if (botResponses.time.some(phrase => message.includes(phrase))) {
        const currentTime = new Date().toLocaleTimeString();
        return `The current time is ${currentTime} ⏰`;
    }

    // Check for date
    if (botResponses.date.some(phrase => message.includes(phrase))) {
        const currentDate = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        return `Today is ${currentDate} 📅`;
    }

    // Default response
    return 'I\'m not sure I understand. Could you rephrase that? Or try asking me about the time, date, or just chat with me! 😊';
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator active';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot thinking time
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 1000);
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus on input when page loads
chatInput.focus();
