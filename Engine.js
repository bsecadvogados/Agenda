/**
 * BSC CORE ENGINE
 * Gerenciamento de Renderização Dinâmica e Eventos
 */
const UIController = (() => {
    
    const renderMembers = () => {
        const grid = document.getElementById('team-grid');
        const members = BSC_DATA.getMembers();
        grid.innerHTML = '';

        Object.keys(members).forEach(key => {
            if(key === "BSC_GERAL") return;
            const m = members[key];
            const div = document.createElement('div');
            div.className = 'glass-panel p-6 text-center border-2 border-transparent hover:border-[#c5a059] transition-all cursor-pointer group';
            
            // Logica Drag & Drop
            div.ondragover = (e) => { e.preventDefault(); div.classList.add('drop-zone-active'); };
            div.ondragleave = () => div.classList.remove('drop-zone-active');
            div.ondrop = (e) => {
                e.preventDefault();
                const taskId = e.dataTransfer.getData("taskId");
                BSC_DATA.reallocate(taskId, m.id);
                div.classList.remove('drop-zone-active');
                UIController.refresh();
            };

            div.innerHTML = `
                <div class="relative w-16 h-16 mx-auto mb-4">
                    <img src="${m.avatar}" class="w-full h-full rounded-full border-2 border-[#c5a059] object-cover grayscale group-hover:grayscale-0 transition-all">
                </div>
                <h4 class="text-[10px] font-bold uppercase tracking-tighter text-white">${m.full_name}</h4>
                <p class="text-[8px] text-[#c5a059] font-bold uppercase mt-1 opacity-70">${m.role}</p>
            `;
            grid.appendChild(div);
        });
    };

    const renderTasks = (userId) => {
        const feed = document.getElementById('tasks-feed');
        feed.innerHTML = '';
        const tasks = BSC_DATA.getAgenda(userId);

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'glass-panel p-6 task-card border-l-4 border-l-transparent';
            if(task.status === 'urgente') card.style.borderLeftColor = '#ef4444';
            card.draggable = true;
            card.ondragstart = (e) => e.dataTransfer.setData("taskId", task.id);

            card.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <span class="text-[8px] font-bold text-[#c5a059] tracking-[0.2em] uppercase">${task.cat}</span>
                    <button onclick="BSC_DATA.toggleStatus(${task.id}); UIController.refresh()" class="status-pill status-${task.status}">${task.status}</button>
                </div>
                <h4 class="font-serif text-lg leading-snug mb-2">${task.title}</h4>
                <p class="text-[10px] text-gray-500 mb-6 uppercase tracking-widest"><i class="fa-solid fa-user-tag mr-2"></i>${task.client}</p>
                <div class="flex justify-between items-center pt-4 border-t border-white/5">
                    <span class="text-[10px] font-bold"><i class="fa-regular fa-clock mr-2 text-[#c5a059]"></i>${task.time}</span>
                    <span class="text-[9px] bg-white/5 px-2 py-1 rounded border border-white/10 uppercase font-bold">${task.ownerId}</span>
                </div>
            `;
            feed.appendChild(card);
        });
    };

    return {
        refresh: () => {
            const current = AuthController.getActiveUser();
            renderTasks(current.id);
        },
        init: (user) => {
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
            
            document.getElementById('login-module').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
            
            document.getElementById('display-user-name').innerText = user.full_name;
            document.getElementById('display-user-role').innerText = user.role;
            document.getElementById('header-avatar').src = user.avatar;

            renderMembers();
            renderTasks(user.id);
            
            // Relógio
            setInterval(() => {
                document.getElementById('clock-display').innerText = new Date().toLocaleTimeString('pt-BR');
            }, 1000);
            document.getElementById('full-date').innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        }
    };
})();

const AuthController = (() => {
    let activeUser = null;
    return {
        login: () => {
            const id = document.getElementById('user-select').value;
            const user = BSC_DATA.getMember(id);
            activeUser = user;
            UIController.init(user);
        },
        logout: () => location.reload(),
        getActiveUser: () => activeUser
    };
})();
