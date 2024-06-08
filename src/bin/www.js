const app = require("../apps/app");
const config = require("config");
const port = config.get("app").PORT;

app.listen(port, (req, res) => {
  console.log(`Server running`);
});
