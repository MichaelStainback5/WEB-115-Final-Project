function generateMealPlan() {
    // Get user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const goal = document.getElementById('goal').value;

    // Validate email address
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Get meal plan details for each day
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealPlanDetails = {};

    daysOfWeek.forEach(day => {
        mealPlanDetails[day] = {
            breakfast: getMealInput(`${day.toLowerCase()}Breakfast`),
            snack1: getMealInput(`${day.toLowerCase()}Snack1`),
            lunch: getMealInput(`${day.toLowerCase()}Lunch`),
            snack2: getMealInput(`${day.toLowerCase()}Snack2`),
            dinner: getMealInput(`${day.toLowerCase()}Dinner`),
        };
    });

    // Create a new window for the meal plan
    const mealPlanWindow = window.open('', '_blank');
    mealPlanWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Meal Plan for ${name}</title>
            <link rel="stylesheet" href="styles.css"> <!-- You can link to the same CSS file as in finalProject.html -->
        </head>
        <body>
            <h1>Meal Plan for ${name}</h1>
            <p>Email: ${email}</p>
            <p>Goal for the Week: ${goal}</p>

            <h2>Meal Plan Details</h2>
            <ul>
                ${daysOfWeek.map(day => `
                    <li>${day}:
                        <ul>
                            <li>Breakfast: ${mealPlanDetails[day].breakfast}</li>
                            <li>Morning Snack: ${mealPlanDetails[day].snack1}</li>
                            <li>Lunch: ${mealPlanDetails[day].lunch}</li>
                            <li>Evening Snack: ${mealPlanDetails[day].snack2}</li>
                            <li>Dinner: ${mealPlanDetails[day].dinner}</li>
                        </ul>
                    </li>
                `).join('')}
            </ul>

            <button onclick="printMealPlan()">Print Meal Plan</button>
            <button onclick="downloadMealPlan()">Download Meal Plan</button>

            <script src="projectJS.js"></script>
        </body>
        </html>
    `);

    mealPlanWindow.document.close();
}

function clearMealPlan() {
    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('goal').value = '';

    // Clear meal input fields for each day
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    daysOfWeek.forEach(day => {
        document.getElementById(`${day.toLowerCase()}Breakfast`).value = '';
        document.getElementById(`${day.toLowerCase()}Snack1`).value = '';
        document.getElementById(`${day.toLowerCase()}Lunch`).value = '';
        document.getElementById(`${day.toLowerCase()}Snack2`).value = '';
        document.getElementById(`${day.toLowerCase()}Dinner`).value = '';
    });
}

function printMealPlan() {
    // Check if the meal plan window is open
    const mealPlanWindow = window.open('', '_blank');
    if (mealPlanWindow) {
        mealPlanWindow.print();
    } else {
        alert('Please generate a meal plan before trying to print.');
    }
}

function downloadMealPlan() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const goal = document.getElementById('goal').value;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealPlanDetails = {};

    daysOfWeek.forEach(day => {
        mealPlanDetails[day] = {
            breakfast: document.getElementById(`${day.toLowerCase()}Breakfast`).value,
            snack1: document.getElementById(`${day.toLowerCase()}Snack1`).value,
            lunch: document.getElementById(`${day.toLowerCase()}Lunch`).value,
            snack2: document.getElementById(`${day.toLowerCase()}Snack2`).value,
            dinner: document.getElementById(`${day.toLowerCase()}Dinner`).value,
        };
    });

    // Create a data object to be converted to JSON
    const mealPlanData = {
        name: name,
        email: email,
        goal: goal,
        mealPlan: mealPlanDetails,
    };

    // Convert the data object to JSON
    const mealPlanJSON = JSON.stringify(mealPlanData);

    // Create a Blob from the JSON data
    const blob = new Blob([mealPlanJSON], { type: 'application/json' });

    // Create a download link and trigger a click to download the file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'meal_plan.json';
    downloadLink.click();
}

// Helper function to validate email address
function isValidEmail(email) {
    // Use a simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to get the value from a meal input field
function getMealInput(id) {
    return document.getElementById(id).value;
}