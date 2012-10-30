Sincronizador = new Object();

Sincronizador.Itens = new Array();

function Erro(retorno) {

    if (retorno.status == 0 ) {
        alert("Erro: Falha ao se conectar com o servidor \n\n Erro Técnico: "+ retorno.status + " - " + retorno.statusText);
    } else if (retorno.status == 500) {
        alert("Erro: Falha no servidor \n\n Erro Técnico: " + retorno.status + " - " + retorno.statusText);
    } else if (retorno.status >= 400 && retorno.status < 500) {
        alert("Erro: Falha na comunicação com o servidor \n\n Erro Técnico: " + retorno.status + " - " + retorno.statusText);
    }

    Sincronizador.Erros += retorno;
}

function verificaConexao(sucesso) {

    if (navigator.network != undefined) {
        var networkState = navigator.network.connection.type;
        
        if (Connection.NONE != networkState) {
            sucesso();
        }
    } else { 
		// acesso pelo navegadoor
        sucesso();
    }
}

Sincronizador.ObterObjetoHistorico = function (ids) {	
    Sincronizador.Itens = ids;
    Sincronizador.GatilhoObterObjeto();    
}

Sincronizador.GatilhoObterObjeto = function(){
    function sucesso() {
        if(Sincronizador.Itens.length >0){
            ObterObjeto(Sincronizador.Itens[Sincronizador.Itens.length - 1]);    
        }
    }    
    verificaConexao(sucesso);
}

function ObterObjeto(id) {

    //remove o ultimo item enviado (id atual)
    Sincronizador.Itens.pop(0);
	
    var parametros = { "id": id }

    function sucesso(retorno) {
        var objetoHistorico = new Array();
        var jSonRetorno = retorno.objetos.historicos;
        if (retorno != "") {
            for (var i = 0; i < jSonRetorno.length; i++) {

                var _objetoHistorico = {
                    "id": id,
                    "data": jSonRetorno[i].data,
                    "local": jSonRetorno[i].local,
                    "status": jSonRetorno[i].status
                }
                objetoHistorico.push(_objetoHistorico);
            }

            if (navigator.notification != undefined) {
                navigator.notification.vibrate(1000);
            }
			
            if (objetoHistorico.length > 0)
                BancoDados.CadastrarObjetoHistorico(objetoHistorico);
        }
    }
    Comunicacao.Chamar("listar", parametros, sucesso, Erro);
}