module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validation

  const save = (req, res) => {
    const category = {
      id: req.body.id,
      name: req.body.name,
      parentId: req.body.parentId
    }
    if(req.params.id) category.id = req.params.id // category.id será igual ao valor que vier da requisição se vier

    try {
      existsOrError(category.name, 'Nome não informado')
    } catch(msg) {
      return res.status(400).send(msg)
    }

    if(category.id) { // category.id virá pela requisição
      app.db('categories')
        .update(category) // atualiza registro no banco de dados
        .where({ id: category.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else { // se não vier id pela requisição a categoria será inserida
      app.db('categories')
        .insert(category) // insere nova categoria
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, 'Código da Categoria não informado.')
      
      const subcategory = await app.db('categories')
        .where({ parentId: req.params.id }) // verifica se alguma categoria tem o parentId igual ao ID da categoria que será excluída
      notExistsOrError(subcategory, 'Categoria possui subcategorias.')

      const articles = await app.db('articles')
        .where({ categoryId: req.params.id }) // verifica se algum artigo tem o categoryId igual ao ID da categoria que será excluída
      notExistsOrError(articles, 'Categoria possui artigos.')

      const rowsDeleted = await app.db('categories')
        .where({ id: req.params.id }).del() // .del() fará a exclusão
      existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

      res.status(204).send()
    } catch(msg) {
      res.status(400).send(msg)
    }
  }

  const withPath = (categories) => {
    const getParent = (categories, parentId) => {
      const parent = categories.filter(parent => parent.id === parentId) // busca ID nas categorias igual ao parentId passado como parâmetro
      return parent.length ? parent[0] : null // se parent não for array vazio retorna o primeiro e único valor
    }

    const categoriesWithPath = categories.map(category => {
      let path = category.name // nome que aparecerá mais a direita na seleção de categoria
      let parent = getParent(categories, category.parentId)

      while(parent) { // montará o caminho completo da categoria
        path = `${parent.name} > ${path}`
        parent = getParent(categories, parent.parentId)
      }

      return { ...category, path }
    })

    categoriesWithPath.sort((a, b) => { // organiza as categorias em ordem alfabética
      if(a.path < b.path) return -1
      if(a.path > b.path) return 1
      return 0
    })

    return categoriesWithPath
  }

  const get = (req, res) => {
    app.db('categories')
      .then(categories => res.json(withPath(categories)))
      .catch(err => res.status(500).send(err))
  }

  const getById = (req, res) => {
    app.db('categories')
      .where({ id: req.params.id })
      .first()
      .then(category => res.json(category))
      .catch(err => res.status(500).send(err))
  }

  const toTree = (categories, tree) => {
    if(!tree) tree = categories.filter(c => !c.parentId) // gera árvore inicial com todas as categorias que não tem parent.id
    tree = tree.map(parentNode => {
      const isChild = (node) => node.parentId == parentNode.id // busca os filhos diretos
      parentNode.children = toTree(categories, categories.filter(isChild)) // o parâmetro da isChild será cada categoria percorrida pelo filter
      return parentNode
    })
    return tree // função toTree é utilizada de forma recursiva
  }

  const getTree = (req, res) => {
    app.db('categories')
      .then(categories => res.json(toTree(categories)))
      .catch(err => res.status(500).send(err))
  }

  return { save, remove, get, getById, getTree }
}