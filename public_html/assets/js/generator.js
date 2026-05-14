class PasswordGenerator {
    constructor() {
        this.charsets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~'
        };
    }

    secureRandomInt(maxExclusive) {
        if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
            throw new Error('Invalid random range.');
        }

        const maxUint32 = 0xffffffff;
        const limit = Math.floor((maxUint32 + 1) / maxExclusive) * maxExclusive;
        const randomBuffer = new Uint32Array(1);

        do {
            window.crypto.getRandomValues(randomBuffer);
        } while (randomBuffer[0] >= limit);

        return randomBuffer[0] % maxExclusive;
    }

    shuffleCharacters(chars) {
        for (let i = chars.length - 1; i > 0; i -= 1) {
            const j = this.secureRandomInt(i + 1);
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        return chars;
    }

    getSelectedPools(options) {
        const pools = [];
        if (options.uppercase) pools.push(this.charsets.uppercase);
        if (options.lowercase) pools.push(this.charsets.lowercase);
        if (options.numbers) pools.push(this.charsets.numbers);
        if (options.symbols) pools.push(this.charsets.symbols);
        return pools;
    }

    generate({ length, options }) {
        const selectedPools = this.getSelectedPools(options);

        if (!selectedPools.length) {
            return {
                password: '',
                poolSize: 0,
                entropy: 0,
                score: 0,
                label: 'Select options'
            };
        }

        const safeLength = Number.isInteger(length) && length > 0 ? length : 16;
        const allChars = selectedPools.join('');
        const passwordChars = [];

        const guaranteedCount = Math.min(safeLength, selectedPools.length);
        for (let i = 0; i < guaranteedCount; i += 1) {
            const pool = selectedPools[i];
            passwordChars.push(pool[this.secureRandomInt(pool.length)]);
        }

        while (passwordChars.length < safeLength) {
            passwordChars.push(allChars[this.secureRandomInt(allChars.length)]);
        }

        this.shuffleCharacters(passwordChars);

        const entropy = this.calculateEntropy(safeLength, allChars.length);
        const { score, label } = this.getStrength(entropy);

        return {
            password: passwordChars.join(''),
            poolSize: allChars.length,
            entropy,
            score,
            label
        };
    }

    calculateEntropy(length, poolSize) {
        if (!length || !poolSize) return 0;
        return length * Math.log2(poolSize);
    }

    getStrength(entropy) {
        if (entropy < 28) return { score: 1, label: 'Very Weak' };
        if (entropy < 36) return { score: 2, label: 'Weak' };
        if (entropy < 60) return { score: 3, label: 'Medium' };
        if (entropy < 80) return { score: 4, label: 'Strong' };
        return { score: 5, label: 'Very Strong' };
    }
}

function initializeGeneratorUI() {
    const generator = new PasswordGenerator();

    const elements = {
        output: document.getElementById('passwordDisplay'),
        generateBtn: document.getElementById('generateBtn'),
        copyBtn: document.getElementById('copyBtn'),
        lengthSlider: document.getElementById('passwordLength'),
        lengthValue: document.getElementById('lengthValue'),
        strengthFill: document.getElementById('strengthFill'),
        strengthLabel: document.getElementById('strengthLabel'),
        toggles: {
            uppercase: document.getElementById('toggleUppercase'),
            lowercase: document.getElementById('toggleLowercase'),
            numbers: document.getElementById('toggleNumbers'),
            symbols: document.getElementById('toggleSymbols')
        }
    };

    const getOptions = () => ({
        uppercase: elements.toggles.uppercase.checked,
        lowercase: elements.toggles.lowercase.checked,
        numbers: elements.toggles.numbers.checked,
        symbols: elements.toggles.symbols.checked
    });

    const renderStrength = (score, label) => {
        elements.strengthFill.className = '';
        elements.strengthFill.classList.add(`strength-${score}`);
        elements.strengthFill.style.width = `${score * 20}%`;
        elements.strengthLabel.textContent = label;
    };

    const renderPassword = () => {
        const length = Number.parseInt(elements.lengthSlider.value, 10);
        const result = generator.generate({ length, options: getOptions() });

        if (!result.password) {
            elements.output.textContent = 'Select at least one character set';
            elements.copyBtn.disabled = true;
            renderStrength(1, result.label);
            return;
        }

        elements.output.textContent = result.password;
        elements.copyBtn.disabled = false;
        renderStrength(result.score, `${result.label} (${Math.round(result.entropy)} bits)`);
    };

    const copyPassword = async () => {
        const password = elements.output.textContent;
        if (!password || elements.copyBtn.disabled) return;

        try {
            await navigator.clipboard.writeText(password);
            elements.copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                elements.copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, 1000);
        } catch (_error) {
            console.error('Failed to copy password to clipboard.', _error);
            elements.copyBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            setTimeout(() => {
                elements.copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, 1000);
        }
    };

    elements.lengthSlider.addEventListener('input', () => {
        elements.lengthValue.textContent = elements.lengthSlider.value;
        renderPassword();
    });

    Object.values(elements.toggles).forEach((toggle) => {
        toggle.addEventListener('change', renderPassword);
    });

    elements.generateBtn.addEventListener('click', renderPassword);
    elements.copyBtn.addEventListener('click', copyPassword);

    elements.lengthValue.textContent = elements.lengthSlider.value;
    renderPassword();
}

document.addEventListener('DOMContentLoaded', initializeGeneratorUI);
