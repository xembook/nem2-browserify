# nem2-browserify

## how to build
```sh
sudo yum update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source .bashrc
nvm ls-remote
nvm install  v12.16.2

npm install utf8@2.1.2
npm install symbol-sdk
npm install rxjs
npm install symbol-qr-library
npm install symbol-hd-wallets
npm install catbuffer-typescript

npm install browserify -g

browserify -r ./node_modules/symbol-sdk -r ./node_modules/rxjs/operators -r ./node_modules/rxjs -r ./node_modules/js-sha3 -r ./node_modules/jsbn -r ./node_modules/buffer  -o symbol-sdk-0.19.2.js
browserify -r ./node_modules/symbol-hd-wallets -o symbol-hd-wallets-0.11.0.js
browserify -r ./node_modules/symbol-qr-library -o symbol-qr-library-0.11.0.js
browserify -r ./node_modules/catbuffer-typescript -o catbuffer-typescript.0.0.19.js

```

## how to use(sample)
```html
<script src="symbol-sdk-0.19.2.js"></script>
```

```js
const nem  = require("/node_modules/symbol-sdk");
const qr   = require("/node_modules/symbol-qr-library");
const op   = require("/node_modules/rxjs/operators");
const rxjs = require("/node_modules/rxjs");

const NODE = 'http://api-01.ap-northeast-1.testnet-0951-v1.symboldev.network:3000';
const blockHttp = new nem.BlockHttp(NODE);
blockHttp.getBlockByHeight(1).subscribe(x=>console.log(x));


```

