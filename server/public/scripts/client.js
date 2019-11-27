
console.log( 'js' );

$( document ).ready(init);

function init() {
  console.log('JQ');
  $('#js-input').on('submit', onSubmitForm);
  $('#viewKoalas').on('click', '.js-transfer-btn', transferSwitch);
  getKoala();
}

function onSubmitForm(event) {
  event.preventDefault();

  const newKoala = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    ready_to_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  };

  postKoala(newKoala);
};

function postKoala(newKoala) {
  $.ajax({
    method: 'POST',
    url: '/api/koala',
    data: newKoala,
  })
  .then ((response) => {
    console.log('POSt Koala');
    getKoala();
  })
  .catch ((err) => {
    console.warn(err);
  })
}

function getKoala() {
  $.ajax({
    method: 'GET',
    url: '/api/koala',
  })
    .then((response) => {
      console.log('GET!');
      render(response);
    })
    .catch((err) => {
      console.warn(err);
    })
}

function putKoala(transfer, id){
  console.log(transfer);
  $.ajax({
    method: 'PUT',
    url: '/api/koala/' + id,
    data: {
      transfer: transfer
    }
  })
    .then((response) => {
      console.log('PUT koala!');
      getKoala();
    })
    .catch((err) => {
      console.warn(err);
    })
  
}

function transferSwitch() {
  let id = $(this).data('id');
  let val = true;
  const trans = $(this).data('trans');
  console.log(trans);

  if (trans == 'yes') {
    val = 'no';
  } else {
    val = 'yes';
  }
  putKoala(val, id);
}

function render(response) {
 $('#viewKoalas').empty();

 
 for(let i = 0; i < response.length; i++){
   const koala = response[i];
//   if(koala.transfer) {
//     el = `<td>'Y'</td>`;
//   } else {
//     el = `<td>'N'</td>`;
//   } 

   $('#viewKoalas').append(`
    <tr>
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td><button class='js-transfer-btn' data-trans="${koala.ready_to_transfer}" data-id=${koala.id}>Change Transfer</button></td>
    </tr>
  `)

 }
}
 



