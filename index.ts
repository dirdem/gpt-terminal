import { Configuration, OpenAIApi } from "openai";
import * as readlineSync from "readline-sync";
import * as childProcess from "child_process";

process.stdin.setEncoding("utf8");

const gptConfig = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(gptConfig);

const gptPrompt = (input: string) =>
  `Convert this text to a bash command, the most popular command:
  Example: Can you give me the files in this directory?
  ls
  ${input}`;

async function execGpt(input: string): Promise<string> {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: gptPrompt(input),
    max_tokens: 100,
  });
  return completion.data.choices[0].text || "";
}

async function main() {
  console.log("Ciao, cosa vuoi fare oggi?");

  try {
    //read user input
    const input = readlineSync.prompt();

    //exec gpt
    let cmd: string = await execGpt(input);

    //format string
    cmd = cmd.replace(/^\s+|\s+$/g, "");

    //user confirm
    const risposta = readlineSync.question(`Sicuro di voler eseguire il comando "${cmd}"? [y/N] `);
    if (risposta.toLowerCase() === "y") {
      console.log(`>${cmd}`);

      //exec command
      childProcess.execSync(cmd, { stdio: "inherit" });
    } else {
      console.log("Comando annullato.");
    }
  } catch (error) {
    console.error("error", error);
  }
}

main();
