const selectTags = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.getElementById("translate-btn");

// Populate dropdowns with language options
selectTags.forEach((select, index) => {
    for (const code in countries) {
        const isSelected = (index === 0 && code === "en-GB") || (index === 1 && code === "bn-IN");
        const option = `<option value="${code}" ${isSelected ? "selected" : ""}>${countries[code]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});

// Clear translation if input text is empty
fromText.addEventListener("keyup", () => {
    if (!fromText.value.trim()) {
        toText.value = "";
    }
});

// Handle translation
translateBtn.addEventListener("click", () => {
    const text = fromText.value.trim();
    const translateFrom = selectTags[0].value;
    const translateTo = selectTags[1].value;

    if (!text) {
        alert("Please enter text to translate!");
        return;
    }

    toText.setAttribute("placeholder", "Translating...");
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.responseData.translatedText) {
                toText.value = data.responseData.translatedText;
            } else {
                toText.value = "Translation not available.";
            }
            toText.setAttribute("placeholder", "Translation");
        })
        .catch(() => {
            toText.value = "Error occurred. Please try again.";
            toText.setAttribute("placeholder", "Translation");
        });
});

