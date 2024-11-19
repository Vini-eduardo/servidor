import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoDTO {
    idCarro: number,
    idCliente: number,
    data: Date,
    valor: number,
}

/**
 * A classe `PedidoVendaController` estende a classe `Pedido_venda` e é responsável por controlar as requisições relacionadas aos carros.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "carro".
 * - Herdando de `Carro`, ela pode acessar métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
    * Lista todos os Pedidos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Pedidos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Pedidos.
    */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // acessa a função de listar os pedidos e armazena o resultado
            const listaDePedidos = await PedidoVenda.listagemPedidos();

            // retorna a lista de Pedidos há quem fez a requisição web
            return res.status(200).json(listaDePedidos);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de pedidos');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de pedidos" });
        }
    }

    /**
    * Método controller para cadastrar um novo pedido.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um no no corpo da requisição
    * e tenta cadastrar este carro no banco de dados utilizando a função `cadastroPedido`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do pedido no formato `PedidoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoDTO
            const pedidoRecebido: PedidoDTO = req.body;

            // instanciando um objeto do tipo Pedido com as informações recebidas
            const novoPedido = new PedidoVenda(pedidoRecebido.idCarro, 
                                        pedidoRecebido.idCliente, 
                                        pedidoRecebido.data, 
                                        pedidoRecebido.valor);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedidos(novoPedido);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Pedido. Entre em contato com o administrador do sistema."})
            } 
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Pedido. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o pedido. Entre em contato com o administrador do sistema." });
        }
    }
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do pedido que será removido
            const idPedido = parseInt(req.params.idPedido as string);

            // chamando a função de remoção de pedido
            const respostaModelo = await PedidoVenda.removerPedido(idPedido);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o pedido. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um pedido. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o pedido. Entre em contato com o administrador do sistema." });
        }
    }
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando o id do pedido que será atualizado
            const idPedido = parseInt(req.params.idPedido as string);

            // recuperando as informações do pedido que serão atualizadas
            const pedidoRecebido: PedidoDTO = req.body;

            // instanciando um objeto do tipo pedido com as informações recebidas
            const pedidoAtualizado = new PedidoVenda(pedidoRecebido.idCarro,
                pedidoRecebido.idCliente,
                pedidoRecebido.data,
                pedidoRecebido.valor);

            // setando o id do pedido que será atualizado
            pedidoAtualizado.setIdPedido(idPedido);

            // chamando a função de atualização de cliente
            const resposta = await PedidoVenda.atualizarPedido(pedidoAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o pedido. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um pedido. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o pedido. Entre em contato com o administrador do sistema." });
        }
    }
}