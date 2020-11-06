## 项目说明

- 使用 vue-cli 4.4 进行项目构建
- 使用 vue 2.6.11 版本进行开发
- 使用 Element-UI 2.13.2 组件库
- 编码风格为 JavaScript Standard Style

## 目录结构说明

```
├─.editorconfig
├─.env.development
├─.env.production
├─.gitignore
├─babel.config.js
├─package-lock.json
├─package.json
├─README.md
├─vue.config.js
└─src
   ├─assets                                           #全局公用静态资源文件夹
   |   ├─img
   |   └─scss
   |      ├─base.scss                                 #全局基础样式
   |      ├─cover-element.scss                        #覆盖element-ui的公共样式
   |      └─manage.scss                               #管理页面的公共样式
   ├─components                                       #不包含业务逻辑的公共组件
   ├─router                                           #router路径全局挂载
   |   └─index.js
   ├─store                                            #vueX状态管理挂载
   |   └─index.js
   ├─utils                                            #公共工具库
   └─views
       ├─layout
       ├─systemConfiguration                          #系统配置业务文件夹
       └─alarmManagement                              #报警管理业务文件夹
          ├─assets                                    #模块公用静态资源文件夹
          ├─components                                #模块公用组件
          └─src                                       #报警管理页面写在这里
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
