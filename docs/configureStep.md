
 - 引入 vue-property-decorator 包
 - 删除 App.vue 
 - 新增 App.tsx

```tsx
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  render () {
    return (
        <div id='app'>
          <router-view/>
        </div>
    )
  }
}

```

 - 新建 tslint.json 文件

 ```json
 {
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

 ```

  - 安装提交相关的插件

  ```shell
  npm i --save commitizen cz-conventional-changelog husky @commitlint/cli @commitlint/config-angular
  ```

 - 配置 package.json

 ```json
 "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  },
 "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  }
 ```