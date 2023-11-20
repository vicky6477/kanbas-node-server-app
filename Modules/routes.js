import db from "../Database/index.js";
function ModuleRoutes(app) {
    app.get("/modules", (req, res) => {
        res.send(db.modules);
    });

    app.get("/users", (req, res) => {
        res.send(db.users);
    });

    app.put("/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        db.modules[moduleIndex] = {
            ...db.modules[moduleIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });

    app.delete("/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    app.post("/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });

    app.get("/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });
}
export default ModuleRoutes;
