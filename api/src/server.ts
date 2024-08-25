import { culturasRouters } from "./culturas/main";
import { app } from "./express.config";
import { produtoresRouters } from "./produtor/main";

produtoresRouters(app);
culturasRouters(app);

const $PORT = process.env.PORT || 3000;

app.listen($PORT, () => {
  console.log(`Server is running on port ${$PORT}`);
});
