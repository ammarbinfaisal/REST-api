const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
