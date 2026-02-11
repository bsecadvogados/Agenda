/**
 * BSC ENGINE v15.0
 * Controle de Renderização, Eventos e Lógica de Negócio
 */

const Engine = (() => {
    
    // 1. REFERÊNCIAS AO DOM (CACHE)
    const DOM = {
        loader: document.getElementById('system-loader'),
        loaderBar: document.getElementById('loader-progress-bar'),
        loaderText: document.getElementById('loader-text'),
        
        authModal: document.getElementById('auth-modal'),
        loginSelect: document.getElementById('login-select'),
        loginPass: document.getElementById('login-pass'),
        
        mainInterface: document.getElementById('main-interface'),
        
        sidebarPartners: document.getElementById('sidebar-partners-list'),
        sidebarStaff: document.getElementById('sidebar-staff-list'),
        
        calendarBody: document.getElementById('calendar-body'),
        
        clock: document.getElementById('clock-display'),
        date: document.getElementById('date-display'),
        
        sessionAvatar: document.getElementById('session-avatar'),
        sessionName: document.getElementById('session-name'),
        sessionRole: document.getElementById('session-role')
    };

    // 2. INICIALIZAÇÃO DO SISTEMA (BOOT)
    const boot = () => {
        console.log("[BSC ENGINE] Booting System...");
        
        // Simulação de carregamento de módulos pesados
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if(progress > 100) progress = 100;
            
            DOM.loaderBar.style.width = `${progress}%`;
            
            if(progress < 30) DOM.loaderText.innerText = "Carregando módulos jurídicos...";
            else if(progress < 60) DOM.loaderText.innerText = "Sincronizando agenda com servidor...";
            else if(progress < 90) DOM.loaderText.innerText = "Autenticando protocolos de segurança...";
            else DOM.loaderText.innerText = "Sistema pronto.";

            if(progress === 100) {
                clearInterval(interval);
                setTimeout(revealLogin, 500);
            }
        }, 150);

        // Preencher Select de Login enquanto carrega
        populateLogin();
    };

    const populateLogin = () => {
        const users = DataCore.getAllUsers();
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = `${u.name} - ${u.role}`;
            DOM.loginSelect.appendChild(opt);
        });
    };

    const revealLogin = () => {
        DOM.loader.style.opacity = '0';
        DOM.loader.style.visibility = 'hidden';
        
        DOM.authModal.classList.add('active');
    };

    // 3. RENDERIZAÇÃO DO CALENDÁRIO REAL
    const renderCalendar = (currentUserId) => {
        DOM.calendarBody.innerHTML = '';
        
        // Fevereiro de 2026 começa num Domingo (Dia 1) e termina Sábado (Dia 28)
        // Criaremos 28 células
        for(let i = 1; i <= 28; i++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-day-cell';
            
            // Número do dia
            const dayNum = document.createElement('span');
            dayNum.className = 'day-number-indicator';
            dayNum.textContent = i < 10 ? `0${i}` : i;
            cell.appendChild(dayNum);

            // Buscar tarefas do dia
            const tasks = DataCore.getTasksByDay(i);
            
            // Filtragem e Exibição
            tasks.forEach(task => {
                // Lógica de Visibilidade:
                // Se o usuário for ADMIN, vê tudo.
                // Se for outro, vê o dele E vê os outros, mas talvez com estilo diferente.
                // Aqui vamos mostrar tudo para facilitar a gestão.
                
                const card = document.createElement('div');
                card.className = 'task-card-item';
                card.draggable = true; // Habilita Drag and Drop
                
                // Estilização baseada em status
                if(task.status === 'urgente') card.style.borderLeftColor = '#ef4444';
                if(task.status === 'concluido') { 
                    card.style.borderLeftColor = '#10b981';
                    card.style.opacity = '0.6';
                }

                card.innerHTML = `
                    <span class="task-meta-time">${task.time}</span>
                    <p class="task-meta-title">${task.title}</p>
                    <div class="flex justify-between items-end mt-2">
                        <span class="task-meta-owner">${task.owner}</span>
                        ${task.status === 'urgente' ? '<i class="fa-solid fa-triangle-exclamation text-red-500 text-[10px]"></i>' : ''}
                    </div>
                `;
                
                cell.appendChild(card);
            });

            DOM.calendarBody.appendChild(cell);
        }
    };

    // 4. RENDERIZAÇÃO DA SIDEBAR
    const renderSidebar = () => {
        const team = DataCore.getTeamStructure();
        
        // Sócios
        DOM.sidebarPartners.innerHTML = '';
        team.partners.forEach(p => {
            DOM.sidebarPartners.innerHTML += `
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <img src="${p.avatar}" class="w-8 h-8 rounded-full object-cover border border-gray-200">
                    <div>
                        <p class="text-[10px] font-bold text-gray-700 uppercase">${p.name}</p>
                        <p class="text-[8px] font-bold text-[#c5a059] uppercase">${p.department}</p>
                    </div>
                </div>
            `;
        });

        // Staff
        DOM.sidebarStaff.innerHTML = '';
        team.staff.forEach(s => {
            DOM.sidebarStaff.innerHTML += `
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <img src="${s.avatar}" class="w-8 h-8 rounded-full object-cover border border-gray-200">
                    <div>
                        <p class="text-[10px] font-bold text-gray-700 uppercase">${s.name}</p>
                        <p class="text-[8px] font-bold text-[#c5a059] uppercase">${s.department}</p>
                    </div>
                </div>
            `;
        });
    };

    // 5. INÍCIO DA SESSÃO (APÓS LOGIN)
    const startSession = (user) => {
        // Esconde Login, Mostra Dashboard
        DOM.authModal.classList.remove('active');
        DOM.mainInterface.style.opacity = '1';
        
        // Popula Perfil
        DOM.sessionName.innerText = user.name;
        DOM.sessionRole.innerText = user.role;
        DOM.sessionAvatar.src = user.avatar;

        // Renderiza Componentes
        renderSidebar();
        renderCalendar(user.id);
        startClock();
    };

    // 6. RELÓGIO
    const startClock = () => {
        setInterval(() => {
            const now = new Date();
            DOM.clock.innerText = now.toLocaleTimeString('pt-BR');
            const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            DOM.date.innerText = now.toLocaleDateString('pt-BR', opts);
        }, 1000);
    };

    // Expor funções públicas
    return {
        init: boot,
        startSession: startSession
    };
})();

/**
 * CONTROLADOR DE AUTENTICAÇÃO
 */
const AuthController = {
    login: () => {
        const userId = document.getElementById('login-select').value;
        const pass = document.getElementById('login-pass').value;
        
        // Simulação de senha (pode ser "123" ou vazio para admin)
        if(pass === "123" || userId === "BSC_GERAL") {
            const user = DataCore.getUserById(userId);
            Engine.startSession(user);
        } else {
            alert("Senha incorreta. Tente '123'.");
        }
    },
    logout: () => location.reload()
};

// GARANTIA DE INICIALIZAÇÃO SEGURA
document.addEventListener('DOMContentLoaded', Engine.init);
