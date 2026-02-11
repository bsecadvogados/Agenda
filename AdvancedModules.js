/**
 * BSC ADVOGADOS - ADVANCED ENTERPRISE MODULES
 * Responsável por: Persistência Local, Modais e Filtros Avançados.
 */

const EnterpriseCore = (() => {
    
    // --- PERSISTÊNCIA (LocalStorage) ---
    // Garante que o usuário não perca dados ao atualizar a página
    const saveToStorage = () => {
        const currentTasks = BSC_DATA.getTasks();
        localStorage.setItem('BSC_AGENDA_TASKS', JSON.stringify(currentTasks));
    };

    const loadFromStorage = () => {
        const saved = localStorage.getItem('BSC_AGENDA_TASKS');
        if (saved) {
            // Lógica para injetar dados salvos de volta no BSC_DATA
            const parsedTasks = JSON.parse(saved);
            // Substitui as tasks padrão pelas salvas
            BSC_DATA.overrideTasks(parsedTasks);
        }
    };

    // --- SISTEMA DE MODAL (CRIAÇÃO DE TAREFAS) ---
    const createModalHTML = () => {
        const modal = document.createElement('div');
        modal.id = 'task-modal';
        modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 hidden animate-fade';
        modal.innerHTML = `
            <div class="glass-panel p-8 w-full max-w-xl border-t-4 border-t-[#c5a059]">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-serif-legal text-2xl text-[#c5a059]">Novo Compromisso Estratégico</h3>
                    <button onclick="EnterpriseCore.closeModal()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark text-xl"></i></button>
                </div>
                
                <form id="new-task-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Título do Compromisso / Processo</label>
                            <input type="text" id="m-title" required class="w-full bg-white/5 border border-white/10 p-3 rounded focus:border-[#c5a059] outline-none transition">
                        </div>
                        <div>
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Responsável</label>
                            <select id="m-owner" class="w-full bg-neutral-900 border border-white/10 p-3 rounded text-sm outline-none">
                                <option value="IM">Iago Manguary</option>
                                <option value="GE">Geovana Alexassandra</option>
                                <option value="AF">Abimael Francisco</option>
                                <option value="FS">Felipe dos Santos</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Categoria</label>
                            <select id="m-cat" class="w-full bg-neutral-900 border border-white/10 p-3 rounded text-sm outline-none">
                                <option value="Audiência">Audiência</option>
                                <option value="CPR">Contrato / CPR</option>
                                <option value="BNI">BNI Jalapão</option>
                                <option value="Marketing">Marketing (Azi)</option>
                                <option value="Jurídico">Jurídico Geral</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Data</label>
                            <input type="date" id="m-date" class="w-full bg-white/5 border border-white/10 p-3 rounded text-sm outline-none text-white">
                        </div>
                        <div>
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Horário</label>
                            <input type="time" id="m-time" class="w-full bg-white/5 border border-white/10 p-3 rounded text-sm outline-none text-white">
                        </div>
                        <div class="col-span-2">
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Prioridade</label>
                            <div class="flex gap-4 mt-2">
                                <label class="flex items-center gap-2 text-xs cursor-pointer"><input type="radio" name="priority" value="urgente" checked> <span class="text-red-500">Urgente</span></label>
                                <label class="flex items-center gap-2 text-xs cursor-pointer"><input type="radio" name="priority" value="alta"> <span class="text-orange-400">Alta</span></label>
                                <label class="flex items-center gap-2 text-xs cursor-pointer"><input type="radio" name="priority" value="media"> <span class="text-yellow-400">Média</span></label>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <label class="text-[10px] uppercase text-[#c5a059] font-bold tracking-widest">Notas Descritivas</label>
                            <textarea id="m-desc" rows="3" class="w-full bg-white/5 border border-white/10 p-3 rounded text-sm outline-none"></textarea>
                        </div>
                    </div>
                    <button type="submit" class="w-full bg-[#c5a059] text-black font-bold py-4 rounded hover:bg-[#d4b57a] transition uppercase tracking-[0.2em] text-xs mt-4">
                        Agendar na Rede BSC
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listener do Formulário
        document.getElementById('new-task-form').onsubmit = (e) => {
            e.preventDefault();
            const newTask = {
                ownerId: document.getElementById('m-owner').value,
                title: document.getElementById('m-title').value,
                description: document.getElementById('m-desc').value,
                time: document.getElementById('m-time').value,
                date: document.getElementById('m-date').value,
                category: document.getElementById('m-cat').value,
                priority: document.querySelector('input[name="priority"]:checked').value,
                status: "pendente"
            };
            
            BSC_DATA.addNewTask(newTask);
            saveToStorage();
            UIController.renderAgenda(); // Atualiza a tela
            EnterpriseCore.closeModal();
            alert("Compromisso registrado com sucesso na base de dados.");
        };
    };

    return {
        init: () => {
            loadFromStorage();
            createModalHTML();
            console.log("[SYSTEM] Enterprise Layer Ativada.");
        },
        openModal: () => {
            document.getElementById('task-modal').classList.remove('hidden');
        },
        closeModal: () => {
            document.getElementById('task-modal').classList.add('hidden');
        },
        sync: () => saveToStorage()
    };
})();

// --- INTEGRAÇÃO FINAL E INICIALIZAÇÃO ---
window.onload = () => {
    EnterpriseCore.init();
    
    // Sobrescreve a função de clique do motor para abrir o modal real
    UIController.openNewTaskModal = () => EnterpriseCore.openModal();
    
    // Sobrescreve a função de drag para salvar ao soltar
    const originalDrop = UIController.handleTaskRelocation;
    UIController.handleTaskRelocation = (taskId, newOwnerId) => {
        // Chama a lógica original
        const task = BSC_DATA.getTasks().find(t => t.id == taskId);
        if(task) {
            task.ownerId = newOwnerId;
            UIController.renderAgenda();
            EnterpriseCore.sync();
        }
    };
};
