BancoDados = new Object();

BancoDados.Nome = "Vizir_Correios";
BancoDados.Versao = "1.0";
BancoDados.NomeApresentado = "Vizir Correios";
BancoDados.Tamanho = 2000000;

BancoDados.Objeto = undefined;
BancoDados.ObjetoHistoricos =  new Array();

function errorCB(err) {
    alert("Error processing SQL: " + err.message);
}

function successCB(){
    
}


function OperacaoBanco(acao, erro, sucesso) {
    var db = window.openDatabase(BancoDados.Nome, BancoDados.Versao, BancoDados.NomeApresentado, BancoDados.Tamanho);
    db.transaction(acao, erro, sucesso);
}

BancoDados.MontarBanco = function () {
    OperacaoBanco(MontarTabelas, errorCB, successCB);
}

function MontarTabelas(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS objeto (id varchar(15), descricao varchar(100), status varchar(50))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS objeto_historico (objeto_id varchar(15), data DATETIME, local varchar(100), status varchar(50))');
}

BancoDados.AdicionarObjeto = function (Objeto) {
    BancoDados.Objeto = Objeto;
    OperacaoBanco(AdicionarObjeto, errorCB, successCB);
}

function AdicionarObjeto(tx){
	tx.executeSql('INSERT INTO objeto (id, descricao, status) values ("' + BancoDados.Objeto.id + '","' + BancoDados.Objeto.descricao + '","' + BancoDados.Objeto.status + '")' );
	alert("Salvo com sucesso!");
	Objetos.Atualizar();
}

BancoDados.ListarObjetos = function () {
    OperacaoBanco(ListarObjetos, errorCB, successCB);
}

function ListarObjetos(tx){
	tx.executeSql('SELECT id, descricao, status FROM objeto', [], Objetos.Listar, errorCB);
}

BancoDados.CadastrarObjetoHistorico = function (historicos) {
	BancoDados.ObjetoHistoricos = historicos;
	OperacaoBanco(AtualizarObjetoHistorico, errorCB, successCB);
}

function AtualizarObjetoHistorico(tx){
	tx.executeSql('DELETE FROM objeto_historico where objeto_id = "'+ BancoDados.ObjetoHistoricos[BancoDados.ObjetoHistoricos.length - 1].id +'"');
	
	CadastrarObjetoHistorico(tx);
}

function CadastrarObjetoHistorico(tx){

	if (BancoDados.ObjetoHistoricos.length > 0){
		tx.executeSql('INSERT INTO objeto_historico (objeto_id, data, local, status) VALUES ("'+BancoDados.ObjetoHistoricos[BancoDados.ObjetoHistoricos.length - 1].id+'", "'+BancoDados.ObjetoHistoricos[BancoDados.ObjetoHistoricos.length - 1].data+'", "'+BancoDados.ObjetoHistoricos[BancoDados.ObjetoHistoricos.length - 1].local +'", "'+BancoDados.ObjetoHistoricos[BancoDados.ObjetoHistoricos.length - 1].status +'")');
		BancoDados.ObjetoHistoricos.pop(0);
	}
	
	if (BancoDados.ObjetoHistoricos.length > 0){
		CadastrarObjetoHistorico(tx);
	}
	else{
		Sincronizador.GatilhoObterObjeto();
	}
}

BancoDados.ListarObjetoHistorico = function (objeto_id) {
	var objeto = {
        "id": objeto_id
    }

	BancoDados.Objeto = objeto
    OperacaoBanco(ListarObjetoHistorico, errorCB, successCB);
}

function ListarObjetoHistorico(tx){
	tx.executeSql('SELECT objeto_id, status, data, local FROM objeto_historico WHERE objeto_id = "' + BancoDados.Objeto.id + '"', [], Objetos.ListarHistorico, errorCB);
}











