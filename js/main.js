var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	$("#botao-reiniciar").click(reiniciaJogo);
});

/*
	Essa função funciona com um shortcut para $(document).ready(function)

	$(function(){
		atualizaTamanhoFrase();
		inicializaContadores();
		inicializaCronometro();
		$("#botao-reiniciar").click(reiniciaJogo);
	});
*/

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);	
}

function inicializaContadores(){
	campo.on("input", function(){
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length -1;
		var tamanhoFrase = $("#contador-palavras");
		tamanhoFrase.text(qtdPalavras);

		qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);

	});	
}


function inicializaCronometro(){
	var tempoRestante = $("#tempo-digitacao").text();
	
	campo.one("focus", function(){
		$("#botao-reiniciar").attr("disabled", true);
		var cronometroID = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				campo.attr("disabled", true);
				clearInterval(cronometroID);
				$("#botao-reiniciar").attr("disabled", false);
			}
		}, 1000);
	});	
}

function reiniciaJogo(){
	campo.val("");
	campo.attr("disabled", false);
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
}

