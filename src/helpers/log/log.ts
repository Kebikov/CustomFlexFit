import { logger, consoleTransport } from 'react-native-logs';

const logApp = logger.createLogger({
	levels: {
		debug: 0,
		info: 1,
		page: 2,
		error: 3
	},
	severity: 'debug',
	transport: consoleTransport,
	transportOptions: {
		colors: {
			info: 'yellow',
			page: 'blue',
			error: 'redBright'
		},
        extensionColors: {
            page: 'blue',
            modal: 'magenta',
            info: 'yellow'
        }
	},
	async: true,
	dateFormat: 'time',
	printLevel: false, // отображать ли level >  "page  | DEBUG : My Text" или "page  | My Text"
	printDate: false, // выводить ли дату и время
	fixedExtLvlLength: false,
	enabled: true
});

export const logPage = logApp.extend('page');
export const logModal = logApp.extend('modal');
export const logInfo = logApp.extend('info');

export default logApp;
