"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const Port = 8080;
app_1.default.listen(Port, () => {
    console.log("Express Server Listening On Port " + Port);
});
//# sourceMappingURL=server.js.map