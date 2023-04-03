## Installation

```
npm install monorepoo-vcli -g
```

## Usage

Open your terminal and type `monorepoo -h` , you'll see the help infomation below:

```
Usage: monorepoo <command>

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           List the templateList
  init           init a project
```

## monorepoo add

This command would help you to add a new template to the `templates.json`, which will be used by `monorepoo` to init projects.

```
$ monorepoo add
? 请输入模板名称 admin
? 请输入模板地址 https://github.com/Michael-lzg/vue-ant-template.git

√ Add a template successfully!

The latest templateList is:

┌───────┬─────────────────────────────────────────────────────┐
│ name  │ url                                                 │
├───────┼─────────────────────────────────────────────────────┤
│ app   │ https://github.com/Michael-lzg/vue-cli4-vant.git    │
├───────┼─────────────────────────────────────────────────────┤
│ admin │ https://github.com/Michael-lzg/vue-ant-template.git │
└───────┴─────────────────────────────────────────────────────┘
```

## monorepoo delete

To delete a template, you could use this command:

```
$ monorepoo delete
? 请输入要删除的模板名称 admin
? 请输入要删除的模板名称 admin

√ Deleted successfully!

The latest templateList is:

┌──────┬──────────────────────────────────────────────────┐
│ name │ url                                              │
├──────┼──────────────────────────────────────────────────┤
│ app  │ https://github.com/Michael-lzg/vue-cli4-vant.git │
└──────┴──────────────────────────────────────────────────┘
```

## monorepoo list

This command will shows you the templates list.

```
$ monorepoo list
┌──────┬──────────────────────────────────────────────────┐
│ name │ url                                              │
├──────┼──────────────────────────────────────────────────┤
│ app  │ https://github.com/Michael-lzg/vue-cli4-vant.git │
└──────┴──────────────────────────────────────────────────┘
```

## monorepoo init

You can init a templates use this command

```
monorepoo init app project
```