// Apply the saved theme before the stylesheet loads to avoid a flash on refresh.
try {
    const savedTheme = localStorage.getItem("silentMoverTheme");
    document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light";
} catch (error) {
    document.documentElement.dataset.theme = "light";
}

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector("#site-nav");
    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector("i");

        function applyTheme(theme, persist = false) {
            const isDark = theme === "dark";
            document.documentElement.dataset.theme = isDark ? "dark" : "light";
            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
            themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
            if (themeIcon) themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            if (persist) {
                try { localStorage.setItem("silentMoverTheme", isDark ? "dark" : "light"); } catch (error) {}
            }
        }

        applyTheme(document.documentElement.dataset.theme || "light");
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(nextTheme, true);
        });
    }

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
            siteNav.classList.toggle("is-open", !isOpen);
        });

        siteNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                siteNav.classList.remove("is-open");
            });
        });
    }
});
