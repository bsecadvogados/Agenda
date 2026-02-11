/**
 * BSC ENGINE v16.0 - CORREÇÃO DE INICIALIZAÇÃO
 * Foco: Garantir que o Loader desapareça e o Login apareça.
 */

const Engine = (() => {
    
    // Mapeamento de Elementos (Garante que o JS encontre o HTML)
    const DOM = {
        loader: document.getElementById('system-loader'),
        loaderBar: document.getElementById('loader-progress'),
        loaderStatus: document.getElementById('loader-status'),
        
        authModal: document.getElementById('auth-modal'),
        loginUser: document.getElementById('login-user'),
        loginPass: document.getElementById('login-pass'),
        
        interface: document.getElementById('main-interface'),
        
        // Containers
        sidebarPartners: document.getElementById('sidebar-partners'),
        sidebarStaff: document.getElementById('sidebar-staff'),
        calendarGrid: document.getElementById('calendar-grid'),
        
        // Perfil
        avatar: document.getElementById('session-avatar'),
        name: document.getElementById('session-name'),
        role: document.getElementById('session-role'),
        
        // Tempo
        clock: document.getElementById('clock'),
        date: document.getElementById('date')
    };

    // 1. SEQUÊNCIA DE BOOT (Correção do Travamento)
    const init = () => {
        console.log("Sistema Iniciando...");
        
        // Popula o Login
        const users = DataCore.getAllUsers();
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.innerText = u.name;
            DOM.loginUser.appendChild(opt);
        });

        // Simula Carregamento (Barra de Progresso)
        let width = 0;
        const interval = setInterval(() => {
            width += 5; // Velocidade do carregamento
            DOM.loaderBar.style.width = width + '%';
            
            if (width > 30) DOM.loaderStatus.innerText = "Carregando Módulos Jurídicos...";
            if (width > 70) DOM.loaderStatus.innerText = "Sincronizando Agenda...";
            
            if (width >= 100) {
                clearInterval(interval);
                finishLoading();
            }
        }, 50); // 50ms * 20 passos = 1 segundo de load (rápido e dinâmico)
    };

    // 2. TRANSIÇÃO LOADER -> LOGIN (Força Bruta Visual)
    const finishLoading = () => {
        // Passo 1: Fade Out Loader
        DOM.loader.style.opacity = '0';
        
        setTimeout(() => {
            // Passo 2: Remove Loader, Mostra Login
            DOM.loader.style.display = 'none'; // Importante: remove do fluxo
            DOM.authModal.style.display = 'flex'; // Importante: ativa o flexbox
            
            // Passo 3: Fade In Login
            setTimeout(() => {
                DOM.authModal.style.opacity = '1';
            }, 50);
        }, 800);
    };

    // 3. LOGIN LÓGICO
    const attemptLogin = () => {
        const userId = DOM.loginUser.value;
        const pass = DOM.loginPass.value;
        const user = DataCore.getUserById(userId);

        // Senha padrão 123 ou ADMIN
        if (user && (pass === "123" || userId === "BSC_GERAL")) {
            startSession(user);
        } else {
            alert("Senha Incorreta. Tente '123'.");
        }
    };

    // 4. INÍCIO DA SESSÃO (LOGIN -> DASHBOARD)
    const startSession = (user) => {
        // Fade Out Login
        DOM.authModal.style.opacity = '0';
        
        setTimeout(() => {
            DOM.authModal.style.display = 'none';
            DOM.interface.style.display = 'grid'; // Ativa o Grid do Dashboard
            
            // Popula Dados
            DOM.name.innerText = user.name;
            DOM.role.innerText = user.role;
            DOM.avatar.src = user.avatar;
            
            renderSidebar();
            renderCalendar(user.id);
            startClock();

            // Fade In Dashboard
            setTimeout(() => {
                DOM.interface.style.opacity = '1';
            }, 50);
        }, 500);
    };

    // 5. RENDERIZADORES
    const renderSidebar = () => {
        const team = DataCore.getTeam();
        
        DOM.sidebarPartners.innerHTML = '';
        team.partners.forEach(p => {
            DOM.sidebarPartners.innerHTML += createSidebarItem(p);
        });

        DOM.sidebarStaff.innerHTML = '';
        team.staff.forEach(s => {
            DOM.sidebarStaff.innerHTML += createSidebarItem(s);
        });
    };

    const createSidebarItem = (u) => `
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <img src="${u.avatar}" class="w-8 h-8 rounded-full border border-gray-200 object-cover">
            <div>
                <p class="text-[10px] font-bold text-gray-700 uppercase">${u.name}</p>
                <p class="text-[8px] font-bold text-[#c5a059] uppercase">${u.role}</p>
            </div>
        </div>
    `;

    const renderCalendar = (userId) => {
        DOM.calendarGrid.innerHTML = '';
        // 28 Dias de Fevereiro
        for(let i=1; i<=28; i++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            
            // Número
            cell.innerHTML = `<span class="absolute top-4 right-4 text-2xl font-serif font-bold text-gray-100">${i}</span>`;
            
            // Tarefas
            const tasks = DataCore.getTasksByDay(i);
            tasks.forEach(t => {
                const card = document.createElement('div');
                card.className = 'task-card';
                if(t.status === 'urgente') card.style.borderLeftColor = '#ef4444';
                if(t.status === 'concluido') { card.style.opacity = '0.6'; card.style.borderLeftColor = '#10b981'; }

                card.innerHTML = `
                    <span class="block text-[10px] font-bold text-[#c5a059] mb-1">${t.time}</span>
                    <p class="text-[10px] font-bold text-gray-700 leading-tight">${t.title}</p>
                    <span class="block text-[8px] font-bold text-gray-400 uppercase mt-2">${t.owner}</span>
                `;
                cell.appendChild(card);
            });
            DOM.calendarGrid.appendChild(cell);
        }
    };

    const startClock = () => {
        setInterval(() => {
            const now = new Date();
            DOM.clock.innerText = now.toLocaleTimeString('pt-BR');
            const opt = { weekday: 'long', day: 'numeric', month: 'long' };
            DOM.date.innerText = now.toLocaleDateString('pt-BR', opt);
        }, 1000);
    };

    // Retorno Público
    return {
        init: init,
        attemptLogin: attemptLogin
    };
})();

// Inicializa quando o HTML estiver pronto
window.addEventListener('DOMContentLoaded', Engine.init);
