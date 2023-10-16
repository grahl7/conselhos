// Function to translate advice to Portuguese using the Google Translate API
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

// Function to get and display a randomly translated advice in the modal
async function getRandomAdviceAndTranslate() {
    const randomButton = document.getElementById('random-button');
    const modal = document.getElementById('myModal');

    randomButton.textContent = 'Buscando conselho...';
    randomButton.disabled = true;

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        const advice = data.slip.advice;

        // Translate the advice to Portuguese
        const translatedAdvice = await translateToPortuguese(advice);

        // Display the advice in the modal
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

// Add an event listener to the button to fetch random advice and translate it to Portuguese
const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', getRandomAdviceAndTranslate);

// Close the modal when the "X" button is clicked
const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});