import { Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"

const PrivacyPolicy = () => {
    return (
        <VStack minH='calc(100vh - 101px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Políticas de privacidad</title>
            </Helmet>
            <Heading as={motion.h1} viewport={{ once: true }} textAlign='center' my={[4, 8]}
                initial={{
                    y: -10,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 1.05
                    }
                }}
            >Políticas de privacidad</Heading>
            <VStack maxWidth='3xl'>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    Xochilcalli, mejor conocido como casa de las flores con domicilio 1er. Cerrada de la Obsidiana no.809 Mineral de la reforma, CP 42186, Hidalgo es responsable del uso, tratamiento y protección de aquellos datos personales a que tuviere acceso para brindarle algún servicio y/o la venta de productos (de ahora en adelante y de forma conjunta "datos personales"), los cuales serán tratados de forma confidencial de conformidad con lo señalado en este Aviso de Privacidad y bajo los principios señalados en la Ley Federal de Datos Personales en Posesión de los Particulares ("LFPDPPPP"), su Reglamento, lineamientos y disposiciones secundarias.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center'
                    initial={{
                        x: -10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Uso y fin de la información</Heading>
                <Text as={motion.p} viewport={{ once: true }} py={4}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >
                    La Empresa se compromete a no compartir la información confidencial proporcionada por el usuario, con ningún tercero, excepto que tenga autorización de éste, pues es quien acepta el tratamiento de los mismos y autoriza su uso cuando los proporciona, a través de los diferentes medios de conformidad con los términos de esta política.


                </Text>
                <Text as={motion.p} viewport={{ once: true }} py={2}
                    initial={{
                        y: 10,
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >
                    Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades, mismas que son necesarias para brindarle algún servicio o la venta de productos:
                </Text>
                <UnorderedList px={8}>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                            },
                        }}
                    >Compraventa de productos y/o prestación de servicios.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.25,
                            },
                        }}
                    >Envío de publicidad bajo cualquier medio de comunicación.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.5,
                            },
                        }}
                    >Implementación de mejoras en productos y servicios.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.75,
                            },
                        }}
                    >Procesos administrativos como devoluciones, facturaciones, históricos de compras, procesamiento de solicitudes, cobro, aclaraciones, investigación, órdenes de compra.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 1,
                            },
                        }}
                    >Comunicar ofertas y promociones direccionadas.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 1.25,
                            },
                        }}
                    >Invitaciones a eventos especiales y sorteos en redes sociales.</ListItem>
                    <ListItem as={motion.li} viewport={{ once: true }} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 1.5,
                            },
                        }}
                    >Atención al cliente.</ListItem>
                </UnorderedList>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: -10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Datos personales que podemos obtener</Heading>
                <UnorderedList px={8}>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                            },
                        }}
                    >Datos Generales (Nombre completo, Edad, Fecha de Nacimiento, Sexo, RFC).</ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.25,
                            },
                        }}
                    >Datos de Domicilio (CP, Estado, Ciudad, Municipio, Colonia, Calle, Número exterior).</ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.5,
                            },
                        }}
                    >Datos de contacto(Correo electrónico, Teléfono).</ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.75,
                            },
                        }}
                    >Datos financieros: (Número de Tarjeta bancaria, Vigencia, CVC).</ListItem>
                </UnorderedList>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: -10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Derechos de Arco</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    Para el ejercicio de cualquiera de los derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO), que incluyen revocación o negativa de cualquier consentimiento para el uso, usted podrá presentar la solicitud respectiva por escrito firmado (1) en el departamento de Atención a Clientes o directamente en las oficinas de El Responsable; o (2) a través del correo electrónico Xochicalliventas@gmail.com La negativa no podrá ser un motivo para que le neguemos servicios o venta de productos.
                    <br /><br />
                    El escrito a que se hace referencia para algún cambio deberá contener e incluir lo siguiente:
                </Text>
                <UnorderedList px={8}>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                            },
                        }}
                    >El nombre completo del titular y su dirección de correo electrónico o domicilio en que desee recibir la respuesta a su solicitud.</ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.25,
                            },
                        }}
                    >Una descripción clara, precisa y específica de los Datos Personales respecto de los que se busca ejercer alguno de los derechos mencionados, así como el detalle de cualquier elemento o documento que facilite la localización de los datos personales.
                    </ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.5,
                            },
                        }}
                    >Copia legible de una identificación oficial vigente del titular y, tratándose de un trámite llevado a cabo por un representante legal, se deberá adjuntar adicionalmente una carta poder firmada ante 2 testigos o una copia del instrumento público correspondiente, así como una copia de la identificación oficial vigente del representante legal.</ListItem>
                    <ListItem as={motion.li} py={1.5}
                        initial={{
                            x: -10,
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1.25,
                                delay: 0.75,
                            },
                        }}
                    >En el caso de un Derecho ARCO de Rectificación de Datos Personales, se deberá adjuntar la documentación que sustente la solicitud.</ListItem>
                </UnorderedList>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    Una vez presentada su solicitud en el formato preestablecido, El Responsable, podrá solicitarle en un periodo no mayor a 5 días hábiles, la información o documentación necesaria para su seguimiento, así como para la acreditación de su identidad, de acuerdo a los términos que marca la Legislación. Por lo que usted contará con 10 días hábiles posteriores a su recepción, para atender este requerimiento. De lo contrario su solicitud se tendrá por no presentada. En un plazo posterior de 20 días hábiles dicho departamento emitirá una resolución, la cual le será notificada por los medios de contacto que haya establecido en su solicitud. Una vez emitida la resolución y en caso de que la misma sea procedente (parcial o totalmente), El Responsable contará con 15 días hábiles para adoptar dicha resolución. Los términos y plazos indicados en los párrafos anteriores podrán ser ampliados una sola vez en caso de ser necesario y se le deberá notificar a través de los medios de contacto que haya establecido. La revocación y el ejercicio de los Derechos ARCO serán gratuitos, debiendo usted cubrir únicamente los gastos justificados de envío, o el costo de reproducción en copias u otros formatos establecidos en su solicitud. Los Datos Personales que nos proporcione en su solicitud de Derechos ARCO podrán ser conservados por un período de hasta 5 años en medios físicos y/o electrónicos y posteriormente descartados a efecto de evitar un tratamiento indebido de los mismos.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Consentimiento de tratamiento de datos personales</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    El titular de datos personales manifiesta haber leído y estar de acuerdo con los términos y condiciones del Aviso de Privacidad puesto a su disposición, consintiendo la finalidad de la recolección y tratamiento de sus datos personales, así como el procedimiento para el ejercicio de sus derechos ARCO al proporcionar información a través de cualquier evento, en cualquiera de nuestra tienda, mediante la utilización de nuestros servicios en línea, formularios, correos electrónicos, usted otorga su consentimiento al presente Aviso de Privacidad.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Transferencia de Información</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    El Responsable podrá, para las finalidades citadas, transferir sus datos personales a terceros mexicanos o extranjeros en los que se apoye para su operación, así como sociedades controladoras, controladas, subsidiarias o afiliadas del Responsable, o a una sociedad matriz de conformidad con el Artículo 37 de la LFPDPPP y su Reglamento.
                    <br /><br />
                    Asimismo, nos autorizas a contactarte a través de medios digitales tales como email, Facebook, mensajes de texto (SMS), o WhatsApp u otras plataformas similares, al número de celular que nos entregues, con el objeto de hacerte llegar información relacionada con las finalidades que
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >No autorización de Transferencia</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    Si usted no manifiesta su negativa para dichas transferencias en los formatos habilitados en el departamento de Atención a Clientes o directamente en las oficinas de El Responsable o a través del correo electrónico <a href="mailto:xochilcalliventas@gmail.com">xochilcalliventas@gmail.com</a>, entenderemos que le ha autorizado.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Definición de consulta</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    El usuario puede consultar mediante nuestro correo de la empresa acerca de si puede haber modificaciones acerca de nuestras políticas de privacidad y como se estrían empleando, si llegara a tener algún inconveniente. Estas modificaciones estarán disponibles al público a través de nuestro sitio web o publicidad relacionada hacia nuestros servicios que estamos otorgando a nuestros usuarios.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Tecnologías de Rastreo o cookies</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    En nuestra página de Internet utilizamos cookies a través de las cuales es posible monitorear sus visitas como usuario de Internet, brindarle un mejor servicio y experiencia de usuario al navegar en nuestra página, así como ofrecerle a través de banners promocionales nuevos productos y servicios basados en sus preferencias. Los datos personales que podríamos obtener de estas tecnologías de rastreo son los siguientes: Horario de navegación, tiempo de navegación en nuestra página de Internet, secciones consultadas. Nuestro portal tiene ligas a otros sitios externos, de los cuales el contenido y políticas de privacidad no son responsabilidad del Responsable.
                    <br /><br />
                    Por si tiene duda de que es una cookie, es un pequeño archivo removible de datos que es guardado por su navegador de internet en su computadora u ordenador. Las cookies le permiten establecer un orden en nuestro sitio de internet y nos permiten personalizar su navegación en línea y su experiencia de compra.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }} textAlign='center' py={4}
                    initial={{
                        x: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                >Mención de actualización al Aviso de Privacidad</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                >
                    El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad o por cambios en nuestro modelo de negocio.
                    <br /><br />
                    Contamos con controles internos en el manejo de la información y medidas de seguridad, incluyendo herramientas para encriptar y autentificar información que mantienen su información personal a salvo. Sus datos personales se procesan a través de sistemas de redes seguros y solamente puede acceder a ella un número limitado de personas con derechos especiales, a quienes se les exige que mantengan dicha información confidencial. Toda la información que usted proporciona acerca de su tarjeta de crédito se transmite a través de tecnología SSL (Secure Socket Layer) y es encriptada para poder acceder a ella sólo mediante el sistema ya descrito, esto más que nada lo hacemos por protocolos de seguridad.

                </Text>
            </VStack>
        </VStack>
    )
}
export default PrivacyPolicy