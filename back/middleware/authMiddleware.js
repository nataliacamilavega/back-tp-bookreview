import chalk from "chalk";
import jwt from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
  try {
    // Obtengo el value de authorization
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw "Error de middleware, debe enviar un token";

    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) throw { status: 403, message: "Malformed Token" };

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) throw "Failed to authenticate token.";

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error(
      chalk.red.inverse(
        " ------------------------------------ \n" +
          "  Error de middleware: " +
          "\n ------------------------------------ "
      ),
      error
    );
    res
      .status(error.status || 500)
      .send({ error: true, body: null, message: error.message || error });
  }
};
