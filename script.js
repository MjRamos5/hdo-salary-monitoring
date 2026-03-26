// HOSPITAL DATA
const hospitals = [
    { name: "BDH", dept: "PDRRMO" },
    { name: "NDH", dept: "PDRRMO" },
    { name: "MDH", dept: "PDRRMO" },
    { name: "NURSE", dept: "PDRRMO" },
    { name: "SPCDH", dept: "PDRRMO" },
    { name: "LDH", dept: "GO EXEC" },
    { name: "GCMDH", dept: "GO EXEC" },
    { name: "DRJPRMDH", dept: "GO EXEC" },
    { name: "SPDH", dept: "GO EXEC" },
    { name: "LMC", dept: "GO EXEC" }
];

function addNewRow() {
    let table = document.getElementById("tableBody");

    let rowIndex = document.querySelectorAll("#tableBody tr").length;

    let row = document.createElement("tr");
    row.setAttribute('data-row', rowIndex);

    row.innerHTML = `
        <td class="row-delete">
            <button class="delete-row" data-row="${rowIndex}" style="display:none" aria-label="Delete row">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M9 2h6v1H9V2Z"/>
                    <path d="M4 4h16v2H4V4Z"/>
                    <path d="M6 7h12a1 1 0 011 1v11a2 2 0 01-2 2H8a2 2 0 01-2-2V8a1 1 0 011-1Z"/>
                    <path d="M9 10v8M12 10v8M15 10v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
        </td>
        <td class="hospital">New Hospital</td>
        <td><span class="dept-badge">Department</span></td>
        <td class="month">${document.getElementById("monthSelect").value}</td>

        <td class="period-cell">
            <div>
                <input type="text" placeholder="1-15" data-row="${rowIndex}" data-col="period1" disabled>
                <button class="cell-edit" data-row="${rowIndex}" data-col="period1">Edit</button>
                <button class="cell-save" data-row="${rowIndex}" data-col="period1" style="display:none">Save</button>
            </div>
            <div>
                <input type="text" placeholder="16-30" data-row="${rowIndex}" data-col="period2" disabled>
                <button class="cell-edit" data-row="${rowIndex}" data-col="period2">Edit</button>
                <button class="cell-save" data-row="${rowIndex}" data-col="period2" style="display:none">Save</button>
            </div>
            <div>
                <input type="text" placeholder="Others" data-row="${rowIndex}" data-col="period3" disabled>
                <button class="cell-edit" data-row="${rowIndex}" data-col="period3">Edit</button>
                <button class="cell-save" data-row="${rowIndex}" data-col="period3" style="display:none">Save</button>
            </div>
        </td>

        ${generateDateInputs(rowIndex)}
    `;

    table.appendChild(row);
    
    // Make new row immediately editable
    row.querySelectorAll('input[data-col]').forEach(i => i.removeAttribute('disabled'));
    row.querySelector('.hospital').setAttribute('contenteditable', 'true');
    row.querySelector('.dept-badge').parentElement.setAttribute('contenteditable', 'true');
    row.querySelector('.delete-row').style.display = 'inline-block';
}

// CREATE TABLE
function createTable() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    hospitals.forEach((h, rowIndex) => {
        let row = document.createElement("tr");
        row.setAttribute('data-row', rowIndex);

        row.innerHTML = `
            <td class="row-delete">
                <button class="delete-row" data-row="${rowIndex}" style="display:none" aria-label="Delete row">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M9 2h6v1H9V2Z"/>
                        <path d="M4 4h16v2H4V4Z"/>
                        <path d="M6 7h12a1 1 0 011 1v11a2 2 0 01-2 2H8a2 2 0 01-2-2V8a1 1 0 011-1Z"/>
                        <path d="M9 10v8M12 10v8M15 10v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </td>
            <td class="hospital">${h.name}</td>
            <td><span class="dept-badge">${h.dept}</span></td>
            <td class="month">${document.getElementById("monthSelect").value}</td>

            <td class="period-cell">
                <div>
                    <input type="text" placeholder="1-15" data-row="${rowIndex}" data-col="period1" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="period1">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="period1" style="display:none">Save</button>
                </div>
                <div>
                    <input type="text" placeholder="16-30" data-row="${rowIndex}" data-col="period2" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="period2">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="period2" style="display:none">Save</button>
                </div>
                <div>
                    <input type="text" placeholder="Others" data-row="${rowIndex}" data-col="period3" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="period3">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="period3" style="display:none">Save</button>
                </div>
            </td>

            ${generateDateInputs(rowIndex)}
        `;

        table.appendChild(row);
    });

    loadData();
}

// GENERATE DATE INPUTS
// GENERATE DATE INPUTS
function generateDateInputs(rowIndex) {
    let html = "";
    for (let col = 0; col < 16; col++) {
        html += `<td>
            <div class="cell-wrapper">
                <div>
                    <input type="date" data-row="${rowIndex}" data-col="date${col}_p1" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="date${col}_p1">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="date${col}_p1" style="display:none">Save</button>
                </div>
                <div>
                    <input type="date" data-row="${rowIndex}" data-col="date${col}_p2" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="date${col}_p2">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="date${col}_p2" style="display:none">Save</button>
                </div>
                <div>
                    <input type="date" data-row="${rowIndex}" data-col="date${col}_p3" disabled>
                    <button class="cell-edit" data-row="${rowIndex}" data-col="date${col}_p3">Edit</button>
                    <button class="cell-save" data-row="${rowIndex}" data-col="date${col}_p3" style="display:none">Save</button>
                </div>
            </div>
        </td>`;
    }
    return html;
}

// SAVE DATA
document.addEventListener("input", function (e) {
    if (e.target.tagName === "INPUT") {
        let row = e.target.closest("tr").rowIndex;
        let col = e.target.dataset.col;
        let value = e.target.value;

        let data = JSON.parse(localStorage.getItem("hdoData")) || {};

        if (!data[row]) data[row] = {};
        data[row][col] = value;

        localStorage.setItem("hdoData", JSON.stringify(data));
    }
});

// LOAD DATA
function loadData() {
    let data = JSON.parse(localStorage.getItem("hdoData")) || {};

    document.querySelectorAll("input").forEach(input => {
        let row = input.dataset.row;
        let col = input.dataset.col;

        if (data[row] && data[row][col]) {
            input.value = data[row][col];
        }
    });
}

// UPDATE MONTH
function updateMonth() {
    let selectedMonth = document.getElementById("monthSelect").value;

    document.querySelectorAll(".month").forEach(cell => {
        cell.innerText = selectedMonth;
    });
}

// INIT
createTable();