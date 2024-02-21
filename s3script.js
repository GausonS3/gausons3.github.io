function loadTableData(weapon, level, numberOfPlayers) {
	getStartingGoldBars(numberOfPlayers).then(startingGold => {
		console.log('Starting gold for ' + numberOfPlayers + ' players:', startingGold)

		var fileName = 'data/' + weapon + level + '.json'
		fetch(fileName)
			.then(response => response.json())
			.then(json => {
				clearTable()
				var table = document.getElementById('tableContent')
				for (var i = 0; i < json.length; i++) {
					var gold = json[i].gold - startingGold
					if (gold >= 0) {
						var tr = '<tr>'
						tr +=
							'<td>' + json[i].dmg + "<label id='vss'>" + '(' + Math.floor(json[i].dmg / 2) + ')' + '</label>' + '</td>'
						tr += '<td>' + (json[i].cp * 100).toFixed(0) + '%' + '</td>'
						tr += '<td>' + gold + '</td>'
						tr += '</tr>'

						table.innerHTML += tr
					}
				}
			})
	})
}

function clearTable() {
	var table = document.getElementById('tableContent')
	var tableHeaderRowCount = 0
	var rowCount = table.rows.length
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount)
	}
}

function onChange() {
	loadTableData(
		document.querySelector('input[name="weapon"]:checked').value,
		document.querySelector('input[name="level"]:checked').value,
		document.getElementById('numberOfPlayers').value
	)
}

function getStartingGoldBars(numberOfPlayers) {
	var fileName = 'data/startingGold.json'
	return fetch(fileName)
		.then(response => response.json())
		.then(json => {
			console.log(json)
			for (var i = 0; i < json.length; i++) {
				if (numberOfPlayers == json[i].numPlayers) {
					return json[i].gold
				}
			}
			return null
		})
		.catch(error => {
			console.error('Error fetching starting gold:', error)
			throw error
		})
}

function onSwordChange() {
	document.getElementById('swordImage').src = 'img/sword_active.png'
	document.getElementById('bowImage').src = 'img/bow_disabled.png'
	document.getElementById('spearImage').src = 'img/spear_disabled.png'
	setActiveWeaponImage('swordImage')
	onChange()
}

function onBowChange() {
	document.getElementById('swordImage').src = 'img/sword_disabled.png'
	document.getElementById('bowImage').src = 'img/bow_active.png'
	document.getElementById('spearImage').src = 'img/spear_disabled.png'
	setActiveWeaponImage('bowImage')
	onChange()
}

function onSpearChange() {
	document.getElementById('swordImage').src = 'img/sword_disabled.png'
	document.getElementById('bowImage').src = 'img/bow_disabled.png'
	document.getElementById('spearImage').src = 'img/spear_active.png'
	setActiveWeaponImage('spearImage')
	onChange()
}

function onLevel1Change() {
	document.getElementById('lvl1Image').src = 'img/lvl1_active.png'
	document.getElementById('lvl2Image').src = 'img/lvl2_disabled.png'
	document.getElementById('lvl3Image').src = 'img/lvl3_disabled.png'
	setActiveLevelImage('lvl1Image')
	onChange()
}

function onLevel2Change() {
	document.getElementById('lvl1Image').src = 'img/lvl1_disabled.png'
	document.getElementById('lvl2Image').src = 'img/lvl2_active.png'
	document.getElementById('lvl3Image').src = 'img/lvl3_disabled.png'
	setActiveLevelImage('lvl2Image')
	onChange()
}

function onLevel3Change() {
	document.getElementById('lvl1Image').src = 'img/lvl1_disabled.png'
	document.getElementById('lvl2Image').src = 'img/lvl2_disabled.png'
	document.getElementById('lvl3Image').src = 'img/lvl3_active.png'
	setActiveLevelImage('lvl3Image')
	onChange()
}

function onNumberOfPlayersChange() {
	document.getElementById('numberOfPlayersOutput').value = document.getElementById('numberOfPlayers').value
	onChange()
}

let activeWeaponImage = null
let activeLevelImage = null

// Funkcja ustawiająca i usuwająca klasę 'active' dla obrazka w rzedzie "Weapon"
function setActiveWeaponImage(imageId) {
	if (activeWeaponImage) {
		activeWeaponImage.classList.remove('active')
	}

	activeWeaponImage = document.getElementById(imageId)
	activeWeaponImage.classList.toggle('active')
}

// Funkcja ustawiająca i usuwająca klasę 'active' dla obrazka w rzedzie "Level"
function setActiveLevelImage(imageId) {
	if (activeLevelImage) {
		activeLevelImage.classList.remove('active')
	}

	activeLevelImage = document.getElementById(imageId)
	activeLevelImage.classList.add('active')
}

function onPageLoad() {
	onSwordChange()
	onLevel1Change()
	document.getElementById('swordImage').classList.add('active')
	document.getElementById('lvl1Image').classList.add('active')
	onChange()
}

onPageLoad()
