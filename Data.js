/**
 * BSC DATA CORE - v16.0 (Stable)
 * Fonte de Dados Mestra
 */

const DataCore = (() => {
    
    // 1. DADOS DA EQUIPE
    const team = {
        partners: [
            { id: "AF", name: "Abimael Francisco", role: "Sócio Proprietário", avatar: "abimael.jpg", department: "Agro/Cível" },
            { id: "PS", name: "Pamella Sakumoto", role: "Sócia Proprietária", avatar: "pamella.jpg", department: "Empresarial" },
            { id: "GB", name: "Giovani Barcellos", role: "Sócio Proprietário", avatar: "giovani.jpg", department: "Ambiental" }
        ],
        staff: [
            { id: "IM", name: "Iago Manguary", role: "Controller Jurídico", avatar: "iago.jpg", department: "Controladoria" },
            { id: "GE", name: "Geovana Alexassandra", role: "Advogada", avatar: "geovana.jpg", department: "Contencioso" },
            { id: "FS", name: "Felipe dos Santos", role: "Advogado", avatar: "felipe.jpg", department: "Execuções" }
        ],
        admin: { id: "BSC_GERAL", name: "Administração", role: "Acesso Master", avatar: "logo.png" }
    };

    // 2. TAREFAS DE FEVEREIRO 2026 (Transcrição da Imagem)
    const tasks = [
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
        { day: 4, owner: "GE", time: "12:30", title: "Encontro Tauile de Alcântara", status: "pendente" },

        // Quinta 05
        { day: 5, owner: "GB", time: "08:00", title: "Reunião RAFAEL ZANINI - LEM", status: "pendente" },
        { day: 5, owner: "IM", time: "11:00", title: "BNI - Módulo Treinamento", status: "concluido" },
        { day: 5, owner: "AF", time: "11:30", title: "Notif. Extrajudicial - Rafael Zanini", status: "urgente" },
        { day: 5, owner: "PS", time: "11:45", title: "Ligação Tabelionato Koerner", status: "pendente" },

        // Sexta 06
        { day: 6, owner: "IM", time: "Dia Inteiro", title: "Inauguração Escritório AUBE", status: "pendente" },
        { day: 6, owner: "FS", time: "08:30", title: "Informar Endereço - ZANINI", status: "pendente" },

        // Sábado 07
        { day: 7, owner: "IM", time: "Dia Inteiro", title: "Dia de Campo - OILEMA", status: "concluido" },

        // Terça 10
        { day: 10, owner: "FS", time: "08:30", title: "Dados Bancários - JESSICA YUMIKO", status: "iniciado" },
        { day: 10, owner: "AF", time: "17:30", title: "Petição Correção MLE - Jessica", status: "urgente" },
        { day: 10, owner: "GE", time: "11:30", title: "Juntar Custas - ZANINI", status: "pendente" },

        // Sexta 13
        { day: 13, owner: "GE", time: "09:30", title: "Impugnar Cálculo - TAUILE x SANNA", status: "urgente" },

        // Quarta 18
        { day: 18, owner: "AF", time: "08:30", title: "Agravo Instrumento - MURATA", status: "pendente" },

        // Terça 24
        { day: 24, owner: "GE", time: "Dia Inteiro", title: "Julgamento Recurso - Motz x NB", status: "pendente" }
    ];

    // Interfaces Públicas
    return {
        getAllUsers: () => [...team.partners, ...team.staff, team.admin],
        getUserById: (id) => [...team.partners, ...team.staff, team.admin].find(u => u.id === id),
        getTeam: () => team,
        getTasksByDay: (day) => tasks.filter(t => t.day === day)
    };
})();
