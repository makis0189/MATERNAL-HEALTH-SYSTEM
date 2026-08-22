document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.querySelector(".loginform");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            alert("Tafadhali jaza email na password.");
            return;
        }

        // Hapa ndipo unaweza kuongeza uthibitisho halisi (backend/API) baadaye.
        // Kwa sasa, tunathibitisha tu kuwa fields hazijaachwa wazi, kisha
        // tunamwelekeza mtumiaji kwenda dashboard.

        window.location.href = "dashboard.html";

    });

});