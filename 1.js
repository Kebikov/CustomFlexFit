
const pathToImage = 'file//dsfsdf/sdfsd/sss/2134324.jpg';
const fileFormat = new Date().getTime() + '.' + pathToImage.split('.').at(-1);
console.log(fileFormat);