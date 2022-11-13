// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
 
import { SMTPClient } from 'emailjs';
 
 
export default function handler(req, res) {
 
 const {email}=req.body;
 
 const client = new SMTPClient({
   user: 'samatcarbitrage@gmail.com',
   password: 'carbitrage',
   host: 'smtp.gmail.com',
   ssl:true
 });
 
console.log(client)

 try{
 
  
   client.send(
     {
       text: `Just for testing purpose`,
       from: 'samatcarbitrage@gmail.com',
       to: email,
       subject: 'testing emailjs',
      
     }
     )
   }
 catch(e){
   res.status(400).end(JSON.stringify({ message:"Error" }))
   return;
 }
 
 res.status(200).end(JSON.stringify({ message:'Send Mail' }))
}