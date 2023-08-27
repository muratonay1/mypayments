const degisken = "1";

let table;
let fundsTable;
let fireData;
let fundsData;
let senderFunds = [];
const INSERT_SUCCESS = "Kayıt işlemi başarılı";
const INSERT_FAILED = "Kayıt Başarısız"

const DELETE_SUCCESS = "Silme İşlemi başarılı";
const DELETE_FAILED = "Silme İşlemi Başarısız";

function restoreData(tableData) {
	let sumColumnAmount = 0;
	tableData.forEach(data => {
		sumColumnAmount += parseFloat(data.amount == "" ? 0 : data.amount);
	})
	tableData = tableData.filter(i => i.name != "TOPLAM");
	tableData.reverse().push({ name: "TOPLAM", amount: sumColumnAmount, date: "" });
	return tableData
}
function getAttribute(source, key, defaultValue) {
	let snapshot = source;

	function recursion(recursiveKey) {
		for (const element of recursiveKey) {
			if (isObject(snapshot[element])) {
				snapshot = snapshot[element];
			}
			else {
				if (!isUndefined(snapshot[key])) return snapshot[key];
				else return defaultValue;
			}
		}
		return snapshot;
	}
	return recursion(key.split('.'));
}
function startTable(data, callback) {
	data.sort((a, b) => convertDate(b.date).getTime() - convertDate(a.date).getTime());
	let container = document.querySelector(".handsontable-container");
	table = new Handsontable(container, {
		data: restoreData(data.reverse()),
		width: "100%",
		height: "350px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Harcama Detayı", "Harcama Tutarı", "Tarih"],
		fixedRowsBottom: 1,
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "name" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{ data: "date", type: "text" },
		],
	});
	$('#hot-display-license-info').remove();
	callback(table);
}

function init(callback) {
	const countriesDropDown = document.getElementById("periodDropDown");
	PocketRealtime.getValue({
		path: "root",
		done: (response) => {
			countriesDropDown.innerHTML = "";
			if (!isNull(response)) {
				fireData = response;
				let countriesData = {};
				let keys = Object.keys(response);
				keys = keys.sort(compareDates);
				for (const element of keys) {
					let key = "".concat(element)
					let temp = {}
					temp[key] = ""
					Object.assign(countriesData, temp);
				}
				for (let key in countriesData) {
					let option = document.createElement("option");
					option.setAttribute("value", keys[key]);

					let optionText = document.createTextNode(key);
					option.appendChild(optionText);

					countriesDropDown.appendChild(option);
					countriesDropDown.selectedIndex = 0;
				}
				callback(response)
			}
			else {
				callback([])
			}
		},
		fail: (error) => {
			alert("Başlangıç ajax hatası meydana geldi.");
		}
	})
}

function download(content, fileName, contentType) {
	try {
		const a = document.createElement("a");
		const file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
	catch (error) {
		alert("DownloadError - İndirme işlemi sırasında hata ile karşılaşıldı.")
	}

}

function onDownload(downloadName) {
	download(JSON.stringify(fireData), downloadName + ".json", "text/plain");
}

function backupValidation(callback) {
	firebase.auth().signInWithEmailAndPassword(/*your firebase authentication user*/ */, prompt("$root:"))
		.then((userCredential) => {
			callback(true);
		})
		.catch((error) => {
			callback(false);
		});
}

function calculateStatistics(callback) {
	let keys = Object.keys(fireData);
	let sumPayments = 0;
	let statisticsData = [];
	for (const element of keys) {
		let sumPaymentsObject = {};
		fireData[element].forEach(items => {
			sumPayments += parseFloat(items.amount == "" ? 0 : items.amount)
		})
		sumPaymentsObject = {}
		sumPaymentsObject["period"] = element;
		sumPaymentsObject["amount"] = sumPayments;
		statisticsData.push(sumPaymentsObject);
		sumPayments = 0;
	}
	statisticsData = statisticsData.sort(comparePeriodDates);
	setTimeout(() => {
		statisticTableCallback(statisticsData, () => {
			document.getElementById("popup-info-period-msg-count").innerHTML = "Toplam Dönem: " + statisticsData.length.toString() + " Ay";
			document.getElementById("popup-info-period-msg-amount").innerHTML = "Toplam Harcama: " + new Intl.NumberFormat('en-US').format(statisticsData.map(i => i.amount).reduce((acc, current) => acc + current, 0)) + " ₺";
		})
	}, 1);
}

function statisticTableCallback(data, callback) {
	let container = document.querySelector(".handsontable-container-statistics");
	let statisticsTable = new Handsontable(container, {
		data: data,
		width: "100%",
		height: "200px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Dönem", "Toplam Ödenen"],
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "period" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			}
		],
	});
	$('#hot-display-license-info').remove();
	callback(statisticsTable)
}

function fundsTableCallback(data, callback) {
	let container = document.querySelector(".handsontable-container-funds");
	fundsTable = new Handsontable(container, {
		data: data[0],
		width: "100%",
		height: "200px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Döviz Türü", "Miktar", "Kur Endexi", "TL Karşılığı"],
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "currencyType" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{
				data: "endex",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{
				data: "forTl",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			}
		],
	});
	$('#hot-display-license-info').remove();
	callback(fundsTable)
}

function calculateFunds(params) {
	let fundsTableData = [];
	Object.values(params).filter(field => field.currencyType == 'Gram-Altın').map(i => i.forTl = (parseFloat(i.amount).toFixed(2) * parseFloat(i.endex.replace(/[^0-9]/g, '')) / 100))[0].toFixed(2)
	fundsTableData.push(Object.values(params));
	setTimeout(() => {
		fundsTableCallback(fundsTableData, () => {

		})
	}, 1);
}

function readURL(params) {
	if (document.getElementById('file').files[0].type == "application/json") {
		document.getElementById('importFile').removeAttribute("hidden")
	}
	else {
		document.getElementById('importFile').setAttribute("hidden", true);
	}
}

function setButtonReadOnly(value) {
	let buttons = document.querySelectorAll('button');
	for (const element of buttons) {
		element.disabled = value;
	}

}
function convertDate(str) {
	const months = {
		"Oca": 0,
		"Şub": 1,
		"Mar": 2,
		"Nis": 3,
		"May": 4,
		"Haz": 5,
		"Tem": 6,
		"Ağu": 7,
		"Eyl": 8,
		"Eki": 9,
		"Kas": 10,
		"Ara": 11
	};

	if (str != undefined) {
		const parts = str.split(' ');
		const day = parseInt(parts[0], 10);
		const month = months[parts[1]];
		const year = parseInt(parts[2], 10);
		const timeParts = parts[4].split(':');
		const hour = parseInt(timeParts[0], 10);
		const minute = parseInt(timeParts[1], 10);
		const second = parseInt(timeParts[2], 10);

		return new Date(year, month, day, hour, minute, second);
	}
}
const months_tr = ["Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran", "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik"];

function compareDates(a, b) {
	const [monthA, yearA] = a.split('-');
	const [monthB, yearB] = b.split('-');

	if (yearA === yearB) {
		return months_tr.indexOf(monthB) - months_tr.indexOf(monthA); // Aynı yıl içinde aylara göre sırala
	}
	return parseInt(yearB) - parseInt(yearA); // Farklı yıllarsa yıllara göre sırala
}

function comparePeriodDates(a, b) {
	const [monthA, yearA] = a.period.split('-');
	const [monthB, yearB] = b.period.split('-');

	if (yearA === yearB) {
		return months_tr.indexOf(monthB) - months_tr.indexOf(monthA); // Aynı yıl içinde aylara göre sırala
	}
	return parseInt(yearB) - parseInt(yearA); // Farklı yıllarsa yıllara göre sırala
}
