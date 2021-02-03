# nem2-browserify
symbol-qr-libraryやsymbol-hd-walletsを使う場合はsymbol-sdk-pack-0.x.jsを使用してください。

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
npm install graphql
npm install graphql-tag
npm install apollo-client
npm install apollo-link-http
npm install apollo-cache-inmemory

npm install browserify -g

browserify -r ./node_modules/symbol-sdk -r ./node_modules/rxjs/operators -r ./node_modules/rxjs -r ./node_modules/js-sha3 -r ./node_modules/jsbn -r ./node_modules/buffer -r ./node_modules/catbuffer-typescript -o symbol-sdk-0.23.1.js

browserify -r ./node_modules/symbol-qr-library -r ./node_modules/symbol-sdk -r ./node_modules/rxjs/operators -r ./node_modules/rxjs -r ./node_modules/js-sha3 -r ./node_modules/jsbn -r ./node_modules/buffer -r ./node_modules/catbuffer-typescript -r ./node_modules/symbol-hd-wallets -o symbol-sdk-pack-0.23.1.js

browserify -r ./node_modules/apollo-client -o apollo-client-2.6.10.js
browserify -r ./node_modules/apollo-cache-inmemory -o apollo-cache-inmemory-1.6.6.js
browserify -r ./node_modules/apollo-link-http -o apollo-link-http-1.5.17.js
browserify -r ./node_modules/graphql-tag -o graphql-tag-2.11.0.js

```

## how to use(sample)
```html
<script src="symbol-sdk-0.23.1.js"></script>
```

```js
const nem  = require("/node_modules/symbol-sdk");
const op   = require("/node_modules/rxjs/operators");
const rxjs = require("/node_modules/rxjs");
const qr   = require("/node_modules/symbol-qr-library");

const NODE = 'http://api-01.ap-northeast-1.testnet-0951-v1.symboldev.network:3000';
const blockHttp = new nem.BlockHttp(NODE);
blockHttp.getBlockByHeight(1).subscribe(x=>console.log(x));


```

