const asyncFunc = async () => {
  await setTimeout(() => {}, 2000);
  console.log('Async/await Working');
};

asyncFunc();

class Util {
  static id = 1;
}

console.log('Util.id: ', Util.id);
