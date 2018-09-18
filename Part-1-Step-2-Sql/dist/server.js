"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.default.listen(process.env.PORT || 5001, () => {
    console.log("Express Server Listening On Port " + process.env.PORT);
});
//# sourceMappingURL=server.js.map