import { create, router as _router, defaults } from "json-server";
const server = create();
const router = _router("./src/db.json");
const middlewares = defaults({
    static: "./build",
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
    console.log("Server is running");
});
