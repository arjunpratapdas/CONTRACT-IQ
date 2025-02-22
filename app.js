
// App Configuration
const CONFIG = {
    API_URL: 'https://api.create.xyz/api/v1',
    AUTH_TOKEN_KEY: 'auth_token',
    USER_KEY: 'user_data',
    CHAT_HISTORY_KEY: 'chat_history'
};

// State Management
let state = {
    user: null,
    messages: [],
    selectedTool: 'general',
    isLoading: false,
    currentPage: null
};

// Utility Functions
const utils = {
    showLoading: () => {
        document.getElementById('loading-overlay').classList.remove('hidden');
    },
    hideLoading: () => {
        document.getElementById('loading-overlay').classList.add('hidden');
    },
    showToast: (message, type = 'info') => {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`;
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    },
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
};

// Authentication Functions
const auth = {
    async signUp(email, password, name) {
        try {
            utils.showLoading();
            // Simulate API call - Replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1000));
            const user = { id: Date.now(), email, name };
            localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user));
            state.user = user;
            utils.showToast('Account created successfully!');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        } finally {
            utils.hideLoading();
        }
    },

    async signIn(email, password) {
        try {
            utils.showLoading();
            // Simulate API call - Replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1000));
            const user = { id: Date.now(), email };
            localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user));
            state.user = user;
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        } finally {
            utils.hideLoading();
        }
    },

    signOut() {
        localStorage.removeItem(CONFIG.USER_KEY);
        localStorage.removeItem(CONFIG.AUTH_TOKEN_KEY);
        state.user = null;
        window.location.href = '/';
    },

    checkAuth() {
        const user = localStorage.getItem(CONFIG.USER_KEY);
        if (user) {
            state.user = JSON.parse(user);
            return true;
        }
        return false;
    }
};

// AI Processing Functions
const ai = {
    async processMessage(message, tool) {
        try {
            utils.showLoading();
            // Simulate AI processing - Replace with actual AI integration
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            let response;
            switch (tool) {
                case 'analyze':
                    response = "Based on my analysis of the document:\n\n" +
                             "1. Key Terms:\n" +
                             "   - Agreement duration: 12 months\n" +
                             "   - Payment terms: Net 30\n\n" +
                             "2. Potential Risks:\n" +
                             "   - Ambiguous termination clause\n" +
                             "   - Missing liability limitations\n\n" +
                             "3. Recommendations:\n" +
                             "   - Add specific performance metrics\n" +
                             "   - Include dispute resolution procedure";
                    break;
                    
                case 'generate':
                    response = "I'll help you generate a contract. Please provide:\n\n" +
                             "1. Type of agreement (e.g., NDA, Employment, Service)\n" +
                             "2. Parties involved\n" +
                             "3. Key terms and conditions\n" +
                             "4. Jurisdiction\n\n" +
                             "Once you provide these details, I'll generate a customized agreement.";
                    break;
                    
                case 'compliance':
                    response = "Compliance Check Results:\n\n" +
                             "1. Data Protection:\n" +
                             "   ✓ GDPR compliance measures\n" +
                             "   ✓ Data processing agreements\n\n" +
                             "2. Employment:\n" +
                             "   ⚠️ Update workplace safety policies\n" +
                             "   ✓ Equal opportunity compliance\n\n" +
                             "3. Industry Regulations:\n" +
                             "   ⚠️ Annual audit due in 30 days";
                    break;
                    
                default:
                    response = "I'm here to help with your legal questions. I can:\n\n" +
                             "1. Analyze legal documents\n" +
                             "2. Generate contracts\n" +
                             "3. Check compliance requirements\n" +
                             "4. Answer general legal questions\n\n" +
                             "What would you like to know?";
            }
            
            return response;
        } catch (error) {
            utils.showToast('Error processing message', 'error');
            return 'I apologize, but I encountered an error. Please try again.';
        } finally {
            utils.hideLoading();
        }
    },

    async processDocument(file) {
        try {
            utils.showLoading();
            // Simulate document processing - Replace with actual document processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return {
                summary: "Document Analysis Summary:\n\n" +
                        "1. Document Type: " + file.name.split('.').pop().toUpperCase() + "\n" +
                        "2. Key Points:\n" +
                        "   - Contract terms identified\n" +
                        "   - Legal obligations extracted\n" +
                        "   - Risk factors assessed\n\n" +
                        "3. Recommendations:\n" +
                        "   - Review Section 3.2 for clarity\n" +
                        "   - Update compliance measures\n" +
                        "   - Consider additional safeguards",
                type: file.type,
                name: file.name
            };
        } catch (error) {
            utils.showToast('Error processing document', 'error');
            throw error;
        } finally {
            utils.hideLoading();
        }
    }
};

// Page Rendering Functions
const renderer = {
    renderLandingPage() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <!-- Navigation -->
                <nav class="bg-white shadow-lg">
                    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-scale-balanced text-blue-600 text-3xl"></i>
                            <span class="ml-2 text-2xl font-bold font-poppins text-gray-800">
                                Legalify AI
                            </span>
                        </div>
                        <div class="flex gap-4">
                            <button id="auth-button" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-poppins hover:bg-blue-700 transition duration-200">
                                Get Started
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Hero Section -->
                <main class="max-w-7xl mx-auto px-4 py-20">
                    <div class="text-center mb-20">
                        <h1 class="text-4xl md:text-6xl font-bold font-poppins text-gray-800 mb-6">
                            AI-Powered Legal Assistant
                        </h1>
                        <p class="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
                            Analyze contracts, generate agreements, and track compliance with our advanced AI platform
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        ${this.renderFeatures()}
                    </div>
                </main>
            </div>
        `;

        // Add event listeners
        document.getElementById('auth-button').addEventListener('click', () => {
            window.location.href = '/auth';
        });
    },

    renderFeatures() {
        const features = [
            {
                icon: 'fa-robot',
                title: 'AI Analysis',
                description: 'Analyze legal documents with advanced AI'
            },
            {
                icon: 'fa-file-contract',
                title: 'Contract Generation',
                description: 'Generate custom legal agreements'
            },
            {
                icon: 'fa-shield-alt',
                title: 'Compliance Check',
                description: 'Track and ensure legal compliance'
            },
            {
                icon: 'fa-clock',
                title: 'Deadline Tracking',
                description: 'Monitor important legal deadlines'
            }
        ];

        return features.map(feature => `
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-200 cursor-pointer hover-scale">
                <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas ${feature.icon} text-blue-600 text-xl"></i>
                </div>
                <h3 class="font-poppins font-bold text-lg mb-2 text-gray-800">
                    ${feature.title}
                </h3>
                <p class="text-gray-600 font-inter">
                    ${feature.description}
                </p>
            </div>
        `).join('');
    },

    renderAuthPage() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                    <div class="text-center mb-8">
                        <i class="fas fa-scale-balanced text-blue-600 text-4xl mb-4"></i>
                        <h2 class="text-3xl font-bold font-poppins text-gray-800">
                            Welcome to Legalify AI
                        </h2>
                        <p class="mt-2 text-gray-600">
                            ${state.isSignUp ? 'Create your account' : 'Sign in to your account'}
                        </p>
                    </div>

                    <form id="auth-form" class="space-y-6">
                        ${state.isSignUp ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" required
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        ` : ''}
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email address</label>
                            <input type="email" name="email" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>

                        <div>
                            <button type="submit"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                ${state.isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <div class="mt-6 text-center">
                        <button id="toggle-auth" class="text-blue-600 hover:text-blue-500">
                            ${state.isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('auth-form').addEventListener('submit', this.handleAuth.bind(this));
        document.getElementById('toggle-auth').addEventListener('click', () => {
            state.isSignUp = !state.isSignUp;
            this.renderAuthPage();
        });
    },

    async handleAuth(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');

        try {
            let success;
            if (state.isSignUp) {
                success = await auth.signUp(email, password, name);
            } else {
                success = await auth.signIn(email, password);
            }

            if (success) {
                window.location.href = '/chat';
            }
        } catch (error) {
            utils.showToast(error.message, 'error');
        }
    },

    renderChatPage() {
        if (!auth.checkAuth()) {
            window.location.href = '/auth';
            return;
        }

        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen bg-gray-50">
                <!-- Navigation -->
                <nav class="bg-white shadow-lg">
                    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-scale-balanced text-blue-600 text-3xl"></i>
                            <span class="ml-2 text-2xl font-bold font-poppins text-gray-800">
                                Legalify AI
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <button id="tool-menu" class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                                    <i class="fas fa-tools text-gray-600"></i>
                                    <span class="font-poppins text-gray-800">Tools</span>
                                </button>
                            </div>
                            <button id="sign-out" class="text-gray-600 hover:text-gray-800">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Main Chat Interface -->
                <main class="max-w-4xl mx-auto px-4 py-8">
                    <div class="bg-white rounded-xl shadow-lg h-[80vh] flex flex-col">
                        <!-- Tool Selection -->
                        <div class="p-4 border-b border-gray-200">
                            <h2 class="font-poppins font-bold text-xl text-gray-800 mb-4">
                                AI Legal Assistant
                            </h2>
                            <div class="flex gap-2 overflow-x-auto pb-2">
                                ${this.renderToolButtons()}
                            </div>
                        </div>

                        <!-- Messages Area -->
                        <div id="messages" class="flex-1 overflow-y-auto p-4 space-y-4">
                            ${this.renderWelcomeMessage()}
                        </div>

                        <!-- Input Area -->
                        <div class="p-4 border-t border-gray-200 space-y-2">
                            <!-- File Upload -->
                            <div class="flex gap-2">
                                <input type="file" id="file-upload" accept=".pdf,.doc,.docx,.txt"
                                    class="hidden">
                                <label for="file-upload"
                                    class="cursor-pointer flex-1 p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                                    <div class="text-center text-gray-600">
                                        <i class="fas fa-cloud-upload-alt text-xl mb-1"></i>
                                        <p>Click to upload or drag and drop</p>
                                    </div>
                                </label>
                            </div>

                            <!-- Message Input -->
                            <div class="flex gap-2">
                                <input type="text" id="message-input"
                                    class="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="${this.getPlaceholderText()}">
                                <button id="send-message"
                                    class="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;

        // Add event listeners
        this.setupChatEventListeners();
    },

    renderToolButtons() {
        const tools = [
            { id: 'analyze', icon: 'fa-search', text: 'Analyze Agreement' },
            { id: 'generate', icon: 'fa-file-contract', text: 'Generate Contract' },
            { id: 'compliance', icon: 'fa-shield-alt', text: 'Check Compliance' },
            { id: 'general', icon: 'fa-comment', text: 'General Advice' }
        ];

        return tools.map(tool => `
            <button data-tool="${tool.id}"
                class="tool-button px-4 py-2 rounded-lg font-poppins text-sm flex items-center gap-2 ${
                    state.selectedTool === tool.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }">
                <i class="fas ${tool.icon}"></i>
                ${tool.text}
            </button>
        `).join('');
    },

    renderWelcomeMessage() {
        return `
            <div class="message-bubble message-assistant">
                Hello! I'm your legal AI assistant. I can help you:
                <ul class="list-disc ml-4 mt-2">
                    <li>Analyze legal documents</li>
                    <li>Generate contracts</li>
                    <li>Check compliance requirements</li>
                    <li>Answer legal questions</li>
                </ul>
                How can I assist you today?
            </div>
        `;
    },

    getPlaceholderText() {
        switch (state.selectedTool) {
            case 'analyze':
                return 'Upload a document or ask questions about your agreement...';
            case 'generate':
                return 'Describe the type of contract you need...';
            case 'compliance':
                return 'Ask about specific compliance requirements...';
            default:
                return 'Ask about contracts, compliance, business law...';
        }
    },

    setupChatEventListeners() {
        // Tool selection
        document.querySelectorAll('.tool-button').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedTool = button.dataset.tool;
                this.renderChatPage();
            });
        });

        // Message input
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-message');

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        sendButton.addEventListener('click', () => {
            this.handleSendMessage();
        });

        // File upload
        document.getElementById('file-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Sign out
        document.getElementById('sign-out').addEventListener('click', () => {
            auth.signOut();
        });
    },

    async handleSendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        messageInput.value = '';

        // Get AI response
        const response = await ai.processMessage(message, state.selectedTool);
        this.addMessage(response, 'assistant');
    },

    async handleFileUpload(file) {
        if (!file) return;

        try {
            this.addMessage(`Analyzing: ${file.name}`, 'user');
            const result = await ai.processDocument(file);
            this.addMessage(result.summary, 'assistant');
        } catch (error) {
            utils.showToast('Error processing file', 'error');
        }
    },

    addMessage(text, sender) {
        const messages = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-bubble message-${sender} slide-up`;
        messageDiv.innerHTML = marked.parse(text);
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
};

// Router
const router = {
    init() {
        window.addEventListener('popstate', this.handleRoute.bind(this));
        this.handleRoute();
    },

    handleRoute() {
        const path = window.location.pathname;
        switch (path) {
            case '/':
                renderer.renderLandingPage();
                break;
            case '/auth':
                renderer.renderAuthPage();
                break;
            case '/chat':
                renderer.renderChatPage();
                break;
            default:
                window.location.href = '/';
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});