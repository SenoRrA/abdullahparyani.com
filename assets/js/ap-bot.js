const AP_KNOWLEDGE = [
    {
        intent: "greeting",
        mode: "Strategic Advisor",
        keywords: ["hi", "hello", "hey", "morning", "afternoon", "evening", "greetings"],
        responses: ["Hello. I am AP Intelligence, Abdullah's digital counterpart. I am equipped to discuss his operational history, marketing strategies, and system architectures. How can we build something meaningful today?"],
        suggestions: ["What can you help with?", "Tell me about your background", "View Case Studies"]
    },
    {
        intent: "capabilities",
        mode: "Strategic Advisor",
        keywords: ["what", "can", "you", "do", "help", "services", "offer", "skills", "capable", "capabilities", "specialty"],
        responses: ["I act as an independent strategic advisor. My pillars include Website & Service Development, Workflow Architecture, Strategic Research, and Campaign Budget Management. Which specific area requires your focus?"],
        suggestions: ["Marketing Campaigns", "Workflow Architecture", "Digital Infrastructure", "SEO & SEM"]
    },
    {
        intent: "background",
        mode: "Strategic Advisor",
        keywords: ["background", "who", "are", "you", "story", "genesis", "trade", "education", "college", "school"],
        responses: ["My journey began in my family's retail and wholesale businesses in Hyderabad. I absorbed the realities of B2B and B2C commerce early on. I later relocated to Canada to complete my Marketing Management certification at Seneca College, grounding my natural instinct in academic structure."],
        suggestions: ["Tell me about Google", "Tell me about your Amazon experience"]
    },
    {
        intent: "google",
        mode: "Business Operations Advisor",
        keywords: ["google", "play", "scam", "analyst", "accenture", "social media", "crisis", "pubg"],
        responses: ["At the Google Operations Centre, I managed interactions for Google Play, serving over 1.5 billion monthly active users. I notably identified an automated filter bypass and designed a Scam Prevention Workflow. I also managed crisis communications during the regional PUBG Mobile ban, affecting 76M players."],
        suggestions: ["What was the scam workflow?", "Tell me about Amazon", "What about current clients?"]
    },
    {
        intent: "amazon",
        mode: "Business Operations Advisor",
        keywords: ["amazon", "customer", "service", "birthday", "console", "rescue"],
        responses: ["Amazon was my corporate crucible. During a high-stress holiday season, a father's gaming console was falsely marked 'undeliverable'. I bypassed standard channels, coordinated with a fulfillment center supervisor, and tracked down the carrier. It was delivered that evening—defining my belief in going the extra mile."],
        suggestions: ["Tell me about Greenstone", "Tell me about your Google role"]
    },
    {
        intent: "marketing",
        mode: "Marketing Consultant",
        keywords: ["marketing", "campaigns", "ads", "advertising", "seo", "sem", "gmb", "brand", "voice"],
        responses: ["I specialize in data-driven marketing. Currently, I manage ad campaigns and Google My Business profiles for small businesses in the GTA. I also previously coordinated international marketing across India, the UAE, and the UK for Ebani Advertising. My approach captures high-value search intent."],
        suggestions: ["View Case Studies", "What is your SEO strategy?", "Contact Abdullah"]
    },
    {
        intent: "seo",
        mode: "SEO Consultant",
        keywords: ["seo", "sem", "search", "engine", "optimization", "ranking", "traffic"],
        responses: ["My SEO and SEM strategies focus on capturing high-intent traffic. I bridge physical presence with localized digital funnels, as I did for Khan Al Sultan Gift Shop, utilizing Stukent methodologies to maximize exposure and drive repeatable revenue."],
        suggestions: ["Tell me about Khan Al Sultan", "What are your marketing pillars?"]
    },
    {
        intent: "operations",
        mode: "Business Operations Advisor",
        keywords: ["operations", "workflow", "management", "systems", "scale", "infrastructure"],
        responses: ["I design operations to scale. From standardizing editorial calendars to eliminating administrative friction, my goal is to let business owners focus on growth. I've rebuilt workflows for educational platforms like Ad-Din, drastically reducing client churn."],
        suggestions: ["Ad-Din Case Study", "Tell me about Khan Al Sultan"]
    },
    {
        intent: "case_addin",
        mode: "Digital Strategy Advisor",
        keywords: ["ad-din", "immense", "case", "study", "churn", "educational", "platform"],
        responses: ["For Ad-Din (Immense Inc.), a community-based learning platform, I mapped the competitive landscape, devised a brand voice, and structured their editorial calendar. This drove customer acquisition to an all-time high and reduced Q2 client churn to less than a third of initial projections."],
        suggestions: ["Other Case Studies", "Marketing Operations"]
    },
    {
        intent: "greenstone",
        mode: "Strategic Advisor",
        keywords: ["greenstone", "neilson", "financial", "insurance", "sales", "advisor", "llqp"],
        responses: ["I am currently a Senior Sales Advisor for Greenstone Financial Services, operating within a highly competitive direct insurance landscape under a strict LLQP regulatory framework across 10 Canadian provinces. I manage a portfolio of 9 complex life and health products, ensuring absolute data integrity via Salesforce."],
        suggestions: ["What CRM tools do you use?", "Tell me about your certifications"]
    },
    {
        intent: "khanalsultan",
        mode: "Business Operations Advisor",
        keywords: ["khan", "al", "sultan", "gift", "shop", "cornerstore", "ozis", "retail"],
        responses: ["For growing retail businesses like Khan Al Sultan and OZIS B&B, I digitized physical inventory, built modern e-commerce storefronts, handled product photography, and executed local SEO strategies. I bridged traditional goodwill with a modern digital funnel."],
        suggestions: ["Marketing expertise", "Contact Abdullah"]
    },
    {
        intent: "awards",
        mode: "Strategic Advisor",
        keywords: ["award", "awards", "recognition", "ideathon", "star", "performer", "shield", "delight"],
        responses: ["My operational discipline has been verified. I am an Ideathon Qualifier (Accenture), a 3x Star Performer, a 2x Shield Award winner (Khamur), and I've received citations for Leadership, Quality, and Customer Delight at Amazon."],
        suggestions: ["View Technical Skills", "Tell me about your Google role"]
    },
    {
        intent: "contact",
        mode: "Strategic Advisor",
        keywords: ["contact", "email", "phone", "call", "whatsapp", "linkedin", "reach", "hire", "talk"],
        responses: ["You can reach me directly at paryani.abdullah@gmail.com, or call/WhatsApp me at +1 (249) 876-2164. Let's build systems that scale."],
        suggestions: ["Copy Email", "Call Now"]
    },
    {
        intent: "name_capture",
        mode: "Strategic Advisor",
        keywords: ["my name is", "i am", "im", "this is"],
        responses: ["It is a pleasure to meet you, [NAME]. How can I assist you with your business objectives today?"]
    }
];

class APIntelligence {
    constructor() {
        let storedMemory = { name: null, history: [] };
        try {
            storedMemory = JSON.parse(localStorage.getItem('ap_intel_memory')) || { name: null, history: [] };
        } catch(e) {}
        
        this.memory = storedMemory;
        this.chatWindow = document.getElementById('ap-chat-window');
        this.toggleBtn = document.getElementById('ap-chat-toggle');
        
        this.closeBtn = document.getElementById('ap-chat-close');
        this.resetBtn = document.getElementById('ap-chat-reset');
        this.voiceBtn = document.getElementById('ap-voice-toggle');
        
        this.input = document.getElementById('ap-chat-input');
        this.sendBtn = document.getElementById('ap-chat-send');
        this.body = document.getElementById('ap-chat-body');
        this.typing = document.getElementById('ap-typing');
        this.suggestBox = document.getElementById('ap-chat-suggestions');
        this.modeUI = document.getElementById('ap-mode');
        
        this.isOpen = false;
        this.isVoiceOn = false;
        this.proactiveTimer = null;
        this.synth = window.speechSynthesis;
    }

    init() {
        if(!this.toggleBtn) return;
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.resetBtn.addEventListener('click', () => this.resetChat());
        this.sendBtn.addEventListener('click', () => this.handleUserSubmit());
        this.input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleUserSubmit() });
        this.voiceBtn.addEventListener('click', () => this.toggleVoice());

        this.updateVoiceIcon();
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('active');
            this.toggleBtn.style.transform = 'scale(0)';
            
            const messageCount = Array.from(this.body.children).filter(el => el.id !== 'ap-typing').length;
            if (messageCount === 0) {
                this.greetUser();
            }
            this.resetProactiveTimer();
        } else {
            this.chatWindow.classList.remove('active');
            this.toggleBtn.style.transform = 'scale(1)';
            clearTimeout(this.proactiveTimer);
            this.synth.cancel(); 
        }
    }
    
    resetChat() {
        const msgs = this.body.querySelectorAll('.chat-msg');
        msgs.forEach(m => m.remove());
        
        this.memory.history = [];
        this.saveMemory();
        
        this.greetUser();
    }

    toggleVoice() {
        this.isVoiceOn = !this.isVoiceOn;
        this.updateVoiceIcon();
        if(!this.isVoiceOn) this.synth.cancel();
    }

    updateVoiceIcon() {
        if (this.isVoiceOn) {
            this.voiceBtn.classList.add('active-voice');
            this.voiceBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
        } else {
            this.voiceBtn.classList.remove('active-voice');
            this.voiceBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        }
    }

    greetUser() {
        let msg = "Hello. I am AP Intelligence, Abdullah's digital counterpart. I am equipped to discuss his operational history, marketing strategies, and system architectures. How can we build something meaningful today?";
        if (this.memory.name) {
            msg = `Welcome back, ${this.memory.name}. What business objective can we tackle today?`;
        }
        this.botReply(msg, ["What can you help with?", "Tell me about your background", "View Case Studies"], "Strategic Advisor");
    }

    handleUserSubmit() {
        const text = this.input.value.trim();
        if (!text) return;
        
        this.input.value = '';
        this.appendMessage(text, 'user');
        this.suggestBox.innerHTML = '';
        this.resetProactiveTimer();

        this.showTyping();
        
        setTimeout(() => {
            this.processInput(text);
        }, 600 + Math.random() * 600); 
    }

    processInput(text) {
        this.hideTyping();
        const lowerText = text.toLowerCase().replace(/[.,?!]/g, '');
        
        if (lowerText.match(/^(back|menu|options|restart|start over|home|main menu)$/)) {
            this.resetChat();
            return;
        }
        
        const nameMatch = lowerText.match(/(?:my name is|i am|i'm) ([a-z]+)/i);
        if (nameMatch && nameMatch[1]) {
            const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
            this.memory.name = name;
            this.saveMemory();
            this.botReply(`It is a pleasure to meet you, ${name}. How can I assist you with your business objectives today?`, ["Marketing Expertise", "Google Experience", "Contact Abdullah"], "Strategic Advisor");
            return;
        }

        let bestMatch = null;
        let highestScore = 0;

        const tokens = lowerText.split(' ');

        AP_KNOWLEDGE.forEach(k => {
            let score = 0;
            k.keywords.forEach(kw => {
                if (lowerText.includes(kw)) score += 2; 
                tokens.forEach(t => { if (t === kw) score += 1; }); 
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = k;
            }
        });

        if (highestScore > 0 && bestMatch) {
            this.modeUI.innerText = bestMatch.mode || "Strategic Advisor";
            const response = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
            this.botReply(response, bestMatch.suggestions || ["Tell me more", "Other capabilities", "Main Menu"], bestMatch.mode);
            
            if(!this.memory.history.includes(bestMatch.intent)) {
                this.memory.history.push(bestMatch.intent);
                this.saveMemory();
            }
        } else {
            this.modeUI.innerText = "Strategic Advisor";
            this.botReply("I may not have the specific data on that. I am heavily trained on Abdullah's marketing, operational frameworks, and corporate case studies (Google, Amazon). Could you clarify your question?", ["Marketing", "Business Operations", "Main Menu"]);
        }
    }

    botReply(text, suggestions = [], mode = "Strategic Advisor") {
        this.appendMessage(text, 'bot');
        this.renderSuggestions(suggestions);
        
        if (this.isVoiceOn) {
            this.synth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.05;
            utterance.pitch = 0.95;
            const voices = this.synth.getVoices();
            const preferredVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
            if(preferredVoice) utterance.voice = preferredVoice;
            
            this.synth.speak(utterance);
        }
    }

    appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        div.innerText = text;
        this.body.insertBefore(div, this.typing);
        this.scrollToBottom();
    }

    showTyping() {
        this.typing.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typing.style.display = 'none';
    }

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }

    renderSuggestions(suggestions) {
        this.suggestBox.innerHTML = '';
        suggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-pill interactive-el';
            btn.innerText = s;
            
            btn.addEventListener('mouseenter', () => document.getElementById('custom-cursor').classList.add('hovered'));
            btn.addEventListener('mouseleave', () => document.getElementById('custom-cursor').classList.remove('hovered'));
            
            btn.onclick = () => {
                if (s.toLowerCase() === "main menu" || s.toLowerCase() === "back") {
                    this.resetChat();
                } else {
                    this.input.value = s;
                    this.handleUserSubmit();
                }
                document.getElementById('custom-cursor').classList.remove('hovered');
            };
            this.suggestBox.appendChild(btn);
        });
    }

    saveMemory() {
        try {
            localStorage.setItem('ap_intel_memory', JSON.stringify(this.memory));
        } catch(e) {}
    }

    resetProactiveTimer() {
        clearTimeout(this.proactiveTimer);
        if (this.isOpen) {
            this.proactiveTimer = setTimeout(() => this.triggerProactiveBehavior(), 12000); 
        }
    }

    triggerProactiveBehavior() {
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            const allIntents = ["google", "amazon", "marketing", "seo", "operations"];
            const unDiscussed = allIntents.filter(i => !this.memory.history.includes(i));
            
            let suggestion = "Would you like to review some of Abdullah's active case studies?";
            let pills = ["Ad-Din Case Study", "Ebani Advertising", "Main Menu"];
            
            if (unDiscussed.length > 0) {
                const topic = unDiscussed[Math.floor(Math.random() * unDiscussed.length)];
                switch(topic) {
                    case "google": suggestion = "We haven't discussed Abdullah's work at Google. Interested in his Scam Prevention Workflow?"; pills = ["Yes, Google Experience", "Main Menu"]; break;
                    case "marketing": suggestion = "Would you like to dive into Abdullah's data-driven marketing approaches?"; pills = ["Marketing Strategy", "SEO Capabilities"]; break;
                    case "amazon": suggestion = "I can tell you the story of the 'Birthday Console Rescue' from his time at Amazon. Shall I?"; pills = ["Yes, tell me", "Main Menu"]; break;
                    case "operations": suggestion = "Interested in learning how Abdullah optimizes business workflows to eliminate friction?"; pills = ["Workflow Optimization", "Main Menu"]; break;
                }
            }
            
            this.appendMessage(suggestion, 'bot');
            this.renderSuggestions(pills);
        }, 1000);
    }
}

window.apBot = new APIntelligence();
