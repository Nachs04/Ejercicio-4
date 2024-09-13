document.addEventListener('DOMContentLoaded', () => {
    const alumnos = [];
    const formulario = document.getElementById('Formulario');
    const promedioDisplay = document.getElementById('promedio');
    const estudiantesCercanosDisplay = document.getElementById('estudiantes cercanos');
    const estudianteMinimoDisplay = document.getElementById('estudiante-minimo');
    const estudianteMaximoDisplay = document.getElementById('estudiante-maximo');

    function Actualizar() {
        if (alumnos.length === 0) {
            promedioDisplay.textContent = '0';
            estudiantesCercanosDisplay.innerHTML = '';
            estudianteMinimoDisplay.innerHTML = '';
            estudianteMaximoDisplay.innerHTML = '';
            return;
        }

        // Calcular el promedio
        const total = alumnos.reduce((sum, alumno) => sum + alumno.grado, 0);
        const promedio = total / alumnos.length;

        // Mostrar el promedio
        promedioDisplay.textContent = promedio.toFixed(2);

        // Encontrar los alumnos más cercanos al promedio
        const sortedAlumnos = alumnos
            .map(alumno => ({ ...alumno, diferencia: Math.abs(alumno.grado - promedio) }))
            .sort((a, b) => a.diferencia - b.diferencia);

        // Mostrar los 5 alumnos más cercanos
        estudiantesCercanosDisplay.innerHTML = '<h3>Alumnos más cercanos al promedio:</h3>';
        sortedAlumnos.slice(0, 5).forEach(alumno => {
            const alumnoDiv = document.createElement('div');
            alumnoDiv.textContent = `${alumno.nombre} - Calificación: ${alumno.grado} (Diferencia: ${alumno.diferencia.toFixed(2)})`;
            estudiantesCercanosDisplay.appendChild(alumnoDiv);
        });

        // Encontrar el alumno con la calificación más baja y más alta respecto al promedio
        const alumnoMinimo = sortedAlumnos[sortedAlumnos.length - 1];
        const alumnoMaximo = sortedAlumnos[0];

        // Mostrar el alumno con la calificación más baja
        estudianteMinimoDisplay.innerHTML = `<h3>Alumno con la nota más baja respecto al promedio:</h3>
            <p>${alumnoMinimo.nombre} - Calificación: ${alumnoMinimo.grado} (Diferencia: ${alumnoMinimo.diferencia.toFixed(2)})</p>`;

        // Mostrar el alumno con la calificación más alta
        estudianteMaximoDisplay.innerHTML = `<h3>Alumno con la nota más alta respecto al promedio:</h3>
            <p>${alumnoMaximo.nombre} - Calificación: ${alumnoMaximo.grado} (Diferencia: ${alumnoMaximo.diferencia.toFixed(2)})</p>`;
    }

    // Manejar el evento de envío del formulario
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const grado = parseFloat(document.getElementById('grado').value);

        alumnos.push({ nombre, grado });
        Actualizar();
        formulario.reset();
    });
});
