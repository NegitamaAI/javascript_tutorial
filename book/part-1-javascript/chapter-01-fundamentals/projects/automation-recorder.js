/**
 * 🤖 BasicAutomationRecorder - Chapter 1 Project
 * A simple automation recorder that captures and replays user interactions
 */

class BasicAutomationRecorder {
    constructor() {
        this.actions = [];
        this.isRecording = false;
        this.clickHandler = this.recordClick.bind(this);
        this.inputHandler = this.recordInput.bind(this);
    }
    
    startRecording() {
        this.isRecording = true;
        this.actions = [];
        console.log('🔴 Recording started');
        
        // Listen for clicks
        document.addEventListener('click', this.clickHandler);
        
        // Listen for input changes
        document.addEventListener('input', this.inputHandler);
    }
    
    stopRecording() {
        this.isRecording = false;
        console.log('⏹️ Recording stopped');
        
        // Remove listeners
        document.removeEventListener('click', this.clickHandler);
        document.removeEventListener('input', this.inputHandler);
        
        return this.actions;
    }
    
    recordClick(event) {
        if (!this.isRecording) return;
        
        const action = {
            type: 'click',
            selector: this.getSelector(event.target),
            timestamp: Date.now(),
            coordinates: { x: event.clientX, y: event.clientY },
            element: event.target.tagName
        };
        
        this.actions.push(action);
        console.log('📝 Recorded click:', action);
    }
    
    recordInput(event) {
        if (!this.isRecording) return;
        
        const action = {
            type: 'input',
            selector: this.getSelector(event.target),
            value: event.target.value,
            timestamp: Date.now(),
            inputType: event.target.type || 'text'
        };
        
        this.actions.push(action);
        console.log('📝 Recorded input:', action);
    }
    
    getSelector(element) {
        // Priority: ID > Class > Tag
        if (element.id) return `#${element.id}`;
        if (element.className) {
            const firstClass = element.className.split(' ')[0];
            return `.${firstClass}`;
        }
        return element.tagName.toLowerCase();
    }
    
    playback(delay = 1000) {
        console.log('▶️ Playing back actions...');
        console.table(this.actions);
        
        this.actions.forEach((action, index) => {
            setTimeout(() => {
                this.executeAction(action);
            }, index * delay);
        });
    }
    
    executeAction(action) {
        const element = document.querySelector(action.selector);
        
        if (!element) {
            console.error(`❌ Element not found: ${action.selector}`);
            return;
        }
        
        switch (action.type) {
            case 'click':
                element.click();
                console.log(`✅ Clicked: ${action.selector}`);
                break;
                
            case 'input':
                element.value = action.value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`✅ Input: ${action.selector} = "${action.value}"`);
                break;
        }
    }
    
    exportActions() {
        return JSON.stringify(this.actions, null, 2);
    }
    
    importActions(jsonString) {
        try {
            this.actions = JSON.parse(jsonString);
            console.log('📥 Actions imported successfully');
        } catch (error) {
            console.error('❌ Failed to import actions:', error);
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BasicAutomationRecorder;
}

// Global usage example
if (typeof window !== 'undefined') {
    window.AutomationRecorder = BasicAutomationRecorder;
    
    // Demo function
    window.startAutomationDemo = function() {
        const recorder = new BasicAutomationRecorder();
        
        console.log('🎬 Starting 10-second recording demo...');
        recorder.startRecording();
        
        setTimeout(() => {
            const actions = recorder.stopRecording();
            console.log(`📊 Recorded ${actions.length} actions`);
            
            if (actions.length > 0) {
                console.log('⏳ Playing back in 2 seconds...');
                setTimeout(() => {
                    recorder.playback();
                }, 2000);
            }
        }, 10000);
        
        return recorder;
    };
}
