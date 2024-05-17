const base = "https://taskboardproject.onrender.com/api/";
module.exports = {
    login: base +"user/login",
    register: base +"user/register",
    getUser: base + "user/:id",
    getProjectByUser: base + "project/user/:id",
    getProjectById: base + "project/:id",
    getColumnsByProject: base + "project/:id/columns",
    getRowsByColumn: base + "column/:id/rows",
    addRowApi: base + "column/:id/rows",
    updateRowData: base + "row/:id",
    deleteRowData: base + "row/:id",
}