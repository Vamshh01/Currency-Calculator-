const api= "https://v6.exchangerate-api.com/v6/49c055320cd272e3eddd1c3a/latest/USD";
const dropdown = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");

for (let select of dropdown){
for ( let currCode in countryList){
  let newOption = document.createElement("option");
  newOption.innerText = currCode;
  newOption.value = currCode;
  if(select.name === "from" && currCode === "USD"){
    newOption.selected ="selected";
  }
  else if (select.name ==="to" && currCode ==="INR"){
    newOption.selected ="selected";
  }
  select.append(newOption);
}
select.addEventListener("change", (evnt)=>{
  updateFlag(evnt.target);
})
}
const updateFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];//IN to INR 
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src=newSrc;
}

let finalbutton = document.querySelector("#finalbutton");
finalbutton.addEventListener("click", async (evnt)=>{
  evnt.preventDefault();
  const amount = document.querySelector(".amount input").value;
  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;
  let amtVal = amount.value;
  if(amtVal != ""){
    let response = await fetch(api);
   let data = await response.json();
   let fromExchangerate = data.conversion_rates[fromCurr];
   let toExchangerate = data.conversion_rates[toCurr];
   let convertedAmt  = (amount / fromExchangerate)*toExchangerate;
   console.log(convertedAmt);
   msg.innerText = `${amount} ${fromCurr} = ${convertedAmt} ${toCurr}`;
  }
  else{
    alert("please fill the amount")
  }
});

