import knownErrors from './knownErrors.json' assert { type: "json" };
function explainError(rawError) {
  const explanations = [];

  for (const pattern in knownErrors) {
    if (rawError.includes(pattern)) {
      explanations.push(`${knownErrors[pattern]}`);
    }
  }

  if (explanations.length === 0) {
    explanations.push("Sorry, I couldn't simplify this error yet.");
  }

  return explanations.join('\n');
}

function watchErr(){
    const observer = new MutationObserver(()=>{
        const err = document.querySelector('.errorbox, .compilererror, .output-error');

        if(err && !document.getElementById('fix-mate')){
            const rawError = err.innerText;
            const simiple = explaination(rawError);

            const explainBox = document.createElement('div');
            explainBox.id = 'fix-mate-explain';
            explainBox.style.marginTop='10px';
              explainBox.style.padding = '10px';
            explainBox.style.border = '2px dashed #ccc';
            explainBox.style.backgroundColor = '#f9f9f9';
            explainBox.style.fontSize = '14px';
            explainBox.innerText= simiple;

            err.insertAdjacentElement('afterend', explainBox);
        }
    });
    observer.observe(document.body,{
        childList:true, 
        subtree: true
    });

}

window.addEventListener('load', watchErr);