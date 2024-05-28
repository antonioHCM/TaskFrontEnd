const base = "https://taskboardproject.onrender.com/api/";
module.exports = {
    apiLogin: base +"user/login",
    register: base +"user/register",
    getUser: base + "user/:id",
    postProject: base + "project/newProject",
    postColumn: base + "column/newColumn",
    getProjectByUser: base + "project/user/:id",
    getProjectById: base + "project/:id",
    getColumnsByProject: base + "project/:id/columns",
    getRowsByColumn: base + "column/:id/rows",
    addRowApi: base + "column/:id/rows",
    updateRowData: base + "row/:id",
    deleteRowData: base + "row/:id"
    
}