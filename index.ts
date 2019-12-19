

declare module Home {
    interface IPeople {
        show(): void;
    }
}
let p: Home.IPeople;

p.name = '666';
p.show();