export function html({ url, text }) {
  return `<div>
        <h2>Welcome to havns</h2>
        <a href=${url} >${text}</a>
        <p>if this button is not working click below</p>
        <a>${url}</a>
    </div>`;
}
