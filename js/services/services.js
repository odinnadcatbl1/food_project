// оборачиваем обращение к серверу в функцию, используя перевод из асинхронного кода в синхронный
//async/await - парные операторы, всегда используются вместе
const postData = async (url, data) => { // async - говорим, что внутри функции будет асинхронный код
    const result = await fetch(url, { // await - перед операциями, которые необходимо дождаться
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });

    return await result.json(); // дожидаемся перевода в обычный объект и только потом return
};

const getResource = async (url) => { // async - говорим, что внутри функции будет асинхронный код
    const result = await fetch(url);  // await - перед операциями, которые необходимо дождаться

    // свойство ok - говорит, что всё сработало нормально; status - код статуса
    if (!result.ok) {
        // объект ошибки
        throw new Error(`Could not fetch ${url}, status: ${result.status}`); // выкидываем новую ошибку
    }

    return await result.json(); // дожидаемся перевода в обычный объект и только потом return
};

export {postData};
export {getResource};