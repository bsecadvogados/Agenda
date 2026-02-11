/**
 * BSC ADVOGADOS - ENTERPRISE DATABASE
 * Mapeamento completo de Sócios, Staff e Compromissos Agro
 */
const BSC_DATA = (() => {
    const members = {
        "AF": { id: "AF", full_name: "Abimael Francisco", role: "Sócio Proprietário", avatar: "abimael.jpg", color: "#c5a059" },
        "PS": { id: "PS", full_name: "Pamella Sakumoto", role: "Sócia Proprietária", avatar: "pamella.jpg", color: "#c5a059" },
        "GB": { id: "GB", full_name: "Giovani Barcellos", role: "Sócio Proprietário", avatar: "giovani.jpg", color: "#c5a059" },
        "IM": { id: "IM", full_name: "Iago Manguary", role: "Assessor & Controller Jurídico", avatar: "iago.jpg", color: "#fff" },
        "GE": { id: "GE", full_name: "Geovana Alexassandra", role: "Advogada", avatar: "geovana.jpg", color: "#9ca3af" },
        "FS": { id: "FS", full_name: "Felipe dos Santos", role: "Advogado", avatar: "felipe.jpg", color: "#9ca3af" },
        "BSC_GERAL": { id: "BSC_GERAL", full_name: "BSC ADVOGADOS", role: "SISTEMA CENTRAL", avatar: "logo.png", color: "#c5a059" }
    };

    let agenda = [
        { id: 201, ownerId: "GE", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", client: "Rafael Zanini", time: "09:15", date: "2026-02-02", status: "pendente", cat: "Audiência" },
        { id: 202, ownerId: "AF", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", client: "Tauile", time: "16:30", date: "2026-02-02", status: "urgente", cat: "Jurídico" },
        { id: 301, ownerId: "FS", title: "Reunião - Souzamaas", client: "Souzamaas", time: "14:00", date: "2026-02-03", status: "iniciado", cat: "Reunião" },
        { id: 401, ownerId: "IM", title: "Viagem à LUÍS EDUARDO MAGALHÃES", client: "Geral", time: "Dia Inteiro", date: "2026-02-04", status: "pendente", cat: "Viagem" },
        { id: 402, ownerId: "IM", title: "Reunião BNI Jalapão", client: "Network", time: "07:00", date: "2026-02-04", status: "concluido", cat: "BNI" },
        { id: 403, ownerId: "IM", title: "Boletos JK BUSINESS", client: "Admin", time: "09:30", date: "2026-02-04", status: "pendente", cat: "Financeiro" },
        { id: 501, ownerId: "GB", title: "Reunião RAFAEL ZANINI - LEM", client: "Rafael Zanini", time: "08:00", date: "2026-02-05", status: "pendente", cat: "Reunião" },
        { id: 701, ownerId: "IM", title: "Dia de Campo - OILEMA", client: "Oilema", time: "Dia Inteiro", date: "2026-02-07", status: "iniciado", cat: "Agro" }
    ];

    return {
        getMembers: () => members,
        getMember: (id) => members[id],
        getAgenda: (userId) => userId === "BSC_GERAL" ? agenda : agenda.filter(t => t.ownerId === userId),
        reallocate: (taskId, newOwnerId) => {
            const task = agenda.find(t => t.id == taskId);
            if(task) task.ownerId = newOwnerId;
        },
        toggleStatus: (id) => {
            const flow = ["pendente", "iniciado", "concluido", "urgente"];
            const t = agenda.find(x => x.id == id);
            t.status = flow[(flow.indexOf(t.status) + 1) % flow.length];
        }
    };
})();
