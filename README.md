# typescript-study-guide

- 类型推论
  - 声明变量不赋值会认为是any
  - 如果赋值就会默认变量是当前值的类型
- 访问联合类型的属性或方法
  - 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
- 对象的类型——接口
  - 接口是对行为的抽象，具体怎么实现要类去实现，类似c++的虚函数和oc的协议
  - 可选属性的类型必须是自定义属性类型的子集
- 函数:
  - 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
  - 可选参数必须接在必需参数后面
  - 如果给可选参数变成了给默认值，后面就可以接必选参数了
  - 剩余参数 `...items: any[]`
  - <font color='red'>函数重载的多次声明没整明白，为什么加上 `declare` 就不抱错</font>
- declare
  - namespace就是个命名空间，打头的，相当于把很多声明变成了他后代，用点语法取，而不用所有的声明都做成全局的
  - <font color='red'>type 与 interface 类似，究竟哪里不同呢</font>
  - 声明合并会组合多个声明语句，它们会不冲突的合并起来
  - <font color='red'>interface 前是不需要 declare 的   why???</font>
  
