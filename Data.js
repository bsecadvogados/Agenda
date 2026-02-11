/**
 * BSC ADVOGADOS - DATABASE LAYER (v3.0.0)
 * Totalmente mapeado com o Calendário de Fevereiro/2026
 */

const BSC_DATA = (() => {
    // Configurações de Escritório
    const officeMetadata = {
        unit: "Palmas - TO",
        specialization: "Direito Agrário & Business",
        year: 2026
    };

    // Mapeamento Completo de Usuários e Fotos
    const users = {
        "IM": { id: "IM", full_name: "Iago Manguary", role: "Gestor Administrativo", avatar: "iago.jpg", password: "123" },
        "GE": { id: "GE", full_name: "Geovana Alexassandra", role: "Advogada Sócia", avatar: "geovana.jpg", password: "bsc1" },
        "AF": { id: "AF", full_name: "Abimael Francisco", role: "Advogado Sócio", avatar: "abimael.jpg", password: "bsc2" },
        "FS": { id: "FS", full_name: "Felipe dos Santos", role: "Advogado Associado", avatar: "felipe.jpg", password: "bsc3" },
        "BSC_GERAL": { id: "BSC_GERAL", full_name: "ADMINISTRAÇÃO", role: "Visão Master", avatar: "logo.png", password: "" }
    };

    /**
     * INJEÇÃO DE DADOS REAIS - CALENDÁRIO FEVEREIRO 2026
     * Cada objeto representa um compromisso real da imagem enviada.
     */
    let tasks = [
        // SEGUNDA - 02/02
        { id: "T202", ownerId: "GE", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", time: "09:15", date: "2026-02-02", status: "pendente", category: "Audiência", priority: "alta" },
        { id: "T203", ownerId: "AF", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", time: "16:30", date: "2026-02-02", status: "pendente", category: "Jurídico", priority: "urgente" },
        
        // TERÇA - 03/02
        { id: "T301", ownerId: "FS", title: "Reunião - Souzamaas", time: "14:00", date: "2026-02-03", status: "iniciado", category: "Reunião", priority: "media" },
        { id: "T302", ownerId: "GE", title: "Realização de Defesa Prévia - TRANSPORTE BRAGA BORGES", time: "15:30", date: "2026-02-03", status: "pendente", category: "Jurídico", priority: "alta" },

        // QUARTA - 04/02 (Dia Carregado)
        { id: "T401", ownerId: "IM", title: "Viagem à LUÍS EDUARDO MAGALHÃES", time: "Dia Inteiro", date: "2026-02-04", status: "pendente", category: "Viagem", priority: "urgente" },
        { id: "T402", ownerId: "AF", title: "Redistribuir Processo - ZANINIZANINI x ALESSANDRO", time: "08:30", date: "2026-02-04", status: "concluido", category: "Gestão", priority: "baixa" },
        { id: "T403", ownerId: "IM", title: "Reunião BNI Jalapão", time: "07:00", date: "2026-02-04", status: "concluido", category: "Networking", priority: "alta" },
        { id: "T404", ownerId: "IM", title: "Atualização Cadastral/Boletos - JK BUSINESS", time: "09:30", date: "2026-02-04", status: "pendente", category: "Financeiro", priority: "media" },

        // QUINTA - 05/02
        { id: "T501", ownerId: "GE", title: "Reunião RAFAEL ZANINI - LEM", time: "08:00", date: "2026-02-05", status: "pendente", category: "Reunião", priority: "alta" },
        { id: "T502", ownerId: "IM", title: "Módulo - BNI Jalapão", time: "11:00", date: "2026-02-05", status: "pendente", category: "Capacitação", priority: "media" },
        { id: "T503", ownerId: "AF", title: "Notificação Extrajudicial - Rafael Zanini x DR MATHEUS", time: "15:30", date: "2026-02-05", status: "pendente", category: "Jurídico", priority: "alta" },

        // SEXTA - 06/02
        { id: "T601", ownerId: "IM", title: "Inauguração - Escritório AUBE", time: "Dia Inteiro", date: "2026-02-06", status: "pendente", category: "Evento", priority: "media" },
        { id: "T602", ownerId: "FS", title: "Informar Novo Endereço - ZANINI x ANTONIO CARLOS", time: "08:30", date: "2026-02-06", status: "pendente", category: "Administrativo", priority: "baixa" },

        // SÁBADO - 07/02
        { id: "T701", ownerId: "IM", title: "Dia de Campo - OILEMA", time: "Dia Inteiro", date: "2026-02-07", status: "pendente", category: "Agro", priority: "alta" }
    ];

    // Lógica Sênior para Manipulação de Estado
    return {
        getUsers: () => users,
        getUserById: (id) => users[id],
        getTasks: (userId) => (userId === "BSC_GERAL" ? tasks : tasks.filter(t => t.ownerId === userId)),
        
        // FUNÇÃO DE REALOCAÇÃO (A que você pediu para os Drs)
        updateTaskOwner: (taskId, newOwnerId) => {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.ownerId = newOwnerId;
                return true;
            }
            return false;
        },

        // Função para expandir o código (adicionando métodos de busca)
        searchTasksByQuery: (query) => {
            return tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
        },

        overrideTasks: (newTasks) => { tasks = newTasks; }
    };
})();
