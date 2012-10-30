Objetos = new Object();


Objetos.Adicionar = function () {
	$("#new_id").val("");
    $("#new_descricao").val("");
    $.mobile.changePage("#addObjeto", { transition: "fade" });    
}

Objetos.Atualizar = function () {
    $.mobile.changePage("#objeto", { transition: "fade" });
	
	BancoDados.ListarObjetos();
}


Objetos.Salvar = function(){ 
	var objeto = {
        "id": $("#new_id").val(),
        "descricao": $("#new_descricao").val(),
		"status": "Novo"
    }
	
	BancoDados.AdicionarObjeto(objeto);
}

Objetos.Listar = function (tx, result){
	$("#lst_objetos").empty();
	for (var i = 0; i < result.rows.length; i++) {

        $("#lst_objetos").append(
			'<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-bottom ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"> <input class="itemLista" type="hidden" value="'+ result.rows.item(i).id +'" /> <a href="#" onClick="Objetos.TrocarAba(\''+ result.rows.item(i).id +'\')" data-transition="slide" class="ui-link-inherit">' + result.rows.item(i).descricao + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
		);
    }
}

Objetos.ListarHistorico = function (tx, result){
	$("#divLista").empty();
	for (var i = 0; i < result.rows.length; i++) {

        $("#divLista").append(
			'<div> <b>' + result.rows.item(i).status + ' - ' + result.rows.item(i).data + '</b> <p> ' + result.rows.item(i).local + '</p> </div>'
		);
    }
}

Objetos.TrocarAba = function (objetoId) {
	$.mobile.changePage("#detailsObject", { transition: "slide" });

	BancoDados.ListarObjetoHistorico(objetoId);
}

Objetos.Sincronizar = function(){

	var itens = new Array(); 
	$(".itemLista").each(function(a, item){ 
		itens.push($(item).val());
	});
	Sincronizador.ObterObjetoHistorico(itens);

	Objetos.Atualizar();
}