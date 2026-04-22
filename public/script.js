// Function to Load Tournaments
async function loadTournaments() {
    const listDiv = document.getElementById('tournamentList');
    listDiv.innerHTML = '<p style="text-align:center">Loading...</p>';

    try {
        const response = await fetch('/api/tournaments');
        const tournaments = await response.json();

        listDiv.innerHTML = ''; // Clear "Loading..." text

        if (tournaments.length === 0) {
            listDiv.innerHTML = '<p style="text-align:center; color:#555">No tournaments found.</p>';
            return;
        }

        tournaments.forEach(t => {
            // Create the card
            const div = document.createElement('div');
            div.className = 'list-item'; // CSS class for styling
            
            // Add Info + Delete Button
            div.innerHTML = `
                <div>
                    <strong>${t.name}</strong> <span style="color:#aaa">(${t.game})</span> <br>
                    💰 <span style="color:#ffd700">$${t.prizePool}</span>
                </div>
                <button class="btn-delete" onclick="deleteTournament('${t._id}')">Delete</button>
            `;
            listDiv.appendChild(div);
        });
    } catch (err) {
        listDiv.innerHTML = '<p style="color:red">Error loading data.</p>';
    }
}

// Function to Delete Tournament
async function deleteTournament(id) {
    if(!confirm("Delete this tournament? This cannot be undone.")) return;

    await fetch('/api/tournaments/' + id, { method: 'DELETE' });
    loadTournaments(); // Refresh list immediately
}

// Handle Form Submit
document.getElementById('createTournamentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('tName').value,
        game: document.getElementById('tGame').value,
        prizePool: document.getElementById('tPrize').value
    };

    try {
        const response = await fetch('/api/tournaments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("✅ Tournament Created!");
            document.getElementById('createTournamentForm').reset();
            loadTournaments(); // Refresh the list immediately!
        } else {
            alert("❌ Error saving tournament");
        }
    } catch (err) {
        alert("❌ Request Failed: " + err.message);
    }
});

// Load the list as soon as the page opens
if (document.getElementById('tournamentList')) {
    loadTournaments();
}

// --- TASKS LOGIC ---

async function loadTasks() {
    const listDiv = document.getElementById('taskList');
    if (!listDiv) return;
    listDiv.innerHTML = '<p style="text-align:center">Loading...</p>';

    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();

        listDiv.innerHTML = ''; 

        if (tasks.length === 0) {
            listDiv.innerHTML = '<p style="text-align:center; color:#555">No tasks found.</p>';
            return;
        }

        tasks.forEach(t => {
            const div = document.createElement('div');
            div.className = 'list-item'; 
            
            const isCompleted = t.status === 'Completed';
            const color = isCompleted ? '#00ff88' : (t.status === 'In Progress' ? '#ffd700' : '#aaa');
            
            div.innerHTML = `
                <div>
                    <strong style="text-decoration: ${isCompleted ? 'line-through' : 'none'}">${t.title}</strong> 
                    <br><small style="color:#aaa">${t.description || ''}</small> <br>
                    <small style="color:${color}; font-weight:bold">${t.status}</small>
                </div>
                <div>
                    ${!isCompleted ? `<button onclick="updateTaskStatus('${t._id}', 'Completed')" style="margin-right:10px;">✔ Done</button>` : ''}
                    <button class="btn-delete" onclick="deleteTask('${t._id}')">Delete</button>
                </div>
            `;
            listDiv.appendChild(div);
        });
    } catch (err) {
        listDiv.innerHTML = '<p style="color:red">Error loading tasks.</p>';
    }
}

async function updateTaskStatus(id, newStatus) {
    await fetch('/api/tasks/' + id, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    loadTasks();
}

async function deleteTask(id) {
    if(!confirm("Delete this task?")) return;
    await fetch('/api/tasks/' + id, { method: 'DELETE' });
    loadTasks();
}

const taskForm = document.getElementById('createTaskForm');
if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDesc').value
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                taskForm.reset();
                loadTasks(); 
            } else {
                alert("❌ Error saving task");
            }
        } catch (err) {
            alert("❌ Request Failed: " + err.message);
        }
    });
    loadTasks();
}
