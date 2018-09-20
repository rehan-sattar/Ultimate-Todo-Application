import app from "./app";
const Port = process.env.PORT || 5001;

app.listen(Port,() => {
    console.log("Express Server Listening On Port " + Port);
})