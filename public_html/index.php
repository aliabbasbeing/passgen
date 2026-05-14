<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SecurePassGen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkR4j8oTHLLtQd8l0LQbTEX7Vf3x4Gf6WQ==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <main class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-xl-6">
                <section class="generator-card p-4 p-md-5">
                    <h1 class="h3 mb-4">SecurePassGen</h1>

                    <div class="password-display mb-4" id="passwordDisplay">Click Generate Password</div>

                    <div class="d-flex align-items-center gap-2 mb-4">
                        <button class="btn btn-primary flex-grow-1" id="generateBtn" type="button">
                            <i class="fa-solid fa-wand-magic-sparkles me-2"></i>Generate Password
                        </button>
                        <button class="btn btn-outline-light" id="copyBtn" type="button" aria-label="Copy password">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                    <div class="small text-secondary mb-4" id="copyFeedback" aria-live="polite"></div>

                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-2">
                            <label for="passwordLength" class="form-label mb-0">Length</label>
                            <span id="lengthValue">16</span>
                        </div>
                        <input class="form-range length-slider" type="range" id="passwordLength" min="8" max="64" value="16">
                    </div>

                    <div class="mb-4">
                        <div class="toggle-switch form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="toggleUppercase" checked>
                            <label class="form-check-label" for="toggleUppercase">Uppercase</label>
                        </div>
                        <div class="toggle-switch form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="toggleLowercase" checked>
                            <label class="form-check-label" for="toggleLowercase">Lowercase</label>
                        </div>
                        <div class="toggle-switch form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" role="switch" id="toggleNumbers" checked>
                            <label class="form-check-label" for="toggleNumbers">Numbers</label>
                        </div>
                        <div class="toggle-switch form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="toggleSymbols" checked>
                            <label class="form-check-label" for="toggleSymbols">Symbols</label>
                        </div>
                    </div>

                    <div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-secondary">Strength</span>
                            <strong id="strengthLabel">-</strong>
                        </div>
                        <div class="strength-meter" aria-hidden="true">
                            <span id="strengthFill"></span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <script src="assets/js/generator.js"></script>
</body>
</html>
