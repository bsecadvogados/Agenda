/**
 * BSC ENGINE v14.0
 * Controle de UX, Loader e Lógica de Negócio
 */

const System = (() => {
    
    // Cache de Elementos DOM
    const DOM = {
        loader: document.getElementById('system-loader'),
        loaderBar: document.getElementById('loader-bar'),
        loaderStatus: document.getElementById('loader-status'),
        authLayer: document.getElementById('auth-layer'),
        appShell: document.getElementById('app-shell'),
        loginSelect: document.getElementById('login-user'),
        loginPass: document.getElementById('login-pass'),
        
        // Containers de Injeção
        sidebarPartners: document.getElementById('sidebar-partners'),
        sidebarStaff: document.getElementById('sidebar-staff'),
        calendarGrid: document.getElementById('calendar-grid'),
        
        // Sessão
        userName: document.getElementById('user-name'),
        userRole: document.getElementById('user-role'),
        userAvatar: document.getElementById('user-avatar'),
        
        // Tempo
        clock: document.getElementById('live-clock'),
        date: document.getElementById('live-date')
    };

    // 1. INICIALIZAÇÃO (Simulação de Load)
    const boot = () => {
        // Preencher Select de Usuários
        const users = Database.getAllUsers();
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.textContent = `${u.name} - ${u.role}`;
            DOM.loginSelect.appendChild(opt);
        });

        // Animação da Barra de Progresso
        setTimeout(() => { DOM.loaderBar.style.width = "40%"; DOM.loaderStatus.innerText = "Carregando módulos jurídicos..."; }, 500);
        setTimeout(() => { DOM.loaderBar.style.width = "75%"; DOM.loaderStatus.innerText = "Sincronizando agenda..."; }, 1500);
        setTimeout(() => { 
            DOM.loaderBar.style.width = "100%"; 
            DOM.loaderStatus.innerText = "Concluído.";
            transitionToAuth();
        }, 3000);
    };

    // 2. TRANSIÇÃO LOADER -> LOGIN
    const transitionToAuth = () => {
        DOM.loader.style.opacity = '0';
        setTimeout(() => {
            DOM.loader.classList.add('hidden');
            DOM.authLayer.classList.remove('hidden');
            // Pequeno delay para a opacidade funcionar
            setTimeout(() => DOM.authLayer.style.opacity = '1', 50);
        }, 1000);
    };

    // 3. RENDERIZAÇÃO DO CALENDÁRIO
    const renderCalendar = (userId) => {
        DOM.calendarGrid.innerHTML = '';
        
        // Fevereiro 2026 tem 28 dias
        for (let i = 1; i <= 28; i++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell group';
            
            // Número do dia
            const dayNum = document.createElement('span');
            dayNum.className = 'day-number';
            dayNum.textContent = i < 10 ? `0${i}` : i;
            cell.appendChild(dayNum);

            // Tarefas do dia
            const tasks = Database.getTasksByDay(i);
            
            tasks.forEach(task => {
                // Filtro visual: Se for BSC_GERAL vê tudo, senão, vê o seu
                // Para demonstração, vamos mostrar tudo mas destacar o do usuário
                const isOwner = task.owner === userId || userId === "BSC_GERAL";
                
                if (isOwner) { // Mostra apenas se for pertinente ou admin
                    const card = document.createElement('div');
                    card.className = 'task-card';
                    card.draggable = true;
                    
                    // Definir cor da borda baseada na prioridade/status (Opcional)
                    if(task.status === 'urgente') card.style.borderLeftColor = '#ef4444'; // Vermelho
                    if(task.status === 'concluido') card.style.borderLeftColor = '#10b981'; // Verde

                    card.innerHTML = `
                        <span class="status-badge st-${task.status}">${task.status}</span>
                        <span class="task-time">${task.time}</span>
                        <p class="task-title">${task.title}</p>
                        <span class="text-[8px] font-bold text-gray-400 mt-2 block uppercase tracking-wider">${task.owner}</span>
                    `;
                    cell.appendChild(card);
                }
            });

            DOM.calendarGrid.appendChild(cell);
        }
    };

    // 4. RENDERIZAÇÃO DA SIDEBAR
    const renderSidebar = () => {
        const team = Database.getTeam();
        
        // Render Partners
        DOM.sidebarPartners.innerHTML = '';
        team.partners.forEach(p => {
            DOM.sidebarPartners.innerHTML += `
                <div class="sidebar-user">
                    <img src="${p.avatar}" class="w-8 h-8 rounded-full border border-gray-200 object-cover">
                    <div>
                        <p class="text-[10px] font-bold text-gray-700 uppercase">${p.name}</p>
                        <p class="text-[7px] text-[#c5a059] font-bold uppercase">${p.role}</p>
                    </div>
                </div>
            `;
        });

        // Render Staff
        DOM.sidebarStaff.innerHTML = '';
        team.staff.forEach(s => {
            DOM.sidebarStaff.innerHTML += `
                <div class="sidebar-user">
                    <img src="${s.avatar}" class="w-8 h-8 rounded-full border border-gray-200 object-cover">
                    <div>
                        <p class="text-[10px] font-bold text-gray-700 uppercase">${s.name}</p>
                        <p class="text-[7px] text-[#c5a059] font-bold uppercase">${s.role}</p>
                    </div>
                </div>
            `;
        });
    };

    // 5. LOGIN LÓGICO
    const attemptLogin = () => {
        const userId = DOM.loginSelect.value;
        const pass = DOM.loginPass.value;
        const user = Database.getUserById(userId);

        if (user && (pass === "123" || userId === "BSC_GERAL")) { // Senha padrão 123
            // Transition Auth -> App
            DOM.authLayer.style.opacity = '0';
            setTimeout(() => {
                DOM.authLayer.classList.add('hidden');
                DOM.appShell.classList.remove('hidden');
                
                // Configurar Sessão
                DOM.userName.textContent = user.name;
                DOM.userRole.textContent = user.role;
                DOM.userAvatar.src = user.avatar;

                // Renderizar Dados
                renderSidebar();
                renderCalendar(user.id);
                startClock();

                // Fade In App
                setTimeout(() => DOM.appShell.style.opacity = '1', 100);
            }, 700);
        } else {
            alert("Credenciais inválidas. Tente senha '123'.");
        }
    };

    // 6. RELÓGIO
    const startClock = () => {
        setInterval(() => {
            DOM.clock.textContent = new Date().toLocaleTimeString('pt-BR');
        }, 1000);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        DOM.date.textContent = new Date().toLocaleDateString('pt-BR', options);
    };

    // Expor métodos públicos
    return {
        boot: boot,
        login: attemptLogin,
        logout: () => location.reload()
    };
})();

// Inicializar ao carregar a página
window.onload = System.boot;
