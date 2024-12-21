// 1. Mengambil referensi elemen HTML
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');

// 2. Array untuk menyimpan todos dan editId
let todos = [];
let editId = null;

// 3. Event Listener untuk form submission
const handleSubmit = (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();

    if (!text) return;

    if (editId) {
        // Update existing todo
        updateTodo(text);
    } else {
        // Add new todo
        addTodo(text);
    }

    todoInput.value = '';
    submitButton.textContent = 'Add';
    editId = null;
    renderTodos();  
};

todoForm.addEventListener('submit', handleSubmit);

// 4. Fungsi untuk menambah todo
const addTodo = (text) => {
    todos.push({
        id: Date.now(), 
        text: text,
        completed: false,
    });
    console.log(todos);
};

// 5. Fungsi untuk update todo
const updateTodo = (text) => {
    todos = todos.map(todo => 
        todo.id === editId 
            ? { ...todo, text: text }
            : todo
    );
    console.log(todos.text);
};

// 6. Fungsi untuk edit todo
const editTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        editId = id;
        todoInput.value = todo.text;
        todoInput.focus();
        submitButton.textContent = 'Update';
    }
};

// 7. Fungsi untuk menampilkan todos
const renderTodos = () => {
    todoList.innerHTML = todos
        .map(todo => `
            <li class="flex items-center gap-3 p-4 hover:bg-gray-50" data-id="${todo.id}">
                <input
                    type="checkbox"
                    ${todo.completed ? 'checked' : ''}
                    class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    onchange="toggleTodo(${todo.id})"
                >
                
                <span class="flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}">
                    ${todo.text}
                </span>
                
                <button
                    onclick="editTodo(${todo.id})"
                    class="text-gray-400 hover:text-blue-500 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                >
                    ✏️
                </button>
                
                <button
                    onclick="deleteTodo(${todo.id})"
                    class="text-gray-400 hover:text-red-500 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                >
                    ❌
                </button>
            </li>
        `)
        .join('');
};

// 8. Fungsi untuk mengubah status todo
const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
};

// 9. Fungsi untuk menghapus todo
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

const todosReset = () => {
    todos = [];
    renderTodos();
}
