// ================================
// DATA
// ================================

let skills = JSON.parse(localStorage.getItem("skills")) || [];

let goals = JSON.parse(localStorage.getItem("goals")) || [];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ================================
// INITIAL LOAD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    renderSkills();

    renderGoals();

    renderTasks();

    updateDashboard();

});


// ================================
// SKILL FUNCTIONS
// ================================

function openSkillModal() {

    document.getElementById("skillModal").style.display = "flex";

}


function closeSkillModal() {

    document.getElementById("skillModal").style.display = "none";

}


function addSkill() {

    const name =
        document.getElementById("skillName").value.trim();

    const progress =
        Number(document.getElementById("skillProgress").value);


    if (!name) {

        alert("Please enter a skill name.");

        return;

    }


    if (progress < 0 || progress > 100 || isNaN(progress)) {

        alert("Progress must be between 0 and 100.");

        return;

    }


    const skill = {

        id: Date.now(),

        name: name,

        progress: progress

    };


    skills.push(skill);

    saveSkills();

    renderSkills();

    updateDashboard();

    document.getElementById("skillName").value = "";

    document.getElementById("skillProgress").value = "";

    closeSkillModal();

}


function deleteSkill(id) {

    skills = skills.filter(skill => skill.id !== id);

    saveSkills();

    renderSkills();

    updateDashboard();

}


function saveSkills() {

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

}


function renderSkills() {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";


    if (skills.length === 0) {

        container.innerHTML = `
            <p>No skills added yet. Start by adding a skill!</p>
        `;

        return;

    }


    skills.forEach(skill => {

        container.innerHTML += `

            <div class="skill-card">

                <div class="skill-top">

                    <span class="skill-name">
                        ${skill.name}
                    </span>

                    <strong>
                        ${skill.progress}%
                    </strong>

                </div>

                <div class="progress-bar">

                    <div
                        class="progress"
                        style="width: ${skill.progress}%"
                    ></div>

                </div>

                <div class="skill-actions">

                    <span>
                        ${
                            skill.progress === 100
                            ? "Completed 🎉"
                            : "Keep learning!"
                        }
                    </span>

                    <button
                        class="delete-btn"
                        onclick="deleteSkill(${skill.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

    });

}


// ================================
// GOAL FUNCTIONS
// ================================

function openGoalModal() {

    document.getElementById("goalModal").style.display = "flex";

}


function closeGoalModal() {

    document.getElementById("goalModal").style.display = "none";

}


function addGoal() {

    const name =
        document.getElementById("goalName").value.trim();

    const date =
        document.getElementById("goalDate").value;


    if (!name || !date) {

        alert("Please enter goal and target date.");

        return;

    }


    goals.push({

        id: Date.now(),

        name: name,

        date: date,

        completed: false

    });


    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );


    renderGoals();

    updateDashboard();

    document.getElementById("goalName").value = "";

    document.getElementById("goalDate").value = "";

    closeGoalModal();

}


function completeGoal(id) {

    const goal = goals.find(
        goal => goal.id === id
    );

    goal.completed = !goal.completed;


    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );


    renderGoals();

    updateDashboard();

}


function deleteGoal(id) {

    goals = goals.filter(
        goal => goal.id !== id
    );


    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );


    renderGoals();

    updateDashboard();

}


function renderGoals() {

    const container =
        document.getElementById("goalsContainer");

    container.innerHTML = "";


    if (goals.length === 0) {

        container.innerHTML =
            "<p>No learning goals yet.</p>";

        return;

    }


    goals.forEach(goal => {

        container.innerHTML += `

            <div class="goal-card">

                <h3>
                    ${goal.name}
                </h3>

                <p class="goal-date">
                    Target: ${goal.date}
                </p>

                <button
                    onclick="completeGoal(${goal.id})"
                >
                    ${
                        goal.completed
                        ? "✓ Completed"
                        : "Mark Complete"
                    }
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteGoal(${goal.id})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


// ================================
// DAILY TASK FUNCTIONS
// ================================

function openTaskModal() {

    document.getElementById("taskModal").style.display = "flex";

}


function closeTaskModal() {

    document.getElementById("taskModal").style.display = "none";

}


function addTask() {

    const name =
        document.getElementById("taskName").value.trim();


    if (!name) {

        alert("Please enter a task.");

        return;

    }


    tasks.push({

        id: Date.now(),

        name: name,

        completed: false

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();

    updateDashboard();

    document.getElementById("taskName").value = "";

    closeTaskModal();

}


function toggleTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    task.completed = !task.completed;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();

    updateDashboard();

}


function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();

    updateDashboard();

}


function renderTasks() {

    const container =
        document.getElementById("tasksContainer");

    container.innerHTML = "";


    if (tasks.length === 0) {

        container.innerHTML =
            "<p>No daily tasks added yet.</p>";

        return;

    }


    tasks.forEach(task => {

        container.innerHTML += `

            <div class="task ${
                task.completed
                ? "completed"
                : ""
            }">

                <input
                    type="checkbox"
                    ${
                        task.completed
                        ? "checked"
                        : ""
                    }
                    onchange="toggleTask(${task.id})"
                >

                <span>
                    ${task.name}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


// ================================
// DASHBOARD
// ================================

function updateDashboard() {

    document.getElementById("totalSkills")
        .textContent = skills.length;


    document.getElementById("completedSkills")
        .textContent =
        skills.filter(
            skill => skill.progress === 100
        ).length;


    document.getElementById("totalGoals")
        .textContent = goals.length;


    document.getElementById("completedTasks")
        .textContent =
        tasks.filter(
            task => task.completed
        ).length;


    let overall = 0;


    if (skills.length > 0) {

        const total = skills.reduce(
            (sum, skill) =>
                sum + Number(skill.progress),
            0
        );

        overall =
            Math.round(total / skills.length);

    }


    document.getElementById("overallProgress")
        .textContent = overall + "%";

}


// ================================
// SCROLL
// ================================

function scrollToSkills() {

    document.getElementById("skills")
        .scrollIntoView({
            behavior: "smooth"
        });

}