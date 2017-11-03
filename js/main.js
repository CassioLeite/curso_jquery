var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
//tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");

campo.on("input", function(){
	var conteudo = campo.val();
	var contadorPalavras = conteudo.split(/\S+/).length -1;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(contadorPalavras);	
});