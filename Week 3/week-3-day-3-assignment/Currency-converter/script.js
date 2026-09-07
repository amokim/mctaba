// Selecting DOM elements
const form = document.getElementById('converter-form');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultBox = document.getElementById('result');
const resultText = document.getElementById('result-text');

// Supported currencies. Kept static so the dropdowns work even when the API is down.
const CURRENCIES = ['KES', 'USD', 'EUR', 'GBP', 'TZS', 'UGX'];
const DEFAULT_FROM = 'KES';
const DEFAULT_TO = 'USD';

const API_BASE = 'https://open.er-api.com/v6/latest';

// Formats a number with thousands separators and exactly two decimals, e.g. 10000 -> "10,000.00"
function formatMoney(value) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Fills both selects from the static list and applies the default pair
function populateCurrencies() {
    for (const code of CURRENCIES) {
        fromCurrency.appendChild(new Option(code, code));
        toCurrency.appendChild(new Option(code, code));
    }
    fromCurrency.value = DEFAULT_FROM;
    toCurrency.value = DEFAULT_TO;
}

// Updates the result box. state is 'loading', 'error', or 'success'
function showResult(message, state) {
    resultText.textContent = message;
    resultBox.classList.toggle('is-loading', state === 'loading');
    resultBox.classList.toggle('is-error', state === 'error');
}

// Returns the amount as a positive number, or null if the input is invalid
function readAmount() {
    const value = Number(amount.value);
    if (amount.value.trim() === '' || Number.isNaN(value) || value <= 0) {
        return null;
    }
    return value;
}

// Fetches the live rate and returns the formatted result string, e.g. "KES 10,000.00 = USD 77.29"
async function convert(value, currencyFrom, currencyTo) {
    const response = await fetch(`${API_BASE}/${currencyFrom}`);
    if (!response.ok) throw new Error(`Failed to fetch exchange rate (HTTP ${response.status})`);

    const data = await response.json();
    if (data.result !== 'success') throw new Error('The exchange rate service returned an error');

    const rate = data.rates[currencyTo];
    if (typeof rate !== 'number') throw new Error(`No rate available for ${currencyTo}`);

    const convertedAmount = value * rate;
    return `${currencyFrom} ${formatMoney(value)} = ${currencyTo} ${formatMoney(convertedAmount)}`;
}

// Runs a conversion while showing loading / error state
async function runConversion() {
    const value = readAmount();
    if (value === null) {
        showResult('Please enter an amount greater than 0.', 'error');
        amount.focus();
        return;
    }

    convertBtn.disabled = true;
    swapBtn.disabled = true;
    showResult('Converting...', 'loading');

    try {
        const result = await convert(value, fromCurrency.value, toCurrency.value);
        showResult(result, 'success');
    } catch (error) {
        console.error(error);
        showResult('Unable to fetch the exchange rate. Please check your connection and try again.', 'error');
    } finally {
        convertBtn.disabled = false;
        swapBtn.disabled = false;
    }
}

// Submitting the form (Convert button or Enter key) runs a conversion
form.addEventListener('submit', (event) => {
    event.preventDefault();
    runConversion();
});

// Swap exchanges the two currencies and converts again
swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    runConversion();
});

populateCurrencies();
runConversion();
