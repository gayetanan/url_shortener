import { dateFormater, displayMessageToUI } from "./utils.js";
const expirationInputCtn = document.querySelector("#expiration-input-ctn");
const expirationInput = document.querySelector("#expiration-input");
const expirationDateCtn = document.querySelector("#expired-date-span-ctn");
const expiredSpan = document.querySelector("#expired-date-span");
const deletebtn = document.querySelector(".deletebtn")

expirationDateCtn.addEventListener("click", function () {
    this.style.display = "none";
    expirationInputCtn.style.display = "block";
    expirationInput.value = expiredSpan.textContent;
    expirationInput.focus()
});
const disabledInput = () => {
    if (document.querySelector(".alert")) {
        expirationInput.setAttribute("disabled", true)
    } else {
        expirationInputCtn.style.display = "none"
        expirationDateCtn.style.display = "block"
        expirationInput.removeAttribute("disabled")
    }
}

const checkDate = () => {
    if (expirationInput.value === "" && expiredSpan.textContent === "")
        return true;
    else
        return new Date(expirationInput.value).getTime() === new Date(expiredSpan.textContent).getTime()
};

expirationInput.addEventListener("blur", async function () {
    try {
        const isEqual = checkDate();

        if (isEqual) {
            expirationInputCtn.style.display = "none"
            expirationDateCtn.style.display = "block"
        }
        else {
            const url = window.location.pathname;
            const res = await fetch(`${url}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ expiration: expirationInput.value })
            });
            if (res.ok) {
                const { msg } = await res.json();
                let newDate = expirationInput.value === "" ? "" : dateFormater(expirationInput.value, true)
                expiredSpan.textContent = newDate
                displayMessageToUI("success", msg, document.body, disabledInput);

            } else {
                const { msg } = await res.json();
                throw new Error(msg)
            }
        }
    } catch (error) {
        displayMessageToUI("danger", error.message, document.body, () => { })
    }
})
deletebtn.addEventListener("click", async (e) => {
    try {
        // e.preventDefault()
        const url = window.location.pathname;
        const response = await fetch(url, {
            method: "DELETE"
        })
        if (response.ok) {
            const { msg } = await response.json()
            const location = response.headers.get("location");

            displayMessageToUI("success", msg, document.body, () => { });
            document.querySelector(".alert").addEventListener("animationend", () => {
                window.location.href = location;
            })
            return
        } else {
            const { msg } = await response.json()
            throw new Error(msg)
        }
    } catch (error) {
        displayMessageToUI("danger", error.message, document.body, disabledInput);
    }
})