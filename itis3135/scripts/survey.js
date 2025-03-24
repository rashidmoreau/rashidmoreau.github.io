document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");
    const courseContainer = document.getElementById("courseContainer");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            alert("Please fill out all required fields and check the agreement box.");
            return;
        }

        const formData = new FormData(form);
        const courses = Array.from(courseContainer.querySelectorAll("input")).map((input) => input.value).filter((val) => val.trim() !== "");

        const imageFile = formData.get("image");
        if (imageFile && !["image/jpeg", "image/png"].includes(imageFile.type)) {
            alert("Please upload an image in PNG or JPG format.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imgSrc = event.target.result;

            const content = `
                <h2>Your Custom Intro Page</h2>
                <img src="${imgSrc}" alt="Uploaded Image" width="200">
                <p><strong>Caption:</strong> ${formData.get("imageCaption")}</p>
                <p><strong>Name:</strong> ${formData.get("name")}</p>
                <p><strong>Mascot:</strong> ${formData.get("mascot")}</p>
                <p><strong>Personal Background:</strong> ${formData.get("personalBg")}</p>
                <p><strong>Professional Background:</strong> ${formData.get("professionalBg")}</p>
                <p><strong>Academic Background:</strong> ${formData.get("academicBg")}</p>
                <p><strong>Background in Web Development:</strong> ${formData.get("webDevBg")}</p>
                <p><strong>Primary Computer Platform:</strong> ${formData.get("platform")}</p>
                <p><strong>Courses:</strong><ul>${courses.map((c) => `<li>${c}</li>`).join('')}</ul></p>
                <p><strong>Funny thing?</strong> ${formData.get("funny")}</p>
                <p><strong>Anything else?</strong> ${formData.get("extra")}</p>
                <p><a href="" onclick="location.reload(); return false;">Reset and try again</a></p>
            `;

            form.style.display = "none";
            result.innerHTML = content;
        };

        reader.readAsDataURL(imageFile);
    });
});

function resetForm() {
    document.getElementById("courseContainer").innerHTML = "";
}

function addCourseField() {
    const container = document.getElementById("courseContainer");
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "courses[]";
    input.placeholder = "Enter a course";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
        container.removeChild(div);
    };

    div.appendChild(input);
    div.appendChild(delBtn);
    container.appendChild(div);
}
