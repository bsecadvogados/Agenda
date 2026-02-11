/**
 * ENGINE MODULE - BSC ADVOGADOS
 * Gerenciamento de UI, Relógio e Arraste de Tarefas
 */
const UIController = (() => {
    const renderTeam = () => {
        const container = document.getElementById('team-container');
        const users = BSC_DATA.getUsers();
        container.innerHTML = '';

        Object.keys(users).forEach(key => {
            if(key === "BSC_GERAL") return;
            const u = users[key];
            const div = document.createElement('div');
            div.className = 'glass-panel p-6 text-center border-2 border-transparent hover:border-[#c5a059] transition-all cursor-pointer';
            
            // Logica Drop
            div.ondragover = (e) => { e.preventDefault(); div.classList.add('drop-zone-active'); };
            div.ondragleave = () => div.classList.remove('drop-zone-active');
            div.ondrop = (e) => {
                e.preventDefault();
                const taskId = e.dataTransfer.getData("taskId");
                BSC_DATA.updateTaskOwner(taskId, u.id);
                div.classList.remove('drop-zone-active');
                UIController.refresh();
            };

            div.innerHTML = `
                <img src="${u.avatar}" class="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-[#c5a059] shadow-lg object-cover">
                <h4 class="text-[11px] font-bold uppercase tracking-tighter">${u.full_name}</h4>
                <p class="text-[8px] text-[#c5a059] uppercase opacity-70">${u.role}</p>
            `;
            container.appendChild(div);
        });
    };

    return {
        refresh: () => {
            const currentId = document.getElementById('display-user-name').innerText.includes("ADMIN") ? "BSC_GERAL" : AuthController.getActiveId();
            UIController.renderAgenda(currentId);
        },
        renderAgenda: (userId) => {
            const grid = document.getElementById('tasks-grid');
            grid.innerHTML = '';
            BSC_DATA.getTasks(userId).forEach(task => {
                const card = document.createElement('div');
                card.className = 'glass-panel p-6 task-card animate-fade';
                card.draggable = true;
                card.ondragstart = (e) => e.dataTransfer.setData("taskId", task.id);
                
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-[9px] font-bold text-[#c5a059] uppercase tracking-tighter">${task.category}</span>
                        <span class="status-badge status-${task.status}" onclick="BSC_DATA.toggleStatus(${task.id}); UIController.refresh()">${task.status}</span>
                    </div>
                    <h4 class="text-sm font-semibold mb-4 leading-snug">${task.title}</h4>
                    <div class="flex justify-between items-center opacity-40">
                        <span class="text-[10px]"><i class="far fa-clock mr-1"></i> ${task.time}</span>
                        <span class="text-[10px] font-bold uppercase">${task.ownerId}</span>
                    </div>
                `;
                grid.appendChild(card);
            });
        },
        startClock: () => {
            setInterval(() => {
                document.getElementById('clock-display').innerText = new Date().toLocaleTimeString('pt-BR');
            }, 1000);
            const opt = { weekday: 'long', day: 'numeric', month: 'short' };
            document.getElementById('full-date').innerText = new Date().toLocaleDateString('pt-BR', opt);
        },
        initDashboard: (user) => {
            document.getElementById('login-module').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
            document.getElementById('display-user-name').innerText = user.full_name;
            document.getElementById('display-user-role').innerText = user.role;
            document.getElementById('header-avatar').src = user.avatar;
            renderTeam();
            UIController.renderAgenda(user.id);
            UIController.startClock();
        }
    };
})();

const AuthController = (() => {
    let activeId = "";
    return {
        login: () => {
            const id = document.getElementById('user-select').value;
            const pass = document.getElementById('user-pass').value;
            const user = BSC_DATA.getUserById(id);
            if(user && (user.password === pass || id === "BSC_GERAL")) {
                activeId = id;
                UIController.initDashboard(user);
            } else { alert("Acesso Negado: Chave de segurança incorreta."); }
        },
        logout: () => location.reload(),
        getActiveId: () => activeId
    };
})();
