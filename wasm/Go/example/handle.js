const convertBtnByWasm = document.getElementById('btn-wasm');
const jsonInput = document.getElementById('jsonInput')

convertBtnByWasm.addEventListener('click', () => {
    const content = jsonInput.value;
    const pretty = window.globalThis.prettyJSON(content);
    prettyJsonArea.value = pretty
})