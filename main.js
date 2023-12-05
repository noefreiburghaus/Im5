// Funktionen zur Steuerung des Menüs
function openMenu() {
    document.querySelector('.menu').classList.add('show-menu');
}

function closeMenu() {
    document.querySelector('.menu').classList.remove('show-menu');
}

// Funktion zum Aktualisieren des Button-Labels
function updateButtonLabel(colorButton, isColorBlack) {
    colorButton.textContent = isColorBlack ? 'Quiz Modus' : 'Lösung';
}

// Funktion zum Laden der Tabelle
function loadTableData() {
    fetch('Daten.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';

            for (const property in data[0]) { // Nimmt nur die Eigenschaften des ersten Objekts
                const row = document.createElement('tr');
    
                const cellValue1 = document.createElement('td');
                cellValue1.textContent = data[0][property];
                row.appendChild(cellValue1);

                const cellKey = document.createElement('td');
                cellKey.textContent = property;
                row.appendChild(cellKey);
    
                const cellValue2 = document.createElement('td');
                cellValue2.textContent = data[1][property];
                row.appendChild(cellValue2);
    
                tableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Fehler:', error));
}

// Funktion zur Änderung der Farben
function changeColor(textElements, isColorBlack) {
    const color = isColorBlack ? 'transparent' : '#000000';
    textElements.forEach(element => {
        element.style.backgroundColor = color;
        // Fügt Hover-Effekte hinzu
        element.onmouseover = function() {
            this.style.backgroundColor = '#ffffff';
        };
        element.onmouseout = function() {
            this.style.backgroundColor = color;
        };
    });
}

// Initialisiert das Laden der Tabelle und des Farbwechsel-Buttons
window.onload = function() {
    loadTableData();

    const colorButton = document.getElementById('colorButton');
    let isColorBlack = true;

    colorButton.addEventListener('click', function() {
        const textElements = Array.from(document.getElementsByTagName('td')).filter(td => td !== td.parentNode.children[1]);
        changeColor(textElements, isColorBlack);
        updateButtonLabel(this, isColorBlack);
        isColorBlack = !isColorBlack;
    });
};

// Event-Listener für das Menü
document.querySelector('.hamburger-menu').onmouseover = openMenu;
document.querySelector('.menu').onmouseleave = closeMenu;
