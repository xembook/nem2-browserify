# nem2-browserify
symbol-qr-libraryやsymbol-hd-walletsを使う場合はsymbol-sdk-pack-x.x.jsを使用してください。

## how to build
```sh
sudo yum update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source .bashrc
nvm ls-remote
nvm install  v14.15.4

npm install utf8@2.1.2
npm install symbol-sdk
npm install rxjs
npm install jsbn
npm install symbol-qr-library
npm install symbol-hd-wallets
npm install symbol-uri-scheme

npm install browserify -g
npm install uglify-js -g

browserify -r ./node_modules/symbol-sdk -r ./node_modules/rxjs/operators -r ./node_modules/rxjs -r ./node_modules/js-sha3 -r ./node_modules/jsbn -r ./node_modules/buffer -r ./node_modules/catbuffer-typescript -r ./node_modules/js-sha256 -o symbol-sdk-2.0.0.js

browserify -r ./node_modules/symbol-qr-library -r ./node_modules/symbol-sdk -r ./node_modules/rxjs/operators -r ./node_modules/rxjs -r ./node_modules/js-sha3 -r ./node_modules/jsbn -r ./node_modules/buffer -r ./node_modules/catbuffer-typescript -r ./node_modules/symbol-hd-wallets -r ./node_modules/symbol-uri-scheme -r ./node_modules/js-sha256 -o symbol-sdk-pack-2.0.0.js



uglifyjs -o  symbol-sdk-2.0.0.min.js  symbol-sdk-2.0.0.js
uglifyjs -o  symbol-sdk-pack-2.0.0.min.js  symbol-sdk-pack-2.0.0.js

```

## how to use(sample)
```html
<script src="symbol-sdk-2.0.0.js"></script>
```

```js
const nem  = require("/node_modules/symbol-sdk");
const op   = require("/node_modules/rxjs/operators");
const rxjs = require("/node_modules/rxjs");
const qr   = require("/node_modules/symbol-qr-library");

const NODE = 'http://api-01.ap-northeast-1.testnet.symboldev.network:3000';
const blockHttp = new nem.BlockHttp(NODE);
blockHttp.getBlockByHeight(1).subscribe(x=>console.log(x));


```

