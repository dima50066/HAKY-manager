import  express  from "express";
import { initMongoConnection } from "./db/initMongoConnection";

const app = express();
const port = process.env.PORT || 5000;

initMongoConnection();

app.use(express.json());


app.listen(port, () => console.log(`Server started on port ${port}`));