import server from "./presentation/server";
import database from "./_boot/database";
import { startConsumer } from "./_boot/consumer";

(async () => {
    try{
        server;
        await Promise.all([database(),startConsumer()])
        console.log("Server and database started successfully.");
    }
    catch(error:any){
        console.error(error?.message||'An error occured');
        process.exit(1);
    }
})()