const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"; // Use EUR as the base currency

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Create options for the dropdown selects
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update the image based on the selected currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Update exchange rate and show result
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  // if no valid amount is entered
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Use the API URL
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`;

  try {
    // Fetch exchange rates
    let response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Error fetching exchange rates. Please try again later.");
    }

    let data = await response.json();

    // Log the data to understand its structure
    console.log("API response:", data);

    if (!data.eur[toCurr.value.toLowerCase()]) {
      throw new Error(`Exchange rate data for ${toCurr.value} is unavailable.`);
    }

    // Get the conversion rate for the target currency
    let rate = data.eur[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;

    // Display the result
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText = error.message;
  }
};

// Event listener for the convert button
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Automatically update the exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
