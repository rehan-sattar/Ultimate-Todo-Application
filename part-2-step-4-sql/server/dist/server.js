"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.log("Express Server Listening On Port " + port);
});
//# sourceMappingURL=server.js.map