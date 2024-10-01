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
}