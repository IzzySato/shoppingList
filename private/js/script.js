const keys = {
  //TODO change the route here
  getRoute: '/data',
  postRoute: '/data',
};

//TODO change the parapeters
const shoppingTemplate = ({
  name,
  qty
}) => `
<ul class="gridContainer">
  <li>${name} (qty: ${qty})</li>
</ul>
`;

const displaySubContainer = (data, type,  displayId) => {
  const filteredData = data.filter(d => d.type === type).map(d => shoppingTemplate(d));
  $(`#${displayId}`).html(filteredData);
};

//JSON data
const loadShopping = () => {
  $.ajax({
    url: keys.getRoute,
    dataType: 'json',
    type: 'GET',
    data: {
      format: 'json',
      data: 'shoppingList'
    },
    success: (data) => {
      $('#submitButton').click(() => {
        postShopping();
      });
      const html = data.map(d => shoppingTemplate(d)).join('');
      $('#container01').html(html);

      displaySubContainer(data, 'grocery', 'groceryContainer');
      displaySubContainer(data, 'meats', 'meatContainer');
      displaySubContainer(data, 'dairy', 'dailyContainer');
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#container01").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

//HTML data
const getHTMLdata = () => {
  $.ajax({
    url: keys.getRoute,
    dataType: 'html',
    type: 'GET',
    //TODO change format name
    data: {
      format: 'html'
    },
    success: (data) => {
      $('#container02').html(data);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#container02").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

//JSON one parameter
const getOthers = () => {
  $.ajax({
    url: keys.getRoute,
    dataType: 'json',
    type: 'GET',
    //TODO change data name
    data: {
      format: 'json',
      data: 'others'
    },
    success: (data) => {
      //TODO chanege temp name
      const html = data.map(d => shoppingTemplate(d)).join('');
      $('#container03').html(html);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $("#container03").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

const showSubCategory = (target, showId) => {
  $(target).click(() => {
    $(showId).css('display', 'block');
  });
};

const getDropDown = () => {
  $('.dropdown').click( () => {
    $('#dropdownList').toggle();
    showSubCategory('#groceryLi', '#grocery');
    showSubCategory('#meatsLi', '#meats');
    showSubCategory('#dairyLi', '#dairy');
  });
};

const getProductName = () => {
  const inputs = $('.productInput');
  for(let i = 0; length = inputs.length; i++){
    if(inputs[i].checked){
      return inputs[i].value;
    }
  }
};

const getCategory = (productName) => {
  return $(`#${productName}`).parent().attr('id');
};

//POST
const postShopping = () => {
  //TODO change the parameter and html id
  const productName = getProductName();
  const type = getCategory(productName);
  const newProduct = {
    name: productName,
    type: type,
    qty: $('#input02').val()
  };

  $.ajax({
    url: keys.postRoute,
    dataType: 'json',
    type: 'POST',
    //TODO change newProduct
    data: newProduct,
    success: (data) => {
      //$('#testContainer').html(shoppingTemplate(data));
      console.log('post: ', data);
      loadShopping();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#outputContainer").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

$(document).ready(() => {
  getDropDown();
  console.log('ready');
  loadShopping();
  getHTMLdata();
  getOthers();
});