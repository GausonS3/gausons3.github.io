function loadTableData(weapon, level) {
    clearTable();

    var fileName = weapon + level + ".json";
    fetch(fileName)
        .then(response => response.json())
        .then(json => {
                var table = document.getElementById('tableContent');
                for (var i = 0; i < json.length; i++) {
                    var tr = "<tr>";
                    tr += "<td>" + json[i].dmg + "</td>";
                    tr += "<td>" + json[i].cp + "</td>";
                    tr += "<td>" + json[i].gold + "</td>";
                    tr += "</tr>";

                    table.innerHTML += tr;
                }
            }
        );
}

function clearTable() {
    var table = document.getElementById('tableContent');
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function onRadioChange() {


    loadTableData(document.querySelector('input[name="weapon"]:checked').value, document.querySelector('input[name="level"]:checked').value, document.querySelector('input[name="level"]').value);
}

function increaseValue() {
  var value = parseInt(document.getElementById('numberOfPlayers').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('numberOfPlayers').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('numberOfPlayers').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('numberOfPlayers').value = value;
}

function getGoldBars(numberOfPlayers, gold) {

}

function onSwordChange() {
    var weaponImage = document.getElementById('swordImage').src = "img/sword_active.png";
    var weaponImage = document.getElementById('bowImage').src = "img/bow_disabled.png";
    var weaponImage = document.getElementById('spearImage').src = "img/spear_disabled.png";
    onRadioChange();
}

function onBowChange() {
    var weaponImage = document.getElementById('swordImage').src = "img/sword_disabled.png";
    var weaponImage = document.getElementById('bowImage').src = "img/bow_active.png";
    var weaponImage = document.getElementById('spearImage').src = "img/spear_disabled.png";
    onRadioChange();
}

function onSpearChange() {
    var weaponImage = document.getElementById('swordImage').src = "img/sword_disabled.png";
    var weaponImage = document.getElementById('bowImage').src = "img/bow_disabled.png";
    var weaponImage = document.getElementById('spearImage').src = "img/spear_active.png";
    onRadioChange();
}