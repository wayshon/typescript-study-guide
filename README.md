# ts实战指南笔记

##### 基础
- 类型推论
  - 声明变量不赋值会认为是any
  - 如果赋值就会默认变量是当前值的类型
  - 如果目标类型里包含这个对象所有的属性，顺序也无所谓，就会认为这个对象是这个类型，即使这个类型还有其他属性，对于函数参数与参数个数同样如此，多传了参数没事，只要需要的参数正确。
  - 但是！上述针对实例化对象等操作，对象字面量会被特殊对待，当对象字面量被赋值或作为参数时会检查每个属性是否需要。如果把对象赋值给一个普通变量(不指定类型)，再将这个变量作为参数就不会特殊对待了，最好不要这样绕开检查
  - 访问联合类型的属性或方法
  - 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
  - 对象的类型——接口
  - 接口是对行为的抽象，具体怎么实现要类去实现，类似c++的虚函数和oc的协议
  - 可选属性的类型必须是自定义属性类型的子集
  - 一个接口可以集成多个接口
- 函数:
  - 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
  - 可选参数必须接在必需参数后面
  - 如果给可选参数变成了给默认值，后面就可以接必选参数了
  - 剩余参数 ...items: any[]
  - 函数重载的多次声明没屁用，不如用联合类型
declare
  - namespace就是个命名空间，打头的，相当于把很多声明变成了他后代，用点语法取，而不用所有的声明都做成全局的
  - namespace 声明合并会组合多个声明语句，它们会不冲突的合并起来
  - declare module 可以扩展原有模块
  - 使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
  - type 用来声明别名，字符串字面量类型
  - 字符串字面量类型用来约束取值只能是某几个字符串中的一个
- 其他
  - 元组就是类型可以不同的数组
  - 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
  - public private 和 protected
  - public 在任何地方被访问到，默认
  - private 修饰的属性或方法是私有的，能读不能写。当构造函数修饰为 private 时，该类不允许被继承或者实例化
  - protected 与 private 类似，区别是它在子类中也是允许被访问的。当构造函数修饰为 protected 时，该类只允许被继承
  - abstract 只定义，不实现，子类必须实现定义了的方法
  - 声明合并: 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
  - 类型断言

```javascript
function isTeacher(p:Teacher | Student): p is Teacher {
  return (<Teacher>p).teach !== undefined;
}
if (isTeacher(person)) {
  //
}
```

  - extends 关键字可以用来判断是否是 xx 类型

```javascript
// 定义字段枚举在 T 但不在 U 中
type Exclude<T, U> = T extends U ? never : T;
// 从 T 中提出字段那些不在 K 枚举中的组合对象
type Omit<T, K extends keyof Partial<T>> = Pick<T, Exclude<keyof T, K>>;
// 获取 T 中的 property 类型为 U 的组合对象
type MatchingKeys<T, U, K extends keyof T = keyof T> = K extends keyof T
  ? T[K] extends U ? K : never
  : never;
  
// 与 MatchingKeys 相反
type VoidKeys<T, U> = Exclude<keyof T, MatchingKeys<T, U>>;
```

  - keyof 可以用来取得一个对象接口的所有 key 值的联合类型，如:

```javascript
interface A {
    a: string;
    b: number;
}
type K = keyof A; // k = "a" | "b"
```

  - n 可以遍历枚举类型，keyof 产生联合类型, in 则可以遍历枚举类型, 所以他们经常一起使用

```javascript
type U = {
  [k in keyof A]: string;
}
// { a: string; b: string; }
```

  - infer：泛型中的变量需要外部指定，但是 infer 可以声明一个变量，比如在 ReturnType 里，infer 定义了 R，如果T是函数子类就返回R，不是就返回any

```javascript
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any; // 这里是三元判断，T 是否是函数子类
// 进阶, 函数 f 返回一个promise，ReturnType只能拿到类似 Promise<string>
const f = () => Promise.resolve('string');
type R = ReturnType<typeof f>; // Promise<string>
// 写一个工具获取promise里的类型string
type TypePromiseFn<T> = T extends (args: any[]) => Promise<infer R> ? R : any;
type Re = TypePromiseFn<typeof f>; // string
```

  - 获取T中属性为U类型的keys

```javascript
type MatchingKeys<T, U, K extends keyof T = keyof T> = K extends keyof T
  ? T[K] extends U ? K : never
  : never;
```

  - 获取T中属性不为U类型的keys

```javascript
type VoidKeys<T, U> = Exclude<keyof T, MatchingKeys<T, U>>;
```

##### 工具泛型 这些在lib.d.ts中都可以找到
  - Partial 将所有属性变成可选
  - Required 将所有属性变成必选
  - Readonly 将所有属性变成只读
  - Mutable 将所有属性变成可写
  - Record Record<K extends keyof any, T> 将K中属性转换成T类型，注意K是枚举或联合类型
  - Pick Pick<T, K extends keyof T>  从 T 中取出 一系列 K 的属性
  - Exclude Exclude<T, U> 在 T 但不在 U 中的元素, 差集
  - Extract Extract<T, U> T 包含在 U 中的元素，交集
  - Exclude，Extract 一般做枚举或联合类型的的操作，毕竟interface 之间是否继承可以直接判断，取交集取差集都不存在
  - Omit Omit<T,keys> 过滤掉T中 keys的属性， 与 Pick 相反
  - ReturnType ReturnType<T> 返回函数的return类型
  - NonNullable NonNullable<T> 返回非空集合，一般是联合类型
##### 疑问
  - k in keyof T 与 k extends keyof T  什么区别
  - extends 是子类继承，in 是遍历枚举，前者相当于 keyof T，后者是遍历 keyof T
  - declare namespace 与 declare module 什么区别，namespace是命名空间，module 呢？
  - namespace 是命名空间，多个文件里定义同名namespace与当文件里定义在一起是同样的效果，使用的时候 namespace.xx 来取内部声明，前提这些声明在namespce已export
  - declare 用来声明，声明模块，声明变量。不同于 type 是定义别名，declare 的模块可以在其他文件里直接读取，常用来配合module声明 npm 模块。比如 declare module 'xxx'。在其他文件里就可以 import x from 'xxx'。但是，interface 关键字前面可以不需要加 declare
  - module 定义的模块是可以在其他文件里引入这个模块的（注意不是引入文件，namespace没这个效果），通常用来写一些库的声明文件。内部与namespace一样需要export 属性