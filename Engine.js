/**
 * BSC ADVOGADOS - FRONTEND ENGINE
 * Versão: 5.0 (Stable)
 * * Responsabilidades:
 * 1. Controle de Sessão (Auth)
 * 2. Renderização da Grade de Calendário
 * 3. Gerenciamento de Eventos (Drag & Drop)
 * 4. Relógio em Tempo Real
 */

const Engine = (() => {
    
    // Estado da Aplicação
    let state = {
        currentUser: null,
        currentFilter: 'all', // 'all', 'mine', 'urgente'
        currentMonth: 1, // Fevereiro (0-indexed em JS é 1)
        currentYear: 2026
    };

    // Cache DOM
    const DOM = {
        loginLayer: document.getElementById('security-layer'),
        appInterface: document.getElementById('app-interface'),
        loginSelect: document.getElementById('login-user'),
        sidebarPartners: document.getElementById('sidebar-partners'),
        sidebarStaff: document.getElementById('sidebar-staff'),
        calendarGrid: document.getElementById('calendar-grid'),
        
        // User Profile Display
        userAvatar: document.getElementById('user-avatar-display'),
        userName: document.getElementById('user-name-display'),
        userRole: document.getElementById('user-role-display'),
        
        // Clock
        clock: document.getElementById('system-clock'),
        date: document.getElementById('system-date')
    };

    /**
     * Inicializa a aplicação, preenchendo o select de login
     */
    const init = () => {
        console.log("[BSC ENGINE] System Booting...");
        
        // Preencher Select de Usuários
        const users = DataCore.getUsersList();
        users.forEach(u => {
            const option = document.createElement('option');
            option.value = u.id;
            option.textContent = `${u.name} - ${u.role}`;
            if(u.id === 'ADMIN') option.style.color = '#c5a059';
            DOM.loginSelect.appendChild(option);
        });

        // Iniciar Relógio
        setInterval(updateClock, 1000);
        updateClock();
    };

    /**
     * Atualiza o relógio no topo
     */
    const updateClock = () => {
        const now = new Date();
        // Simulando a data de Fev 2026 se necessário, ou usando real
        // Vamos usar a data real do sistema para funcionalidade, mas formatar
        DOM.clock.innerText = now.toLocaleTimeString('pt-BR');
        
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        DOM.date.innerText = now.toLocaleDateString('pt-BR', options);
    };

    /**
     * Renderiza a Sidebar com a Equipe
     */
    const renderSidebar = () => {
        const users = DataCore.getUsersList();
        
        DOM.sidebarPartners.innerHTML = '';
        DOM.sidebarStaff.innerHTML = '';

        users.forEach(u => {
            if (u.type === 'system') return; // Pula Admin

            const card = document.createElement('div');
            card.className = "flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group";
            card.innerHTML = `
                <div class="relative">
                    <img src="${u.avatar}" class="w-10 h-10 rounded-full border border-gray-700 object-cover group-hover:border-[#c5a059] transition-colors">
                    <div class="absolute -bottom-1 -right-1 bg-[#111] p-[2px] rounded-full">
                         <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-gray-300 uppercase group-hover:text-white">${u.name}</p>
                    <p class="text-[8px] text-[#c5a059] opacity-70 group-hover:opacity-100">${u.role}</p>
                </div>
            `;

            // Drag & Drop Target Logic (Soltar tarefa na pessoa)
            card.ondragover = (e) => {
                e.preventDefault();
                card.classList.add('bg-[#c5a059]/10');
            };
            card.ondragleave = () => card.classList.remove('bg-[#c5a059]/10');
            card.ondrop = (e) => {
                e.preventDefault();
                card.classList.remove('bg-[#c5a059]/10');
                const taskId = e.dataTransfer.getData("text/plain");
                alert(`Realocar tarefa ID ${taskId} para ${u.name}? (Simulação)`);
                // Aqui entraria a lógica de DataCore.updateTaskOwner(taskId, u.id)
            };

            if (u.type === 'partner') {
                DOM.sidebarPartners.appendChild(card);
            } else {
                DOM.sidebarStaff.appendChild(card);
            }
        });
    };

    /**
     * Renderiza o Calendário de Fevereiro 2026
     */
    const renderCalendar = () => {
        DOM.calendarGrid.innerHTML = '';
        
        // Cabeçalhos
        const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
        days.forEach(d => {
            const h = document.createElement('div');
            h.className = 'calendar-day-header';
            h.innerText = d;
            DOM.calendarGrid.appendChild(h);
        });

        // Fevereiro 2026 começa no Domingo (Dia 1) e termina no Sábado (Dia 28)
        // Isso cria um grid perfeito de 4 semanas completas (28 dias)
        // 1 a 28
        
        for (let i = 1; i <= 28; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell group';
            
            // Número do dia
            const dayNum = document.createElement('span');
            dayNum.className = 'day-number';
            dayNum.innerText = i < 10 ? `0${i}` : i;
            dayCell.appendChild(dayNum);

            // Buscar tarefas
            let tasks = DataCore.getTasksByDay(i);

            // Aplicar Filtros
            if (state.currentFilter === 'mine') {
                tasks = tasks.filter(t => t.owner === state.currentUser.id);
            } else if (state.currentFilter === 'urgente') {
                tasks = tasks.filter(t => t.status === 'urgente');
            }

            // Renderizar Tarefas
            tasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.className = `task-card status-${task.status}`;
                taskCard.draggable = true;
                
                // Evento de Arraste
                taskCard.ondragstart = (e) => {
                    e.dataTransfer.setData("text/plain", task.id);
                    taskCard.style.opacity = '0.5';
                };
                taskCard.ondragend = () => taskCard.style.opacity = '1';

                // Conteúdo do Card
                const ownerData = DataCore.getUserById(task.owner); // Método auxiliar necessário no Data.js ou busca direta
                const ownerName = ownerData ? ownerData.initials : task.owner;

                taskCard.innerHTML = `
                    <span class="task-time">${task.time}</span>
                    <p class="task-title">${task.title}</p>
                    <span class="task-owner-badge">${ownerName}</span>
                `;

                dayCell.appendChild(taskCard);
            });

            DOM.calendarGrid.appendChild(dayCell);
        }
    };

    /**
     * Métodos Públicos
     */
    return {
        start: init,
        
        render: () => {
            renderSidebar();
            renderCalendar();
        },

        filter: (type) => {
            state.currentFilter = type;
            renderCalendar();
        }
    };
})();

/**
 * CONTROLADOR DE AUTENTICAÇÃO
 */
const Auth = {
    attempt: () => {
        const userId = document.getElementById('login-user').value;
        const pass = document.getElementById('login-pass').value;

        if (!userId) {
            alert("Por favor, selecione um usuário.");
            return;
        }

        // Validação Simples (Em prod seria hash)
        // Senha '123' para todos ou vazio para ADMIN
        if (pass === '123' || userId === 'ADMIN') {
            const user = DataCore.getUserById(userId);
            Auth.login(user);
        } else {
            alert("Chave de acesso incorreta.");
        }
    },

    login: (user) => {
        // UI Transition
        const loginLayer = document.getElementById('security-layer');
        const appLayer = document.getElementById('app-interface');
        
        loginLayer.style.opacity = '0';
        setTimeout(() => {
            loginLayer.classList.add('hidden');
            appLayer.classList.remove('hidden');
            
            // Trigger reflow
            void appLayer.offsetWidth; 
            
            appLayer.style.opacity = '1';
        }, 500);

        // Set State
        const avatar = document.getElementById('user-avatar-display');
        const name = document.getElementById('user-name-display');
        const role = document.getElementById('user-role-display');

        avatar.src = user.avatar;
        name.innerText = user.name;
        role.innerText = user.role;

        // Render Data
        Engine.render();
    },

    logout: () => {
        location.reload();
    }
};

// Inicializar ao carregar
window.onload = Engine.start;
