module.exports.getHello = (req, res) => {
  res.send(
    `<html>
    <body>
        <p>Hello User with _id:${req.user._id}</p>
    </body>
    </html>`,
  );
};

module.exports.notFound = (req, res) => {
  res.send({ message: 'Страница не найдена' });
};
