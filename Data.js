/**
 * DATA MODULE - BSC ADVOGADOS
 * Injeção de dados reais do Calendário de Fevereiro/2026
 */
const BSC_DATA = (() => {
    // Configurações de Usuários
    const users = {
        "IM": { id: "IM", full_name: "Iago Manguary", role: "Gestor Administrativo", avatar: "iago.jpg", password: "123" },
        "GE": { id: "GE", full_name: "Geovana Alexassandra", role: "Advogada Sócia", avatar: "geovana.jpg", password: "123" },
        "AF": { id: "AF", full_name: "Abimael Francisco", role: "Advogado Sócio", avatar: "abimael.jpg", password: "123" },
        "BSC_GERAL": { id: "BSC_GERAL", full_name: "ADMINISTRAÇÃO BSC", role: "Visão Geral Master", avatar: "logo.png", password: "" }
    };

    // Tarefas baseadas na imagem image_a88bf3.png
    let tasks = [
        { id: 101, ownerId: "GE", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", time: "09:15", date: "2026-02-02", status: "pendente", category: "Audiência" },
        { id: 102, ownerId: "AF", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", time: "16:30", date: "2026-02-02", status: "pendente", category: "Jurídico" },
        { id: 103, ownerId: "IM", title: "Reunião - Souzamaas", time: "14:00", date: "2026-02-03", status: "iniciado", category: "Reunião" },
        { id: 104, ownerId: "GE", title: "Defesa Prévia - TRANSPORTE BRAGA BORGES", time: "15:30", date: "2026-02-03", status: "pendente", category: "Jurídico" },
        { id: 105, ownerId: "IM", title: "Viagem à LUÍS EDUARDO MAGALHÃES", time: "Dia Inteiro", date: "2026-02-04", status: "pendente", category: "Agro" },
        { id: 106, ownerId: "IM", title: "Reunião BNI Jalapão", time: "07:00", date: "2026-02-04", status: "concluido", category: "Networking" },
        { id: 107, ownerId: "IM", title: "Atualização Cadastral/Boletos - JK BUSINESS", time: "09:30", date: "2026-02-04", status: "pendente", category: "Financeiro" },
        { id: 108, ownerId: "GE", title: "Reunião RAFAEL ZANINI - LEM", time: "08:00", date: "2026-02-05", status: "pendente", category: "Reunião" },
        { id: 109, ownerId: "IM", title: "Módulo - BNI Jalapão", time: "11:00", date: "2026-02-05", status: "pendente", category: "Networking" },
        { id: 110, ownerId: "IM", title: "Inauguração - Escritório AUBE", time: "08:30", date: "2026-02-06", status: "pendente", category: "Evento" },
        { id: 111, ownerId: "IM", title: "Dia de Campo - OILEMA", time: "Dia Inteiro", date: "2026-02-07", status: "pendente", category: "Agro" }
    ];

    return {
        getUsers: () => users,
        getUserById: (id) => users[id],
        getTasks: (id) => id === "BSC_GERAL" ? tasks : tasks.filter(t => t.ownerId === id),
        updateTaskOwner: (taskId, newOwner) => {
            const task = tasks.find(t => t.id == taskId);
            if(task) task.ownerId = newOwner;
        },
        toggleStatus: (taskId) => {
            const flow = ["pendente", "iniciado", "concluido", "atrasado"];
            const task = tasks.find(t => t.id == taskId);
            if(task) task.status = flow[(flow.indexOf(task.status) + 1) % flow.length];
        }
    };
})();
