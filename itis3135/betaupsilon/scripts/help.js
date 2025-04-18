document.addEventListener("DOMContentLoaded", () => {
  // Load shared components
  fetch("components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
    });

  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    });

  fetch("components/sidebars.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("sidebar-container").innerHTML = data;
    });

  // Form logic
  const form = document.getElementById("helpForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic field validation
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const major = document.getElementById("major").value.trim();
    const course = document.getElementById("course").value.trim();
    const type = document.getElementById("type").value;
    const details = document.getElementById("details").value.trim();

    if (!name || !email || !major || !course || !type || !details) {
      alert("Please fill out all fields.");
      return;
    }

    // TODO: Replace this with actual POST request to backend later
    console.log("Help Request Submitted:", {
      name,
      email,
      major,
      course,
      type,
      details
    });

    form.reset();
    form.classList.add("hidden");
    confirmation.classList.remove("hidden");
  });
});
