/**
 * BSC ADVOGADOS - ENTERPRISE RESOURCE PLANNING (ERP)
 * DATA MODULE v10.0.0 - "STRATEGOS"
 * Arquitetura de Camada Única de Dados (Single Source of Truth)
 */

class BSCDataEngine {
    constructor() {
        this.version = "10.0.0";
        this.lastSync = new Date().toISOString();
        
        // MAPEAMENTO HIERÁRQUICO INSTITUCIONAL
        this.organization = {
            socios: {
                "AF": { id: "AF", full_name: "Abimael Francisco", role: "Sócio Proprietário", avatar: "abimael.jpg", color: "#c5a059" },
                "PS": { id: "PS", full_name: "Pamella Sakumoto", role: "Sócia Proprietária", avatar: "pamella.jpg", color: "#c5a059" },
                "GB": { id: "GB", full_name: "Giovani Barcellos", role: "Sócio Proprietário", avatar: "giovani.jpg", color: "#c5a059" }
            },
            controladoria: {
                "IM": { id: "IM", full_name: "Iago Manguary", role: "Assessor & Controller Jurídico", avatar: "iago.jpg", color: "#ffffff" }
            },
            juridico: {
                "GE": { id: "GE", full_name: "Geovana Alexassandra", role: "Advogada Especialista", avatar: "geovana.jpg", color: "#9ca3af" },
                "FS": { id: "FS", full_name: "Felipe dos Santos", role: "Advogado Associado", avatar: "felipe.jpg", color: "#9ca3af" }
            }
        };

        // REGISTRO DE TAREFAS (Injeção Real do Calendário Fev/2026)
        this.masterRegistry = [
            { id: 2026001, day: 2, owner: "GE", time: "09:15", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", status: "pendente", category: "Judicial" },
            { id: 2026002, day: 2, owner: "AF", time: "16:30", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", status: "urgente", category: "Prazo" },
            { id: 2026003, day: 3, owner: "FS", time: "14:00", title: "Reunião - Souzamaas", status: "iniciado", category: "Reunião" },
            { id: 2026004, day: 3, owner: "GE", time: "15:30", title: "Defesa Prévia - TRANSPORTE BRAGA BORGES", status: "pendente", category: "Defesa" },
            { id: 2026005, day: 4, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "concluido", category: "Networking" },
            { id: 2026006, day: 4, owner: "IM", time: "09:30", title: "JK BUSINESS - Emissão de Boletos", status: "pendente", category: "Financeiro" },
            { id: 2026007, day: 4, owner: "IM", time: "Dia Inteiro", title: "Viagem LUÍS EDUARDO MAGALHÃES", status: "iniciado", category: "Institucional" },
            { id: 2026008, day: 4, owner: "AF", time: "08:30", title: "Redistribuir Processo - ZANINIZANINI x ALESSANDRO", status: "pendente", category: "Gestão" },
            { id: 2026009, day: 5, owner: "GB", time: "08:00", title: "Reunião RAFAEL ZANINI - LEM", status: "pendente", category: "Cliente" },
            { id: 2026010, day: 5, owner: "IM", time: "11:00", title: "BNI - Módulo de Treinamento", status: "concluido", category: "Networking" },
            { id: 2026011, day: 7, owner: "IM", time: "Dia Inteiro", title: "Dia de Campo - OILEMA", status: "concluido", category: "Agro" },
            { id: 2026012, day: 10, owner: "FS", time: "08:30", title: "Informar Dados Bancários - JESSICA YUMIKO", status: "iniciado", category: "Judicial" },
            { id: 2026013, day: 13, owner: "GE", time: "09:30", title: "Impugnar Cálculo - TAUILE x SANNA", status: "urgente", category: "Financeiro" },
            { id: 2026014, day: 24, owner: "GE", time: "Dia Inteiro", title: "Julgamento Recurso Inominado - Motz x NB", status: "pendente", category: "Pauta" }
        ];

        this.logs = [];
    }

    // MÉTODOS DE MANIPULAÇÃO DE ALTA DISPONIBILIDADE
    getTaskRegistry(day) {
        return this.masterRegistry.filter(task => task.day === day);
    }

    getOrganizationData() {
        return {
            socios: Object.values(this.organization.socios),
            controladoria: Object.values(this.organization.controladoria),
            juridico: Object.values(this.organization.juridico)
        };
    }

    getUser(id) {
        const flat = { ...this.organization.socios, ...this.organization.controladoria, ...this.organization.juridico };
        return flat[id] || null;
    }

    // Lógica para os próximos 800+ métodos aqui...
}

const BSC_DATA = new BSCDataEngine();
