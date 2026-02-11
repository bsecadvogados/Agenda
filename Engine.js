/**
 * BSC ENGINE v17.0
 * Controle de Inicialização e Lógica
 */

const Engine = (() => {
    
    // Cache de Elementos (Performance)
    const DOM = {
        loader: document.getElementById('system-loader'),
        loaderBar: document.getElementById('loader-bar'),
        loaderStatus: document.getElementById('loader-status'),
        
        authScreen: document.getElementById('auth-screen'),
        loginSelect: document.getElementById('login-user'),
        loginPass: document.getElementById('login-pass'),
        
        dashboard: document.getElementById('dashboard-ui'),
        
        listPartners: document.getElementById('list-partners'),
        listStaff: document.getElementById('list-staff'),
        
        grid: document.getElementById('calendar-grid'),
        
        clockTime: document.getElementById('clock-time'),
        clockDate: document.getElementById('clock-date'),
        
        userAvatar: document.getElementById('user-avatar'),
        userName: document.getElementById('user-name'),
        userRole: document.getElementById('user-role')
    };

    // 1. BOOT (Inicialização)
    const init = () => {
        console.log("Engine Started...");
        
        // Carrega Usuários no Select
        populateLoginEmergency();

        // Animação de Load
        let width = 0;
        const interval = setInterval(() => {
            width += 2; // Velocidade do carregamento
            if(DOM.loaderBar) DOM.loaderBar.style.width = width + '%';
            
            if(width > 30) if(DOM.loaderStatus) DOM.loaderStatus.innerText = "Carregando Módulos Jurídicos...";
            if(width > 70) if(DOM.loaderStatus) DOM.loaderStatus.innerText = "Sincronizando Agenda...";
            
            if(width >= 100) {
                clearInterval(interval);
                finishLoad(); // CHAMA A FINALIZAÇÃO
            }
        }, 30);
    };

    // Populador de Login (Acessível externamente para emergência)
    const populateLoginEmergency = () => {
        if(!DOM.loginSelect) return;
        DOM.loginSelect.innerHTML = ''; // Limpa antes
        const users = DataCore.getAllUsers();
        users.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.id;
            opt.innerText = u.name;
            DOM.loginSelect.appendChild(opt);
        });
    };

    // 2. TRANSIÇÃO LOADER -> AUTH
    const finishLoad = () => {
        if(DOM.loader) DOM.loader.style.opacity = '0';
        
        setTimeout(() => {
            if(DOM.loader) DOM.loader.style.display = 'none';
            if(DOM.authScreen) {
                DOM.authScreen.style.display = 'flex'; // Torna visível
                setTimeout(() => DOM.authScreen.style.opacity = '1', 50); // Fade In
            }
        }, 500);
    };

    // 3. LOGIN LÓGICO
    const attemptLogin = () => {
        const id = DOM.loginSelect.value;
        const pass = DOM.loginPass.value;
        
        // Senha padrão 123 ou ADMIN
        if(pass === "123" || id === "BSC_GERAL") {
            const user = DataCore.getUserById(id);
            enterDashboard(user);
        } else {
            alert("Senha Incorreta (Padrão: 123)");
        }
    };

    // 4. DASHBOARD
    const enterDashboard = (user) => {
        DOM.authScreen.style.opacity = '0';
        setTimeout(() => {
            DOM.authScreen.style.display = 'none';
            DOM.dashboard.style.display = 'grid';
            setTimeout(() => DOM.dashboard.style.opacity = '1', 50);
            
            // Setup User
            DOM.userName.innerText = user.name;
            DOM.userRole.innerText = user.role;
            DOM.userAvatar.src = user.avatar;

            // Render
            renderTeam();
            renderCalendar(user.id);
            startClock();
        }, 500);
    };

    // Renderizadores
    const renderTeam = () => {
        const team = DataCore.getTeam();
        
        DOM.listPartners.innerHTML = '';
        team.partners.forEach(p => {
            DOM.listPartners.innerHTML += createUserItem(p);
        });

        DOM.listStaff.innerHTML = '';
        team.staff.forEach(s => {
            DOM.listStaff.innerHTML += createUserItem(s);
        });
    };

    const createUserItem = (u) => `
        <div class="team-item">
            <img src="${u.avatar}" class="team-avatar">
            <div>
                <p class="team-name">${u.name}</p>
                <p class="team-role">${u.role}</p>
            </div>
        </div>
    `;

    const renderCalendar = (userId) => {
        DOM.grid.innerHTML = '';
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
            DOM.clockTime.innerText = now.toLocaleTimeString('pt-BR');
            const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            DOM.clockDate.innerText = now.toLocaleDateString('pt-BR', opts);
        }, 1000);
    };

    return {
        init: init,
        attemptLogin: attemptLogin,
        populateLoginEmergency: populateLoginEmergency
    };
})();

// Inicializa quando o HTML estiver pronto
document.addEventListener('DOMContentLoaded', Engine.init);
