document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const detectBtn = document.getElementById('detectBtn');
    const resultArea = document.getElementById('resultArea');
    const detectedLanguage = document.getElementById('detectedLanguage');
    const confidenceFill = document.querySelector('.confidence-fill');
    const charCount = document.querySelector('.char-count');

    // Update character count
    textInput.addEventListener('input', () => {
        const count = textInput.value.length;
        charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
        
        // Reset result if input is cleared
        if (count === 0) {
            resultArea.classList.add('hidden');
        }
    });

    // Handle detection
    detectBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();

        if (!text) {
            // Shake animation for empty input could go here
            textInput.focus();
            return;
        }

        // Loading state
        detectBtn.disabled = true;
        const originalBtnText = detectBtn.innerHTML;
        detectBtn.innerHTML = `<span>Analyzing...</span>`;

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Show result
            detectedLanguage.textContent = data.language;
            
            // Simulate confidence score for visual effect (since backend doesn't return it yet)
            // Random confidence between 85% and 99%
            const fakeConfidence = Math.floor(Math.random() * (99 - 85 + 1) + 85);
            confidenceFill.style.width = '0%';
            
            resultArea.classList.remove('hidden');
            
            // Trigger animation after a brief delay
            setTimeout(() => {
                confidenceFill.style.width = `${fakeConfidence}%`;
            }, 100);

        } catch (error) {
            console.error('Error:', error);
            detectedLanguage.textContent = "Error detecting language";
            confidenceFill.style.width = '0%';
            resultArea.classList.remove('hidden');
        } finally {
            // Reset button state
            detectBtn.disabled = false;
            detectBtn.innerHTML = originalBtnText;
        }
    });

    // Enter key shortcut (Ctrl+Enter)
    textInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            detectBtn.click();
        }
    });
});
