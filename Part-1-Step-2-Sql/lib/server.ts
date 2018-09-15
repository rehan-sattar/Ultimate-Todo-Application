import app from "./app";
const Port = 5001;

app.listen(Port,() => {
    console.log("Express Server Listening On Port " + Port);
})