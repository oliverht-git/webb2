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

    const extra = item.querySelector(".timeline-extra");
    const textArea = document.createElement("div");
    textArea.className = "timeline-text";

    while (extra.firstElementChild) {
        textArea.appendChild(extra.firstElementChild);
    }

    extra.append(textArea);

    if (item.dataset.image) {
        const imageArea = document.createElement("div");
        imageArea.className = "timeline-image-area";

        const image = document.createElement("img");
        image.className = "timeline-image";
        image.src = item.dataset.image;
        image.alt = `Bild till ${item.querySelector("h2").textContent}`;

        imageArea.append(image);
        item.querySelector("summary").append(imageArea);
    }
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

// Loggbok: Öppnar samma textmodal som betygssidan när ett kort klickas
document.querySelectorAll(".loggbok-box tr").forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (cells.length < 3) return;

    row.addEventListener("click", () => {
        if (!modal || !modalTitle || !modalText) return;

        modalTitle.textContent = cells[1].textContent.trim();
        modalText.innerHTML = "";

        const date = document.createElement("p");
        date.textContent = `Datum: ${cells[0].textContent.trim()}`;

        const description = document.createElement("p");
        description.textContent = cells[2].textContent.trim();

        modalText.append(date, description);
        modal.classList.add("show");
    });

    const dateCell = row.querySelector(".datum");
    dateCell.setAttribute("role", "button");
    dateCell.setAttribute("tabindex", "0");
    dateCell.setAttribute("aria-label", "Öppna loggboksanteckning");

    dateCell.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            row.click();
        }
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