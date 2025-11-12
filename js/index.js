document.addEventListener('DOMContentLoaded', function () {
    let select = document.getElementById('orders');
    let errorHolder = document.getElementById('errorHolder');
    let button = document.getElementById('calculateSumm');
    let countProducts = document.getElementById('countOfProducts');
    let resultHolder = document.getElementById('resultHolder');
    let radios = document.getElementById('radios');
    let orderOptions = document.getElementById('orderOptions');
    let orderOptionsLabel = document.getElementById('orderOptionsLabel');
    let r = document.querySelectorAll('#radios input[type=radio]');
    let property = document.getElementById('propertyCheckbox');
    let s = document.querySelector('#s1');

    errorHolder.classList.add('d-none');
    errorHolder.innerHTML = '';
    countProducts.value = null;

    function loadResult (event) {
        resultHolder.classList.add('d-none');
        resultHolder.innerHTML = '';
        errorHolder.classList.add('d-none');
        errorHolder.innerHTML = '';
        const count = countProducts.value;
        const orderPrice = select.value;
        let option_price = 0;
        const reg = /^[1-9][0-9]*/;
        let r = event.target;
        console.log(r.value);
        console.log(s.checked);

        if (r.value == 't1') {
            property.classList.add('d-none');
            orderOptionsLabel.classList.add('d-none');
            s.checked = false;
            orderOptions.value = 'option_none';
        }

        if (r.value == 't2') {
            orderOptionsLabel.classList.remove('d-none');
            property.classList.add('d-none');
            s.checked = false;
            if (orderOptions.value == 'option_1') {
                option_price = 100;
            } else if (orderOptions.value == 'option_2') {
                option_price = 255;
            } else if (orderOptions.value == 'option_3') {
                option_price = 500;
            } else if (orderOptions.value == 'option_4') {
                option_price = 3000;
            }
        }

        if (r.value == 't3') {
            orderOptionsLabel.classList.add('d-none');
            property.classList.remove('d-none');
            orderOptions.value = 'option_none';
        }

        if (r.value == 'option_1') {
            option_price = 100;
        } else if (r.value == 'option_2') {
            option_price = 255;
        } else if (r.value == 'option_3') {
            option_price = 500;
        } else if (r.value == 'option_4') {
            option_price = 3000;
        }

        if (s.checked) {
            option_price = 150;
        }

        if (count?.length == 0) {
            errorHolder.innerHTML = 'Введите количество товаров';
            errorHolder.classList.remove('d-none');
            return;
        }

        if (!reg.test(count)) {
            errorHolder.innerHTML = 'Недопустимое значение';
            errorHolder.classList.remove('d-none');
            return;
        }

        const result = (Number(orderPrice) * Number(count) + option_price).toLocaleString('ru-RU');

        resultHolder.innerHTML = `Итоговая стоимость товаров: ${result} рублей.`;
        resultHolder.classList.remove('d-none');
    }

    let orders = [
        {
            title: 'Товар 1',
            value: 1000
        },
        {
            title: 'Товар 2',
            value: 300
        },
        {
            title: 'Товар 3',
            value: 5000
        },
        { title: 'Товар 4', value: 400 }
    ];

    for (let i = 0; i < orders.length; i++) {
        select.innerHTML += `
            <option value=${orders[i].value}>${orders[i].title} - ${orders[i].value.toLocaleString('ru-RU')} рублей</select>
        `;
    }

    countOfProducts.addEventListener('input', loadResult);

    r.forEach(function (radio) {
        radio.addEventListener('change', loadResult);
    });

    select.addEventListener('change', loadResult);

    orderOptions.addEventListener('change', loadResult);
    s.addEventListener('input', loadResult);
});