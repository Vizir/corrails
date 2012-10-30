Comunicacao = new Object();

Comunicacao.url = "http://corrails.herokuapp.com/historico_objeto/";

Comunicacao.Chamar = function (nomeMetodo, parametros, sucesso, erro) {
    try {
        if (parametros == undefined)
            parametros = {};

        //var parametro = Funcoes.JsonToString(parametros);
        
        $.ajax({
            type: 'GET'
            , url: Comunicacao.url + nomeMetodo +"/" + parametros.id + "?callback=JSONP"
            , contentType: 'application/json'
            , dataType: 'jsonp'
            , processdata: false
			, jsonpCallback:"JSONP"
            //, data: JSON.stringify(parametro)
            , success: sucesso
            , error: erro
        });
    } catch (ex) {
        alert(ex.toString());
    }
}