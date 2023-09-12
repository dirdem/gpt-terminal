#!/usr/bin/env node

import OpenAI from "openai";
import * as readlineSync from "readline-sync";
import path from 'path';
import * as dotenv from "dotenv";

process.stdin.setEncoding("utf8");

dotenv.config({
  path: path.join(__dirname, '..', '.env')
});

const openAi = new OpenAI();

const messages: any = [
  { role: "system", content: "Convert human text to a bash command, the most popular command. When you " },
  { role: "user", content: "Show files in this directory" },
  { role: "assistant", content: "ls" },
];

async function execGpt(input: string): Promise<string> {
  messages.push({
    role: "user",
    content: input,
  });
  const completion = await openAi.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });
  const response: any = completion.choices[0].message.content;
  messages.push({
    role: "assistant",
    content: response,
  });
  return response;
}

async function main() {
  const input = process.argv[2];
  let cmd: string = await execGpt(input);
  cmd = cmd.replace(/^\s+|\s+$/g, ""); // Questo rimuove gli spazi bianchi iniziali e finali
  
  const response = readlineSync.question(`Eseguire il comando "${cmd}"? [y/N] `);
  if (response.toLowerCase() === "y") {
      console.log(cmd); // Stampa il comando suggerito
  } else {
      console.log("Comando annullato.");
      process.exit(1);  // Termina lo script senza stampare nessun comando
  }
}

main();





















// async function main() {
  
//   // console.log("Ciao, cosa vuoi fare oggi?");

//     try {
//       //read user input
//       // const input = readlineSync.prompt();
//       const input = process.argv[2];


//       //exit condition
//       if (input.toLowerCase() === "esci" || input.toLowerCase() === "exit") {
//         console.log("Uscita dal programma...");
//       }

//       //exec gpt
//       let cmd: string = await execGpt(input);

//       //format string
//       cmd = cmd.replace(/^\s+|\s+$/g, "");

//       //user confirm
//       const risposta = readlineSync.question(`Eseguire il comando "${cmd}"? [y/N] `);
//       if (risposta.toLowerCase() === "y") {
//         console.log(`>${cmd}`);

//         //exec command
//         childProcess.execSync(cmd, { stdio: "inherit" });
//       } else {
//         console.log("Comando annullato.");
//       }
//     } catch (error) {
//       console.error("error", error);
//     }
// }
