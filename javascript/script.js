const modal = document.querySelector("#info-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const closeButton = document.querySelector(".close-modal");

document.querySelectorAll(".betyg-tabell tr").forEach((row) => {
    const details = row.querySelector("details");

    if (!details) return;

    row.addEventListener("click", (event) => {
        event.preventDefault();

        modalTitle.textContent = details.querySelector("summary").textContent;
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