/**
 * BSC ADVOGADOS - CORE ENGINE MODULE
 * Responsável por: Renderização, Drag & Drop e Controle de Interface.
 */

const UIController = (() => {
    // Cache de Elementos do DOM
    const elements = {
        loginScreen: document.getElementById('login-module'),
        dashboard: document.getElementById('main-dashboard'),
        tasksGrid: document.getElementById('tasks-grid'),
        teamContainer: document.getElementById('team-container'),
        clock: document.getElementById('clock-display'),
        date: document.getElementById('full-date'),
        userName: document.getElementById('display-user-name'),
        userRole: document.getElementById('display-user-role'),
        userAvatar: document.getElementById('header-avatar')
    };

    let activeUser = null;

    // --- SISTEMA DE RELÓGIO ---
    const startClock = () => {
        setInterval(() => {
            const now = new Date();
            elements.clock.innerText = now.toLocaleTimeString('pt-BR');
        }, 1000);
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        elements.date.innerText = new Date().toLocaleDateString('pt-BR', options);
    };

    // --- RENDERIZAÇÃO DO TIME (ZONAS DE DEPÓSITO) ---
    const renderTeam = () => {
        const users = BSC_DATA.getUsers();
        elements.teamContainer.innerHTML = '';

        Object.keys(users).forEach(key => {
            if (key === "BSC_GERAL") return; // Admin não é zona de depósito

            const user = users[key];
            const dropZone = document.createElement('div');
            dropZone.className = `glass-panel p-4 text-center card-hover cursor-pointer border-2 border-transparent transition-all`;
            dropZone.id = `dz-${user.id}`;
            
            // Lógica de Drag & Drop
            dropZone.ondragover = (e) => {
                e.preventDefault();
                dropZone.classList.add('drop-target');
            };
            dropZone.ondragleave = () => {
                dropZone.classList.remove('drop-target');
            };
            dropZone.ondrop = (e) => {
                e.preventDefault();
                const taskId = e.dataTransfer.getData("text/plain");
                handleTaskRelocation(taskId, user.id);
                dropZone.classList.remove('drop-target');
            };

            dropZone.innerHTML = `
                <div class="relative inline-block mb-3">
                    <img src="${user.avatar}" class="w-16 h-16 rounded-full border-2 border-[#c5a059] object-cover">
                    <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                </div>
                <h4 class="text-[11px] font-bold uppercase tracking-tighter">${user.full_name}</h4>
                <p class="text-[8px] text-[#c5a059] opacity-70">${user.role}</p>
            `;
            elements.teamContainer.appendChild(dropZone);
        });
    };

    // --- RENDERIZAÇÃO DA AGENDA ---
    const renderAgenda = () => {
        const tasks = BSC_DATA.getTasks(activeUser.id);
        elements.tasksGrid.innerHTML = '';

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = `glass-panel p-6 card-hover animate-fade relative overflow-hidden`;
            card.draggable = true;
            
            // Início do Arraste
            card.ondragstart = (e) => {
                e.dataTransfer.setData("text/plain", task.id);
                card.classList.add('dragging');
            };
            card.ondragend = () => card.classList.remove('dragging');

            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="text-[8px] font-bold text-[#c5a059] uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                        ${task.category}
                    </span>
                    <button onclick="UIController.cycleStatus('${task.id}')" 
                            class="status-badge status-${task.status}">
                        ${task.status}
                    </button>
                </div>
                
                <h4 class="font-serif-legal text-lg mb-2 leading-tight">${task.title}</h4>
                <p class="text-[10px] text-gray-500 mb-4 line-clamp-2">${task.description}</p>
                
                <div class="flex justify-between items-center pt-4 border-t border-white/5">
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-clock text-[10px] text-[#c5a059]"></i>
                        <span class="text-[10px] font-bold">${task.time}</span>
                    </div>
                    <div class="flex items-center gap-2">
                         <span class="text-[8px] opacity-40 uppercase">Resp:</span>
                         <span class="text-[8px] font-bold text-[#c5a059]">${task.ownerId}</span>
                    </div>
                </div>

                <div class="absolute top-0 right-0 w-1 h-full bg-${getPriorityColor(task.priority)} opacity-50"></div>
            `;
            elements.tasksGrid.appendChild(card);
        });
    };

    const getPriorityColor = (priority) => {
        const colors = { urgent: 'red-600', alta: 'orange-500', media: 'yellow-500', baixa: 'blue-500' };
        return colors[priority] || 'gray-500';
    };

    // --- AÇÕES DE CONTROLE ---
    const handleTaskRelocation = (taskId, newOwnerId) => {
        if (BSC_DATA.updateTaskOwner(taskId, newOwnerId)) {
            renderAgenda();
            // Aqui poderíamos disparar uma notificação real
        }
    };

    return {
        init: (user) => {
            activeUser = user;
            elements.loginScreen.classList.add('hidden');
            elements.dashboard.classList.remove('hidden');
            
            elements.userName.innerText = `Dr. ${user.full_name}`;
            elements.userRole.innerText = user.role;
            elements.userAvatar.src = user.avatar;

            startClock();
            renderTeam();
            renderAgenda();
        },
        cycleStatus: (taskId) => {
            BSC_DATA.updateTaskStatus(taskId);
            renderAgenda();
        },
        openNewTaskModal: () => {
            alert("Módulo de criação de tarefas será implementado na Parte 4!");
        }
    };
})();

/**
 * MÓDULO DE AUTENTICAÇÃO
 */
const AuthController = (() => {
    return {
        login: () => {
            const userId = document.getElementById('user-select').value;
            const pass = document.getElementById('user-pass').value;
            const user = BSC_DATA.getUserById(userId);

            if (user && user.password === pass) {
                UIController.init(user);
            } else {
                alert("Erro de Autenticação: Chave de acesso incorreta para este usuário.");
            }
        },
        logout: () => {
            location.reload();
        }
    };
})();
