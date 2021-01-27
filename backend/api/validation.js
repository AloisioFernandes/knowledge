module.exports = (app) => {
  function existsOrError(value, msg) { // verifica se valor existe ou gera um erro
    if(!value) throw msg // se não tiver valor lança mensagem de erro
    if(Array.isArray(value) && value.length === 0) throw msg // verifica se valor é um array vazio
    if(typeof value === 'string' && !value.trim()) throw msg // verifica se valor é uma string vazia
  }
  
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg)
    } catch(msg) {
      return
    }
    throw msg
  }
  
  function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
  }

  return { existsOrError, notExistsOrError, equalsOrError } // consign carregará essas funções através de app.api.validation
}