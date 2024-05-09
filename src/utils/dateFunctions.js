


export function prepareAge(something){

    // Transforma a string da data de nascimento em um objeto Date
    var dataNascimentoObj = new Date(something);
    
    // Obtém o ano atual
    var anoAtual = new Date().getFullYear();
    
    // Obtém o ano de nascimento do objeto Date
    var anoNascimento = dataNascimentoObj.getFullYear();
    
    // Calcula a diferença entre os anos para obter a idade
    var idade = anoAtual - anoNascimento;
    
    // Verifica se o aniversário deste ano já passou
    // Se ainda não passou, subtrai 1 da idade
    var mesAtual = new Date().getMonth();
    var diaAtual = new Date().getDate();
    var mesNascimento = dataNascimentoObj.getMonth();
    var diaNascimento = dataNascimentoObj.getDate();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }
    
    return idade;

    return something.slice(0,4)
}