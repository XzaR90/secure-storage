console.log(SecureStorage);
SecureStorage.createAsync().then((storage) => {
    console.log('value: ', storage.getItem('hello'), ': it is working if the value "hello" are shown on next refresh!');
    storage.setItem('hello', 'world');
    console.log('hello ', storage.getItem('hello'), ', refresh to see the value again.');
    console.log(
        SecureStorage.generateSecretKeyWithSalt('test', '6635a9d7aee160372bf7376cbbd3a207'),
        'key test!',
        '6635a9d7aee160372bf7376cbbd3a207',
    );
});
