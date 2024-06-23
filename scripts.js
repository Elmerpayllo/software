document.addEventListener('DOMContentLoaded', () => {
    const entries = [
        { conteo: 'conteo-ee', simple: 4, promedio: 4, complejo: 6, total: 'total-ee' },
        { conteo: 'conteo-se', simple: 3, promedio: 5, complejo: 7, total: 'total-se' },
        { conteo: 'conteo-ce', simple: 4, promedio: 4, complejo: 6, total: 'total-ce' },
        { conteo: 'conteo-ali', simple: 3, promedio: 10, complejo: 15, total: 'total-ali' },
        { conteo: 'conteo-aie', simple: 7, promedio: 7, complejo: 10, total: 'total-aie' }
    ];

    const factorSelect = document.getElementById('factor-select');
    
    entries.forEach(entry => {
        const conteoElement = document.getElementById(entry.conteo);
        conteoElement.addEventListener('input', () => {
            calculateTotal(entry);
            calculateSumaTotal();
            updateDerivedValues();
        });
    });

    factorSelect.addEventListener('change', () => {
        entries.forEach(entry => {
            calculateTotal(entry);
        });
        calculateSumaTotal();
        updateDerivedValues();
    });

    function calculateTotal(entry) {
        const conteo = document.getElementById(entry.conteo).value || 0;
        const factorType = factorSelect.value;
        const factor = entry[factorType];
        const total = conteo * factor;
        document.getElementById(entry.total).textContent = total;
    }

    function calculateSumaTotal() {
        let sumaTotal = 0;
        entries.forEach(entry => {
            const total = parseFloat(document.getElementById(entry.total).textContent) || 0;
            sumaTotal += total;
        });
        document.getElementById('suma-total').textContent = sumaTotal;
    }

    // Cálculo para la tabla de preguntas
    const preguntasValues = Array.from({ length: 14 }, (_, i) => document.getElementById(`valor-${i + 1}`));
    
    preguntasValues.forEach(valueElement => {
        valueElement.addEventListener('input', () => {
            calculatePreguntasSumaTotal();
            updateDerivedValues();
        });
    });

    function calculatePreguntasSumaTotal() {
        let preguntasSumaTotal = 0;
        preguntasValues.forEach(valueElement => {
            const value = parseFloat(valueElement.value) || 0;
            preguntasSumaTotal += value;
        });
        document.getElementById('preguntas-suma-total').textContent = preguntasSumaTotal;
    }

    function updateDerivedValues() {
        const favValue = parseFloat(document.getElementById('preguntas-suma-total').textContent) || 0;
        const sumaTotal = parseFloat(document.getElementById('suma-total').textContent) || 0;
        
        document.getElementById('fav-value').textContent = favValue;
    
        let pfaValue = sumaTotal * (0.65 + 0.01 * favValue);
        
        // Redondear solo si los decimales son 5 o mayores
        if (pfaValue % 1 >= 0.5) {
            pfaValue = Math.ceil(pfaValue);
        } else {
            pfaValue = Math.floor(pfaValue);
        }
        
        document.getElementById('pfa-value').textContent = pfaValue;
    
        const esfuerzoNominal = pfaValue * 8;
        document.getElementById('esfuerzo-nominal-value').textContent = esfuerzoNominal;
      
        const asignarProgramadores = parseFloat(document.getElementById('asignar-programadores').value) || 1;
        const calculoHorasDesarrollador = esfuerzoNominal / asignarProgramadores; // No se utiliza diasTrabajoMes en el cálculo
        document.getElementById('calculo-horas-desarrollador').textContent = calculoHorasDesarrollador.toFixed(2);
         // Cálculo de la duración en meses
    const diasTrabajoMes = 20; // suponiendo que un mes tiene 20 días hábiles
    const duracionEnMeses = Math.floor(calculoHorasDesarrollador / (100 / diasTrabajoMes));
    const duracionEnDias = Math.round((calculoHorasDesarrollador / (100 / diasTrabajoMes)) % 1 * 20);
    document.getElementById('duracion-en-meses').textContent = duracionEnMeses + ' meses y ' + duracionEnDias + ' días';

    // Datos de salario del desarrollador
    const salarioDesarrollar = 2500; // dato constante
    document.getElementById('salario-desarrollar').textContent = salarioDesarrollar + ' Bs.';

    // Cálculo del costo del proyecto
    const costoProyecto = esfuerzoNominal / (diasTrabajoMes / salarioDesarrollar);
    document.getElementById('costo-proyecto').textContent = costoProyecto.toFixed(2) + ' Bs.';

    // Cálculo del costo del módulo
    const costoModulo = costoProyecto / pfaValue;
    document.getElementById('costo-modulo').textContent = costoModulo.toFixed(2) + ' Bs.';

    
    }
    document.getElementById('asignar-programadores').addEventListener('input', updateDerivedValues);
});

