async function translateToPortuguese(text) {
    const apiKey = 'AIzaSyBrzmygeiAIcagi6nu4Ausv0B_LOmlNpgE';
    const sourceLang = 'en';
    const targetLang = 'pt';

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${'AIzaSyBrzmygeiAIcagi6nu4Ausv0B_LOmlNpgE}&source=${sourceLang}&target=${targetLang}&q=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (data && data.data && data.data.translations && data.data.translations.length > 0) {
            return data.data.translations[0].translatedText;
        }
    } catch (error) {
        console.error('Translation error:', error);
    }

    return 'Translation error';
}

async function getRandomAdviceAndTranslate() {
    const randomButton = document.getElementById('random-button');
    const modal = document.getElementById('myModal');

    randomButton.textContent = 'Buscando conselho...';
    randomButton.disabled = true;

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const advice = data.slip.advice;

        const translatedAdvice = await translateToPortuguese(advice);

        const modalAdvice = document.getElementById('modal-advice');
        modalAdvice.textContent = translatedAdvice;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching advice:', error);
        window.alert('Error fetching advice.');
    } finally {
        randomButton.textContent = 'Clique para receber um conselho!';
        randomButton.disabled = false;
    }
}

const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', getRandomAdviceAndTranslate);

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
