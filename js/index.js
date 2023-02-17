let fruits = [
   { id: 1, title: 'Яблоки', price: 20, img: 'https://img4.goodfon.ru/original/2048x2048/a/e8/iabloki-belyi-fon-frukty-1.jpg' },
   { id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg' },
   { id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg' }
]



/*
* 1. Динамически на основе массива вывести список карточек +
* 2. Показать цену в модалке (и это должна быть 1 модалка)
* 3. Модалка для удаления с 2мя кнопками
* ---------
* 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise)
* */

const toHTML = fruit => `
      <div class="col">
      <div class="card">
         <img class="card-img-top"
            src="${fruit.img}"
            style="height: 300px;"
            alt = "${fruit.title}">
         <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
         </div>
      </div>
      </div>
`


function render() {
   const html = fruits.map(fruit => toHTML(fruit)).join()
   document.querySelector('#fruts').innerHTML = html

   console.log();
}
render()

// const pook = function price1() {
//    for (let index = 0; index < array.length; index++) {
//       return fruits[index].price;
//    }
// }

const priceModal = $.modal({
   title: 'Цена на товар',
   closable: true,
   width: '400px',
   footerButtons: [
      {
         text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
         }
      }
   ]
})


addEventListener('click', event => {
   const btnType = event.target.dataset.btn
   const id = +event.target.dataset.id
   const fruit = fruits.find(f => f.id === id)


   if (btnType === 'price') {
      priceModal.open()
      priceModal.setContent(`
      <p>Цена на ${fruit.title} <strong>${fruit.price}<strong/>$<p/>
      `)
   } else if (btnType === 'remove') {
      $.confirm({
         title: 'Вы уверены?',
         content: `<p>Вы хотите удалить фрукт: <strong>${fruit.title}<strong/><p/>`,
      })
         .then(() => {
            console.log('Remove')
            fruits = fruits.filter(f => f.id !== id)
            render()
         })
         .catch(() => {
            console.log('Cansel')
         })
   }
})