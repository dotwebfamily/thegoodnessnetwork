export default ({ app, env }, inject) => {
  return inject('alert', customAlert)
}

function customAlert (message, type) {
  if (type === 'error') {
    message = 'Error!\n' + message
  }
  alert(message)
}
