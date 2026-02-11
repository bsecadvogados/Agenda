/**
 * BSC ENGINE v19.0
 * Controle de Inicialização, Login e Renderização
 */

const Engine = (() => {
    
    // Cache de Elementos DOM
    const DOM = {
        loader: document.getElementById('system-loader'),
        loaderBar: document.getElementById('loader-bar'),
        loaderStatus: document.getElementById('loader-status'),
        
        authModal: document.getElementById('auth-modal'),
        loginUser: document.getElementById('login-user'),
        loginPass: document.getElementById('login-pass'),
        
        dashboard: document.getElementById('main-interface'),
        
        // Sidebar Lists
        listPartners: document.getElementById('list-partners'),
        listStaff: document.getElementById('list-staff'),
        
        // Calendar
        grid: document.getElementById('calendar-grid'),
        
        // Clock
        clock: document.getElementById('clock'),
        date: document.getElementById('date'),
        
        // Profile
        userAvatar: document.getElementById('user-avatar'),
        userName: document.getElementById('user-name'),
        userRole: document.getElementById('user-role')
    };

    // 1. INICIALIZAÇÃO (BOOT)
    const init = () => {
        // Verificação de Integridade do DataCore
        if (typeof DataCore === 'undefined') {
            console.error("DataCore não encontrado. Tentando novamente em 500ms...");
            setTimeout(init, 500); // Tenta de novo se o Data.js ainda não carregou
            return;
        }

        console.log("Engine Iniciado. DataCore Detectado.");
        
        // Preencher Login
        populateLogin();

        // Animação de Carregamento Falsa (UX)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if(DOM.loaderBar) DOM.loaderBar.style.width = progress + '%';
            
            if(progress > 40) DOM.loaderStatus.innerText = "Sincronizando Agenda...";
            if(progress > 80) DOM.loaderStatus.innerText = "Finalizando...";
            
            if(progress >= 100) {
                clearInterval(interval);
                finishLoading();
            }
        }, 30);
    };

    // Popula o Select de Login
    const populateLogin = () => {
        if(!DOM.loginUser) return;
        DOM.loginUser.innerHTML = ''; // Limpa
        const users = DataCore.getAllUsers();
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.innerText = u.name;
            DOM.loginUser.appendChild(opt);
        });
    };

    // 2. TRANSIÇÃO PARA LOGIN
    const finishLoading = () => {
        if(DOM.loader) {
            DOM.loader.style.opacity = '0';
            setTimeout(() => {
                DOM.loader.style.display = 'none';
                if(DOM.authModal) {
                    DOM.authModal.style.display = 'flex';
                    // Pequeno delay para a transição de opacidade funcionar
                    setTimeout(() => DOM.authModal.style.opacity = '1', 50);
                }
            }, 500);
        }
    };

    // 3. TENTATIVA DE LOGIN
    const attemptLogin = () => {
        const id = DOM.loginUser.value;
        const pass = DOM.loginPass.value;
        
        // Senha padrão 123 ou ADMIN
        if(pass === "123" || id === "BSC_GERAL") {
            const user = DataCore.getUserById(id);
            enterDashboard(user);
        } else {
            alert("Senha Incorreta (Use '123')");
        }
    };

    // 4. ENTRADA NO DASHBOARD
    const enterDashboard = (user) => {
        DOM.authModal.style.opacity = '0';
        setTimeout(() => {
            DOM.authModal.style.display = 'none';
            DOM.dashboard.style.display = 'grid'; // Grid layout
            setTimeout(() => DOM.dashboard.style.opacity = '1', 50);
            
            // Configurar Sessão
            DOM.userName.innerText = user.name;
            DOM.userRole.innerText = user.role;
            DOM.userAvatar.src = user.avatar;

            // Renderizar Dados
            renderTeam();
            renderCalendar(user.id);
            startClock();
        }, 500);
    };

    // RENDERIZADORES
    const renderTeam = () => {
        const team = DataCore.getTeam();
        
        // Partners
        DOM.listPartners.innerHTML = '';
        team.partners.forEach(p => {
            DOM.listPartners.innerHTML += createUserHTML(p);
        });

        // Staff
        DOM.listStaff.innerHTML = '';
        team.staff.forEach(s => {
            DOM.listStaff.innerHTML += createUserHTML(s);
        });
    };

    const createUserHTML = (u) => `
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <img src="${u.avatar}" class="w-8 h-8 rounded-full border border-gray-200 object-cover">
            <div>
                <p class="text-[10px] font-bold text-gray-700 uppercase">${u.name}</p>
                <p class="text-[8px] font-bold text-[#c5a059] uppercase">${u.dept}</p>
            </div>
        </div>
    `;

    const renderCalendar = (userId) => {
        DOM.grid.innerHTML = '';
        // 28 Dias
        for(let i=1; i<=28; i++) {
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            
            cell.innerHTML = `<span class="day-number">${i}</span>`;
            
            const tasks = DataCore.getTasksByDay(i);
            tasks.forEach(t => {
                const card = document.createElement('div');
                card.className = 'task-card';
                if(t.status === 'urgente') card.style.borderLeftColor = '#ef4444';
                if(t.status === 'concluido') { card.style.borderLeftColor = '#10b981'; card.style.opacity = '0.6'; }
                
                card.innerHTML = `
                    <span class="task-time">${t.time}</span>
                    <p class="task-title">${t.title}</p>
                    <span class="task-owner">${t.owner}</span>
                `;
                cell.appendChild(card);
            });
            DOM.grid.appendChild(cell);
        }
    };

    const startClock = () => {
        setInterval(() => {
            const now = new Date();
            if(DOM.clock) DOM.clock.innerText = now.toLocaleTimeString('pt-BR');
            const opts = { weekday: 'long', day: 'numeric', month: 'long' };
            if(DOM.date) DOM.date.innerText = now.toLocaleDateString('pt-BR', opts);
        }, 1000);
    };

    // Expor métodos
    return {
        init: init,
        attemptLogin: attemptLogin,
        populateLogin: populateLogin
    };
})();

// Inicializa quando o HTML estiver pronto
document.addEventListener('DOMContentLoaded', Engine.init);
