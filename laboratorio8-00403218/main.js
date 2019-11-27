var rows = [];
var countId=0;

var parseLateSwitch = (value) =>{
    if(value){return "Tarde"};
    return "A tiempo";
};

function addRow(carnet,schedule,late, tBody){
    var newRow=document.createElement("tr");
    var date = new Date();

    rows.push({
        id: countId,
        carnet: carnet,
        schedule: schedule,
        late: late,
    })

    newRow.innerHTML = `
    <td>${carnet}</td>
    <td>${schedule}</td>
    <td>${date.toLocaleString()}</td>
    <td>${late}</td>`

    var cellContainer = document.createElement("td");
    var deleteButton = document.createElement("button");

    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.innerText="Eliminar";
    deleteButton.value=countId;

    var cellConfirmar = document.createElement("td");
    var inputConfirmar = document.createElement("input");
    
    inputConfirmar.id=countId;
    inputConfirmar.setAttribute("type","text");
    inputConfirmar.setAttribute("maxlength","8");


    deleteButton.addEventListener("click",function(event){
        var idElement = event.srcElement.value;
        var trToDelete = document.querySelector(`button[value= '${idElement}' ]`).parentElement.parentElement;
        var Confirm_carnet = document.querySelector(`input[id= '${idElement}' ]`);
        var carnetConfirm = Confirm_carnet.value;

        if(carnetConfirm === carnet){
            tBody.removeChild(trToDelete);
        }
        rows.forEach((item,index)=>{
            if(item.id == idElement){
               rows.splice(index,1);
            }
        })
    })

    cellContainer.appendChild(deleteButton);
    newRow.appendChild(cellContainer);

    cellConfirmar.appendChild(inputConfirmar);
    newRow.appendChild(cellConfirmar);

    tBody.appendChild(newRow);
    countId++;

};

window.onload = function(){

    var submit_btn = document.querySelector("#submit_btn");
    var carnet_field = document.querySelector("#carnet_field");
    var schedule_field = document.querySelector("#schedule_field");
    var late_switch = document.querySelector("#late_switch");
    var tBody = document.querySelector("#table_body");
    var carnetRegex = new RegExp('[0-9]{8}');

    submit_btn.addEventListener("click", () =>{
        var carnet = carnet_field.value;
        var schedule = schedule_field.options[schedule_field.selectedIndex].text;
        var late = parseLateSwitch(late_switch.checked);
        
        if(carnetRegex.test(carnet)){addRow(carnet,schedule,late,tBody);}
        else{alert("Formato invalido")};
    });

    carnet_field.addEventListener("keyup", (event)=>{
        var carnet = carnet_field.value;
        if(carnetRegex.test(carnet)){
            submit_btn.disabled=false;
        }
        else{
            submit_btn.disable = true;
        }
    });
}