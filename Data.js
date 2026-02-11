/**
 * BSC ADVOGADOS - ENTERPRISE DATA MODULE
 * Versão: 2.0.1
 * Descrição: Gerenciamento de estado, usuários e persistência de tarefas.
 */

const BSC_DATA = (() => {
    // Configurações Globais do Escritório
    const config = {
        officeName: "BSC Advogados & Associados",
        location: "Palmas, Tocantins",
        specialty: "Direito Agrário & Agronegócio",
        workingHours: { start: "08:00", end: "18:00" }
    };

    // Banco de Dados de Usuários (Com as fotos e permissões)
    const users = {
        "IM": {
            id: "IM",
            full_name: "Iago Manguary",
            role: "Gestor Administrativo",
            avatar: "https://i.pravatar.cc/150?u=iago_manguary", // Substituir pelas fotos reais
            password: "123",
            permissions: ["all"],
            color: "#c5a059"
        },
        "GE": {
            id: "GE",
            full_name: "Geovana Alexassandra",
            role: "Advogada Sócia",
            avatar: "https://i.pravatar.cc/150?u=geovana_alex",
            password: "bsc_geovana",
            permissions: ["legal", "tasks"],
            color: "#3b82f6"
        },
        "AF": {
            id: "AF",
            full_name: "Abimael Francisco",
            role: "Advogado Sócio",
            avatar: "https://i.pravatar.cc/150?u=abimael_fran",
            password: "bsc_abimael",
            permissions: ["legal", "tasks"],
            color: "#10b981"
        },
        "FS": {
            id: "FS",
            full_name: "Felipe dos Santos",
            role: "Advogado Associado",
            avatar: "https://i.pravatar.cc/150?u=felipe_santos",
            password: "bsc_felipe",
            permissions: ["legal", "tasks"],
            color: "#8b5cf6"
        },
        "BSC_GERAL": {
            id: "BSC_GERAL",
            full_name: "ADMINISTRAÇÃO BSC",
            role: "Visão Master do Escritório",
            avatar: "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
            password: "", // Sem senha conforme solicitado
            permissions: ["all"],
            color: "#ffffff"
        }
    };

    // Banco de Dados de Tarefas Iniciais (Mock Data)
    // Aqui detalhei compromissos típicos do seu dia a dia (Agro, CPR, BNI)
    let tasks = [
        {
            id: "TASK-001",
            ownerId: "GE",
            title: "Audiência de Conciliação - Fazenda Boa Esperança",
            description: "Litígio de divisa de terras, processo 00213-45.",
            time: "09:30",
            date: "2026-02-11",
            status: "pendente",
            category: "Audiência",
            priority: "alta"
        },
        {
            id: "TASK-002",
            ownerId: "IM",
            title: "Revisão de Contrato CPR - Grupo Oilema",
            description: "Análise de garantias e cláusulas de entrega física.",
            time: "11:00",
            date: "2026-02-11",
            status: "iniciado",
            category: "Contratos",
            priority: "urgente"
        },
        {
            id: "TASK-003",
            ownerId: "AF",
            title: "Parecer Técnico: Regularização Fundiária",
            description: "Análise de matrícula no cartório de registro de imóveis.",
            time: "14:30",
            date: "2026-02-11",
            status: "pendente",
            category: "Jurídico",
            priority: "media"
        },
        {
            id: "TASK-004",
            ownerId: "FS",
            title: "Protocolo de Defesa Prévia - Caso Ambiental",
            description: "Multa do IBAMA sobre reserva legal.",
            time: "16:45",
            date: "2026-02-11",
            status: "atrasado",
            category: "Prazos",
            priority: "alta"
        },
        {
            id: "TASK-005",
            ownerId: "IM",
            title: "Azi Comunicação: Planejamento Marketing Agro",
            description: "Definição de cronograma de posts para o escritório.",
            time: "17:30",
            date: "2026-02-11",
            status: "pendente",
            category: "Marketing",
            priority: "media"
        }
    ];

    // Funções de Gerenciamento de Estado
    return {
        getUsers: () => users,
        getUserById: (id) => users[id],
        
        getTasks: (filterUserId = null) => {
            if (!filterUserId || filterUserId === "BSC_GERAL") return tasks;
            return tasks.filter(t => t.ownerId === filterUserId);
        },

        updateTaskOwner: (taskId, newOwnerId) => {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.ownerId = newOwnerId;
                console.log(`[DATA] Tarefa ${taskId} realocada para ${newOwnerId}`);
                return true;
            }
            return false;
        },

        updateTaskStatus: (taskId) => {
            const statusFlow = ["pendente", "iniciado", "atrasado", "concluido", "cancelado"];
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                let currentIdx = statusFlow.indexOf(task.status);
                task.status = statusFlow[(currentIdx + 1) % statusFlow.length];
                return task.status;
            }
        },

        addNewTask: (taskObj) => {
            const newId = `TASK-${Math.floor(Math.random() * 9000) + 1000}`;
            tasks.push({ id: newId, ...taskObj });
            return newId;
        },

        getOfficeConfig: () => config
    };
})();

console.log("Módulo de Dados BSC carregado com sucesso.");
