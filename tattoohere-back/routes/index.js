const { requireAuthMiddleware } = require("../auth");

module.exports = function (app) {
  app.use("/users", require("./users"));
  app.use("/clients", requireAuthMiddleware, require("./clients"));
  app.use("/estoque", requireAuthMiddleware, require("./estoque"));
  app.use("/documents", requireAuthMiddleware, require("./documents"));
  app.use("/email", requireAuthMiddleware, require("./email"));
};
