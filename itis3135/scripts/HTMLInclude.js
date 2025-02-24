document.addEventListener("DOMContentLoaded", function() {
    const includes = document.querySelectorAll('[data-include]');

    includes.forEach(async (element) => {
        const file = element.getAttribute("data-include");
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const content = await response.text();
                    element.innerHTML = content;
                } else {
                    element.innerHTML = "Page not found.";
                }
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
                element.innerHTML = "Error loading content.";
            }
        }
    });
});
