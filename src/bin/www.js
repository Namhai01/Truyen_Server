const app = require("../apps/app");
const config = require("config");
const port = config.get("app").PORT;
const server = app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
