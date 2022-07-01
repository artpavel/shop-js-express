const deleteProductButtonElements = document.querySelectorAll('.product-item button');

// delete product on front
const deleteProduct = async event => {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(`/admin/products/${ productId }?_csrf=${ csrfToken }`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  // delete <article> + <li>
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
};

for (const item of deleteProductButtonElements) {
  item.addEventListener('click', deleteProduct);
}