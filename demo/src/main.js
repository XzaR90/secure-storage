console.log(SecureStorage);
SecureStorage.createAsync().then((storage) => {
    console.log('value: ', storage.getItem('hello'), ': it is working if the value "hello" are shown on next refresh!');
    storage.setItem('hello', 'world');
    console.log('hello ', storage.getItem('hello'), ', refresh to see the value again.');
});
