import { Request, Response, Router } from "express";
import { CarroController } from "./controller/CarroController";
import { ClienteController } from "./controller/ClienteController";
import { PedidoVendaController } from "./controller/PedidoVendaController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA CARROS
*/ 
// Rota para listar os carros
router.get("/lista/carros", CarroController.todos);
router.post("/novo/carro", CarroController.novo);
router.delete("/delete/carro/:idCarro", CarroController.remover);
router.put("/atualizar/carro/:idCarro", CarroController.atualizar);

/* 
* ROTAS PARA CLIENTES
*/ 
// Rota para listar os clientes
router.get("/lista/clientes", ClienteController.todos);
router.get("/novo/cliente", ClienteController.todos);
router.delete("/delete/cliente/:idCliente", ClienteController.remover);
router.put("/atualizar/cliente/:idCliente", ClienteController.atualizar);
/* 
* ROTAS PARA PEDIDOS
*/ 
// Rota para listar os pedidos
router.get("/lista/pedidos", PedidoVendaController.todos);
router.get("/novo/pedido", PedidoVendaController.todos);
router.delete("/delete/pedido/:idPedido", PedidoVendaController.remover);
router.put("/atualizar/pedido/:idPedido", PedidoVendaController.atualizar);

// exportando as rotas
export { router };