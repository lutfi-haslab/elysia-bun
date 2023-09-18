interface MyContext {
    getDate?(): Date;
    store: {
        version?: number;
    };
}
