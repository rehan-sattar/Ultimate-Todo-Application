import app from "./app";
const Port = 3000;

app.listen(Port,() => {
    console.log("Express Server Listening On Port " + Port);
})