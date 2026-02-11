/**
 * BSC ADVOGADOS - DATA ENGINE CORE
 * Versão: 15.0 Enterprise
 * Responsabilidade: Armazenamento e Manipulação de Dados Estratégicos
 */

class Repository {
    constructor() {
        this.appName = "Strategos ERP";
        this.version = "15.0";

        // 1. DADOS DE USUÁRIOS (HIERARQUIA)
        this.users = {
            // Sócios Proprietários
            partners: [
                { id: "AF", name: "Abimael Francisco", role: "Sócio Proprietário", avatar: "abimael.jpg", department: "Agro" },
                { id: "PS", name: "Pamella Sakumoto", role: "Sócia Proprietária", avatar: "pamella.jpg", department: "Cível" },
                { id: "GB", name: "Giovani Barcellos", role: "Sócio Proprietário", avatar: "giovani.jpg", department: "Ambiental" }
            ],
            // Staff Jurídico e Controladoria
            staff: [
                { id: "IM", name: "Iago Manguary", role: "Controller Jurídico", avatar: "iago.jpg", department: "Controladoria" },
                { id: "GE", name: "Geovana Alexassandra", role: "Advogada", avatar: "geovana.jpg", department: "Jurídico" },
                { id: "FS", name: "Felipe dos Santos", role: "Advogado", avatar: "felipe.jpg", department: "Jurídico" }
            ],
            // Administração Central
            admin: { id: "BSC_GERAL", name: "Administração BSC", role: "Acesso Master", avatar: "logo.png", department: "Geral" }
        };

        // 2. REGISTRO DE TAREFAS (BASEADO NA IMAGEM DE FEVEREIRO 2026)
        // Mapeamento dia a dia conforme imagem image_a88bf3.png
        this.calendarTasks = [
            // SEGUNDA-FEIRA, DIA 02
            { day: 2, owner: "GE", time: "09:15", title: "Audiência Conciliação - Rafael Zanini x Antonio Mendes", status: "pendente", type: "hearing" },
            { day: 2, owner: "AF", time: "16:30", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", status: "urgente", type: "deadline" },

            // TERÇA-FEIRA, DIA 03
            { day: 3, owner: "FS", time: "14:00", title: "Reunião - Souzamaas", status: "iniciado", type: "meeting" },
            { day: 3, owner: "GE", time: "15:30", title: "Realização de defesa prévia - TRANSPORTE BRAGA BORGES", status: "pendente", type: "deadline" },

            // QUARTA-FEIRA, DIA 04
            { day: 4, owner: "IM", time: "Dia Inteiro", title: "Viagem à LUÍS EDUARDO MAGALHÃES", status: "iniciado", type: "travel" },
            { day: 4, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "concluido", type: "network" },
            { day: 4, owner: "AF", time: "08:30", title: "Redistribuir processo - ZANINIZANINI x ALESSANDRO", status: "pendente", type: "admin" },
            { day: 4, owner: "IM", time: "09:30", title: "Atualização Cadastral e Emissão de Boletos - JK BUSINESS", status: "pendente", type: "finance" },
            { day: 4, owner: "GE", time: "12:30", title: "Encontro Tauile de Alcântara - Santa Rosa", status: "pendente", type: "meeting" },
            { day: 4, owner: "IM", time: "17:30", title: "Encontro LEOMAQ - Dianópolis", status: "pendente", type: "meeting" },

            // QUINTA-FEIRA, DIA 05
            { day: 5, owner: "GB", time: "08:00", title: "Reunião RAFAEL ZANINI - LEM", status: "pendente", type: "meeting" },
            { day: 5, owner: "IM", time: "11:00", title: "Módulo - BNI Jalapão", status: "concluido", type: "network" },
            { day: 5, owner: "AF", time: "11:30", title: "Notificação Extrajudicial - Rafael Zanini x DR MATHEUS", status: "urgente", type: "deadline" },
            { day: 5, owner: "PS", time: "11:45", title: "Ligação do Tabelionato Koerner para chamada de vídeo", status: "pendente", type: "call" },
            { day: 5, owner: "GE", time: "15:30", title: "Reunião - LEIA - TRANSPORTE BRAGA BORGES", status: "pendente", type: "meeting" },
            { day: 5, owner: "IM", time: "17:00", title: "Módulo - BNI Jalapão", status: "concluido", type: "network" },
            { day: 5, owner: "AF", time: "17:30", title: "Notificação Extrajudicial - TRANSPORTE BRAGA x À MANETE", status: "urgente", type: "deadline" },

            // SEXTA-FEIRA, DIA 06
            { day: 6, owner: "IM", time: "Dia Inteiro", title: "Inauguração - Escritório AUBE", status: "pendente", type: "event" },
            { day: 6, owner: "FS", time: "08:30", title: "Informar novo endereço - RAFAEL ZANINI x ANTONIO CARLOS", status: "pendente", type: "admin" },
            { day: 6, owner: "IM", time: "15:00", title: "Reunião - Gaspar (AUBE)", status: "pendente", type: "meeting" },

            // SÁBADO, DIA 07
            { day: 7, owner: "IM", time: "Dia Inteiro", title: "Dia de Campo - OILEMA", status: "concluido", type: "agro" },

            // SEGUNDA-FEIRA, DIA 09
            { day: 9, owner: "GE", time: "09:00", title: "Reunião - FABIANO MIGOTO", status: "pendente", type: "meeting" },
            { day: 9, owner: "PS", time: "11:00", title: "Reunião - FABIANO MIGOTO x VINICIUS - Luzimangues", status: "pendente", type: "meeting" },

            // TERÇA-FEIRA, DIA 10
            { day: 10, owner: "FS", time: "08:30", title: "Informar dados bancários - JESSICA YUMIKO x HELENISE", status: "iniciado", type: "admin" },
            { day: 10, owner: "GE", time: "11:30", title: "Juntar Custas e Comprovante - ZANINI x ALESSANDRO", status: "pendente", type: "deadline" },
            { day: 10, owner: "FS", time: "14:00", title: "Reunião Souzamaas", status: "iniciado", type: "meeting" },
            { day: 10, owner: "AF", time: "17:30", title: "Petição de Correção de Formulário MLE - JESSICA x HELENISE", status: "urgente", type: "deadline" },

            // QUARTA-FEIRA, DIA 11
            { day: 11, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "pendente", type: "network" },
            { day: 11, owner: "GB", time: "13:30", title: "Sessão Virtual para julgamento dos processos eletrônicos", status: "pendente", type: "hearing" },
            { day: 11, owner: "GE", time: "17:00", title: "Mentoria BNI - Módulo 3 - Getulio Jesus", status: "pendente", type: "network" },

            // QUINTA-FEIRA, DIA 12
            { day: 12, owner: "AF", time: "08:30", title: "Prosseguimento indicando as diligências - JAIME OLIVEIRA", status: "pendente", type: "deadline" },

            // SEXTA-FEIRA, DIA 13
            { day: 13, owner: "FS", time: "08:30", title: "Contrarrazões - ANTONIO CAMELO DA SILVA x MGP MATERIAL", status: "pendente", type: "deadline" },
            { day: 13, owner: "GE", time: "09:30", title: "Impugnar Cálculo - TAUILE x SANNA", status: "urgente", type: "deadline" },

            // QUARTA-FEIRA, DIA 18
            { day: 18, owner: "AF", time: "08:30", title: "Agravo de Instrumento - MURATA x MUNICIPIO LEM", status: "pendente", type: "deadline" },
            { day: 18, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "pendente", type: "network" },

            // TERÇA-FEIRA, DIA 24
            { day: 24, owner: "GE", time: "Dia Inteiro", title: "Julgamento o RECURSO INOMINADO - Motz x N B Transporte", status: "pendente", type: "hearing" },
            { day: 24, owner: "AF", time: "Dia Inteiro", title: "Impugnar Cumprimento de Sentença - TAUILE x SANNA", status: "urgente", type: "deadline" },

            // QUARTA-FEIRA, DIA 25
            { day: 25, owner: "IM", time: "07:00", title: "Reunião BNI Jalapão", status: "pendente", type: "network" }
        ];
    }

    // --- MÉTODOS DE ACESSO ---
    
    // Retorna todos os usuários para preencher a lista de login
    getAllUsers() {
        return [...this.users.partners, ...this.users.staff, this.users.admin];
    }

    // Busca usuário específico
    getUserById(id) {
        const all = this.getAllUsers();
        return all.find(u => u.id === id);
    }

    // Retorna a estrutura de times
    getTeamStructure() {
        return this.users;
    }

    // Retorna tarefas de um dia específico
    getTasksByDay(day) {
        return this.calendarTasks.filter(t => t.day === day);
    }
}

// Inicializa a Base de Dados
const DataCore = new Repository();
