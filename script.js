const gradeMap = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'F': 0
}
// console.log(document.querySelectorAll('.common'));

function showSection(id) {
    document.querySelectorAll('.common').forEach(div => div.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function addSgpaRow() {
    const table = document.getElementById('sgpa-table');
    const row = table.insertRow();
    row.innerHTML = 
    `     
    <td><input type="text" placeholder="Subject"></td>
    <td><input type="number" min="1" placeholder="Credits"></td>
    <td>
        <select>
            <option>O</option>
            <option>A+</option>
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C</option>
            <option>F</option>
        </select>
    </td>
    <td><button onclick="this.parentElement.parentElement.remove()">Delete</button></td>
    `;
}

function calculateSgpa() {
    const rows = document.querySelectorAll('#sgpa-table tr'); // just select all rows from the table
    // console.log(rows);
    
    let totalCredits = 0, totalPoints = 0;

    rows.forEach((row, index) => {
        if(index === 0) // Skip header row
            return;

        const credit = parseFloat(row.cells[1].querySelector('input').value);
        const grade = row.cells[2].querySelector('select').value;
        const gradePoint = gradeMap[grade];

        if (!isNaN(credit) && gradePoint !== undefined) {
            totalCredits += credit;
            totalPoints += credit * gradePoint;
        }
    });

    const sgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('sgpa-result').innerText = `Your SGPA is: ${sgpa} 😨`;
}

function addCgpaRow() {
    const table = document.getElementById('cgpa-table');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Semester"></td>
        <td><input type="number" step="0.01" placeholder="SGPA"></td>
        <td><input type="number" placeholder="Credits"></td>
        <td><button onclick="this.parentElement.parentElement.remove()">Delete</button></td>
    `
}

function calculateCgpa() {
    const rows = document.querySelectorAll('#cgpa-table tr');
    let totalCredits = 0, weightedSgpa = 0;

    rows.forEach((row, index) => {
        if(index === 0) 
            return;

        const sgpa = parseFloat(row.cells[1].querySelector('input').value);
        const credit = parseFloat(row.cells[2].querySelector('input').value);

        if (!isNaN(sgpa) && !isNaN(credit)) {
            totalCredits += credit;
            weightedSgpa += sgpa * credit;
        }
    });

    const cgpa = totalCredits ? (weightedSgpa / totalCredits).toFixed(2) : '0.00';
    const percentage = (cgpa * 9.5).toFixed(2);
    document.getElementById('cgpa-result').innerText = `Your CGPA is: ${cgpa} 😨 and Approx Percentage is: ${percentage} 👌`;
}

function ConvertCgpatToPercentage() {
    const cgpa = parseFloat(document.getElementById('cgpa-input').value);
    const percentage = !isNaN(cgpa) ? (cgpa * 9.5).toFixed(2) : '0.00';
    document.getElementById('converter-result').innerHTML = `Equivalent Percentage: ${percentage}% 👌`;
}


// These functions automatically add one empty input row each to the SGPA and CGPA tables when the page loads.
addSgpaRow();
addCgpaRow();