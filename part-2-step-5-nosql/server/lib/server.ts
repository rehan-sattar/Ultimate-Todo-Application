import app from "./app";
const Port = 8080;
app.listen(Port,() => {
    console.log("Express Server Listening On Port " + Port);
})