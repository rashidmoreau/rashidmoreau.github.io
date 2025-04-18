const members = [
  { name: "Alex Johnson", major: "Computer Science", gpa: 3.8 },
  { name: "Mason Lee", major: "Finance", gpa: 3.2 },
  { name: "Jalen Smith", major: "Biology", gpa: 3.6 },
  { name: "Dylan Kim", major: "Mechanical Engineering", gpa: 3.1 },
  { name: "Chris Allen", major: "Construction Management", gpa: 3.4 }
];

let sortState = {
  key: null,
  direction: "asc"
};

function gradeToPoint(grade) {
  const scale = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
  };
  return scale[grade] !== undefined ? scale[grade] : null;
}

function pointToApproxGrade(gpa) {
  if (gpa >= 3.85) return "A";
  if (gpa >= 3.7) return "A-";
  if (gpa >= 3.3) return "B+";
  if (gpa >= 3.0) return "B";
  if (gpa >= 2.7) return "B-";
  if (gpa >= 2.3) return "C+";
  if (gpa >= 2.0) return "C";
  if (gpa >= 1.7) return "C-";
  if (gpa >= 1.3) return "D+";
  if (gpa >= 1.0) return "D";
  return "F";
}

function loadTable(data, sortKey = null) {
  const tbody = document.querySelector("#gpaTable tbody");
  tbody.innerHTML = "";

  let sortedData = [...data];

  if (sortKey) {
    sortedData.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortState.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortState.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  let totalGPA = 0;

  sortedData.forEach((member, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.major}</td>
      <td>${member.gpa.toFixed(2)}</td>
      <td>
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
    totalGPA += member.gpa;
  });

  const avg = (totalGPA / sortedData.length).toFixed(2);
  document.getElementById("averageGPA").textContent = `Average GPA: ${avg}`;

function setupSearch() {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const search = input.value.toLowerCase();
    const filtered = members.filter((m) =>
      m.name.toLowerCase().includes(search) ||
      m.major.toLowerCase().includes(search)
    );
    loadTable(filtered);
  });
}

function setupGPAForm() {
  const form = document.getElementById("gpaForm");
  const addCourseBtn = document.getElementById("addCourse");
  const courseInputs = document.getElementById("courseInputs");

  addCourseBtn.addEventListener("click", () => {
    const newRow = document.createElement("div");
    newRow.className = "course-row";
    newRow.innerHTML = `
      <input type="text" placeholder="Grade (A-F)" class="gradeInput" required />
      <input type="number" placeholder="Credits" class="creditInput" required />
    `;
    courseInputs.appendChild(newRow);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const major = document.getElementById("majorInput").value.trim();
    const grades = Array.from(document.querySelectorAll(".gradeInput")).map((input) => input.value.trim().toUpperCase());
    const credits = Array.from(document.querySelectorAll(".creditInput")).map((input) => parseFloat(input.value));

    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
      const gpaValue = gradeToPoint(grades[i]);
      if (gpaValue === null) {
        alert(`Invalid grade: "${grades[i]}"`);
        return;
      }
      totalPoints += gpaValue * credits[i];
      totalCredits += credits[i];
    }

    const gpa = totalPoints / totalCredits;

    const newMember = {
      name,
      major,
      gpa: parseFloat(gpa.toFixed(2))
    };

    members.push(newMember);
    loadTable(members);
    form.reset();
    courseInputs.innerHTML = `
      <div class="course-row">
        <input type="text" placeholder="Grade (A-F)" class="gradeInput" required />
        <input type="number" placeholder="Credits" class="creditInput" required />
      </div>
    `;
  });
}

function setupEditDeleteHandlers() {
  // Delete functionality
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      if (confirm("Are you sure you want to delete this entry?")) {
        members.splice(index, 1);
        loadTable(members);
      }
    });
  });

  setupEditDeleteHandlers();
}

  // Edit functionality
  document.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const member = members[index];

      document.getElementById("nameInput").value = member.name;
      document.getElementById("majorInput").value = member.major;

      const gpaGrade = pointToApproxGrade(member.gpa);

      document.getElementById("courseInputs").innerHTML = `
        <div class="course-row">
          <input type="text" value="${gpaGrade}" class="gradeInput" required />
          <input type="number" value="3" class="creditInput" required />
        </div>
      `;

      members.splice(index, 1);
      loadTable(members);
    });
  });
}

function setupSorting() {
  const headers = document.querySelectorAll("#gpaTable th[data-sort]");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const sortKey = header.dataset.sort;

      if (sortState.key === sortKey) {
        sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
      } else {
        sortState.key = sortKey;
        sortState.direction = "asc";
      }

      loadTable(members, sortState.key);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTable(members);
  setupSearch();
  setupSorting();
  setupGPAForm();
});
