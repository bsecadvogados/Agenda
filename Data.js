/**
 * BSC DATA CORE v14.0
 * Fonte da Verdade do Sistema
 */

const Database = (() => {
    
    // 1. ORGANIZAÇÃO (HIERARQUIA)
    const team = {
        partners: [
            { id: "AF", name: "Abimael Francisco", role: "Sócio Proprietário", avatar: "abimael.jpg" },
            { id: "PS", name: "Pamella Sakumoto", role: "Sócia Proprietária", avatar: "pamella.jpg" },
            { id: "GB", name: "Giovani Barcellos", role: "Sócio Proprietário", avatar: "giovani.jpg" }
        ],
        staff: [
            { id: "IM", name: "Iago Manguary", role: "Controller Jurídico", avatar: "iago.jpg" },
            { id: "GE", name: "Geovana Alexassandra", role: "Advogada", avatar: "geovana.jpg" },
            { id: "FS", name: "Felipe dos Santos", role: "Advogado", avatar: "felipe.jpg" }
        ],
        admin: { id: "BSC_GERAL", name: "BSC Administração", role: "Acesso Master", avatar: "logo.png" }
    };

    // 2. CALENDÁRIO REAL (FEV 2026)
    // Mapeado da imagem: image_a88bf3.png
    const registry = [
        // Segunda 02
        { day: 2, owner: "GE", time: "09:15", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", status: "pendente" },
        { day: 2, owner: "AF", time: "16:30", title: "Impugnar Sentença - TAUILE x SANNA", status: "urgente" },
        
        // Terça 03
        { day: 3, owner: "FS", time: "14:00", title: "Reunião - Souzamaas", status: "iniciado" },
        { day: 3, owner: "GE", time: "15:30", title: "Defesa Prévia - BRAGA BORGES", status: "pendente" },

        // Quarta 04
        { day: 4, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "concluido" },
        { day: 4, owner: "IM", time: "09:30", title: "Emissão de Boletos - JK BUSINESS", status: "pendente" },
        { day: 4, owner: "IM", time: "Dia Inteiro", title: "Viagem LUÍS EDUARDO MAGALHÃES", status: "iniciado" },
        { day: 4, owner: "AF", time: "08:30", title: "Redistribuir Proc. - ZANINI x ALESSANDRO", status: "pendente" },

        // Quinta 05
        { day: 5, owner: "GB", time: "08:00", title: "Reunião RAFAEL ZANINI - LEM", status: "pendente" },
        { day: 5, owner: "IM", time: "11:00", title: "BNI - Módulo Treinamento", status: "concluido" },
        { day: 5, owner: "AF", time: "15:30", title: "Notif. Extrajudicial - Rafael Zanini", status: "urgente" },

        // Sexta 06
        { day: 6, owner: "IM", time: "Dia Inteiro", title: "Inauguração Escritório AUBE", status: "pendente" },
        { day: 6, owner: "FS", time: "08:30", title: "Informar Endereço - ZANINI", status: "pendente" },

        // Sábado 07
        { day: 7, owner: "IM", time: "Dia Inteiro", title: "Dia de Campo - OILEMA", status: "concluido" },

        // Semana 2
        { day: 9, owner: "GE", time: "09:00", title: "Reunião - FABIANO MIGOTO", status: "pendente" },
        { day: 10, owner: "FS", time: "08:30", title: "Dados Bancários - JESSICA YUMIKO", status: "iniciado" },
        { day: 10, owner: "GE", time: "11:30", title: "Juntar Custas - ZANINI", status: "pendente" },
        { day: 13, owner: "GE", time: "09:30", title: "Impugnar Cálculo - TAUILE x SANNA", status: "urgente" },
        
        // Semana 4
        { day: 24, owner: "GE", time: "Dia Inteiro", title: "Julgamento Recurso - Motz x NB", status: "pendente" }
    ];

    return {
        getTeam: () => team,
        getAllUsers: () => [...team.partners, ...team.staff, team.admin],
        getUserById: (id) => {
            const all = [...team.partners, ...team.staff, team.admin];
            return all.find(u => u.id === id);
        },
        getTasksByDay: (day) => registry.filter(t => t.day === day)
    };
})();
