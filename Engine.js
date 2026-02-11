/**
 * BSC ADVOGADOS - INTERACTIVE ENGINE v3.0.0
 * Controle de renderização dinâmica, eventos de arraste e UX.
 */

const UIController = (() => {
    
    // CACHE DE ELEMENTOS DO DOM PARA PERFORMANCE
    const dom = {
        login: document.getElementById('login-module'),
        dashboard: document.getElementById('main-dashboard'),
        userName: document.getElementById('display-user-name'),
        userRole: document.getElementById('display-user-role'),
        userAvatar: document.getElementById('header-avatar'),
        teamGrid: document.getElementById('team-grid'),
        tasksFeed: document.getElementById('tasks-feed'),
        clock: document.getElementById('clock-display'),
        date: document.getElementById('full-date'),
        filter: document.getElementById('task-filter')
    };

    let activeUserId = null;

    // --- MÓDULO DE RENDERIZAÇÃO DE TIME (DROP ZONES) ---
    const renderTeam = () => {
        const users = BSC_DATA.getUsers();
        dom.teamGrid.innerHTML = '';

        Object.keys(users).forEach(key => {
            if(key === "BSC_GERAL") return; // Admin master não recebe tarefas diretamente
            
            const user = users[key];
            const dropCard = document.createElement('div');
            dropCard.className = 'glass-container p-6 text-center border-2 border-transparent hover:border-[#c5a059] transition-all cursor-pointer group drop-zone';
            dropCard.id = `dz-${user.id}`;
            
            // LÓGICA DE DRAG & DROP
            dropCard.ondragover = (e) => {
                e.preventDefault();
                dropCard.classList.add('drop-zone-active');
            };
            
            dropCard.ondragleave = () => {
                dropCard.classList.remove('drop-zone-active');
            };
            
            dropCard.ondrop = (e) => {
                e.preventDefault();
                dropCard.classList.remove('drop-zone-active');
                const taskId = e.dataTransfer.getData("taskId");
                if (BSC_DATA.reallocateTask(taskId, user.id)) {
                    UIController.refresh();
                    console.log(`[ENGINE] Sucesso: Tarefa ${taskId} agora é de responsabilidade de ${user.full_name}`);
                }
            };

            dropCard.innerHTML = `
                <div class="relative w-20 h-20 mx-auto mb-4">
                    <img src="${user.avatar}" class="w-full h-full rounded-full border-2 border-[#c5a059] object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                    <div class="absolute inset-0 rounded-full bg-black/40 group-hover:bg-transparent transition-all"></div>
                </div>
                <h4 class="text-[10px] font-black uppercase text-white tracking-tighter">${user.full_name}</h4>
                <p class="text-[8px] text-[#c5a059] font-bold uppercase mt-1 opacity-60">${user.role}</p>
            `;
            dom.teamGrid.appendChild(dropCard);
        });
    };

    // --- MÓDULO DE RENDERIZAÇÃO DE AGENDA ---
    const renderAgenda = (query = "") => {
        dom.tasksFeed.innerHTML = '';
        const tasks = query ? BSC_DATA.search(query, activeUserId) : BSC_DATA.getAgenda(activeUserId);

        if (tasks.length === 0) {
            dom.tasksFeed.innerHTML = `
                <div class="col-span-full py-20 text-center opacity-20">
                    <i class="fa-solid fa-calendar-minus text-5xl mb-4"></i>
                    <p class="text-xs uppercase tracking-[0.3em]">Nenhum compromisso estratégico localizado</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'glass-container p-8 task-card relative overflow-hidden animate-fade';
            card.draggable = true;
            
            // INÍCIO DO ARRASTE
            card.ondragstart = (e) => {
                e.dataTransfer.setData("taskId", task.id);
                card.style.opacity = '0.4';
                card.classList.add('scale-95');
            };
            
            card.ondragend = () => {
                card.style.opacity = '1';
                card.classList.remove('scale-95');
            };

            card.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <span class="text-[9px] font-black text-[#c5a059] tracking-[0.2em] uppercase bg-white/5 px-2 py-1 rounded border border-white/5">
                        ${task.cat}
                    </span>
                    <button onclick="UIController.changeStatus(${task.id})" class="status-pill status-${task.status}">
                        ${task.status}
                    </button>
                </div>
                
                <h4 class="font-serif text-xl leading-snug mb-3 pr-4">${task.title}</h4>
                <p class="text-[10px] text-white/40 uppercase tracking-widest font-medium mb-8">
                    <i class="fa-solid fa-user-tie mr-2 text-[#c5a059]"></i>${task.client}
                </p>
                
                <div class="flex justify-between items-center pt-6 border-t border-white/5">
                    <div class="flex items-center gap-3">
                        <i class="fa-regular fa-clock text-[#c5a059] text-xs"></i>
                        <span class="text-xs font-bold text-white/80">${task.time}</span>
                    </div>
                    <span class="text-[9px] bg-[#c5a059]/10 text-[#c5a059] px-3 py-1 rounded border border-[#c5a059]/20 font-black uppercase">
                        Ref: ${task.ownerId}
                    </span>
                </div>

                <div class="absolute top-0 right-0 w-1.5 h-full opacity-30 ${task.status === 'urgente' ? 'bg-red-600' : 'bg-transparent'}"></div>
            `;
            dom.tasksFeed.appendChild(card);
        });
    };

    // --- MÓDULO DE UX E EVENTOS ---
    const initEvents = () => {
        dom.filter.oninput = (e) => renderAgenda(e.target.value);
    };

    const startClock = () => {
        const update = () => {
            const now = new Date();
            dom.clock.innerText = now.toLocaleTimeString('pt-BR');
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            dom.date.innerText = now.toLocaleDateString('pt-BR', options);
        };
        update();
        setInterval(update, 1000);
    };

    return {
        // Inicializa o Dashboard após login
        init: (user) => {
            activeUserId = user.id;
            dom.login.classList.add('hidden');
            dom.dashboard.classList.remove('hidden');
            
            dom.userName.innerText = user.id === "BSC_GERAL" ? user.full_name : `Dr. ${user.full_name}`;
            dom.userRole.innerText = user.role;
            dom.userAvatar.src = user.avatar;

            startClock();
            renderTeam();
            renderAgenda();
            initEvents();
            console.log(`[ENGINE] Sistema operacional para: ${user.full_name}`);
        },
        
        // Atualiza a tela sem recarregar
        refresh: () => {
            renderAgenda(dom.filter.value);
        },
        
        // Altera status da tarefa via clique
        changeStatus: (taskId) => {
            BSC_DATA.cycleTaskStatus(taskId);
            UIController.refresh();
        }
    };
})();

/**
 * MÓDULO DE SEGURANÇA E AUTENTICAÇÃO
 */
const AuthController = (() => {
    return {
        login: () => {
            const userId = document.getElementById('user-select').value;
            const password = document.getElementById('user-pass').value;
            const user = BSC_DATA.getUser(userId);

            // Validação de acesso (BSC Geral não exige senha na demonstração)
            if (user && (user.password === password || userId === "BSC_GERAL")) {
                UIController.init(user);
            } else {
                alert("ACESSO NEGADO: Chave de segurança inválida para este perfil.");
            }
        },
        
        logout: () => {
            if(confirm("Deseja encerrar a sessão na rede BSC?")) {
                location.reload();
            }
        }
    };
})();
