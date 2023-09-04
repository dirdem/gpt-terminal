import OpenAI from "openai";
import * as readlineSync from "readline-sync";
import * as childProcess from "child_process";
import * as os from "os";
import * as dotenv from "dotenv";
dotenv.config();
process.stdin.setEncoding("utf8");

const openAi = new OpenAI();

const messages: any = [
  {
    role: "system",
    content: `Sei un assistente per terminale per il sistema operativo ${os.platform()}. Devi fornire all'utente comandi e istruzioni in modo sintetico, semplice e conciso`,
  },
];

async function execGpt(input: string): Promise<void> {
  messages.push({
    role: "user",
    content: input,
  });
  const stream = await openAi.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
    stream: true,
  });
  let output = "";
  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content;
    output += content;
    process.stdout.write(content || "");
  }
  messages.push({
    role: "assistant",
    content: output,
  });
  process.stdout.write('\n');
}

async function main() {
  await execGpt('');

  while (true) {
    try {
      //read user input
      const input = readlineSync.prompt();
      //exec gpt
      await execGpt(input);
    } catch (error) {
      console.error("error", error);
    }
  }
}

main();
