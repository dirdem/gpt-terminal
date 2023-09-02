"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const childProcess = require("child_process");
process.stdin.setEncoding("utf8");
const gptConfig = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(gptConfig);
const gptPrompt = (input) => `Convert this text to a bash command, the most popular command:
  Example: Can you give me the files in this directory?
  ls
  ${input}`;
function execGpt(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.createCompletion({
            model: "text-davinci-003",
            prompt: gptPrompt(input),
            max_tokens: 100,
        });
        return completion.data.choices[0].text;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ciao, cosa vuoi fare oggi?");
        //read user input
        const input = readlineSync.prompt();
        //exec gpt
        let cmd = yield execGpt(input);
        //format string
        cmd = cmd.replace(/^\s+|\s+$/g, "");
        console.log("cmd by gtp", cmd);
        try {
            //user confirm
            const risposta = readlineSync.question(`Sicuro di voler eseguire il comando "${cmd}"? [y/N] `);
            if (risposta.toLowerCase() === "y") {
                console.log(`>${cmd}`);
                //exec command
                childProcess.execSync(cmd, { stdio: "inherit" });
            }
            else {
                console.log("Comando annullato.");
            }
        }
        catch (error) {
            console.error("error", error);
        }
    });
}
main();
