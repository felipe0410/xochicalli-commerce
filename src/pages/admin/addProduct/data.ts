import { CategoryData } from "./interface";

export const dataInputs: Record<string, CategoryData> = {
  INSUMOS: {
    Fertilizantes: [
      {
        name: "Presentación",
        type: "text",
        component: "select",
        option: ["bolsa", "caja", "paquete"],
      },
      {
        name: "Contenido",
        type: "number",
        component: "duplex",
        option: ["gr", "kg", "onz", "lb"],
      },
      {
        name: "Material",
        type: "text",
        component: "input",
      },
      {
        name: "Graduacion",
        type: "number",
        component: "pin",
      },
      {
        name: "instrucciones",
        type: "text",
        component: "tags",
      },
    ],
    Abonos: [
      {
        name: "Presentación",
        type: "text",
        component: "select",
        option: ["bolsa", "caja", "paquete"],
      },
      {
        name: "Contenido",
        type: "number",
        component: "duplex",
        option: ["gr", "kg", "onz", "lb"],
      },
      {
        name: "instrucciones",
        type: "text",
        component: "tags",
      },
    ],
    Macetas: [
      {
        name: "Material",
        type: "text",
        component: "input",
      },
      {
        name: "Color",
        type: "text",
        component: "input",
      },
      {
        name: "Tamaño",
        type: "number",
        component: "select",
        option: ["1", "2", "3", "4", "5", "6"],
      },
      {
        name: "Altura",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Diametro",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Capacidad",
        type: "number",
        component: "duplex",
        option: ["G", "M"],
      },
    ],
    Tratamientos: [
      {
        name: "Presentación",
        type: "text",
        component: "select",
        option: ["bolsa", "caja", "paquete"],
      },
      {
        name: "Contenido",
        type: "number",
        component: "duplex",
        option: ["gr", "kg", "onz", "lb"],
      },
      {
        name: "Material",
        type: "text",
        component: "input",
      },
      {
        name: "instrucciones",
        type: "text",
        component: "tags",
      },
    ],
    Herramientas: [
      {
        name: "Material",
        type: "text",
        component: "input",
      },
      {
        name: "Color",
        type: "text",
        component: "input",
      },
      {
        name: "Tamaño",
        type: "text",
        component: "select",
        option: ["Grande", "Chico", "Mediano"],
      },
      {
        name: "Altura",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Ancho",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Codigo",
        type: "text",
        component: "input",
      },
    ],
  },
  FLORES: {
    SubCategory: [
      {
        name: "Especie",
        type: "text",
        component: "input",
      },
      {
        name: "Aroma",
        type: "text",
        component: "input",
      },
      {
        name: "Disponibilidad",
        type: "text",
        component: "select",
        option: ["Por temporada", "Aromática", "Exóticas"],
      },
      {
        name: "Floración",
        type: "text",
        component: "input",
      },
      {
        name: "Tiempo de vida",
        type: "text",
        component: "input",
      },
      {
        name: "Estado",
        type: "text",
        component: "input",
      },
      {
        name: "Altura",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Presentación",
        type: "text",
        component: "input",
      },
      {
        name: "instrucciones",
        type: "text",
        component: "tags",
      },
    ],
  },
  PLANTAS: {
    SubCategory: [
      {
        name: "Especie",
        type: "text",
        component: "input",
      },
      {
        name: "Variedad",
        type: "text",
        component: "input",
      },
      {
        name: "Floración",
        type: "text",
        component: "input",
      },
      {
        name: "Edad",
        type: "text",
        component: "input",
      },
      {
        name: "Estado",
        type: "text",
        component: "input",
      },
      {
        name: "Altura",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Ancho",
        type: "number",
        component: "duplex",
        option: ["Cm", "Mm"],
      },
      {
        name: "Presentación",
        type: "text",
        component: "select",
        option: [
          "Maceta #1",
          "Maceta #2",
          "Maceta #3",
          "Maceta #4",
          "Maceta #5",
        ],
      },
      {
        name: "Recomendaciones",
        type: "text",
        component: "tags",
      },
    ],
  },
  SEMILLAS: {
    SubCategory: [
      {
        name: "Especie",
        type: "text",
        component: "input",
      },
      {
        name: "Variedad",
        type: "text",
        component: "input",
      },
      {
        name: "Cantidad",
        type: "number",
        component: "input",
      },
      {
        name: "Presentación",
        type: "text",
        component: "select",
        option: ["bolsa", "caja", "paquete", "sobre"],
      },
      {
        name: "Peso",
        type: "number",
        component: "duplex",
        option: ["Gramos", "Miligramos"],
      },
    ],
  },
};
