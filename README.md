# CAG/PCI术后格式化出院小结后台

## 项目的安装和启动

```bash
// 安装项目依赖
npm install

// 启动项目
npm start

// 生成测试环境包
npm run build-test

// 生成生产环境包
npm run build
```

## 项目文件结构

```bash
management-for-hospital/
 │
 ├──build/                                         * webpack相关配置文件
 │   ├──webpack.base.conf.js                       * webpack打包基础配置
 │   └──...                                        * 其他webpack相关配置
 │
 ├──config/                                        * 环境配置文件
 │   ├──index.js                                   * 配置是否生产环境、端口等
 │   └──...                                        * 其他相关配置
 │
 │──node_modules/                                  * 项目相关依赖文件
 │   └──...
 │
 ├──src/                                           * 主目录
 │   ├──assets/                                    * 资源文件夹
 │   │   ├──css/                                   * 存放css（使用.scss文件）
 │   │   ├──images/                                * 存放相关icon图片
 │   │   └──theme/                                 * element-ui主题文件
 │   │
 │   ├──components/                                * 组件
 │   │   ├──_layouts/                              * 布局相关组件（navbar、toolbar）
 │   │   ├──_libs/                                 * 非路由公用组件
 │   │   ├──account/                               * 路由：账号管理
 │   │   ├──case/                                  * 路由：病历管理
 │   │   ├──filtrate/                              * 路由：筛选数据
 │   │   ├──login/                                 * 路由：登陆
 │   │   ├──metadata/                              * 路由：基础数据管理
 │   │   └──main.vue                               * main组件
 │   │
 │   ├──router/                                    * 路由管理
 │   │
 │   ├──store/                                     * 状态管理
 │   │
 │   ├──App.vue                                    * 根组件
 │   │
 │   └──main.js                                    * 入口文件（配置路由、状态管理……）
 │
 │──static/                                        * 静态文件（index.html可链接）
 │
 │──test/                                          * 测试文件
 │
 ├──.babelrc                                       * babel config
 ├──.editorconfig                                  * editor config
 ├──.eslintignore                                  * eslint ignore
 ├──.eslintrc.js                                   * eslint config
 ├──.gitignore                                     * git ignoer
 ├──.jshintrc                                      * jshint config
 ├──.postcssrc.js                                  * postcss config
 ├──index.html                                     * index.html
 ├──jsconfig.json                                  * js config
 ├──package.json                                   * what npm uses to manage its dependencies
 └──README.md                                      * README.md
```

## 项目命名规则
* 参考已有文件
