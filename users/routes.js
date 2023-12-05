import * as dao from "./dao.js";
let currentUser = null;
function UserRoutes(app) {
    const createUser = async (req, res) => {};
    const deleteUser = async (req, res) => {};

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {};
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        res.json(status);
    };

    const signup = async (req, res) => {};
    const signin = async (req, res) => {
        const { username, password } = req.body;
        currentUser = await dao.findUserByCredentials(username, password);
        res.json(currentUser);
    };

    const signout = (req, res) => {};

    const account = async (req, res) => {
        res.json(currentUser);
    };


    app.post("/users", createUser);
    app.get("/users", findAllUsers);
    app.get("/users/:userId", findUserById);
    app.put("/users/:userId", updateUser);
    app.delete("/users/:userId", deleteUser);
    app.post("/users/signup", signup);
    app.post("/users/signin", signin);
    app.post("/users/signout", signout);
    app.post("/users/account", account);
}
export default UserRoutes;
