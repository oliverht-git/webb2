const modal = document.querySelector("#info-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const closeButton = document.querySelector(".close-modal");

// Tidslinje: Stänger andra öppna detaljer när en öppnas
document.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;

        document.querySelectorAll(".timeline-item").forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.open = false;
            }
        });
    });

    const imageArea = document.createElement("div");
    imageArea.className = "timeline-image-area";

    const image = document.createElement("img");
    image.className = "timeline-image";
    image.alt = "";
    image.hidden = true;

    const label = document.createElement("label");
    label.className = "timeline-image-label";
    label.textContent = "Lägg till bild";

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "timeline-image-input";

    input.addEventListener("change", () => {
        const selectedFile = input.files[0];

        if (!selectedFile) return;

        image.src = URL.createObjectURL(selectedFile);
        image.alt = `Bild till ${item.querySelector("h2").textContent}`;
        image.hidden = false;
        label.textContent = "Byt bild";
    });

    label.appendChild(input);
    imageArea.append(image, label);
    item.querySelector(".timeline-extra").prepend(imageArea);
});

// Betyg: Öppnar modal med information när en rad klickas
document.querySelectorAll(".betyg-tabell tr").forEach((row) => {
    const details = row.querySelector("details");

    if (!details) return;

    row.addEventListener("click", (event) => {
        event.preventDefault();

        if (!modal || !modalTitle || !modalText) return;

        modalTitle.textContent = details.querySelector("summary").textContent;
        modalText.innerHTML = "";

        details.querySelectorAll("p").forEach((paragraph) => {
            modalText.appendChild(paragraph.cloneNode(true));
        });

        modal.classList.add("show");
    });
});
// Model: Stänger modal när stängningsknappen klickas eller när man klickar utanför modal-innehållet
if (closeButton) {
    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
}
// Dark Mode: Hanterar mörkt läge och sparar inställningen i localStorage
const darkModeToggle = document.getElementById("darkModeToggle");

function applyDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    if (darkModeToggle) {
        darkModeToggle.checked = isDark;
    }
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", String(isDark));
    applyDarkMode(isDark);
}

const savedDarkMode = localStorage.getItem("darkMode") === "true";
applyDarkMode(savedDarkMode);