/**
 * BSC ADVOGADOS - DATA ENGINE v3.0.0
 * Gerenciamento centralizado de usuários, tarefas e metadados jurídicos.
 */

const BSC_DATA = (() => {
    
    // DEFINIÇÃO DA HIERARQUIA INSTITUCIONAL
    const users = {
        "AF": { 
            id: "AF", 
            full_name: "Abimael Francisco", 
            role: "Sócio Proprietário", 
            avatar: "abimael.jpg", 
            password: "123",
            level: 1 
        },
        "PS": { 
            id: "PS", 
            full_name: "Pamella Sakumoto", 
            role: "Sócia Proprietária", 
            avatar: "pamella.jpg", 
            password: "123",
            level: 1 
        },
        "GB": { 
            id: "GB", 
            full_name: "Giovani Barcellos", 
            role: "Sócio Proprietário", 
            avatar: "giovani.jpg", 
            password: "123",
            level: 1 
        },
        "IM": { 
            id: "IM", 
            full_name: "Iago Manguary", 
            role: "Assessor & Controller Jurídico", 
            avatar: "iago.jpg", 
            password: "123",
            level: 2 
        },
        "GE": { 
            id: "GE", 
            full_name: "Geovana Alexassandra", 
            role: "Advogada", 
            avatar: "geovana.jpg", 
            password: "123",
            level: 3 
        },
        "FS": { 
            id: "FS", 
            full_name: "Felipe dos Santos", 
            role: "Advogado", 
            avatar: "felipe.jpg", 
            password: "123",
            level: 3 
        },
        "BSC_GERAL": { 
            id: "BSC_GERAL", 
            full_name: "ADMINISTRAÇÃO BSC", 
            role: "Gestão Central Master", 
            avatar: "logo.png", 
            password: "", 
            level: 0 
        }
    };

    // BASE DE DADOS DE COMPROMISSOS - FEVEREIRO 2026
    let agenda = [
        // SEMANA 1
        { id: 101, ownerId: "GE", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", client: "Rafael Zanini", time: "09:15", date: "2026-02-02", status: "pendente", cat: "Audiência" },
        { id: 102, ownerId: "AF", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", client: "Tauile", time: "16:30", date: "2026-02-02", status: "urgente", cat: "Jurídico" },
        { id: 103, ownerId: "IM", title: "Reunião - Souzamaas", client: "Souzamaas", time: "14:00", date: "2026-02-03", status: "iniciado", cat: "Reunião" },
        { id: 104, ownerId: "GE", title: "Realização de Defesa Prévia - TRANSPORTE BRAGA BORGES", client: "Braga Borges", time: "15:30", date: "2026-02-03", status: "pendente", cat: "Jurídico" },
        { id: 105, ownerId: "IM", title: "Viagem à LUÍS EDUARDO MAGALHÃES", client: "Institucional", time: "Dia Inteiro", date: "2026-02-04", status: "pendente", cat: "Viagem" },
        { id: 106, ownerId: "IM", title: "Reunião BNI Jalapão", client: "BNI", time: "07:00", date: "2026-02-04", status: "concluido", cat: "Networking" },
        { id: 107, ownerId: "IM", title: "Atualização Cadastral/Boletos - JK BUSINESS", client: "JK Business", time: "09:30", date: "2026-02-04", status: "pendente", cat: "Financeiro" },
        { id: 108, ownerId: "AF", title: "Redistribuir Processo - ZANINIZANINI x ALESSANDRO", client: "Zanini", time: "08:30", date: "2026-02-04", status: "iniciado", cat: "Gestão" },
        { id: 109, ownerId: "GB", title: "Reunião RAFAEL ZANINI - LEM", client: "Rafael Zanini", time: "08:00", date: "2026-02-05", status: "pendente", cat: "Reunião" },
        { id: 110, ownerId: "IM", title: "Módulo - BNI Jalapão", client: "BNI", time: "11:00", date: "2026-02-05", status: "pendente", cat: "Networking" },
        { id: 111, ownerId: "AF", title: "Notificação Extrajudicial - Rafael Zanini x DR MATHEUS", client: "Zanini", time: "15:30", date: "2026-02-05", status: "urgente", cat: "Jurídico" },
        { id: 112, ownerId: "IM", title: "Inauguração - Escritório AUBE", client: "Aube", time: "Dia Inteiro", date: "2026-02-06", status: "pendente", cat: "Evento" },
        { id: 113, ownerId: "FS", title: "Informar Novo Endereço - ZANINI x ANTONIO CARLOS", client: "Zanini", time: "08:30", date: "2026-02-06", status: "pendente", cat: "Administrativo" },
        { id: 114, ownerId: "IM", title: "Dia de Campo - OILEMA", client: "Oilema", time: "Dia Inteiro", date: "2026-02-07", status: "pendente", cat: "Agro" },
        
        // SEMANA 2
        { id: 201, ownerId: "GE", title: "Reunião - FABIANO MIGOTO", client: "Fabiano Migoto", time: "09:00", date: "2026-02-09", status: "pendente", cat: "Reunião" },
        { id: 202, ownerId: "PS", title: "Reunião - FABIANO MIGOTO x VINICIUS", client: "Migoto", time: "11:00", date: "2026-02-09", status: "pendente", cat: "Reunião" },
        { id: 203, ownerId: "FS", title: "Informar dados bancários - JESSICA YUMIKO x HELENISE", client: "Jessica", time: "08:30", date: "2026-02-10", status: "iniciado", cat: "Jurídico" },
        { id: 204, ownerId: "GE", title: "Juntar Custas e Comprovante - ZANINI x ALESSANDRO", client: "Zanini", time: "11:30", date: "2026-02-10", status: "pendente", cat: "Prazo" },
        { id: 205, ownerId: "AF", title: "Petição de Correção de Formulário MLE", client: "Jessica", time: "17:30", date: "2026-02-10", status: "urgente", cat: "Jurídico" },
        { id: 206, ownerId: "IM", title: "Reunião BNI Jalapão", client: "BNI", time: "07:00", date: "2026-02-11", status: "pendente", cat: "Networking" },
        { id: 207, ownerId: "GE", title: "Mentoria BNI - Módulo 3", client: "BNI", time: "17:00", date: "2026-02-11", status: "pendente", cat: "Networking" },
        { id: 208, ownerId: "AF", title: "Prosseguimento indicando diligências - JAIME x JANETE", client: "Jaime", time: "08:30", date: "2026-02-12", status: "pendente", cat: "Jurídico" },
        { id: 209, ownerId: "FS", title: "Contrarrazões - ANTONIO CAMELO x MGP MATERIAL", client: "Camelo", time: "08:30", date: "2026-02-13", status: "pendente", cat: "Jurídico" },
        { id: 210, ownerId: "GE", title: "Impugnar Cálculo - TAUILE x SANNA", client: "Tauile", time: "09:30", date: "2026-02-13", status: "urgente", cat: "Jurídico" },

        // SEMANA 3
        { id: 301, ownerId: "AF", title: "Agravo de Instrumento - MURATA x MUNICIPIO LEM", client: "Murata", time: "08:30", date: "2026-02-18", status: "pendente", cat: "Jurídico" },
        { id: 302, ownerId: "IM", title: "Reunião BNI Jalapão", client: "BNI", time: "07:00", date: "2026-02-18", status: "pendente", cat: "Networking" },

        // SEMANA 4
        { id: 401, ownerId: "GE", title: "Julgamento RECURSO INOMINADO - Motz x NB Transporte", client: "Motz", time: "Dia Inteiro", date: "2026-02-24", status: "pendente", cat: "Audiência" },
        { id: 402, ownerId: "IM", title: "Reunião BNI Jalapão", client: "BNI", time: "07:00", date: "2026-02-25", status: "pendente", cat: "Networking" }
    ];

    /**
     * FUNÇÕES DE MANIPULAÇÃO DE ESTADO JURÍDICO
     */
    return {
        // Recurso: Recupera todos os perfis do escritório
        getUsers: () => users,
        
        // Recurso: Recupera perfil específico
        getUser: (id) => {
            if (!users[id]) console.warn(`[DATA] Usuário ${id} não localizado no sistema.`);
            return users[id];
        },
        
        // Recurso: Recupera agenda baseada no nível de acesso
        getAgenda: (userId) => {
            console.log(`[DATA] Sincronizando agenda para perfil: ${userId}`);
            if (userId === "BSC_GERAL") return agenda;
            return agenda.filter(task => task.ownerId === userId);
        },
        
        // Recurso: Realocação de responsável (Drag and Drop)
        reallocateTask: (taskId, newOwnerId) => {
            const index = agenda.findIndex(t => t.id == taskId);
            if (index !== -1) {
                const oldOwner = agenda[index].ownerId;
                agenda[index].ownerId = newOwnerId;
                console.log(`[DATA] Tarefa ${taskId} transferida: ${oldOwner} -> ${newOwnerId}`);
                return true;
            }
            return false;
        },
        
        // Recurso: Alteração de status circular
        cycleTaskStatus: (taskId) => {
            const flow = ["pendente", "iniciado", "concluido", "urgente"];
            const index = agenda.findIndex(t => t.id == taskId);
            if (index !== -1) {
                let currentIdx = flow.indexOf(agenda[index].status);
                agenda[index].status = flow[(currentIdx + 1) % flow.length];
                return agenda[index].status;
            }
            return null;
        },

        // Recurso: Busca inteligente
        search: (query, userId) => {
            const base = userId === "BSC_GERAL" ? agenda : agenda.filter(t => t.ownerId === userId);
            const q = query.toLowerCase();
            return base.filter(t => 
                t.title.toLowerCase().includes(q) || 
                t.client.toLowerCase().includes(q) || 
                t.cat.toLowerCase().includes(q)
            );
        }
    };
})();
