// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn8rUaqhtUWZURXAUiDDgySJair2RwIQ8",
  authDomain: "teste2-83475.firebaseapp.com",
  databaseURL: "https://teste2-83475-default-rtdb.firebaseio.com",
  projectId: "teste2-83475",
  storageBucket: "teste2-83475.appspot.com",
  messagingSenderId: "562510208260",
  appId: "1:562510208260:web:2e9e1dc406fef722798451"
};

// Initialize Firebase
var firebase = require("firebase");
firebase.initializeApp(firebaseConfig);


// var dbref = ref.child("Cliente").child("01");
// dbref.on("value", snap => console.log(snap.val()));

const {createServer} = require("http");
var ref = firebase.database().ref();


let servidor = createServer((req, res) =>{
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
    res.write("<html><head></head><body>");
    res.write("<h1>Hello World</h1>");
    let html = "";

    let dbref = ref.child("Cliente");

    dbref.once('value', function(snap){
        snap.forEach(element => {
            let childChave = element.key;
            console.log(childChave);
            html += "<p>Chave: "+ childChave +"</p>\n"

            element.forEach(function(childChild){
                let childChave = childChild.key;
                let childDado = childChild.val();
                console.log("Chave: "+ childChave + + " Valor: "+ childDado);
                html += "<p>Chave: "+ childChave +"</p>\n" + "<p>Valor: "+ childDado +"</p>\n"
                
            })
        });
        
        
        
            res.write(html);
            res.write("</body></html>")
            res.end()
    })


})

servidor.listen(8001);

console.log("Ouvindo porta 8001")