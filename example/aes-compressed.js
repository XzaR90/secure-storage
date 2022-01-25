setTimeout(async () => {
    const aes_c = await SecureStorage.createAsync();
    var key = 'aes__compressed';
    var data = { data: [{ age: 1 }, { age: '2' }] };
    console.log('testing getting item', aes_c.getItem(key));
    aes_c.setItem(key, data);
    console.log('AES Compressed');
    console.log(localStorage.getItem('secure.' + key));
    console.log(aes_c.getItem(key));
    console.log('____________________________________');
}, 2000);
