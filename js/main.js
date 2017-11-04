var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
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
		$("#botao-reiniciar").attr("disabled", true); // tira o bug, evitando que o usuário possa clicar no botao iniciar o jogo.
		var cronometroID = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();
			}
		}, 1000);
	});	
}

function finalizaJogo(){
	campo.attr("disabled", true);
	campo.addClass("campo-desativado"); // poderia usar aqui o toggleClass(), ele verifica se o elemento tem a classe, se ele tem a classe ele remove ela, se ele não tem ele adiciona
	$("#botao-reiniciar").attr("disabled", false); //habilita novamente o botao.
	inserePlacar();
}

function inicializaMarcadores(){
	var frase = $(".frase").text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);

		if(digitado == comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});	
}


function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Douglas";
	var numPalavras = $("#contador-palavras").text();
	var linha = novaLinha(usuario, numPalavras);

	linha.find(".botao-remover").click(removeLinha);
	corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras){
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass("botao-remover").attr("href", "#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;
}


function removeLinha(){
	event.preventDefault();
	$(this).parent().parent().remove();
}


function reiniciaJogo(){
	campo.val("");
	campo.attr("disabled", false);
	campo.removeClass("campo-desativado"); // poderia usar aqui o toggleClass()
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
}

