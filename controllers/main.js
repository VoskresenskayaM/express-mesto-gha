module.exports.getHello = (req, res) => {
  res.send(
    `<html>
    <body>
        <p>Hello User with _id:${req.user._id}</p>
    </body>
    </html>`,
  );
};
