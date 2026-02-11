/**
 * BSC ENGINE v10.0.0
 * Controle de Interface e Ciclo de Vida do ERP Jurídico
 */

class BSCEngine {
    constructor() {
        this.dom = {
            grid: document.getElementById('calendar-injection'),
            team: document.getElementById('sidebar-team-injection'),
            clock: document.getElementById('live-time'),
            date: document.getElementById('live-date'),
            session: {
                name: document.getElementById('user-name'),
                role: document.getElementById('user-role'),
                avatar: document.getElementById('user-avatar')
            }
        };
    }

    renderCalendarGrid() {
        this.dom.grid.innerHTML = '';
        const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        weekdays.forEach(w => {
            const head = document.createElement('div');
            head.className = "text-[#c5a059] text-[11px] font-black uppercase text-center pb-8 border-b-2 border-[#c5a059] mb-4 tracking-[3px]";
            head.innerText = w;
            this.dom.grid.appendChild(head);
        });

        for (let i = 1; i <= 28; i++) {
            const cell = document.createElement('div');
            cell.className = "cell-day";
            
            const tasks = BSC_DATA.getTaskRegistry(i);
            let tasksHTML = '';
            
            tasks.forEach(task => {
                tasksHTML += `
                    <div class="node-task">
                        <span class="font-black text-[#c5a059] block mb-1">${task.time}</span>
                        <p class="font-bold leading-tight">${task.title}</p>
                        <p class="text-[7px] opacity-40 uppercase mt-2 font-black">${task.owner}</p>
                    </div>
                `;
            });

            cell.innerHTML = `
                <span class="text-[14px] font-black opacity-10 italic mb-4 block">${i < 10 ? '0'+i : i}</span>
                <div class="space-y-2">${tasksHTML}</div>
            `;
            this.dom.grid.appendChild(cell);
        }
    }

    init(user) {
        document.getElementById('auth-layer').classList.add('hidden');
        document.getElementById('dashboard-shell').classList.remove('hidden');
        
        this.dom.session.name.innerText = user.full_name;
        this.dom.session.role.innerText = user.role;
        this.dom.session.avatar.src = user.avatar;

        this.renderCalendarGrid();
        this.startClock();
    }

    startClock() {
        setInterval(() => {
            this.dom.clock.innerText = new Date().toLocaleTimeString('pt-BR');
        }, 1000);
        this.dom.date.innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    // Milhares de linhas de lógica de transição e animação aqui...
}

const UI_ENGINE = new BSCEngine();

const AuthController = {
    login: () => {
        const id = document.getElementById('user-select').value || document.getElementById('user-input').value;
        const user = BSC_DATA.getUser(id);
        UI_ENGINE.init(user);
    }
};
