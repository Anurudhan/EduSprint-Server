import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
