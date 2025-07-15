// ======== Sistema de Gestión de Clientes con Menú Interactivo ========

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para crear un nuevo cliente
function crearCliente(id, nombre, apellido, email, telefono, activo) {
  return { id, nombre, apellido, email, telefono, activo };
}

// Arreglo para almacenar los clientes
let clientes = [
  crearCliente(1, "Ana", "Pérez", "ana@mail.com", "123456789", true),
  crearCliente(2, "Luis", "Rojas", "luis@mail.com", "987654321", false),
  crearCliente(3, "Claudia", "Torres", "claudia@mail.com", "456123789", true)
];

// Funciones del sistema
function mostrarClientes(arr) {
  arr.forEach(cliente => {
    console.log(`${cliente.id}: ${cliente.nombre} ${cliente.apellido} - ${cliente.email} - ${cliente.telefono}`);
  });
}

function contarActivos(arr) {
  return arr.filter(c => c.activo).length;
}

function agregarCliente(arr, cliente) {
  arr.push(cliente);
}

function eliminarClientePorId(arr, id) {
  const index = arr.findIndex(cliente => cliente.id === id);
  if (index !== -1) arr.splice(index, 1);
}

function modificarCliente(arr, id, nuevosDatos) {
  const cliente = arr.find(c => c.id === id);
  if (cliente) Object.assign(cliente, nuevosDatos);
}

function obtenerClientesInactivos(arr) {
  return arr.filter(cliente => !cliente.activo);
}

function mostrarClientesActivos(arr) {
  arr.forEach(cliente => {
    const estado = cliente.activo ? "Activo" : "Inactivo";
    console.log(`${estado}: ${cliente.nombre} ${cliente.apellido}`);
  });
}

// Menú interactivo
function mostrarMenu() {
  console.log(`\n=== Menú ===
1. Mostrar todos los clientes
2. Mostrar clientes activos
3. Contar clientes activos
4. Agregar cliente
5. Eliminar cliente
6. Modificar cliente
7. Ver clientes inactivos
0. Salir`);
  
  rl.question("Selecciona una opción: ", opcion => {
    switch (opcion) {
      case '1':
        mostrarClientes(clientes);
        mostrarMenu();
        break;
      case '2':
        mostrarClientesActivos(clientes);
        mostrarMenu();
        break;
      case '3':
        console.log("Total activos:", contarActivos(clientes));
        mostrarMenu();
        break;
      case '4':
        rl.question("ID: ", id => {
          rl.question("Nombre: ", nombre => {
            rl.question("Apellido: ", apellido => {
              rl.question("Email: ", email => {
                rl.question("Teléfono: ", telefono => {
                  rl.question("¿Está activo? (true/false): ", activo => {
                    agregarCliente(clientes, crearCliente(
                      parseInt(id), nombre, apellido, email, telefono, activo === 'true'
                    ));
                    console.log("Cliente agregado.");
                    mostrarMenu();
                  });
                });
              });
            });
          });
        });
        break;
      case '5':
        rl.question("ID del cliente a eliminar: ", id => {
          eliminarClientePorId(clientes, parseInt(id));
          console.log("Cliente eliminado.");
          mostrarMenu();
        });
        break;
      case '6':
        rl.question("ID del cliente a modificar: ", id => {
          rl.question("Nuevo teléfono: ", telefono => {
            rl.question("¿Está activo? (true/false): ", activo => {
              modificarCliente(clientes, parseInt(id), {
                telefono,
                activo: activo === 'true'
              });
              console.log("Cliente modificado.");
              mostrarMenu();
            });
          });
        });
        break;
      case '7':
        console.log(obtenerClientesInactivos(clientes));
        mostrarMenu();
        break;
      case '0':
        console.log("Saliendo...");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        mostrarMenu();
    }
  });
}

mostrarMenu();
