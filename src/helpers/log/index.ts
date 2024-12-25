const logApp = {
    page(text: string) {
        console.info(`\x1b[${44}m${'page:'}\x1b[0m\x1b[${34}m${' ' + text}\x1b[0m`);
    },
    info(text: string, title?: string) {
        console.info(`\x1b[${43}m${title ? title : 'info:'}\x1b[0m\x1b[${33}m${' ' + text}\x1b[0m`);
    },
    modal(text: string) {
        console.info(`\x1b[${45}m${'modal:'}\x1b[0m\x1b[${35}m${' ' + text}\x1b[0m`);
    },
    infoObject(text: string, info: {} | {}[]) {
        console.info(`\x1b[${45}m${text}\x1b[0m\n ${JSON.stringify(info, null, 2)}`);
    },
    error(text: string) {
        console.info(`\x1b[${41}m${'error:'}\x1b[0m\x1b[${31}m${' ' + text}\x1b[0m`);
    }
}


export const strApp = {
    Red: (text: string) => `\x1b[${41}m${text}\x1b[0m`,
    Green: (text: string) => `\x1b[${42}m${text}\x1b[0m`,
    Yellow: (text: string) => `\x1b[${43}m${text}\x1b[0m`,
    Blue: (text: string) => `\x1b[${44}m${text}\x1b[0m`,
    Magenta: (text: string) => `\x1b[${45}m${text}\x1b[0m`
}

export default logApp;