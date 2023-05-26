module.exports.notFound = (req, res) => {
  res.status(process.env.NOT_FOUND).send({ message: 'Страница не найдена' });
};
