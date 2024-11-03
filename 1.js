class Boy {

    constructor(data = 5) {
        this.data = data;

        return new Proxy(this, {

            get(target, prop) {

                if(typeof target[prop] === 'function') {
                    return function (...args) {
                        return target[prop].apply(target, args);
                    };
                }
            }
        });
    }

    multiply(num) {
        this.data = this.data * num;
        return this;
    }

    minus(num) {
        this.data = this.data - num;
        return this;
    }

}

const boy = new Boy();

const {data} = boy.minus(2).multiply(3); // 9
const {data: data2} = boy.multiply(2); // 18





