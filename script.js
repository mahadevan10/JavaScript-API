const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');

for (let currency_code in currencies) {
    let fromSelected = currency_code === "USD" ? "selected" : "";
    let toSelected = currency_code === "INR" ? "selected" : "";

    let displayText = `${currency_code} - ${currencies[currency_code]}`;
    let optionFrom = `<option value="${currency_code}" ${fromSelected}>${displayText}</option>`;
    let optionTo = `<option value="${currency_code}" ${toSelected}>${displayText}</option>`;

    fromSelect.insertAdjacentHTML("beforeend", optionFrom);
    toSelect.insertAdjacentHTML("beforeend", optionTo);
}

function convertCurrency() {
    const API_KEY = "e67cf51dfa1da04cab6724ef"; // Load from .env securely in production
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = document.getElementById('amount').value || 1;

    const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const converted = (amount * data.conversion_rate).toFixed(2);
                document.getElementById('result').textContent =
                    `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
            } else {
                document.getElementById('result').textContent =
                    "Error fetching conversion rate.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('result').textContent =
                "Network error. Please try again.";
        });
}