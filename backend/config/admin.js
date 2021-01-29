module.exports = (middleware) => {
  return (req, res, next) => {
    if(req.user.admin) { // se for admin, executará o middleware normalmente
      middleware(req, res, next) 
    } else {
      res.status(401).send('Usuário não é administrador.')
    }
  }
}