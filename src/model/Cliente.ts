import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa o cliente.
 */
export class Cliente {

    /* Atributos */
    /* Identificador do cliente */
    private idCliente: number = 0;
    /* nome do cliente */
    private nome: string;
    /* cpf do cliente */
    private cpf: string;
    /* telefone do cliente */
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nome Nome do cliente
     * @param cpf CPF do cliente
     * @param telefone Telefone do cliente
     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string,
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do cliente
     * @param idCliente novo identificado do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente.
     *
     * @returns {string} O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - Nome do cliente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do cliente.
     *
     * @returns {string} O cpf do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente.
     *
     * @param cpf - O CPF do cliente.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente.
     *
     * @returns {string} O telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     * 
     * @param telefone - O telefone a ser definido para o Cliente.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }


    /**
     * Busca e retorna uma lista de clientes do banco de dados.
     * @returns Um array de objetos do tipo `Cliente` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "cliente".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Cliente`.
     * - Cada carro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemClientes(): Promise<Array<Cliente> | null> {
        // objeto para armazenar a lista de clientes
        const listaDeClientes: Array<Cliente> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectCliente = `SELECT * FROM cliente;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectCliente);

            // usando a resposta para instanciar um objeto do tipo cliente
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto cliente
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                // atribui o ID objeto
                novoCliente.setIdCliente(linha.id_cliente);

                // adiciona o objeto na lista
                listaDeClientes.push(novoCliente);
            });

            // retorna a lista de clientes
            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de clientes');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Cliente` e insere seus dados (nome, cpf e telefone)
     * na tabela `cliente` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto `Cliente`
     *                        deve conter os métodos `getNome()`, `getCpf()` e `getTelefone()`
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna `true` se o cliente foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um cliente no banco de dados
            const queryInsertCliente = `INSERT INTO carro (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        '${cliente.getCpf()}', 
                                        '${cliente.getTelefone()}')
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
            // query para fazer delete de um cliente no banco de dados
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = ${idCliente}`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryDeleteCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente removido com sucesso! ID do cliente: ${idCliente}`);
                // true significa que a removação foi bem sucedida
                return true;
            }
            // false significa que a remoção NÃO foi bem sucedida.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao remover o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}