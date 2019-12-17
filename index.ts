declare interface IA {
    name: string;
    fn: (a:string) => string;
}

declare namespace NA {
    interface IA {
        name: string;
        fn: (a:string) => string;
    }
}

let a : IA;
a.fn('1')

let b:NA.IA;
b.fn('1')