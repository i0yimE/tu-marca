/*
 * ============================================================================
 *  DATOS DE LA MARCA — editá este archivo con el Bloc de notas
 * ============================================================================
 *  Todo lo que ves en la web (nombre, teléfono, productos, categorías,
 *  servicios) sale de acá. No hace falta tocar ningún archivo .html.
 *
 *  Después de guardar cambios, si algo no se actualiza en el navegador
 *  probá Ctrl+F5 (recarga forzada). Ver README.md para más detalle.
 * ============================================================================
 */
(function () {
  "use strict";

  window.__BRAND__ = {
    // ---------------------------------------------------------------------
    // 1. MARCA — reemplazá "Tu Marca" por el nombre real apenas lo tengas.
    // ---------------------------------------------------------------------
    name: "Tu Marca",
    legalName: "Tu Marca Indumentaria",
    tagline: "Prendas con oficio, hechas para durar.",
    description:
      "Diseñamos y confeccionamos indumentaria pensada para el uso real: telas seleccionadas, terminaciones prolijas y talles pensados para cada cuerpo.",

    // ---------------------------------------------------------------------
    // 2. CONTACTO — completá con los datos reales de la empresa.
    // ---------------------------------------------------------------------
    // Número de WhatsApp SOLO con dígitos, código de país incluido, sin
    // espacios ni "+". Ejemplo Argentina: 5491122334455
    whatsappNumber: "5490000000000",
    phoneDisplay: "[Tu teléfono / WhatsApp]",
    email: "[tu-email@tumarca.com]",
    address: "[Tu dirección — calle, ciudad, provincia]",
    hours: "[Tu horario de atención — ej. Lunes a viernes de 9 a 18 h]",
    instagramHandle: "@tu_usuario",
    instagramUrl: "https://instagram.com/tu_usuario",
    // Pegá acá el "src" del iframe que te da Google Maps
    // (Compartir → Insertar un mapa → copiar el link que está dentro de src="...")
    mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105489.9!2d-58.4!3d-34.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzAwLjAiUyA1OMKwMjQnMDAuMCJX!5e0!3m2!1ses!2sar!4v0",

    // ---------------------------------------------------------------------
    // 3. DIFERENCIALES — la franja destacada del inicio (3 a 5 frases cortas).
    // ---------------------------------------------------------------------
    highlights: [
      "Producción propia",
      "Materiales seleccionados",
      "Atención personalizada",
      "Envíos a todo el país"
    ],

    // ---------------------------------------------------------------------
    // 4. CATEGORÍAS del catálogo. El "id" se usa para filtrar, no lo borres
    //    de golpe si hay productos usándolo — cambiá primero los productos.
    // ---------------------------------------------------------------------
    categories: [
      { id: "remeras", label: "Remeras" },
      { id: "buzos", label: "Buzos y sweaters" },
      { id: "camisas", label: "Camisas" },
      { id: "pantalones", label: "Pantalones" },
      { id: "accesorios", label: "Accesorios" }
    ],

    // ---------------------------------------------------------------------
    // 5. PRODUCTOS DEL CATÁLOGO
    //    Para AGREGAR un producto: copiá un bloque { ... } entero, pegalo
    //    antes del corchete "]" que cierra la lista, y cambiá sus datos.
    //    Para QUITAR uno: borrá su bloque { ... } completo.
    //    "image" es el nombre del archivo dentro de assets/img/.
    //
    //    ⚠️ Estos productos son de EJEMPLO (fotos de stock + fichas técnicas
    //    de referencia). Reemplazalos por el catálogo real apenas lo tengas.
    // ---------------------------------------------------------------------
    products: [
      {
        id: "remera-tiedye",
        name: "Remera estampada tie-dye",
        category: "remeras",
        image: "product-tshirt.jpg",
        composition: "100% algodón peinado 24/1",
        sizes: "S — XXL",
        colors: "Rojo y blanco (estampado tie-dye, pieza única)",
        care: "Lavar a máquina con agua fría, del revés. No usar cloro. Planchar a temperatura media.",
        description:
          "Corte clásico, cuello redondo reforzado y algodón peinado de trama cerrada. Teñido artesanal tie-dye: cada prenda sale con un dibujo levemente distinto."
      },
      {
        id: "buzo-canguro",
        name: "Buzo canguro frisado",
        category: "buzos",
        image: "product-hoodie.jpg",
        composition: "80% algodón, 20% poliéster — frisa interior",
        sizes: "S — XXL",
        colors: "Celeste, negro, gris jaspeado",
        care: "Lavar del revés con agua fría. Secar a la sombra. No planchar la estampa.",
        description:
          "Buzo con capucha y bolsillo canguro, frisa interior para los días fríos. Puño y cintura acanalados que mantienen la forma con el uso."
      },
      {
        id: "sweater-punto",
        name: "Sweater de punto",
        category: "buzos",
        image: "product-sweater.jpg",
        composition: "70% lana, 30% acrílico",
        sizes: "S — XL",
        colors: "Crudo, camel, gris",
        care: "Lavado a mano con agua fría. Secar en plano, a la sombra.",
        description:
          "Tejido de punto medio con caída suave. Un básico de abrigo que combina con todo, pensado para el entretiempo."
      },
      {
        id: "camisa-cuadros",
        name: "Camisa a cuadros manga larga",
        category: "camisas",
        image: "product-shirt.jpg",
        composition: "60% algodón, 40% poliéster",
        sizes: "S — XL",
        colors: "Cuadros azul y blanco",
        care: "Lavar a máquina, ciclo suave. Planchar tibio.",
        description:
          "Corte regular con estampa a cuadros clásica. Buena caída y comodidad, tanto para el uso diario como combinada en looks más formales."
      },
      {
        id: "jean-recto",
        name: "Jean recto clásico",
        category: "pantalones",
        image: "product-jeans.jpg",
        composition: "98% algodón, 2% elastano",
        sizes: "38 — 46",
        colors: "Azul oscuro, azul claro, negro",
        care: "Lavar del revés, agua fría. Evitar secarropa a alta temperatura.",
        description:
          "Tiro medio y pierna recta, con un toque de elastano para mayor comodidad. Un clásico de placard que no pasa de moda."
      },
      {
        id: "pantalon-acampanado",
        name: "Pantalón acampanado denim y gamuza",
        category: "pantalones",
        image: "product-pants.jpg",
        composition: "Denim con inserciones en gamuza sintética",
        sizes: "38 — 44",
        colors: "Azul denim",
        care: "Se recomienda lavado en seco por los detalles en gamuza.",
        description:
          "Tiro alto y pierna acampanada, con inserciones en gamuza. Una pieza con carácter para looks que buscan diferenciarse."
      },
      {
        id: "bufanda-lana",
        name: "Bufanda de lana tejida",
        category: "accesorios",
        image: "product-scarf.jpg",
        composition: "100% lana (Shetland)",
        sizes: "Única (180 x 30 cm)",
        colors: "Púrpura berenjena",
        care: "Lavado a mano, agua fría. Secar en plano.",
        description:
          "Tejida a mano en punto arroz con lana Shetland. Un accesorio con textura, ideal para los días más fríos."
      },
      {
        id: "gorro-lana",
        name: "Gorro de lana",
        category: "accesorios",
        image: "product-beanie.jpg",
        composition: "100% lana",
        sizes: "Única",
        colors: "Crudo",
        care: "Lavado a mano, agua fría. Secar en plano.",
        description:
          "Gorro tejido en punto elástico, calado simple y buen calce. Termina cualquier look de invierno sin sumar volumen."
      }
    ],

    // IDs de los productos que se muestran destacados en el Inicio (3 a 6).
    featuredProductIds: [
      "remera-tiedye",
      "buzo-canguro",
      "jean-recto",
      "camisa-cuadros",
      "bufanda-lana",
      "gorro-lana"
    ],

    // ---------------------------------------------------------------------
    // 6. SERVICIOS
    // ---------------------------------------------------------------------
    services: [
      {
        title: "Venta online con envíos a todo el país",
        text: "Comprá desde cualquier provincia. Coordinamos el envío por la agencia que prefieras y te acompañamos hasta que la prenda llega."
      },
      {
        title: "Asesoramiento de talles y calce",
        text: "Antes de comprar, te ayudamos a elegir el talle correcto según tus medidas para evitar cambios innecesarios."
      },
      {
        title: "Cambios y devoluciones sin vueltas",
        text: "Si una prenda no te cierra, la cambiamos. Te contamos las condiciones por WhatsApp antes de que decidas."
      },
      {
        title: "Atención personalizada por WhatsApp",
        text: "Consultas sobre stock, colores disponibles o combinaciones — te respondemos directamente, sin bots ni formularios eternos."
      }
    ]
  };
})();
