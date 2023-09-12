# Installation

- Create a `.env` file with `OPENAI_API_KEY`

```sh
OPENAI_API_KEY=xx-xxxxxxx
```


1. add this function into file .bashrc

```bash
function gpt-cmd() {
    local cmd=$(gpt-terminal "$1")
    eval "$cmd"
}
```

2. reload the file .bashrc
```bash
source ~/.bashrc
```

3. create a symbolic lin to file dist/index.js in a directory that is inside `${PATH}` environment variable

```bash
sudo ln -s <index.js-path> <directory-into-$PATH-path>
```

4. every time you modify the source code of this project run 
```bash
npx tsc
```
so the link is now pointing to the updated code
