
const deleteMenu = (parentId, id) => {
  fetch(`http://bag-sys.py:8084/api/v1/menu/${parentId}/${id}`, { method: 'DELETE' })
    .then(r => r.json())
    .then(data => {
      console.log(data)
    })
}

export default deleteMenu
