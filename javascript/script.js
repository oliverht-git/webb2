const modal = document.querySelector("#info-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const closeButton = document.querySelector(".close-modal");

document.querySelectorAll(".betyg-tabell tr").forEach((row) => {
    row.addEventListener("click", () => {
        const details = row.querySelector("details");
        const summary = details.querySelector("summary");

        modalTitle.textContent = summary.textContent;
        modalText.innerHTML = "";

        details.querySelectorAll("p").forEach((paragraph) => {
            modalText.appendChild(paragraph.cloneNode(true));
        });

        modal.classList.add("show");
    });
});

closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});