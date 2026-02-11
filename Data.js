/**
 * BSC ADVOGADOS - DATA CORE SYSTEM
 * Versão: 12.5.0 (Enterprise)
 * Responsável: Iago Manguary (Controller)
 * * Este módulo atua como a "Single Source of Truth" (Fonte Única da Verdade)
 * para toda a aplicação. Nenhuma outra parte do código deve conter dados hardcoded.
 */

class BSCRepository {
    constructor() {
        this.appName = "Strategos ERP";
        
        // ==========================================
        // 1. MAPEAMENTO DE PESSOAL (HIERARQUIA)
        // ==========================================
        this.personnel = {
            // Sócios (Nível 1)
            AF: {
                id: "AF",
                name: "Abimael Francisco",
                role: "Sócio Proprietário",
                email: "abimael@bscadvogados.com.br",
                avatar: "abimael.jpg",
                type: "partner",
                initials: "AF"
            },
            PS: {
                id: "PS",
                name: "Pamella Sakumoto",
                role: "Sócia Proprietária",
                email: "pamella@bscadvogados.com.br",
                avatar: "pamella.jpg",
                type: "partner",
                initials: "PS"
            },
            GB: {
                id: "GB",
                name: "Giovani Barcellos",
                role: "Sócio Proprietário",
                email: "giovani@bscadvogados.com.br",
                avatar: "giovani.jpg",
                type: "partner",
                initials: "GB"
            },
            
            // Gestão (Nível 2)
            IM: {
                id: "IM",
                name: "Iago Manguary",
                role: "Controller & Assessor Jurídico",
                email: "iago@bscadvogados.com.br",
                avatar: "iago.jpg",
                type: "staff",
                initials: "IM"
            },

            // Jurídico (Nível 3)
            GE: {
                id: "GE",
                name: "Geovana Alexassandra",
                role: "Advogada",
                email: "geovana@bscadvogados.com.br",
                avatar: "geovana.jpg",
                type: "staff",
                initials: "GE"
            },
            FS: {
                id: "FS",
                name: "Felipe dos Santos",
                role: "Advogado",
                email: "felipe@bscadvogados.com.br",
                avatar: "felipe.jpg",
                type: "staff",
                initials: "FS"
            },
            
            // Usuário Mestre
            ADMIN: {
                id: "ADMIN",
                name: "BSC ADMINISTRAÇÃO",
                role: "Acesso Mestre",
                email: "admin@bsc.com",
                avatar: "logo.png",
                type: "system",
                initials: "BSC"
            }
        };

        // ==========================================
        // 2. AGENDA DE FEVEREIRO 2026 (REAL DATA)
        // ==========================================
        // Mapeamento exato da imagem fornecida
        this.calendarData = [
            // SEGUNDA-FEIRA, DIA 02
            { 
                id: 101, 
                day: 2, 
                time: "09:15", 
                title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", 
                owner: "GE", 
                status: "pendente",
                priority: "high"
            },
            { 
                id: 102, 
                day: 2, 
                time: "16:30", 
                title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", 
                owner: "AF", 
                status: "urgente",
                priority: "critical"
            },

            // TERÇA-FEIRA, DIA 03
            { 
                id: 103, 
                day: 3, 
                time: "14:00", 
                title: "Reunião - Souzamaas", 
                owner: "FS", 
                status: "iniciado",
                priority: "medium"
            },
            { 
                id: 104, 
                day: 3, 
                time: "15:30", 
                title: "Realização de Defesa Prévia - TRANSPORTE BRAGA BORGES", 
                owner: "GE", 
                status: "pendente",
                priority: "high"
            },

            // QUARTA-FEIRA, DIA 04
            { 
                id: 105, 
                day: 4, 
                time: "Dia Inteiro", 
                title: "Viagem à LUÍS EDUARDO MAGALHÃES", 
                owner: "IM", 
                status: "iniciado",
                priority: "critical"
            },
            { 
                id: 106, 
                day: 4, 
                time: "07:00", 
                title: "Reunião BNI Jalapão", 
                owner: "IM", 
                status: "concluido",
                priority: "medium"
            },
            { 
                id: 107, 
                day: 4, 
                time: "08:30", 
                title: "Redistribuir Processo - ZANINIZANINI x ALESSANDRO", 
                owner: "AF", 
                status: "pendente",
                priority: "medium"
            },
            { 
                id: 108, 
                day: 4, 
                time: "09:30", 
                title: "Atualização Cadastral e Boletos - JK BUSINESS", 
                owner: "IM", 
                status: "pendente",
                priority: "medium"
            },

            // QUINTA-FEIRA, DIA 05
            { 
                id: 109, 
                day: 5, 
                time: "08:00", 
                title: "Reunião RAFAEL ZANINI - LEM", 
                owner: "GB", 
                status: "pendente",
                priority: "high"
            },
            { 
                id: 110, 
                day: 5, 
                time: "11:00", 
                title: "Módulo - BNI Jalapão", 
                owner: "IM", 
                status: "concluido",
                priority: "low"
            },

            // SEXTA-FEIRA, DIA 06
            { 
                id: 111, 
                day: 6, 
                time: "Dia Inteiro", 
                title: "Inauguração - Escritório AUBE", 
                owner: "IM", 
                status: "pendente",
                priority: "medium"
            },

            // SÁBADO, DIA 07
            { 
                id: 112, 
                day: 7, 
                time: "Dia Inteiro", 
                title: "Dia de Campo - OILEMA", 
                owner: "IM", 
                status: "concluido",
                priority: "critical"
            },

            // SEMANA 2 - TERÇA DIA 10
            { 
                id: 201, 
                day: 10, 
                time: "08:30", 
                title: "Informar dados bancários - JESSICA YUMIKO", 
                owner: "FS", 
                status: "iniciado",
                priority: "low"
            },
            
            // SEMANA 2 - SEXTA DIA 13
             { 
                id: 202, 
                day: 13, 
                time: "09:30", 
                title: "Impugnar Cálculo - TAUILE x SANNA", 
                owner: "GE", 
                status: "urgente",
                priority: "critical"
            },

            // SEMANA 4 - TERÇA DIA 24
            { 
                id: 401, 
                day: 24, 
                time: "Dia Inteiro", 
                title: "Julgamento RECURSO INOMINADO - Motz x NB", 
                owner: "GE", 
                status: "pendente",
                priority: "critical"
            }
        ];
    }

    /**
     * Retorna lista de usuários para preencher o Select de Login
     */
    getUsersList() {
        return Object.values(this.personnel).sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Busca um usuário pelo ID
     */
    getUserById(id) {
        return this.personnel[id] || null;
    }

    /**
     * Retorna tarefas filtradas por dia
     */
    getTasksByDay(day) {
        return this.calendarData.filter(t => t.day === day);
    }

    /**
     * Retorna tarefas filtradas por dono (para visão individual)
     */
    getTasksByOwner(ownerId) {
        return this.calendarData.filter(t => t.owner === ownerId);
    }
}

// Instância Global
const DataCore = new BSCRepository();
