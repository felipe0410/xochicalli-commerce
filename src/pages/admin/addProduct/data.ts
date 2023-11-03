import { CategoryData } from "./interface";

export const dataInputs:Record<string, CategoryData> = {
    INSUMOS: {
        Fertilizantes: [
            {
                name: 'Presentación',
                type: 'text',
                component: 'select',
                option: ['bolsa', 'caja', 'paquete']
            },
            {
                name: 'Contenido',
                type: 'number',
                component: 'duplex',
                option: ['gr', 'kg', 'onz', 'lb']
            },
            {
                name: 'Material',
                type: 'text',
                component: 'input'
            },
            {
                name: 'Graduacion',
                type: 'number',
                component: 'pin'
            },
            {
                name: 'instrucciones',
                type: 'text',
                component: 'tags'
            }
        ],
        Abonos: [
            {
                name: 'Presentación',
                type: 'text',
                component: 'select',
                option: ['bolsa', 'caja', 'paquete']
            },
            {
                name: 'Contenido',
                type: 'number',
                component: 'duplex',
                option: ['gr', 'kg', 'onz', 'lb']
            },
            {
                name: 'instrucciones',
                type: 'text',
                component: 'tags'
            }
        ],
        // Macetas: {},
        // Tratamientos: {},
        // Herramientas: {

        // }
    },
    FLORES: {},
    PLANTAS: {},
    SEMILLAS: {}
}