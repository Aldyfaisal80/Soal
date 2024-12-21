// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentId = document.getElementById('studentId');
const nameInput = document.getElementById('nameInput');
const nimInput = document.getElementById('nimInput');
const classInput = document.getElementById('classInput');
const scoreInput = document.getElementById('scoreInput');
const submitBtn = document.getElementById('submitBtn');
const studentTableBody = document.getElementById('studentTableBody');

// Students data
let students = [];

// Display students
const displayStudents = () => {
    studentTableBody.innerHTML = students.map(student => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${student.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${student.nim}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${student.class}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${student.score}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="handleEdit(${student.id})"
                    class="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                </button>
                <button onclick="handleDelete(${student.id})"
                    class="text-red-600 hover:text-red-900">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Validasi NIM
const validateNIM = (nim) => {
    return /^\d+$/.test(nim) && nim.length >= 5;
}

// Handle submit dengan validasi NIM
const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi NIM
    if (!validateNIM(nimInput.value)) {
        alert('NIM harus berupa angka dan minimal 5 digit!');
        return;
    }

    if (studentId.value) {
        const index = students.findIndex(s => s.id === parseInt(studentId.value));
        students[index] = {
            id: parseInt(studentId.value),
            name: nameInput.value,
            nim: parseInt(nimInput.value),
            class: classInput.value,
            score: parseInt(scoreInput.value)
        };
    } else {
        const newStudent = {
            id: Date.now(),
            name: nameInput.value,
            nim: parseInt(nimInput.value),
            class: classInput.value,
            score: parseInt(scoreInput.value)
        };
        students.push(newStudent);
    }
    
    handleReset();
    displayStudents();
}

// Handle edit
const handleEdit = (id) => {
    const student = students.find(s => s.id === id);
    if (student) {
        studentId.value = student.id;
        nameInput.value = student.name;
        nimInput.value = student.nim;
        classInput.value = student.class;
        scoreInput.value = student.score;
        submitBtn.textContent = 'Update Siswa';
    }
}

// Handle delete
const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        students = students.filter(student => student.id !== id);
        displayStudents();
    }
}

// Handle reset
const handleReset = () => {
    studentId.value = '';
    studentForm.reset();
    submitBtn.textContent = 'Tambah Siswa';
}

// Sort students
const sortStudents = (column, direction) => {
    students.sort((a, b) => {
        if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    displayStudents();
}

// Event listeners
studentForm.addEventListener('submit', handleSubmit);

// Tambahkan event listener untuk validasi NIM saat input
nimInput.addEventListener('input', (e) => {
    if (e.target.value && !validateNIM(e.target.value)) {
        nimInput.setCustomValidity('NIM harus berupa angka dan minimal 5 digit!');
    } else {
        nimInput.setCustomValidity('');
    }
});

// Initialize display
displayStudents();