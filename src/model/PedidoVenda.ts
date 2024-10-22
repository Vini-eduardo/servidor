import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Pedido de Venda.
 */
export class PedidoVenda {

    /* Atributos */
    /* Identificador do pedido */
    private idPedido = 0;
    /* Identificador do Carro */
    private idCarro;
    /* Identificador do Cliente */
    private idCliente;
    /* Data do Pedido */
    private data: Date;
    /* Valor do Pedido */
    private valor: number = 0;

    /**
     * Construtor da classe PedidoVenda
     * 
     * @param idPedido Identificador do pedido
     * @param idCarro Identificador do Carro
     * @param idCliente Identificador do cliente
     * @param data Data de Realização do Pedido
     * @param Valor Valor do Pedido
*/
    constructor(
        idCarro: number,
        idCliente: number,
        data: Date,
        valor: number,
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.data = data;
        this.valor = valor;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do Pedido
     * @returns o identificador do Pedido
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do Pedido
     * @param idCarro identificador do carro
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /*
    * Recupera o identificador do carro
    * @returns  O Identificador do carro.
    */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCarro novo identificador do carro
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /*
       * Recupera o identificador do cliente
       * @returns  O identificador do cliente
       */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do cliente
     * @param idCliente novo identificador do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }


    /**
        * Define a data da Realização do Pedido.
        * @param data - Data de Realização do Pedido.
        */
    public setData(data: Date): void {
        this.data = data;
    }


    /**
     * Retorna a data de Realização do Pedido.
     *
     * @returns A data de realização do Pedido.
     */
    public getData(): Date {
        return this.data;
    }


    /**
        * Define o Valor do Pedido.
        *
        * @param valor - Valor do Pedido.
        */
    public setValor(valor: number): void {
        this.valor = valor;
    }

    /**
     * Retorna o valor do pedido.
     *
     * @returns O valor do pedido.
     */
    public getValor(): number {
        return this.valor;
    }


    /**
     * Busca e retorna uma lista de pedidos de venda do banco de dados.
     * @returns Um array de objetos do tipo `PedidoVenda` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "pedido_venda".
     * - Os dados retornados são utilizados para instanciar objetos da classe `PedidoVenda`.
     * - Cada pedido de venda instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Caso ocorra uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemPedidos(): Promise<Array<PedidoVenda> | null> {
        const listaDePedidos: Array<PedidoVenda> = [];

        try {
            const querySelectPedidos = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(querySelectPedidos);

            respostaBD.rows.forEach((linha) => {
                const novoPedidoVenda = new PedidoVenda(
                    linha.id_carro,
                    linha.id_cliente,
                    linha.data_pedido,
                    parseFloat(linha.valor_pedido)
                );

                novoPedidoVenda.setIdPedido(linha.id_pedido);

                listaDePedidos.push(novoPedidoVenda);
            });

            return listaDePedidos;
        } catch (error) {
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }

    static async cadastroPedidos(pedido: PedidoVenda): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertPedido = `INSERT INTO Pedido (id_carro, id_cliente, data, valor)
                                        VALUES
                                        (${pedido.getIdCarro()}, 
                                        ${pedido.getIdCliente()}, 
                                        '${pedido.getData()}', 
                                        ${pedido.getValor()})
                                        RETURNING id_pedido;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertPedido);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Carro cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o pedido. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}
