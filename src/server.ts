import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./common/ormconfig";
import { PORT } from "./common/config";
import { app } from './app';

createConnection(config).then(async () => {
    app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
    );
}).catch(error => console.log("TypeORM connection error: ", error));
