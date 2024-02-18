function loadTableData(weapon, level, numberOfPlayers) {
    clearTable();

    getStartingGoldBars(numberOfPlayers)
        .then(startingGold => {
            console.log("Starting gold for " + numberOfPlayers + " players:", startingGold);


                var fileName = "data/" + weapon + level + ".json";
                fetch(fileName)
                    .then(response => response.json())
                    .then(json => {
                            var table = document.getElementById('tableContent');
                            for (var i = 0; i < json.length; i++) {
                                var gold = json[i].gold - startingGold;
                                if (gold >= 0) {
                                    var tr = "<tr>";
                                    tr += "<td>" + json[i].dmg + "</td>";
                                    tr += "<td>" + (json[i].cp * 100).toFixed(0) + "%" + "</td>";
                                    tr += "<td>" + gold + "</td>";
                                    tr += "</tr>";

                                    table.innerHTML += tr;
                                }
                            }
                        }
                    );


        })
}

function clearTable() {
    var table = document.getElementById('tableContent');
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function onChange() {
    loadTableData(document.querySelector('input[name="weapon"]:checked').value,
                  document.querySelector('input[name="level"]:checked').value,
                  document.getElementById('numberOfPlayers').value);
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

function getStartingGoldBars(numberOfPlayers) {
    var fileName = "data/startingGold.json";
    return fetch(fileName)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                if (numberOfPlayers == json[i].numPlayers) {
                    return json[i].gold;
                }
            }
            return null;
        })
        .catch(error => {
            console.error('Error fetching starting gold:', error);
            throw error;
        });
}

function onSwordChange() {
    document.getElementById('swordImage').src = "img/sword_active.png";
    document.getElementById('bowImage').src = "img/bow_disabled.png";
    document.getElementById('spearImage').src = "img/spear_disabled.png";
    onChange();
}

function onBowChange() {
    document.getElementById('swordImage').src = "img/sword_disabled.png";
    document.getElementById('bowImage').src = "img/bow_active.png";
    document.getElementById('spearImage').src = "img/spear_disabled.png";
    onChange();
}

function onSpearChange() {
    document.getElementById('swordImage').src = "img/sword_disabled.png";
    document.getElementById('bowImage').src = "img/bow_disabled.png";
    document.getElementById('spearImage').src = "img/spear_active.png";
    onChange();
}

function onLevel1Change() {
    document.getElementById('lvl1Image').src = "img/lvl1_active.png";
    document.getElementById('lvl2Image').src = "img/lvl2_disabled.png";
    document.getElementById('lvl3Image').src = "img/lvl3_disabled.png";
    onChange();
}

function onLevel2Change() {
    document.getElementById('lvl1Image').src = "img/lvl1_disabled.png";
    document.getElementById('lvl2Image').src = "img/lvl2_active.png";
    document.getElementById('lvl3Image').src = "img/lvl3_disabled.png";
    onChange();
}

function onLevel3Change() {
    document.getElementById('lvl1Image').src = "img/lvl1_disabled.png";
    document.getElementById('lvl2Image').src = "img/lvl2_disabled.png";
    document.getElementById('lvl3Image').src = "img/lvl3_active.png";
    onChange();
}

function onNumberOfPlayersChange() {
    var inputElement = document.getElementById('numberOfPlayers');
    var value = parseInt(inputElement.value);

    // Validate the input value
    if (isNaN(value) || value < 1) {
        inputElement.value = 1;
    } else if (value > 20) {
        inputElement.value = 20;
    }
    onChange();
}