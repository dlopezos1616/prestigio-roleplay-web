// ============================================================
// DATOS DE NORMATIVAS - Prestigio Roleplay
// Todos los nombres antiguos (Clandestino V2, Spanish Gaming RP)
// han sido reemplazados por "Prestigio Roleplay"
// ============================================================

export interface NormativaSection {
  id: string;
  title: string;
  icon: string;
  content: NormativaBlock[];
}

export interface NormativaBlock {
  type: 'definition' | 'allowed' | 'forbidden' | 'sanction' | 'example' | 'info' | 'warning' | 'table' | 'penal-table';
  title?: string;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  chapterTitle?: string;
}

export interface NormativaData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  backgroundImage: string;
  sections: NormativaSection[];
}

export const normativas: NormativaData[] = [
  // ============================================================
  // NORMATIVA GENERAL
  // ============================================================
  {
    id: 'general',
    title: 'Normativa General',
    shortTitle: 'General',
    description: 'La normativa base del servidor. Todos los jugadores deben conocerla antes de jugar.',
    icon: '📜',
    color: '#3b82f6',
    backgroundImage: '/images/normativas/general.jpg',
    sections: [
      {
        id: 'mg',
        title: 'Metagaming (MG)',
        icon: '👁️',
        content: [
          { type: 'definition', title: 'Definición', text: 'El MG se produce cuando se usa cualquier tipo de información de fuera del juego dentro del juego, sea de forma intencionada o por error para obtener beneficio. Se considera MG estar en streams de usuarios de Prestigio Roleplay al mismo tiempo que estar roleando dentro del servidor.' },
          { type: 'forbidden', title: 'No permitido', items: ['Usar información obtenida fuera del juego (streams, Discord OOC, etc.)', 'Estar en streams de otros jugadores mientras juegas', 'Compartir información IC por canales OOC'] },
          { type: 'sanction', text: 'Sanción mediante sistema de strikes. Casos graves pueden ser motivo de permaban.' },
          { type: 'example', title: 'Ejemplo práctico', text: 'Si ves en el stream de otro jugador que están planeando un asalto y vas a esquivarlos IC sin haberlo sabido dentro del rol, eso es MG.' }
        ]
      },
      {
        id: 'pg',
        title: 'Powergaming (PG)',
        icon: '💪',
        content: [
          { type: 'definition', title: 'Definición', text: 'El PG es la ejecución de actos que en la vida real te resultaría imposible de hacer. También se considera PG realizar acciones sin dar oportunidad a que otro usuario reaccione a estas.' },
          { type: 'forbidden', title: 'No permitido', items: ['Realizar acciones físicamente imposibles', 'No dar tiempo de reacción al otro jugador', 'Forzar resultados sin /me o /do', 'Realizar múltiples acciones en un solo /me'] },
          { type: 'example', title: 'Ejemplo práctico', text: '/me le quita las llaves del coche y arranca y se va → INCORRECTO. Debes dar oportunidad de reacción: /me intenta quitarle las llaves del coche.' }
        ]
      },
      {
        id: 'dm',
        title: 'Deathmatch (DM)',
        icon: '⚔️',
        content: [
          { type: 'definition', title: 'Definición', text: 'El DM es la agresión a un personaje o muerte del mismo sin un motivo convincente o de paso, además de no dar opción a reacción ninguna.' },
          { type: 'forbidden', title: 'No permitido', items: ['Atacar a alguien sin motivo de rol', 'Matar sin interacción previa', 'No dar opción a reacción'] },
          { type: 'sanction', text: 'Sanción grave mediante sistema de strikes.' }
        ]
      },
      {
        id: 'vdm',
        title: 'Vehicle Deathmatch (VDM)',
        icon: '🚗',
        content: [
          { type: 'definition', title: 'Definición', text: 'El VDM es el uso de cualquier vehículo para atropellar a otros personajes.' },
          { type: 'forbidden', title: 'No permitido', items: ['Atropellar intencionadamente a otros jugadores', 'Usar el vehículo como arma ofensiva', 'Atropellar para salvar a un tercero o por venganza'] },
          { type: 'allowed', title: 'Permitido (excepción)', items: ['Únicamente cuando sea la única forma de huida de un conflicto ya generado. Ejemplo: estás en un callejón y la única manera de escapar es atropellando a alguien.'] },
          { type: 'sanction', text: 'Sanción grave mediante sistema de strikes.' }
        ]
      },
      {
        id: 'pk',
        title: 'Player Kill (PK)',
        icon: '💔',
        content: [
          { type: 'definition', title: 'Definición', text: 'Un PK es cuando nuestro personaje queda abatido y tiempo después recupera la consciencia. Se deben rolear las heridas correspondientes que le llevaron a esa situación y preservar la memoria de lo ocurrido.' },
          { type: 'warning', title: 'Importante', text: 'El PKT (Player Kill Temporal) NO está permitido en Prestigio Roleplay. Todo PK conserva la memoria de los eventos. Si un jugador intenta aplicar un PKT (olvidar eventos), se le someterá a Re-Whitelist.' },
          { type: 'forbidden', title: 'No permitido', items: ['Olvidar eventos tras un PK', 'Aplicar PKT (pérdida de memoria temporal)', 'No rolear las heridas tras recuperarse'] }
        ]
      },
      {
        id: 'ck',
        title: 'Character Kill (CK)',
        icon: '💀',
        content: [
          { type: 'definition', title: 'Definición', text: 'Un CK es la muerte definitiva y permanente de un personaje. Una vez aplicado, el personaje no puede volver a utilizarse.' },
          { type: 'info', title: 'Tipos de CK', items: ['CK Premedititado: Debes abrir ticket previamente y la administración debe aprobarlo antes de ejecutarlo.', 'CK No Premedititado: Ocurre durante el rol sin planificación previa. Se debe rolear la herida hasta que administración dé luz verde o no al CK.'] },
          { type: 'forbidden', title: 'No permitido', items: ['Transferir bienes, objetos o dinero de manera premeditada o posterior al CK', 'Forzar roles drásticos (vaciar cargadores, lanzar desde alturas) sin CK aprobado', 'Realizar CK sin ticket aprobado (en caso premeditado)'] },
          { type: 'sanction', text: 'El CK sin aprobación puede derivar en Re-Whitelist o sanción grave.' },
          { type: 'example', title: 'Ejemplo práctico', text: 'Si tienes un CK aprobado y el otro personaje es abatido, debes notificarle que continúe con el rol de su muerte. Si administración NO da luz verde, el jugador debe rolear la recuperación de la herida.' }
        ]
      },
      {
        id: 'rk',
        title: 'Revenge Kill (RK)',
        icon: '🔄',
        content: [
          { type: 'definition', title: 'Definición', text: 'El RK ocurre cuando nuestro personaje toma venganza sobre quién le ha provocado un PK sin ningún tipo de rol previo ni interpretación coherente de las heridas recibidas.' },
          { type: 'forbidden', title: 'No permitido', items: ['Buscar venganza tras un PK sin rol previo', 'Volver al lugar del PK con intención de enfrentamiento', 'No interpretar las heridas recibidas antes del PK'] },
          { type: 'sanction', text: 'Sanción mediante sistema de strikes.' }
        ]
      },
      {
        id: 'afk',
        title: 'AFK',
        icon: '💤',
        content: [
          { type: 'definition', title: 'Definición', text: 'Quedarse AFK (Away From Keyboard) dentro del servidor.' },
          { type: 'forbidden', title: 'No permitido', items: ['Quedarse AFK en el servidor sin motivo', 'Ausentarse en zonas concurridas o donde pueda iniciarse un rol'] },
          { type: 'allowed', title: 'Permitido (excepción)', items: ['Ausentarse por poco tiempo siempre que no estés en zonas concurridas o donde pueda iniciarse un rol.'] }
        ]
      },
      {
        id: 'ic-ooc',
        title: 'In Character (IC) y Out of Character (OOC)',
        icon: '🎭',
        content: [
          { type: 'definition', title: 'In Character (IC)', text: 'Se refiere a todo aquello que ocurre a manos de nuestro personaje o en el entorno de la isla de Los Santos, es decir, dentro del servidor del juego.' },
          { type: 'definition', title: 'Out of Character (OOC)', text: 'Se refiere a todo lo que acontece de forma ajena a nuestro personaje, es decir, fuera del juego.' },
          { type: 'forbidden', title: 'No permitido', items: ['Mezclar información IC y OOC', 'Usar el chat OOC para conversaciones prolongadas', 'Usar el chat OOC en mitad de un rol', 'Faltas de respeto OOC (están prohibidas y son sancionables)', 'Menospreciar roles ajenos por chat OOC'] },
          { type: 'allowed', title: 'Permitido', items: ['Falta de respeto IC dentro del sentido común en cada rol individual (con consecuencias IC)'] }
        ]
      },
      {
        id: 'rde',
        title: 'Rol de Entorno (RdE)',
        icon: '🏙️',
        content: [
          { type: 'definition', title: 'Definición', text: 'El rol de entorno es todo aquello que no podemos ver OOC, pero se interpreta como el propio entorno NPC de la ciudad. La ciudad tiene miles de habitantes NPC que no se pueden ignorar, ya que interactúan de forma directa con los jugadores, sobre todo en actividades ilícitas.' },
          { type: 'forbidden', title: 'No permitido', items: ['Ignorar el entorno NPC de la ciudad', 'Actuar como si la ciudad estuviera vacía de civiles'] }
        ]
      },
      {
        id: 'vida',
        title: 'Valoración de Vida',
        icon: '❤️',
        content: [
          { type: 'definition', title: 'Valoración de vida propia', text: 'Es la prioridad que le damos a la vida de nuestro personaje ante cualquier situación. Se puede no valorar la vida propia priorizando la interpretación, ateniéndose a las consecuencias oportunas. Esto NO es reportable, pero si la situación deriva en un CK, el CK se aplicará.' },
          { type: 'definition', title: 'Valoración de vida a terceros', text: 'Si un personaje no valora la vida de un tercero con el cual tenga un vínculo afectivo sólido (amigo, hermano, compañero de facción, pareja, familiar, etc.) puede ser sancionado dependiendo si la IDP (interpretación de personaje) justifica o no la ausencia de ayuda hacia el tercero.' },
          { type: 'warning', title: 'A tener en cuenta', text: 'No valorar la vida propia priorizando la interpretación tiene consecuencias IC (posible CK). No es motivo de reporte, pero asumes las consecuencias de tus actos.' }
        ]
      },
      {
        id: 'nombre',
        title: 'Nombre de Personaje',
        icon: '👤',
        content: [
          { type: 'forbidden', title: 'No permitido', items: ['Usar nombres de famosos o personajes conocidos', 'Nombres con fin de hacer gracia', 'Caracteres no alfanuméricos', 'Usar personajes tras un CK que estén enlazados al anterior PJ (primo, hermano, familiar, pareja) con la información del anterior PJ para venganza o MG'] }
        ]
      },
      {
        id: 'comandos',
        title: 'Comandos del Servidor',
        icon: '⌨️',
        content: [
          { type: 'table', title: 'Comandos principales', headers: ['Comando', 'Uso', 'Ejemplo'], rows: [
            ['/me <texto>', 'Acciones en tercera persona', '/me intenta quitarle la caja'],
            ['/do <texto>', 'Describir entorno/aclarar situación', '/do Se ve que lleva el brazo vendado'],
            ['/entorno <texto>', 'Describir situación para policía (antes de la acción si es premeditada)', '/entorno Se escuchan disparos...'],
            ['/auxilio <texto>', 'Solicitar asistencia médica al caer PK', '/auxilio He sido atacado...'],
            ['/forzar', 'Avisar de robo de vehículo (siempre con /entorno)', '/forzar + /entorno'],
            ['/dado', 'Resultado favorable/desfavorable (opcional)', '/dado → ¡Mala suerte!'],
            ['/dados', 'Número entre 1 y 6 (opcional)', '/dados → 4'],
            ['/pedirid', 'Describir persona para obtener su ID (solo tras finalizar rol)', '/pedirid Persona en moto junto al gym'],
            ['/report', 'Reportar una situación in-game', '/report + descripción del problema']
          ]},
          { type: 'warning', title: 'Reglas del /pedirid', text: 'Solo se usa para describir persona/acción o nombres concretos. NUNCA durante un rol, solo al finalizar. Uso indebido: /pedirid Princesa la amor de mi vida / Algún admin / Policía disponible.' },
          { type: 'warning', title: 'Reglas del /do', text: 'No está permitido expresar sentimientos, emociones ni pensamientos en los /do.' }
        ]
      },
      {
        id: 'ropa',
        title: 'Vestimenta y Apariencia',
        icon: '👕',
        content: [
          { type: 'forbidden', title: 'No permitido', items: ['Ropa que te haga invisible o deje partes del cuerpo invisibles', 'Ropa "default" (con la que apareces por primera vez)', 'Ropa que tanquea o da ventajas en tiroteos', 'Ropa de facciones IC (policía, moteros, EMS, seguridad) si no perteneces a ella', 'Bandanas, pañuelos, chupas de motero si no eres banda oficial', 'Máscaras o cascos en actos delictivos (solo bandanas en rostro)'] },
          { type: 'allowed', title: 'Permitido', items: ['Bandanas en el rostro durante actos delictivos/robos/secuestros', 'Cualquier color siempre que no uses prendas identificativas de banda oficial'] }
        ]
      },
      {
        id: 'puntos-importantes',
        title: 'Puntos Importantes',
        icon: '📌',
        content: [
          { type: 'info', title: 'Reglas adicionales', items: [
            'Un /entorno nunca se redacta en 3ª persona',
            'Prohibido el uso de mods gráficos para ventaja, programas externos, puntos de mira, macros, VPN y resoluciones que favorezcan el PVP',
            'Fotos y grafitis con IA son permitidos siempre que tengan sentido y coherencia',
            'Prohibidos grafitis realistas en el servidor (permaban)',
            'Prohibido actuar más de 3 personas en un acto ilegal siendo civil',
            'Prohibido subir fotografías o videos IRL en redes sociales IC',
            'Se puede solicitar ítems ilegales (armas, droga) como moneda de cambio para liberar secuestrados, siempre que sea por rol y no farmeo',
            'Un personaje con CK que no implique su muerte puede regresar en el mismo wipe si no es por escapar de banda/mafia',
            'Un bombero/médico puede ser secuestrado de servicio, tratándose como secuestro a policía'
          ]},
        ]
      },
      {
        id: 'sanciones',
        title: 'Sistema de Sanciones',
        icon: '⚖️',
        content: [
          { type: 'info', title: 'Sistema de Strikes', items: [
            'El sistema consta de 3 strikes',
            'Se pone 1 strike por persona y por reporte aceptado',
            'Sanciones por días sin acceso al servidor empiezan a partir del 3er strike: 1, 3 o 7 días según gravedad',
            'El permaban se aplica después de los strikes y días sin acceso',
            'Permaban puede ser apelable o no según gravedad'
          ]},
          { type: 'warning', title: 'Cheats/Hacks', text: 'Uso de cheats, programas de terceros o relación con hacks → expulsión inmediata (permaban), retiro de invitaciones. El equipo administrativo valorará cada situación.' }
        ]
      },
      {
        id: 'voz',
        title: 'Chat de Voz y Moduladores',
        icon: '🎙️',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'El chat de voz debe usarse siempre de forma IC',
            'No salirse del rol usando chat de voz',
            'Chat OOC (texto) solo para aclaraciones puntuales',
            'Prohibido usar chat OOC para menospreciar roles o quejarse',
            'Modulador de voz requiere validación previa del staff (abrir ticket de soporte)'
          ]},
        ]
      },
      {
        id: 'bugs',
        title: 'Abuso de Bugs',
        icon: '🐛',
        content: [
          { type: 'definition', title: 'Definición', text: 'Las "ROLABUG" están sancionadas en el servidor. Si un usuario levanta las manos o demuestra inactividad tras la "rola" señalando aceptar su error y no aprovechar la ventaja, no habrá sanción.' },
          { type: 'forbidden', title: 'No permitido', items: ['Aprovechar bugs del juego para obtener ventaja', 'Usar ropa que haga que la salud no sea acorde al daño (se considera abuso de bug)'] },
          { type: 'sanction', text: 'Sanción mediante sistema de strikes vigente en Prestigio Roleplay.' }
        ]
      }
    ]
  },

  // ============================================================
  // NORMATIVA DE ILÍCITOS
  // ============================================================
  {
    id: 'ilicitos',
    title: 'Normativa de Criminalidad',
    shortTitle: 'Criminalidad',
    description: 'Regulaciones sobre bandas, robos, secuestros, drogas y actividades ilegales.',
    icon: '🔫',
    color: '#ef4444',
    backgroundImage: '/images/normativas/ilicitos.jpg',
    sections: [
      {
        id: 'bandas-general',
        title: 'Reglas Generales de Bandas',
        icon: '🏴',
        content: [
          { type: 'info', title: 'Normas base', items: [
            'Los encargados de bandas se reservan el derecho de dar/quitar bandas por mal uso o falta de IDP',
            'No puedes robar coches para pasearte (solo casos especiales: urgencias, actos ilegales)',
            'Se eliminará la banda y posible permaban a miembros ayudados por cheater/hacker',
            'Las bandas deben generar rol civil fuera de su barrio, además de roles internos',
            'Cada miembro que participe en un rol ilegal DEBE grabarlo',
            'Prohibidos actos delictivos 15 min antes y después de cada reinicio (salvo rol previo existente)',
            'No usar el entorno favorable de una organización para beneficiarte en un rol'
          ]},
          { type: 'sanction', title: 'Sanciones de banda', text: '3 sanciones leves = 1 grave. 3 sanciones graves = disband de la banda.' }
        ]
      },
      {
        id: 'pdb',
        title: 'Pequeña Delincuencia Organizada (PDB)',
        icon: '🕵️',
        content: [
          { type: 'definition', title: 'Definición', text: 'Las PDB son grupos de civiles ilegales sin banda oficial. Máximo 4 integrantes. La obtención se consigue por méritos IC.' },
          { type: 'allowed', title: 'Permitido', items: ['Actuar hasta 4 personas en acto ilícito', 'Realizar robos dentro de los límites establecidos'] },
          { type: 'forbidden', title: 'No permitido', items: ['Alianzas entre PDB', 'Superar el límite de 4 integrantes'] }
        ]
      },
      {
        id: 'miembros-banda',
        title: 'Miembros de Banda por Nivel',
        icon: '📊',
        content: [
          { type: 'table', title: 'Integrantes por nivel', headers: ['Nivel', 'Oficiales', 'Camellos'], rows: [
            ['Nivel 1', '5', '1'],
            ['Nivel 2', '7', '2'],
            ['Nivel 3', '9', '3'],
            ['Nivel 4', '11', '4']
          ]},
          { type: 'info', title: 'Notas', items: [
            'La mafia decide la subida de niveles según el progreso de la banda',
            'Los camellos pueden actuar junto a la banda cuando algún oficial no esté',
            'Se puede pedir ayuda a civiles de confianza, pero miembros extraoficiales nunca deben superar a los oficiales',
            'Un civil abatido por arma de fuego ayudando a una banda recibe CK inmediato'
          ]},
        ]
      },
      {
        id: 'interpretacion',
        title: 'Interpretación de Banda',
        icon: '🎭',
        content: [
          { type: 'definition', title: 'Regla', text: 'Las bandas están obligadas a seguir una interpretación acorde al Lore de su banda (vehículos, actos delictivos, vestimenta, rol de entorno, etc.). No seguirla será motivo de DISBAND.' },
          { type: 'info', title: 'Miembros de banda con empresa', items: [
            'No podrán lucrarse de la empresa. Únicamente será para blanqueo de capital',
            'Un miembro puede trabajar en un trabajo legal si su IDP tiene sentido'
          ]},
          { type: 'forbidden', title: 'No permitido', items: ['Obligar a un usuario a sacar dinero del banco', 'Atracar/secuestrar a alguien en punto de interacción (menú ropa, garaje)', 'Disparar en posición de Q (3ª persona)', 'Aprovechar bugs/animaciones en tiroteos (ghost-pick, rolas-bug, speed-boost)', 'Cachear durante tiroteo (solo si se necesitan balas/armamento)'] }
        ]
      },
      {
        id: 'entornos',
        title: 'Entornos en Actos Delictivos',
        icon: '📝',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Todos los actos delictivos DEBEN tener entorno obligatoriamente',
            'Los entornos deben estar bien redactados con todas las características',
            'Cuando es premeditado, el entorno debe lanzarse ANTES de realizar el acto',
            'En roles fuera de lo establecido con policía: contactar mando del operativo + organización ilegal para informar participantes',
            'En estos roles suman TODAS las personas (informantes + activos)'
          ]},
        ]
      },
      {
        id: 'secuestros',
        title: 'Secuestros y Extorsiones',
        icon: '🔗',
        content: [
          { type: 'info', title: 'Reglas de secuestro', items: [
            'Duración estándar: 30 minutos (se puede alargar si el rol lo permite y el secuestrado acepta)',
            'Máximo dinero por secuestro a policía: 4.000$ - 7.000$ según rango',
            'Máximo dinero por secuestro a jugador: 1.000$ (con rol previo)',
            'Extorsiones superiores a 3.000$ semanales requieren aprobación por ticket',
            'Se puede solicitar ítems ilegales como moneda de cambio para liberación',
            'El secuestro NO debe usarse como excusa para robar pertenencias',
            'Se deben devolver objetos sustraídos al finalizar (excepto armas)',
            'Se puede secuestrar a usuarios IC, no únicamente NPC (excepto gente de servicio)',
            'Prohibido sustraer armas de Playmaker en roles con tiroteos'
          ]},
        ]
      },
      {
        id: 'negociaciones',
        title: 'Negociaciones en Atracos',
        icon: '🤝',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Si se rompen negociaciones: avisar y esperar 15 segundos antes de iniciar tiroteo',
            'Si no hay acuerdo: ambas partes tiran /dado, el ganador se lleva la negociación'
          ]},
          { type: 'definition', title: 'Negociación de helicóptero', text: 'Se negocia con dado por 2 rehenes. Si sale BIEN, el helicóptero sale toda la persecución sin repostar. Si sale MAL, el helicóptero NO sale en todo el rol.' }
        ]
      },
      {
        id: 'alianzas',
        title: 'Alianzas entre Bandas',
        icon: '🤝',
        content: [
          { type: 'forbidden', title: 'No permitido', items: ['Alianzas entre bandas para ir a por otras'] },
          { type: 'allowed', title: 'Permitido', items: ['Mandar trabajos de secuestro e información', 'Alianzas para robar comercios sin superar el límite de integrantes'] }
        ]
      },
      {
        id: 'persecuciones',
        title: 'Duración de Persecuciones',
        icon: '🚔',
        content: [
          { type: 'table', title: 'Tiempos máximos', headers: ['Tipo de robo', 'Duración máxima'], rows: [
            ['Robo pequeño / pequeño plus', '12 minutos'],
            ['Robo mediano / mediano plus', '20 minutos'],
            ['Robo grande', '30 minutos'],
            ['Robo grande plus', 'Ilimitado']
          ]},
        ]
      },
      {
        id: 'espera',
        title: 'Tiempos de Espera sin Policía',
        icon: '⏱️',
        content: [
          { type: 'table', title: 'Tiempos de espera', headers: ['Tipo de robo', 'Espera sin policía'], rows: [
            ['Robo pequeño', '5 minutos'],
            ['Robo mediano', '10 minutos'],
            ['Robo grande', '15 minutos'],
            ['Yate presidencial', '20 minutos (luego /pedirid mando)']
          ]},
        ]
      },
      {
        id: 'rehenes',
        title: 'Rehenes por Tipo de Robo',
        icon: '👥',
        content: [
          { type: 'table', title: 'Rehenes permitidos', headers: ['Tipo de robo', 'Rehenes'], rows: [
            ['Robo pequeño / pequeño plus', 'Solo NPC tendero'],
            ['Robo cajero / casa', 'No hace falta rehén'],
            ['Robo mediano', 'Máximo 2 rehenes'],
            ['Robo mediano plus', 'Máximo 4 rehenes'],
            ['Robo grande / grande plus', 'Ilimitados (NPC + usuarios, determinados por rol)']
          ]},
          { type: 'info', title: 'Nota', text: 'Los rehenes jugadores deben ser el último recurso para evitar interrumpir roles de otros. De ser jugadores, asegurar que su experiencia de rol sea decente.' }
        ]
      },
      {
        id: 'tipos-robos',
        title: 'Tipos de Robos',
        icon: '🏦',
        content: [
          { type: 'table', title: 'Clasificación', headers: ['Categoría', 'Establecimientos'], rows: [
            ['Pequeños', 'Badulaque, Tienda de ropa, Peluquería, Estudio de tatuajes'],
            ['Pequeños plus', 'Farmacia, Robos a casas'],
            ['Medianos', 'Pawn Shop, Tienda de informática'],
            ['Medianos plus', 'Joyería, Ammu Nation, Yate, Camión blindado'],
            ['Grandes', 'Fleeca, Petrolífera, Reserva de oro'],
            ['Grandes plus', 'Banco central']
          ]},
        ]
      },
      {
        id: 'robos-civiles',
        title: 'Límites de Robos - Civiles',
        icon: '👤',
        content: [
          { type: 'table', title: 'Frecuencia por tipo', headers: ['Tipo', 'Frecuencia'], rows: [
            ['Pequeños', '2 al día'],
            ['Pequeños plus', '1 al día'],
            ['Medianos', '1 a la semana'],
            ['Medianos plus (Joyería/Ammu)', '1 a la semana']
          ]},
          { type: 'info', title: 'Nota', text: 'Los robos cuentan por grupo, no por persona.' }
        ]
      },
      {
        id: 'robos-pdb',
        title: 'Límites de Robos - PDB',
        icon: '🕵️',
        content: [
          { type: 'table', title: 'Frecuencia por tipo', headers: ['Tipo', 'Frecuencia'], rows: [
            ['Pequeños', '2 al día'],
            ['Pequeños plus', '2 al día'],
            ['Medianos', '2 a la semana'],
            ['Medianos plus (Joyería/Ammu)', '1 a la semana']
          ]},
          { type: 'info', title: 'Nota', items: ['Los robos se cuentan por PDB, no por persona', 'Los trabajos de mafia tipo robo NO cuentan para el límite', 'Los robos mediano plus en adelante requieren que la mafia genere el rol'] }
        ]
      },
      {
        id: 'robos-bandas',
        title: 'Límites de Robos - Bandas',
        icon: '🏴',
        content: [
          { type: 'table', title: 'Frecuencia por nivel', headers: ['Tipo', 'Nv1', 'Nv2', 'Nv3', 'Nv4'], rows: [
            ['Pequeños', '3/día', '4/día', '5/día', '6/día'],
            ['Pequeños plus', '3/día', '3/día', '4/día', '5/día'],
            ['Medianos', '3/semana', '3/semana', '4/semana', '5/semana'],
            ['Medianos plus (Joyería/Ammu)', '2/semana', '3/semana', '4/semana', '5/semana'],
            ['Medianos plus (Yate/Blindado)', '1/15días', '1/15días', '1/7días', '1/7días'],
            ['Grandes', '1/mes', '1/mes', '1/15días', '1/10días']
          ]},
          { type: 'info', title: 'Nota', items: ['Los robos se cuentan por banda, no por persona', 'Trabajos de mafia tipo robo NO cuentan para el límite'] }
        ]
      },
      {
        id: 'max-integrantes',
        title: 'Integrantes Máximos en Robos',
        icon: '🔢',
        content: [
          { type: 'table', title: 'Participantes máximos', headers: ['Tipo de robo', 'Delincuentes', 'Policía'], rows: [
            ['Pequeño / Pequeño plus', '2', '4'],
            ['Mediano', '4', '6'],
            ['Mediano plus (Joyería/Ammu)', '5', '7'],
            ['Mediano plus (Yate/Blindado)', '7', '9'],
            ['Grande', '9', '11'],
            ['Grande plus', '11', '13']
          ]},
          { type: 'warning', title: 'Nota', text: 'En el yate solo se puede llevar pistolas NO automáticas.' }
        ]
      },
      {
        id: 'drogas',
        title: 'Normativa de Drogas',
        icon: '💊',
        content: [
          { type: 'forbidden', title: 'No permitido', items: ['Vender droga al mismo NPC varias veces', 'Bajar NPCs de vehículos para venderles', 'Vender droga encima de un vehículo', 'Vender droga a los animales'] },
          { type: 'info', title: 'Reglas', items: ['Vender con vehículos apropiados para este acto ilegal', 'Pedidos desde Cayo Perico por mar: mandar entorno detallado con tipo de lancha, personas, vestimenta varias veces durante el trayecto'] },
          { type: 'example', title: 'Ejemplo de entorno marítimo', text: 'Agentes, aquí los guardacostas, estamos viendo como una lancha negra con 4 tripulantes vestidos con prendas moradas se acercan a la costa sin identificarse, pueden llevar unos bultos encima, necesitamos ayuda.' }
        ]
      },
      {
        id: 'vehiculos',
        title: 'Normativa de Vehículos en Ilícitos',
        icon: '🚗',
        content: [
          { type: 'forbidden', title: 'No permitido', items: ['Disparar a matar desde vehículo en movimiento', 'Secuestrar a alguien desde dentro de un coche con pistola sin bajarte', 'Entregar vehículo de importación durante persecución activa'] },
          { type: 'allowed', title: 'Permitido', items: ['Disparar contra vehículo desde tierra dando opción a bajar', 'Disparar al que está dentro sin intención de bajar (tú estando fuera)', 'Desde vehículo quieto: conductor puede disparar. Para matar: fuera del vehículo', 'Disparar a ruedas y carrocería desde vehículo', 'VDM solo para huida cuando es la única opción de escape'] },
          { type: 'info', title: 'Reglas adicionales', items: ['Vehículos de importación: siempre enviar /entorno detallado', 'Vehículo inutilizable: 50% de ruedas pinchadas', 'Priorizar inmovilizar vehículo antes que abatir pasajeros'] }
        ]
      },
      {
        id: 'tipos-ck',
        title: 'Tipos de CK en Ilícitos',
        icon: '💀',
        content: [
          { type: 'info', title: 'CK de tu personaje', text: 'Se puede hacer siempre que quieras.' },
          { type: 'info', title: 'CK por multas', text: 'Miembros de banda/camellos/civiles con más de 20k en multas: 24 horas para pagar el 100% o la policía los pondrá en busca y captura para CK federal.' },
          { type: 'info', title: 'CK a policía', text: 'Requiere motivos de peso y probados que pongan en peligro la continuidad de la banda. Adjuntar pruebas gráficas detalladas.' },
          { type: 'info', title: 'CK a miembros de otras bandas', text: 'Motivos de peso y probados que pongan en peligro la continuidad de la banda. Adjuntar pruebas gráficas.' },
          { type: 'info', title: 'CK al abandonar banda', text: 'Depende exclusivamente del líder si la persona sufre CK o no.' },
          { type: 'info', title: 'CK a líder de banda', text: 'Requiere 85% de miembros oficiales de acuerdo + aprobación de administración.' },
          { type: 'forbidden', title: 'No permitido', items: ['Solicitar CK cuando se cae en barrio enemigo (debe ser abatido completamente)', 'Volver a otra banda como camelo/oficial antes de 10 días tras recibir CK'] },
          { type: 'allowed', title: 'Permitido', items: ['Volver a la misma organización tras CK pasados 10 días'] }
        ]
      }
    ]
  },

  // ============================================================
  // NORMATIVA DE COMERCIOS
  // ============================================================
  {
    id: 'comercios',
    title: 'Normativa de Comercios',
    shortTitle: 'Comercios',
    description: 'Regulación de comercios, locales, eventos, personal y economía.',
    icon: '🏪',
    color: '#f59e0b',
    backgroundImage: '/images/normativas/comercios.jpg',
    sections: [
      {
        id: 'general-comercios',
        title: 'Reglas Generales',
        icon: '📋',
        content: [
          { type: 'info', title: 'Normas base', items: [
            'El desconocimiento de la normativa no exime de su cumplimiento',
            'Solo se permite un establecimiento por usuario',
            'Prohibido el uso de "en servicio" sin estar realizando la actividad laboral',
            'Si un negocio es retirado por sanción, hasta el siguiente WIPE no se puede solicitar otro del mismo tipo',
            'No se devuelven negocios retirados por CK (si un gerente lleva 2 meses, se valorará su postulación)',
            'No se puede comenzar actividad hasta estar en el discord del negocio',
            'Despido de trabajo (si requiere rolearlo): obligatorio periodo de 24h para cambio a otra empresa',
            'Civiles ilegales o PDB no pueden tener negocio a su nombre (sí trabajar, no ser dueño, a no ser que tenga testaferro)',
            'Máximo para gastos personales: 10.000$ semanales (deducidos gastos de empresa)',
            'JEFE y ENCARGADO no pueden cometer actos ilegales ni ser civiles ilegales',
            'Cada comercio: 1 JEFE y 2 ENCARGADOS (civiles)'
          ]},
        ]
      },
      {
        id: 'convenios',
        title: 'Convenios y Descuentos',
        icon: '💰',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Los convenios no son obligatorios, será por exclusividad del dueño',
            'No se pueden ofrecer convenios de servicios/productos GRATUITOS',
            'Para LSPD y SAPD: convenios distintos pero regulados y aprobados por comercio previamente',
            'Descuentos entre comercios: máximo 30%, graduales, empezando por 5%',
            'Intentar engañar para saltarse normativa: sanción GRAVE'
          ]},
        ]
      },
      {
        id: 'eventos',
        title: 'Eventos',
        icon: '🎉',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Todo evento debe comunicarse al encargado de eventos',
            'Notificar con al menos 1 semana de margen',
            'Se pueden hacer más de 1 evento al día pero no más de 4',
            'Los carteles no pueden ser despectivos',
            'No realizar el evento obligatorio por local: sanción',
            'Publicar en apartado de EVENTOS IC etiquetando @encargoeventos'
          ]},
        ]
      },
      {
        id: 'personal',
        title: 'Personal y Sueldos',
        icon: '👔',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Rellenar ficha para cambio de rol (civil a banda): 24h o sanción administrativa',
            'Empleados ilimitados con excepciones de rango'
          ]},
          { type: 'table', title: 'Sueldos LEGALES', headers: ['Rango', 'Sueldo'], rows: [
            ['Jefe / Testaferro', '850$'],
            ['Encargado', '650$'],
            ['Fijo', '550$'],
            ['Empleado', '450$'],
            ['Aprendiz', '350$']
          ]},
          { type: 'table', title: 'Sueldos BANDA / CIVIL ILEGAL', headers: ['Rango', 'Sueldo'], rows: [
            ['Fijo', '250$'],
            ['Empleado', '200$'],
            ['Aprendiz', '125$'],
            ['CEO', '1$'],
            ['Reinserción', '100$']
          ]},
        ]
      },
      {
        id: 'sanciones-comercios',
        title: 'Sanciones en Comercios',
        icon: '⚖️',
        content: [
          { type: 'sanction', title: 'Sistema', text: '3 advertencias = 1 Strike. Al 3er Strike: retirada automática del negocio. No se puede postular por el mismo negocio hasta el siguiente Wipe. El Staff puede retirar el negocio ipso facto si lo considera pertinente (ej: no cumplir con actividad).' }
        ]
      },
      {
        id: 'mecanica',
        title: 'Talleres Mecánicos',
        icon: '🔧',
        content: [
          { type: 'info', title: 'Reglas específicas', items: [
            'Deben tener suficientes empleados y cubrir la mayor franja horaria posible',
            'No se realizan tuneos gratuitos. Máximo descuento a trabajadores: 15%',
            'Los niveles IC no son reales, la subida se comunica por Staff de comercio',
            'Evento obligatorio: 1 al mes',
            'Se ofrece opción de tirar dados para determinar gravedad/precio de reparación'
          ]},
          { type: 'table', title: 'Precios de reparación (dados)', headers: ['Tirada', 'Precio'], rows: [
            ['1 - 3', '50$'],
            ['4 - 5', '100$'],
            ['6', '150$']
          ]},
          { type: 'info', title: 'Nota', text: 'No se obliga a ningún usuario pasar por dados si no lo desea. Se asignarán /me y /do genéricos, pero el precio sí se asigna con dados. Reparación para empleados: 50$.' }
        ]
      },
      {
        id: 'supermercados',
        title: 'Supermercados',
        icon: '🛒',
        content: [
          { type: 'info', title: 'Reglas específicas', items: [
            'Son de los establecimientos más importantes: necesitan amplio grupo de empleados',
            'Deben cubrir la mayor franja horaria posible',
            'Eventos: no obligatorios, pero se premia colaboración con otros eventos'
          ]},
        ]
      },
      {
        id: 'otros-locales',
        title: 'Otros Locales',
        icon: '🏪',
        content: [
          { type: 'info', title: 'Reglas específicas', items: [
            'Son los que dan vida al servidor y promueven roles civiles',
            'Generan sociabilidad y son indispensables',
            'Necesitan buena organización y constancia de eventos',
            'Evento mínimo: 1 cada quincena'
          ]},
        ]
      }
    ]
  },

  // ============================================================
  // NORMATIVA DE STAFF
  // ============================================================
  {
    id: 'staff',
    title: 'Normativa de Staff',
    shortTitle: 'Staff',
    description: 'Normativa interna del equipo de administración del servidor.',
    icon: '🛡️',
    color: '#8b5cf6',
    backgroundImage: '/images/normativas/staff.jpg',
    sections: [
      {
        id: 'principios',
        title: 'Principios Generales',
        icon: '⭐',
        content: [
          { type: 'info', title: 'Valores del Staff', items: [
            'Imparcialidad',
            'Responsabilidad',
            'Transparencia',
            'Ejemplo',
            'Proporcionalidad',
            'Confidencialidad',
            'Mínima intervención en rol'
          ]},
        ]
      },
      {
        id: 'estructura',
        title: 'Estructura y Funciones',
        icon: '🏗️',
        content: [
          { type: 'table', title: 'Rangos del Staff', headers: ['Rango', 'Funciones principales'], rows: [
            ['🟢 Soporte', 'Atender dudas, escalar tickets, ayudar en whitelist'],
            ['🔵 Moderador', 'Resolver reportes, aplicar sanciones leves/medias'],
            ['🟣 Administrador', 'Casos complejos, bans, gestión de logs, validaciones'],
            ['🔴 Dirección', 'Normativa, permisos, decisiones finales, RRHH Staff']
          ]},
        ]
      },
      {
        id: 'permisos',
        title: 'Permisos por Rango',
        icon: '🔑',
        content: [
          { type: 'table', title: 'Tabla de permisos', headers: ['Función', 'Soporte', 'Moderador', 'Admin', 'Dirección'], rows: [
            ['Atender tickets Discord', '✅', '✅', '✅', '✅'],
            ['Aplicar advertencias', '❌', '✅', '✅', '✅'],
            ['Usar comandos básicos (/tp, /rev)', '✅', '✅', '✅', '✅'],
            ['Kick / Jail', '❌', '✅', '✅', '✅'],
            ['Ban temporal', '❌', '❌', '✅', '✅'],
            ['Ban permanente', '❌', '❌', '🔁', '✅'],
            ['Gestionar apelaciones', '❌', '❌', '✅', '✅'],
            ['Ver logs / bases de datos', '❌', '✅', '✅', '✅'],
            ['Validar facciones / eventos especiales', '❌', '🔁', '✅', '✅'],
            ['Modificar normativa o permisos', '❌', '❌', '🔁', '✅']
          ]},
          { type: 'info', title: 'Nota', text: '🔁 Los Administradores y Moderadores pueden proponer, pero solo la Dirección lo aprueba.' }
        ]
      },
      {
        id: 'protocolos',
        title: 'Protocolos Operativos',
        icon: '📋',
        content: [
          { type: 'info', title: 'Ticket System', items: [
            'Tiempo de respuesta: ≤ 10 min Soporte / ≤ 20 min Moderador',
            'Todos los tickets deben cerrarse con resumen y evidencia si aplica',
            'Canales: #tickets, #reportes, #apelaciones'
          ]},
          { type: 'info', title: 'Reportes In-Game', items: [
            'Priorizar: cheats > acoso > conflictos de rol > dudas',
            'Nunca romper escenas sin riesgo real',
            'Si se requiere intervención: grabar clip y registrar'
          ]},
          { type: 'definition', title: 'Plantilla de cierre de intervención', text: '[STAFF] @Usuario | [FECHA] | [ID Jugador] | [Regla vulnerada] | [Acción aplicada] | [Evidencia] | [Observaciones]' }
        ]
      },
      {
        id: 'conducta',
        title: 'Conducta Interna',
        icon: '🤝',
        content: [
          { type: 'forbidden', title: 'No permitido', items: [
            'Trato no profesional o irrespetuoso',
            'Uso de poderes por diversión o beneficio personal',
            'Intervenir en roles propios o de amigos',
            'Discutir sanciones públicamente',
            'Aparecer de forma IC ante reportes (siempre invisible, comunicación por chat)',
            'DMs con jugadores cuando no sea estrictamente necesario'
          ]},
        ]
      },
      {
        id: 'disciplinario',
        title: 'Régimen Disciplinario',
        icon: '⚖️',
        content: [
          { type: 'table', title: 'Sanciones internas', headers: ['Gravedad', 'Ejemplos', 'Sanción posible'], rows: [
            ['Leve', 'Mala comunicación, tardanza sin aviso, errores menores', 'Advertencia oral/escrita'],
            ['Grave', 'Uso indebido de comandos, conflictos de interés no reportados', 'Suspensión temporal / Amonestación'],
            ['Muy Grave', 'Abuso de poder, favores en rol, filtración de información, acoso, corrupción', 'Expulsión inmediata del Staff']
          ]},
        ]
      },
      {
        id: 'apelaciones',
        title: 'Apelaciones y Conflictos',
        icon: '📋',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Toda sanción puede ser apelada en un plazo de 72 horas',
            'El Staff nunca resuelve un caso en el que esté implicado directamente',
            'En caso de conflicto entre staff, se recurre a la Dirección',
            'La Dirección puede actualizar la normativa según necesidades del servidor',
            'Se notificará por Discord oficial y se dejará constancia'
          ]},
        ]
      }
    ]
  },

  // ============================================================
  // NORMATIVA DE STREAMERS
  // ============================================================
  {
    id: 'streamers',
    title: 'Normativa de Streamers',
    shortTitle: 'Streamers',
    description: 'Requisitos y normas para creadores de contenido del servidor.',
    icon: '📺',
    color: '#ec4899',
    backgroundImage: '/images/normativas/streamers.jpg',
    sections: [
      {
        id: 'requisitos',
        title: 'Requisitos para Streamers',
        icon: '✅',
        content: [
          { type: 'info', title: 'Requisitos obligatorios', items: [
            'Contar con el rol de Streamer en Discord antes de transmitir',
            'El título del stream debe incluir "Prestigio Roleplay" y estar categorizado como GTA V',
            'Tener una persona encargada de moderar el chat en directo',
            'Compromiso y actividad para conservar el rol. Inactividad máxima: 15 días consecutivos',
            'Si necesitas ausentarte más de 15 días, notificar al Staff previamente',
            'No hay mínimo de seguidores para el programa'
          ]},
        ]
      },
      {
        id: 'sanciones-streamers',
        title: 'Sistema de Sanciones',
        icon: '⚖️',
        content: [
          { type: 'table', title: 'Strikes por gravedad', headers: ['Gravedad', 'Máx. Strikes', 'Acción', 'Duración'], rows: [
            ['Menor', 'Ninguno', 'Aviso', 'Ninguna'],
            ['Leve', '3', 'Retirada del permiso temporal', '7 días'],
            ['Grave', '2', 'Retirada del permiso temporal', '15 días'],
            ['Muy Grave', '1', 'Retirada del permiso completamente', 'Indefinida']
          ]},
          { type: 'info', title: 'Nota', text: 'Si un usuario reincide en una falta menor ya advertida, se le aplicará una sanción leve.' }
        ]
      },
      {
        id: 'infracciones',
        title: 'Infracciones Tipificadas',
        icon: '🚫',
        content: [
          { type: 'table', title: 'Infracciones y sanciones', headers: ['Infracción', 'Severidad'], rows: [
            ['Incumplimiento de normativa general del servidor', 'Menor a Muy Grave según gravedad'],
            ['Metagaming / Stream Sniping', 'Muy Grave (sin posibilidad de regreso)'],
            ['No ocultar pantalla en puntos de farmeo ilegal', 'Grave'],
            ['No ocultar pantalla/audio durante un reporte', 'Muy Grave'],
            ['Falta de respeto OOC (sexualidad, etnia, nacionalidad)', 'Grave o Muy Grave'],
            ['Falta de respeto al servidor/jugadores/staff en stream', 'Grave o Muy Grave'],
            ['No dejar el stream resubido', 'Leve'],
            ['Transmitir sin rol de Streamer', 'Grave']
          ]},
        ]
      },
      {
        id: 'examen',
        title: 'Examen de Streamer',
        icon: '📝',
        content: [
          { type: 'info', title: 'Proceso', items: [
            'Es obligatorio aprobar el examen correspondiente',
            'Se requiere contar con la Whitelist de la normativa general',
            'Si no se aprueba el examen: esperar 1 semana antes de volver a presentarlo'
          ]},
        ]
      }
    ]
  },

  // ============================================================
  // NORMATIVA LSPD
  // ============================================================
  {
    id: 'lspd',
    title: 'Normativa LSPD',
    shortTitle: 'LSPD',
    description: 'Reglamento interno del cuerpo de policía. Requisitos, artículos, estados de emergencia, códigos y más.',
    icon: '👮',
    color: '#1d4ed8',
    backgroundImage: '/images/normativas/lspd.jpg',
    sections: [
      {
        id: 'requisitos-lspd',
        title: 'Requisitos',
        icon: '📋',
        content: [
          { type: 'info', title: 'Requisitos para ingresar', items: [
            'Edad mínima de 18 años',
            'Carecer de antecedentes penales',
            'Tener en regla licencia de armas y carnet de conducir'
          ]},
        ]
      },
      {
        id: 'preambulo-lspd',
        title: 'Preámbulo',
        icon: '📖',
        content: [
          { type: 'definition', title: 'Misión', text: 'Las fuerzas y cuerpos de seguridad bajo la dependencia del Gobierno y ministerio de justicia, tendrán como misión proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana en todo el territorio nacional.' }
        ]
      },
      {
        id: 'articulos-1-10',
        title: 'Artículos 1-10',
        icon: '📝',
        content: [
          { type: 'info', title: 'Artículo 1', text: 'Las fuerzas y cuerpos de seguridad tendrán presunción de veracidad si son requeridos ante un juez.' },
          { type: 'info', title: 'Artículo 2', text: 'El respeto mutuo entre compañeros y hacia civiles debe ser constante.' },
          { type: 'info', title: 'Artículo 3', text: 'La ropa debe estar acorde a tu rango o a tu asignación.' },
          { type: 'info', title: 'Artículo 4', text: 'Cuando entras de servicio será la primera prioridad entrar en radio y mantenerse en el canal de "Espera de asignación" hasta que Central te asigne una unidad.' },
          { type: 'info', title: 'Artículo 5', text: 'Cuando un civil te pide la identificación es obligatorio proporcionarle el número de placa. Si te encuentras en binomio también será necesario proporcionar el nombre de unidad asignada.' },
          { type: 'info', title: 'Artículo 6', text: 'No se podrá utilizar el armamento policial para tu uso como civil, así como no se podrá sacar de servicio ni venderlo o regalarlo.' },
          { type: 'warning', title: 'Artículo 7 - Derechos del detenido', text: 'Las personas detenidas tienen que ser informadas de sus derechos antes de proceder con cualquier procedimiento legal. En caso de no leer los derechos, el civil podrá solicitar la Habeas Corpus y tendrá que ser dejado en libertad aunque tendrá que ser registrado y sus cargos se mantendrán. La omisión de respuesta es tomada como la comprensión de los mismos.' },
          { type: 'info', title: 'Artículo 8 - Central', text: 'Central será el mayor rango de servicio, siempre y cuando exista un agente que sea de rango mínimo Oficial III automáticamente este deberá de ser Central. Si no hay ninguno rango de Oficial III o superior, Central no existirá.' },
          { type: 'info', title: 'Artículo 9 - Códigos en persecuciones', text: 'Los códigos en las persecuciones no están activados hasta que Central lo permita, el único que está activado es el código-100. Se podrá activar clave pit o clave Robert cuando ponga en riesgo la vida de un agente o de los civiles. Se priorizará siempre la activación de la clave pit. Las claves están contraindicadas en persecuciones a motocicletas.' },
          { type: 'warning', title: 'Artículo 10 - Corrupción', text: 'La corrupción en el cuerpo está vetada. Solamente en el caso de que se dé información de otro ciudadano por dinero estará permitido pero con el riesgo de ser sancionado/expulsado del cuerpo. Todo lo demás que envuelva corrupción será sancionado directamente por el staff.' },
        ]
      },
      {
        id: 'articulos-11-20',
        title: 'Artículos 11-20',
        icon: '📝',
        content: [
          { type: 'forbidden', title: 'Artículo 11', text: 'No podrás quedarte AFK estando en servicio.' },
          { type: 'forbidden', title: 'Artículo 12', text: 'Los agentes que se queden de servicio para farmear horas teniendo la ficha abierta serán sancionados e incluso expulsados del cuerpo si esto se repite varias veces.' },
          { type: 'info', title: 'Artículo 13', text: 'Las armas de fuego ilegales están totalmente prohibido su uso una vez requisadas. Se deberán dejar en el apartado "dejar equipamiento" del almacén policial. Además, será necesario poner una nota en la ficha del sujeto informando de lo sucedido.' },
          { type: 'info', title: 'Artículo 14', text: 'Únicamente se podrán utilizar vehículos asignados al rango correspondiente. No se podrán sacar ni patrullar con ellos excepto que estés en patrulla con un rango superior que te lo permita.' },
          { type: 'info', title: 'Artículo 15 - Equipamiento del vehículo', text: 'Los vehículos tipo sedan llevarán un máximo de 2 vallas, 2 pinchos y 10 conos. Los vehículos tipo furgón o todoterreno llevarán 4 vallas, 4 pinchos y 20 conos.' },
          { type: 'info', title: 'Artículo 16', text: 'Ante cualquier actuación dudosa siempre se deberá consultar con un superior que nos indicará qué hacer.' },
          { type: 'info', title: 'Artículo 17', text: 'Para realizar una actuación no competente se tendrá que pedir permiso a un superior y no podremos tomar decisiones excepto que seamos mayor rango que sargento.' },
          { type: 'info', title: 'Artículo 18 - Fuerza de actuación', text: 'La fuerza de actuación hacia un civil tendrá que ser con la misma actuación con la que se recibe el ataque. En presencia de armas de fuego se intentará reducir sin utilizar la fuerza letal.' },
          { type: 'info', title: 'Artículo 19', text: 'En atracos será Central quien decida que decisiones se toman de las propuestas por el negociador. En caso de haber una División dedicada a la recuperación de rehenes esta será quien tome las decisiones por encima de los agentes presentes.' },
          { type: 'info', title: 'Artículo 20', text: 'Cuando pedimos la identificación a una persona, si se niega a darla o no la lleva encima podremos identificarlo realizando un traslado a comisaría en custodia sin detenerlo. Además, se le podrá imponer una sanción económica por no llevar el DNI encima.' },
        ]
      },
      {
        id: 'articulos-21-30',
        title: 'Artículos 21-30',
        icon: '📝',
        content: [
          { type: 'info', title: 'Artículo 21', text: 'Las únicas alertas que serán atendidas estarán situadas cerca de nuestra ubicación o simplemente siendo asignados por central.' },
          { type: 'info', title: 'Artículo 22 - Cacheo', text: 'Se podrá cachear a un sujeto cuando vaya con el rostro cubierto o esté en la zona de algún aviso. No podremos cachear a civiles por la calle por su código de vestimenta, religión, sexo, raza o edad.' },
          { type: 'info', title: 'Artículo 23', text: 'Es obligatorio proporcionar primeros auxilios a las víctimas hasta que los servicios sanitarios lleguen. Para mantener formado el cuerpo policial, la jefatura se encargará de administrar unos cursos de primeros auxilios.' },
          { type: 'info', title: 'Artículo 24', text: 'En radio se tendrá que estar en la unidad marcada por Central. Cuando no haya ninguna persona al mando, únicamente habrá patrullas Adam y Union y tendrán que estar en los respectivos canales.' },
          { type: 'info', title: 'Artículo 25', text: 'En radio será necesario que haya silencio y que los mensajes sean breves, comprensibles y precisos. Además, debemos respetar el turno de palabra.' },
          { type: 'info', title: 'Artículo 26', text: 'No se podrá solicitar un ascenso, la jefatura observará y tomará decisiones en función de la calidad del trabajo de cada persona. Los ascensos no tienen porque ir relacionados con la antigüedad adquirida en el cuerpo.' },
          { type: 'info', title: 'Artículo 27', text: 'Cuando haya un delito de carácter grave o muy grave, la policía puede ir a establecimientos cercanos al lugar y acceder a las cámaras.' },
          { type: 'info', title: 'Artículo 28', text: 'Los civiles con sanciones de carácter muy grave podrán ser reclamados por la justicia para declarar en un juicio.' },
          { type: 'info', title: 'Artículo 29', text: 'En el maletero del vehículo podremos llevar 2 chalecos antibalas de repuesto y siempre llevar uno puesto sin depender de la alerta que esté.' },
          { type: 'info', title: 'Artículo 30 - Traslado a federal', text: 'A partir de los 60 meses no será obligatorio pero se podrá realizar un traslado a la prisión federal. Para ello, se necesitan 5 policías de servicio y un teniente o superior que supervise y certifique la operación. Si no tiene los 60 meses será notificado por la fiscalía.' },
        ]
      },
      {
        id: 'articulos-31-40',
        title: 'Artículos 31-40',
        icon: '📝',
        content: [
          { type: 'info', title: 'Artículo 31', text: 'Las aeronaves no identificadas que sobrevuelen el espacio aéreo, podrán ser interceptadas en el momento del aterrizaje o podrá ser seguida para una posterior investigación.' },
          { type: 'warning', title: 'Artículo 32', text: 'En situaciones de riesgo, deberás poner por delante tu vida y la de tu compañero ante cualquier suceso.' },
          { type: 'info', title: 'Artículo 33', text: 'Desde el rango Oficial III+ en adelante, la pistola 9mm se puede llevar fuera de servicio en momentos puntuales cuando jefatura así lo vea necesario.' },
          { type: 'forbidden', title: 'Artículo 34', text: 'Durante el servicio queda prohibido el uso constante del teléfono móvil y no se permite llevar collares, pulseras, pendientes u otro complemento de bisutería.' },
          { type: 'info', title: 'Artículo 35', text: 'Las unidades Mery serán utilizadas con permiso de un rango sargento o superior. Para poder patrullar en dicha unidad, se tendrá que estar equipado con el uniforme adecuado y es obligatorio el patrullaje en binomio siempre que hayan más de 4 oficiales de servicio.' },
          { type: 'forbidden', title: 'Artículo 36', text: 'Queda vetado el uso del vehículo personal como vehículo de servicio o viceversa.' },
          { type: 'info', title: 'Artículo 37 - Maniobra Pit', text: 'Para realizar la maniobra Pit, los vehículos de tipo sedán únicamente podrán realizarla a vehículos de tipo sedán. Los vehículos de tipo furgón o todoterreno podrán hacerla a vehículos de sus mismas características y a vehículos de menores características.' },
          { type: 'info', title: 'Artículo 38', text: 'Si en una persecución recibimos fuego hostil, el copiloto del vehículo podrá disparar a las ruedas y/o al motor para intentar frenarlo.' },
          { type: 'forbidden', title: 'Artículo 39', text: 'Está prohibido cometer actos delictivos de motivo penal estando fuera de servicio.' },
          { type: 'info', title: 'Artículo 40', text: 'La aplicación de sanciones es competencia de jefatura aunque asuntos internos las supervisará y podrá imponer nuevas sanciones o apelar las que ya han sido puestas con anterioridad. La licencia de arma permite tener un arma de corto alcance encima, en un vehículo o en una propiedad siempre que se consiga todo de manera legal.' },
        ]
      },
      {
        id: 'defcon',
        title: 'Estados de Emergencia (DEFCON)',
        icon: '🚨',
        content: [
          { type: 'info', title: 'DEFCON 5', text: 'Situación de peligro leve y nivel de delincuencia bajo. Los efectivos de fuerzas y cuerpos de seguridad tienen el control. Se portarán las armas reglamentarias y no se tomará ninguna actuación específica. Personas enmascaradas: identificadas y multadas.' },
          { type: 'info', title: 'DEFCON 4', text: 'Situación de peligro leve, pero el nivel de delincuencia aumenta ligeramente. Se portarán las armas reglamentarias y se podrá limitar el acceso en determinadas zonas.' },
          { type: 'warning', title: 'DEFCON 3', text: 'Nivel de alerta moderado. Secuestros y tiroteos en zonas con afluencia considerable. Tráfico de armas de medio alcance y robos a grandes establecimientos. Se recomienda cierre de establecimientos. Identificando y registrando vehículos/civiles cerca de zonas de conflicto. Armas de medio calibre autorizadas. Chaleco antibalas siempre puesto. Controles en puntos críticos.' },
          { type: 'warning', title: 'DEFCON 2', text: 'Nivel de alerta alto. Tiroteos entre civiles y organizaciones criminales. Secuestros y asesinatos a civiles y policías. Tráfico de armas de medio y largo alcance. Actuaciones de DEFCON 4 y 3 con mayor precaución. SMG en maletero o copiloto autorizado. Chaleco siempre puesto.' },
          { type: 'warning', title: 'DEFCON 1', text: 'Nivel máximo. Tiroteos por bandas/civiles hacia fuerzas de seguridad. Secuestro de miembro de jefatura o amenaza terrorista inminente. Unidades especializadas en sitios críticos. Todas las actuaciones anteriores. Carabinas en maletero o copiloto autorizado. Chaleco siempre puesto.' },
        ]
      },
      {
        id: 'codigos-policiales',
        title: 'Códigos Policiales',
        icon: '📡',
        content: [
          { type: 'table', title: 'Códigos radiales', headers: ['Código', 'Significado'], rows: [
            ['10-00', 'Precaución'],
            ['10-04', 'Afirmativo/mensaje recibido'],
            ['10-05', 'Negativo/mensaje no recibido'],
            ['10-09', 'Repita el mensaje'],
            ['10-10', 'Fuera de servicio'],
            ['10-15', 'Persona enmascarada'],
            ['10-20', 'Ubicación'],
            ['10-22', 'Regreso a central'],
            ['10-32', 'Se requiere unidad policial en...'],
            ['10-33', 'Patrullaje ordinario'],
            ['10-37', 'Se requiere grúa en...'],
            ['10-38', 'Se requiere ambulancia en...'],
            ['10-46', 'Accidente con múltiples víctimas'],
            ['10-56', 'Intento de suicidio'],
            ['10-65', 'Ignore la petición'],
            ['10-72', 'Armado con...'],
            ['10-80', 'Nos reunimos en...'],
            ['10-97', 'En camino'],
            ['10-99', 'Misión completada']
          ]},
          { type: 'table', title: 'Códigos mono', headers: ['Código', 'Significado'], rows: [
            ['148', 'Resistencia al arresto'],
            ['187', 'Homicidio'],
            ['207', 'Secuestro'],
            ['210', 'Parada vehicular'],
            ['211', 'Robo a mano armada'],
            ['245', 'Asalto con armas'],
            ['254V', 'Persecución vehicular'],
            ['254P', 'Persecución a pie'],
            ['415', 'Disturbios'],
            ['417', 'Persona armada'],
            ['459', 'Allanamiento'],
            ['487', 'Robo grande'],
            ['487V', 'Robo de vehículo'],
            ['488', 'Robo pequeño'],
            ['502', 'Bajo influencia del conductor']
          ]},
          { type: 'table', title: 'Claves generales', headers: ['Código/Clave', 'Significado'], rows: [
            ['Clave 0', 'Llamada de alta prioridad (código 3)'],
            ['Código 1', 'Tiroteo'],
            ['Código 2', 'Llamada rutinaria, luces'],
            ['Código 3', 'Llamada de emergencia, luces y sirenas'],
            ['Código 4', 'No es necesaria más ayuda'],
            ['Código 5', 'Mantenerse alejado'],
            ['Código 6', 'En espera de asignación'],
            ['Clave 911', 'Activación de unidad SWAT'],
            ['Clave Robert', 'Fuerza letal a ruedas en persecución'],
            ['Clave Pit', 'Desestabilización del vehículo perseguido'],
            ['Código 100', 'Bloqueo del paso de vehículo en persecución']
          ]},
          { type: 'table', title: 'Identificación de unidades', headers: ['Unidad', 'Descripción'], rows: [
            ['Union-00', 'Unidad vehicular unitripulada'],
            ['Adam-00', 'Unidad vehicular bitripulada'],
            ['Lincoln-00', 'Unidades tripuladas por supervisores'],
            ['Mary-00', 'Motos'],
            ['Charlie-00', 'Unidad de alta velocidad'],
            ['King-00', 'Unidad de investigación'],
            ['OP-00', 'Unidades encubiertas'],
            ['Aire-00', 'Unidad aérea'],
            ['David-00', 'Unidad tripulada por miembros SWAT']
          ]},
        ]
      },
      {
        id: 'robos-secuestros-lspd',
        title: 'Robos y Secuestros',
        icon: '🏦',
        content: [
          { type: 'info', title: 'Robos menores (badulaques/licorerías)', items: [
            'Mínimo 2 agentes de servicio, máximo 4',
            'Atracadores: mínimo 2, máximo 3',
            'Armamento reglamentario, sin tirador',
            'Máximo 3 rehenes'
          ]},
          { type: 'info', title: 'Robo mayor (bancos)', items: [
            'Mínimo 4 policías de servicio, máximo 6 agentes',
            'Atracadores: mínimo 2, máximo 5',
            'Se intentará activar unidad SWAT',
            'Se podrá tener un tirador en ambos bandos',
            'Máximo 4 rehenes'
          ]},
          { type: 'warning', title: 'Negociaciones', items: [
            'Las negociaciones deben ser lo más calmadas posible',
            'Solo se negocia por rehenes, NO por botín',
            'Si no hay rehenes, no se entabla negociación',
            'La vida de 1 rehén se negocia como si fueran los requeridos',
            'Prohibido limitar vehículo de atracadores de forma arbitraria'
          ]},
          { type: 'info', title: 'Rotura de negociaciones', items: [
            'Obligatorio informar antes de la huida',
            'Se rompen cuando: riesgo de vida, se bajan del vehículo, vehículo por campo, entran terceras personas, luces apagadas con poca visibilidad'
          ]},
        ]
      },
      {
        id: 'derechos-civil',
        title: 'Derechos de un Civil',
        icon: '⚖️',
        content: [
          { type: 'info', title: 'Derechos bajo custodia policial', items: [
            'Derecho a conocer los delitos que se le atribuyen y motivos de la detención',
            'Derecho a guardar silencio, cualquier cosa que diga podrá ser utilizada en su contra',
            'Derecho a no declararse culpable',
            'Derecho a comida, bebida y atención sanitaria',
            'Derecho a una llamada de un minuto, en presencia de un agente y con altavoz puesto',
            'Derecho a un abogado siempre que no sea un delito flagrante',
            'Si es extranjero: derecho a comunicarse con el consulado de su país'
          ]},
        ]
      },
      {
        id: 'cadena-perpetua',
        title: 'Cadena Perpetua',
        icon: '🔒',
        content: [
          { type: 'info', title: 'Procedimiento', text: 'La cadena perpetua necesita supervisión e informe previo, además de varios documentos por parte del gobierno. Si alguien es sentenciado, podrá quedarse en libertad vigilada hasta que se rellenen todos los trámites. Si no se presenta judicialmente, será puesto en busca y captura.' },
          { type: 'info', title: 'Causas', items: [
            'Drogas: 800 unidades encima/en vehículo, o 600 en propiedad registrada',
            'Pertenecer a organización criminal (con investigación previa)',
            'Asesinato de un agente (CK)',
            'Armas: 3 armas largas o 6 cortas ilegales',
            'Multas impagadas superiores a 20k (24h para pagar o busca y captura → CK federal)'
          ]},
        ]
      },
      {
        id: 'icao',
        title: 'Código ICAO (Alfabeto Fonético)',
        icon: '🔤',
        content: [
          { type: 'table', title: 'Alfabeto fonético', headers: ['Letra', 'Palabra', 'Letra', 'Palabra'], rows: [
            ['A', 'ALFA', 'N', 'NOVEMBER'],
            ['B', 'BRAVO', 'Ñ', 'ÑU'],
            ['C', 'CHARLIE', 'O', 'OSCAR'],
            ['D', 'DELTA', 'P', 'PAPA'],
            ['E', 'ECHO', 'Q', 'QUÉBEC'],
            ['F', 'FOXTROT', 'R', 'ROMEO'],
            ['G', 'GOLF', 'S', 'SIERRA'],
            ['H', 'HOTEL', 'T', 'TANGO'],
            ['I', 'INDIA', 'U', 'UNIFORM'],
            ['J', 'JULIET', 'V', 'VICTOR'],
            ['K', 'KILO', 'W', 'WHISKY'],
            ['L', 'LIMA', 'X', 'X-RAY'],
            ['M', 'MIKE', 'Y', 'YANKEE'],
            ['', '', 'Z', 'ZULÚ']
          ]},
        ]
      },
    ]
  },

  // ============================================================
  // MANUAL DE PROCEDIMIENTOS LSPD
  // ============================================================
  {
    id: 'manual-lspd',
    title: 'Manual de Procedimientos LSPD',
    shortTitle: 'Manual LSPD',
    description: 'Procedimientos operativos, patrullaje, denuncias, felony stop, paradas de tráfico y más.',
    icon: '📋',
    color: '#2563eb',
    backgroundImage: '/images/normativas/manual-lspd.jpg',
    sections: [
      {
        id: 'referencias',
        title: 'Sistema de Referencias',
        icon: '📍',
        content: [
          { type: 'info', title: 'Uso obligatorio', items: [
            'Las referencias son totalmente obligatorias para organizar el patrullaje',
            'Acceder: F7 → segunda pestaña → referencias',
            'Comisaría: referencia de comisaría',
            'Patrullaje: referencia de patrullaje',
            'Patrullaje aéreo: referencia de aire',
            'Persecución en moto: referencia de persecución (color a elección)',
            'Persecución en auto: referencia de persecución (color a elección)',
            'TAC: referencia numerada (TAC-01 → referencia 1, etc.)',
            'Código 100: QRR (automático al presionar botón)'
          ]},
        ]
      },
      {
        id: 'patrullaje',
        title: 'Patrullaje',
        icon: '🚔',
        content: [
          { type: 'info', title: 'Reglas de patrullaje', items: [
            'Obligatoriedad de patrullaje en binomios para cadetes',
            'Opción de llevar chaleco extra por agente en el vehículo',
            'Portación de 10 cargadores extra por agente',
            'Herramientas: cámara de foto y linterna',
            'Asignación en radio adecuada en todo momento'
          ]},
          { type: 'table', title: 'Unidades de patrullaje', headers: ['Unidad', 'Descripción'], rows: [
            ['MANDO', 'Responsable de control de unidades de emergencia'],
            ['UNIÓN', 'Unidad vehicular con un único efectivo'],
            ['ADAM', 'Unidad vehicular con dos efectivos'],
            ['MARY', 'Unidad motorizada con un único efectivo'],
            ['KING', 'Patrullaje de incógnito (Detective Bureau y jefatura)'],
            ['TOM', 'Patrullajes especiales (pie, bicicleta, marítimo)'],
            ['PEGASO', 'Unidad aérea (requiere licencia de vuelo)'],
            ['COMISARÍA', 'Oficiales en comisaría atendiendo denuncias']
          ]},
        ]
      },
      {
        id: 'denuncias',
        title: 'Denuncias',
        icon: '📝',
        content: [
          { type: 'info', title: 'Procedimiento', items: [
            'Abrir tablet → botón de denuncia → nueva denuncia',
            'Incluir: nombre del denunciante, nombre del denunciado (si es posible)',
            'Incluir: día y hora, descripción de lo sucedido, lugar',
            'Los incidentes NO SON DENUNCIAS',
            'Únicas denuncias con incidente: robos a establecimientos',
            'Robos: estado Ganado/Perdido, lo confiscado, toda la información necesaria'
          ]},
        ]
      },
      {
        id: 'felony-stop',
        title: 'Felony Stop',
        icon: '🛑',
        content: [
          { type: 'info', title: 'Procedimiento', items: [
            'Dos tipos: felony de un carril y de doble carril',
            '1. Pedir al conductor que retire las llaves del contacto y las tire por la ventanilla',
            '2. Que saque las manos por la ventanilla y abra la puerta desde fuera',
            '3. Que salga con las manos en alto',
            '4. Decirle que se vaya dos pasos hacia detrás y dos hacia la izquierda y se arrodille',
            '5. En caso de más implicados: conductor → copiloto → parte trasera'
          ]},
          { type: 'warning', title: 'Cuándo aplicar', items: [
            'Vehículo reportado como robado',
            'Vehículo involucrado en escena del crimen',
            'Orden de búsqueda contra ese vehículo'
          ]},
          { type: 'warning', title: 'IMPORTANTE', text: 'Cuando el sujeto se baje del vehículo, los demás oficiales deben de bajar, apuntarle con letal y cubrirse con la puerta.' },
        ]
      },
      {
        id: 'parada-trafico',
        title: 'Parada de Tráfico (210)',
        icon: '🚗',
        content: [
          { type: 'info', title: 'Pasos', items: [
            'Dar el alto con sirenas y luces',
            'Colocar distintivo ocupado',
            'Pedir al conductor que retire las llaves y las tire por la ventana',
            'Informar del 210 a H-50',
            'El copiloto se baja del vehículo y se acerca al sujeto',
            'Identificación y comunicación de la parada de tráfico',
            'Colocar multa',
            'Devolver documentos y llaves',
            'Retirar distintivo ocupado'
          ]},
        ]
      },
      {
        id: 'cacheo-lspd',
        title: 'Cacheo',
        icon: '🔍',
        content: [
          { type: 'info', title: 'Cuándo cachear', text: 'Siempre se debe cachear a cualquier persona indicada en un delito o como presunto en caso de ser aprendido en flagrancia o alrededores de un llamamiento de un civil.' },
          { type: 'info', title: 'Cacheo en comisaría', text: 'Al sacarlo del vehículo por la parte de abajo en el garaje. Se le quitan SOLAMENTE armas y medios de comunicación (radio o teléfono). SÍ se le devuelven al final.' },
        ]
      },
      {
        id: 'radio-interna',
        title: 'Radio Interna',
        icon: '📻',
        content: [
          { type: 'info', title: 'Pedir asignación', text: 'F7 → segunda pestaña → 10-8 y estar en el canal de espera de asignación.' },
          { type: 'info', title: 'Iniciar patrullaje', text: 'F7 → segunda pestaña → Código 2. Estar en el canal correspondiente con la referencia activa.' },
        ]
      },
      {
        id: 'persecuciones-lspd',
        title: 'Persecuciones (254-V)',
        icon: '🏎️',
        content: [
          { type: 'info', title: 'Procedimiento', items: [
            'Informar a central para que asigne refuerzo',
            'Asignar mando de operativo para decidir colores de referencias y roles',
            'Mantener la radio lo más limpia posible',
            'Prioridad a los comunicados del agente que narra'
          ]},
          { type: 'warning', title: 'Narración', text: 'Nunca diremos derecha o izquierda, nos orientamos por puntos cardinales: Arriba = Norte, Abajo = Sur, Derecha = Este, Izquierda = Oeste.' },
        ]
      },
      {
        id: 'robo-vehiculo',
        title: 'Robo de Vehículo (487V)',
        icon: '🚘',
        content: [
          { type: 'info', title: 'Procedimiento', items: [
            'Verificar si la matrícula coincide con la última alerta',
            'Dar el alto al sujeto',
            'Si hace caso omiso: proceder como 254-V'
          ]},
        ]
      },
      {
        id: 'venta-droga',
        title: 'Venta de Droga',
        icon: '💊',
        content: [
          { type: 'info', title: 'Procedimiento', items: [
            'Acudir con lumínicas pero SIN sonoras (para pillar en flagrante)',
            'No podemos cachear aunque el sujeto esté en la zona',
            'Solo cachear si vemos al sujeto vendiendo estupefacientes (mientras está con el otro NPC)'
          ]},
        ]
      },
    ]
  },

  // ============================================================
  // CÓDIGO PENAL - Prestigio Roleplay
  // ============================================================
  {
    id: 'codigo-penal',
    title: 'Código Penal',
    shortTitle: 'Código Penal',
    description: 'Código Penal completo del Estado de San Andreas — Delitos, penas y multas.',
    icon: '⚖️',
    color: '#dc2626',
    backgroundImage: '/images/normativas/codigo-penal.jpg',
    sections: [
      {
        id: 'capitulo-i',
        title: 'Cap. I – Delitos contra la Seguridad Vial',
        icon: '🚗',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO I – DELITOS CONTRA LA SEGURIDAD VIAL', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 1.01', 'Conducir un vehículo sin licencia — Conducir un vehículo de 2 o más ruedas y/o embarcación sin debida licencia.', '1.250', '0'],
            ['Art. 1.02', 'Uso excesivo del claxon — Utilizar de forma inapropiada y repetida el claxon.', '200', '0'],
            ['Art. 1.03', 'Giro indebido — Hacer un cambio de sentido en zona no habilitada o pisando línea continua.', '200', '0'],
            ['Art. 1.04', 'Circular en sentido contrario — Conducir o invadir con el vehículo el sentido contrario de la circulación.', '250', '0'],
            ['Art. 1.05', 'Mal estacionamiento — Estacionar en un lugar no habilitado o autorizado el vehículo.', '300', '0'],
            ['Art. 1.06', 'Obstruir la circulación — Impedir o dificultar la circulación del tráfico.', '300', '0'],
            ['Art. 1.07', 'Ignorar las señales de tráfico — No hacer caso a cualquier señal de tráfico.', '200', '0'],
            ['Art. 1.08', 'Saltarse un semáforo — Saltarse o no realizar los tres segundos de parada en un semáforo.', '250', '0'],
            ['Art. 1.09', 'No ceder el paso a vehículos de emergencia — Obstaculizar con el vehículo a pie el paso y las labores de los vehículos de emergencia.', '550', '0'],
            ['Art. 1.10', 'Adelantamiento indebido — Adelantar a un vehículo por la derecha fuera de poblado o pisando línea continua.', '250', '0'],
            ['Art. 1.11', 'Circular marcha atrás — Circular de forma excesiva o indebida marcha atrás.', '200', '0'],
            ['Art. 1.12', 'Conducción de vehículo en malas condiciones — Circular un vehículo con daños visibles en chapa o cristales.', '250', '0'],
            ['Art. 1.13', 'Circular por zonas no habilitadas — Circular con el vehículo sobre cualquier superficie no asfaltada o señalizada en el mapa para poder circular sobre ella.', '350', '0'],
            ['Art. 1.14', 'Circular con las luces apagadas — Circular con las luces de cruce o largas sin estar encendidas cuando es de noche.', '200', '0'],
            ['Art. 1.15', 'Circular con motocicleta sin casco — Conducir una motocicleta o ciclomotor sin casco.', '150', '0'],
            ['Art. 1.16', 'Conducción temeraria — Circular poniendo en peligro a los ciudadanos o conductores. Incluye: Exceso de velocidad e Ignorar señales de tráfico.', '800', '6'],
            ['Art. 1.17', 'Omitir las indicaciones en una regulación de tráfico — Hacer caso omiso a las indicaciones que realicen los policías que estén regulando el tráfico.', '300', '0'],
            ['Art. 1.18', 'Saltar u omitir un control de tráfico — No detenerse en un control de tráfico y omitir la señalización e indicaciones de los agentes. Incluye: Huida de la justicia.', '1.600', '12'],
            ['Art. 1.19', 'Exceso de velocidad en vía urbana — Superior a 80 km/h: sanción económica. Superando 150 km/h: condena. Requiere radar policial.', '630', '5'],
            ['Art. 1.20', 'Exceso de velocidad en carreteras secundarias — Superior a 120 km/h: sanción económica. Superando 180 km/h: condena. Requiere radar policial.', '475', '5'],
            ['Art. 1.21', 'Exceso de velocidad en autovías — Superior a 120 km/h: sanción económica. Superando 180 km/h: condena. Requiere radar policial.', '550', '5'],
            ['Art. 1.22', 'Uso del teléfono móvil al volante — Se aplicará cuando el conductor haga uso del teléfono móvil. Solo permitido manos libres si no supone peligro.', '250', '0'],
            ['Art. 1.23', 'No respetar el paso de peatones — No ceder el paso a peatones en vías de paso para estos.', '250', '0'],
            ['Art. 1.24', 'Conducir bajo los efectos del alcohol — Tras test de alcoholemia. Si no conforme, puede solicitar segunda prueba pasados 10 minutos.', '660', '5'],
            ['Art. 1.25', 'Conducir bajo los efectos de sustancias estupefacientes — Tras test de drogas. Si no conforme, puede solicitar segunda prueba pasados 10 minutos.', '850', '7'],
            ['Art. 1.26', 'Conducción de vehículo aéreo sin licencia — Conducir un vehículo aéreo sin debida licencia.', '15.000', '20'],
            ['Art. 1.27', 'Violación del espacio aéreo de instalaciones — Invasión de la zona de exclusión aérea de un determinado lugar.', '3.500', '20'],
          ]},
        ]
      },
      {
        id: 'capitulo-ii',
        title: 'Cap. II – Contra la Libertad e Integridad Física',
        icon: '👊',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO II – DELITOS CONTRA LA LIBERTAD, LA INTEGRIDAD FÍSICA Y CONDUCTAS ERRÓNEAS', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 2.01', 'Disturbios en la vía pública — Riña tumultuaria utilizando medios que pongan en peligro la vida o integridad de las personas.', '900', '5'],
            ['Art. 2.02', 'Agresión a un civil — Acción violenta a otra persona con intención de causar un daño.', '1.200', '4'],
            ['Art. 2.03', 'Faltas de respeto a civil — Lesionar o agredir verbalmente la dignidad de otra persona, perjudicando su fama o reputación.', '500', '0'],
            ['Art. 2.04', 'Amenaza verbal a un civil — Gesto, expresión o acción que anticipa la intención de dañar a alguien.', '400', '0'],
            ['Art. 2.05', 'Alteración del orden público — Alterar la paz pública con actos de violencia o amenazas (rostro oculto, cortar tráfico, manifestaciones ilegales, etc.).', '750', '5'],
            ['Art. 2.06', 'Allanamiento de morada — Entrar en morada ajena o mantenerse en la misma contra la voluntad de su morador.', '2.500', '10'],
            ['Art. 2.07', 'Delito de odio — Infracción penal donde la víctima se elige por su pertenencia a un grupo basado en raza, origen, religión, sexo, orientación sexual, etc. Condena temporal si reincide.', '1.000', '6'],
            ['Art. 2.08', 'Dañar el mobiliario urbano — Causar daños al mobiliario urbano de la ciudad (farolas, semáforos, contenedores, etc.).', '350', '0'],
            ['Art. 2.09', 'Acoso psicológico — Atentar contra la dignidad e integridad moral de otro.', '1.400', '8'],
            ['Art. 2.10', 'Suplantación de identidad — Apropiación de la identidad de una persona para acceder a recursos u obtener beneficios.', '3.000', '10'],
            ['Art. 2.11', 'Circular por la vía pública con el rostro oculto — Llevar bandanas, máscaras o cualquier elemento que oculte el rostro en vía pública.', '450', '0'],
            ['Art. 2.12', 'Circular en vía pública desnudo o semidesnudo — Mostrar partes del cuerpo por ausencia de prendas.', '300', '0'],
            ['Art. 2.13', 'Circular portando chaleco antibalas o accesorios de armas — Portar accesorios de armas o chaleco antibalas, funcional o visual.', '500', '0'],
            ['Art. 2.14', 'Participación en carreras ilegales — Formar parte de una carrera ilegal o ser el organizador.', '900', '6'],
            ['Art. 2.15', 'Comercialización ilegal — Venta de servicios sin los permisos necesarios del ayuntamiento.', '650', '0'],
            ['Art. 2.16', 'Prostitución — Mantener relaciones sexuales a cambio de dinero o beneficios. Se penará igualmente a quienes contraten dichos servicios.', '850', '8'],
            ['Art. 2.17', 'Explotación sexual — Empleando violencia, intimidación o engaño, abusando de superioridad o vulnerabilidad, para determinar a una persona a ejercer o mantenerse.', '2.500', '13'],
            ['Art. 2.18', 'Agresión sexual — Atentar contra la libertad sexual de otra persona, utilizando violencia o intimidación.', '1.500', '10'],
            ['Art. 2.19', 'Abusos sexuales — Sin violencia o intimidación y sin consentimiento, realizar actos contra la libertad sexual.', '850', '10'],
            ['Art. 2.20', 'Acoso sexual — Pedir favores de naturaleza sexual provocando situación gravemente intimidatoria, hostil o humillante.', '3.000', '10'],
            ['Art. 2.21', 'Violación — Cuando haya acceso carnal sobre la persona.', '3.000', '60'],
          ]},
        ]
      },
      {
        id: 'capitulo-iii',
        title: 'Cap. III – Contra el Patrimonio y Orden Socioeconómico',
        icon: '💰',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO III – DELITOS CONTRA EL PATRIMONIO Y CONTRA EL ORDEN SOCIOECONÓMICO', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 3.01', 'Hurto — Con ánimo de lucro, coja pertenencias sin la voluntad de su dueño.', '600', '5'],
            ['Art. 3.02', 'Asalto a mano armada — Con ánimo de lucro, apoderarse de pertenencias ajenas empleando fuerza en las cosas.', '1.000', '6'],
            ['Art. 3.03', 'Robo de Vehículo — Sustraer o utilizar sin autorización un vehículo ajeno, sin ánimo de apropiárselo.', '860', '7'],
            ['Art. 3.04', 'Robo de Vehículo de Importación — Sustraer o utilizar sin autorización un vehículo de importación. Incluye: Huida, dinero negro, rostro oculto.', '1.500', '10'],
            ['Art. 3.05', 'Robo a domicilio/casa — Con ánimo de lucro, apoderarse de cosas muebles empleando violencia o intimidación.', '1.200', '10'],
            ['Art. 3.06', 'Robo a un negocio comercial — Robar a mano armada la caja registradora de un negocio menor. Incluye: porte armas, huida, rostro oculto, secuestro, robo vehículo.', '1.500', '10'],
            ['Art. 3.07', 'Robo a un negocio comercial con intento de homicidio — Aplicando intento de homicidio en robo y huida. Incluye: porte armas, huida, rostro oculto, secuestro, intento homicidio, robo vehículo.', '2.500', '15'],
            ['Art. 3.08', 'Intento de robo a un negocio comercial — Intentar iniciar robo y ser pillado en flagrante delito. Incluye: porte armas, huida, secuestro, robo vehículo.', '800', '5'],
            ['Art. 3.09', 'Cómplice de robo a un negocio comercial — Obstruir de forma interesada el operativo. Incluye: porte armas, huida, secuestro, robo vehículo.', '700', '5'],
            ['Art. 3.10', 'Robo a un furgón blindado — Con ánimo de lucro, apoderarse empleando violencia o intimidación. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '8.000', '10'],
            ['Art. 3.11', 'Robo a un furgón blindado con intento de homicidio — Incluye: rostro oculto, portes armas, huida, intento homicidio, secuestro, robo vehículo.', '15.000', '15'],
            ['Art. 3.12', 'Robo a joyería — Con ánimo de lucro, apoderarse de bienes empleando violencia o intimidación. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '10.000', '15'],
            ['Art. 3.13', 'Robo a joyería con intento de homicidio — Aplicando intento homicidio en robo y huida. Incluye: rostro oculto, portes armas, huida, intento homicidio, secuestro, robo vehículo.', '17.000', '20'],
            ['Art. 3.14', 'Intento de robo a joyería — Pillado en flagrante delito. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '5.000', '8'],
            ['Art. 3.15', 'Cómplice de robo a joyería — Obstruir de forma interesada el operativo. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '5.000', '8'],
            ['Art. 3.16', 'Robo Ammu-Nación — Robo de las vitrinas. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '10.000', '15'],
            ['Art. 3.17', 'Robo a Ammu-Nation con intento de homicidio — Aplicando intento homicidio en robo y huida. Incluye: porte armas, rostro oculto, huida, secuestro, intento homicidio, robo vehículo.', '17.000', '20'],
            ['Art. 3.18', 'Intento de robo a Ammu-Nation — Pillado en flagrante delito. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '5.000', '8'],
            ['Art. 3.19', 'Cómplice de robo a Ammu-Nation — Obstruir de forma interesada el operativo. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '5.000', '8'],
            ['Art. 3.20', 'Robo a Life Invader — Asaltar el local para adquirir bienes a la fuerza o con intimidación. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '16.000', '15'],
            ['Art. 3.21', 'Robo a Life Invader con intento de homicidio — Aplicando intento homicidio en robo y huida. Incluye: porte armas, rostro oculto, huida, secuestro, intento homicidio, robo vehículo.', '23.000', '20'],
            ['Art. 3.22', 'Intento de robo a Life Invader — Pillado en flagrante delito. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '8.000', '6'],
            ['Art. 3.23', 'Cómplice de robo a Life Invader — Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '8.000', '6'],
            ['Art. 3.24', 'Asalto al yate — Asaltar el yate para apoderarse de bienes y posesiones. Incluye: porte armas, rostro oculto, huida, intento homicidio, robo vehículo.', '22.000', '20'],
            ['Art. 3.25', 'Robo a sucursal bancaria (Fleeca) — Con ánimo de lucro, empleando violencia o intimidación. Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '18.000', '30'],
            ['Art. 3.26', 'Robo a sucursal bancaria con intento de homicidio (Fleeca) — Aplicando intento homicidio en robo y huida. Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, intento homicidio, robo vehículo.', '25.000', '35'],
            ['Art. 3.27', 'Intento de robo a sucursal bancaria (Fleeca) — Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '8.000', '15'],
            ['Art. 3.28', 'Cómplice de robo a sucursal bancaria (Fleeca) — Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '10.000', '15'],
            ['Art. 3.29', 'Robo a banco central — Robar la caja fuerte del Banco Central (negociación de huida). Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '45.000', '40'],
            ['Art. 3.30', 'Robo a banco central con intento de homicidio — Acabando en tiroteo. Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, intento homicidio funcionario, robo vehículo.', '55.000', '45'],
            ['Art. 3.31', 'Intento de robo a banco central — Pillado en flagrante delito. Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '25.000', '20'],
            ['Art. 3.32', 'Cómplice de robo a banco central — Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, robo vehículo.', '30.000', '20'],
            ['Art. 3.33', 'Asalto a un establecimiento mayor del Estado — Con ánimo de lucro, empleando violencia o intimidación. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '55.000', '45'],
            ['Art. 3.34', 'Asalto a laboratorios Humane — Empleando violencia o intimidación. Incluye: porte armas, rostro oculto, huida, secuestro, robo vehículo.', '13.000', '10'],
            ['Art. 3.35', 'Asalto a laboratorios Humane con intento de homicidio — Incluye: porte armas, rostro oculto, huida, secuestro, intento homicidio funcionario, robo vehículo.', '20.000', '15'],
            ['Art. 3.36', 'Cómplice de asalto a laboratorios Humane — Incluye: porte armas, rostro oculto, huida, secuestro, intento homicidio funcionario, robo vehículo.', '8.000', '15'],
            ['Art. 3.37', 'Intento de asalto a laboratorios Humane — Incluye: porte armas, rostro oculto, huida, secuestro, intento homicidio funcionario, robo vehículo.', '8.000', '15'],
            ['Art. 3.38', 'Intento de asalto a un tren estatal — Se entregan de forma voluntaria. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '4.000', '5'],
            ['Art. 3.39', 'Asalto a un tren estatal — Apoderarse de bienes empleando violencia o intimidación. Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '8.000', '15'],
            ['Art. 3.40', 'Asalto a un tren estatal con intento de homicidio — Incluye: rostro oculto, portes armas, huida, secuestro, robo vehículo.', '15.000', '20'],
            ['Art. 3.41', 'Intento de robo a Casino — Pillado en flagrante delito. Incluye: porte armas, rostro oculto, secuestro, dinero negro, robo vehículo.', '10.000', '5'],
            ['Art. 3.42', 'Robo a Casino — Empleando violencia o intimidación. Incluye: porte armas, rostro oculto, secuestro, huida, dinero negro, robo vehículo.', '22.500', '15'],
            ['Art. 3.43', 'Robo a Casino con intento de homicidio — Incluye: porte armas, rostro oculto, huida, secuestro, dinero negro, intento homicidio funcionario, robo vehículo.', '30.500', '20'],
            ['Art. 3.44', 'Cómplice de robo a Casino — Incluye: porte armas, rostro oculto, dinero negro, robo vehículo.', '30.500', '20'],
          ]},
        ]
      },
      {
        id: 'capitulo-iv',
        title: 'Cap. IV – Servicios Estatales y Autónomos',
        icon: '🏛️',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO IV – DELITOS DE Y PARA LOS SERVICIOS ESTATALES Y/O AUTÓNOMOS', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 4.01', 'Estafa de un local o servicio — Con ánimo de lucro, coja pertenencias sin la voluntad de su dueño.', '5.000', '5'],
            ['Art. 4.02', 'Negar o borrar las CCTV a la policía — Obstruir la labor policial tras un delito o sospecha.', '2.500', '5'],
            ['Art. 4.03', 'Permitir entrada a menores de 18 años en discotecas, clubs nocturnos o salón de juegos de apuestas — Entrada de menores a establecimientos de ocio sin edad requerida.', '10.000', '0'],
            ['Art. 4.04', 'Apropiación indebida de capitales — Con ánimo de lucro, coja pertenencias de un negocio sin la voluntad de su dueño o el estado.', '6.000', '15'],
            ['Art. 4.05', 'Posesión de objetos/materiales sin la licencia/autorización pertinente — Estar en posesión sin la autorización correspondiente.', '3.000', '0'],
          ]},
        ]
      },
      {
        id: 'capitulo-v',
        title: 'Cap. V – Moneda, Timbre y Hacienda Pública',
        icon: '🏦',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO V – DE LA MONEDA Y EL TIMBRE Y LOS DELITOS CONTRA LA HACIENDA PÚBLICA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 5.01', 'Delito leve contra la Hacienda Pública — Llevar dinero en efectivo sin declarar entre 1$ y 5.000$.', '1.000', '0'],
            ['Art. 5.02', 'Delito menos grave contra la Hacienda Pública — Llevar dinero sin declarar entre 5.001$ y 10.000$.', '3.300', '7'],
            ['Art. 5.03', 'Delito grave contra la Hacienda Pública — Llevar dinero sin declarar entre 10.001$ y 30.000$.', '10.000', '14'],
            ['Art. 5.04', 'Tráfico de divisas — Compraventa ilegal de divisas. Se considera tráfico poseer más de 30.001$.', '22.000', '30'],
            ['Art. 5.05', 'Posesión de joyas ilegales — Posesión de joyas ilegales (5–80 unidades).', '2.500', '10'],
            ['Art. 5.06', 'Venta de joyas ilegales — Posesión de joyas ilegales superior a 81 unidades.', '5.000', '20'],
          ]},
        ]
      },
      {
        id: 'capitulo-vi',
        title: 'Cap. VI – Porte, Tenencia y Tráfico de Armas',
        icon: '🔫',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO VI – PORTE, TENENCIA Y TRÁFICO DE ARMAS U OBJETOS ILEGALES', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 6.01', 'Exhibición de un arma blanca legal en vía pública — Mostrar un arma blanca legal en vía pública.', '700', '0'],
            ['Art. 6.02', 'Exhibición de un arma blanca ilegal en vía pública — Mostrar un arma blanca ilegal en vía pública.', '800', '0'],
            ['Art. 6.03', 'Tenencia de arma blanca ilegal — Poseer un arma blanca que no esté a la venta en un Ammu-Nation.', '1.200', '6'],
            ['Art. 6.04', 'Exhibición de un arma de fuego de calibre bajo en vía pública — Incluye retirada si no tiene licencia y tenencia.', '3.000', '10'],
            ['Art. 6.05', 'Exhibición de un arma de fuego de calibre medio en vía pública — Incluye retirada y tenencia.', '10.000', '8'],
            ['Art. 6.06', 'Exhibición de un arma de fuego de calibre alto en vía pública — Incluye retirada y tenencia.', '15.000', '8'],
            ['Art. 6.07', 'Tenencia ilegal de arma corta de fuego — Poseer un arma corta de fuego (pistola sns).', '9.000', '9'],
            ['Art. 6.08', 'Tenencia de arma de fuego ilegal de calibre bajo — Poseer un arma de fuego ilegal de bajo calibre.', '11.000', '13'],
            ['Art. 6.09', 'Tenencia de arma de fuego ilegal de calibre medio — Poseer un arma de fuego ilegal de calibre medio (escopetas y subfusiles).', '16.000', '15'],
            ['Art. 6.10', 'Tenencia de arma de fuego ilegal de calibre alto — Poseer un arma de fuego ilegal (fusiles, rifles, etc.).', '20.000', '20'],
            ['Art. 6.11', 'Tráfico de armas — Tráfico ilegal, transporte o intento de venta ilegal de armas. Mínimo 4 armas.', '30.000', '25'],
            ['Art. 6.12', 'Posesión de herramientas de robo — Posesión de dispositivos o herramientas para robar establecimientos o bienes.', '2.000', '7'],
            ['Art. 6.13', 'Posesión de herramientas explosivas — Posesión de dispositivos o herramientas con explosivos.', '3.500', '10'],
            ['Art. 6.14', 'Posesión de munición y accesorios ilegales (por unidad) — Posesión de dispositivos, accesorios o municiones de armas de fuego.', '100', '0'],
          ]},
        ]
      },
      {
        id: 'capitulo-vii',
        title: 'Cap. VII – Delitos contra la Salud Pública',
        icon: '💊',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO VII – DELITOS CONTRA LA SALUD PÚBLICA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 7.01', 'Tenencia de cogollos de marihuana (por unidad) — Consumo propio: 3 unidades. Entre 4 y 14 unidades. (Se multiplica la sanción por el número de bolsas(2gr))', '260', '0'],
            ['Art. 7.02', 'Tenencia de metanfetamina (por unidad) — Entre 0 y 10 bolsas. (Se multiplica la sanción por el número de bolsas(1gr))', '350', '0'],
            ['Art. 7.03', 'Tenencia de cocaína (por unidad) — Entre 0 y 10 bolsas. (Se multiplica la sanción por el número de bolsas(1gr))', '500', '0'],
            ['Art. 7.04', 'Venta menor de marihuana (por unidad) — Vender o llevar 10 a 25 unidades. (Se multiplica por el número de unidades(2gr))', '260', '10'],
            ['Art. 7.05', 'Venta menor de metanfetamina (por unidad) — Vender o llevar 10 a 25 unidades. (Se multiplica por el número de unidades(1gr))', '350', '10'],
            ['Art. 7.06', 'Venta menor de cocaína (por unidad) — Vender o llevar 10 a 25 unidades. (Se multiplica por el número de unidades(1gr))', '500', '10'],
            ['Art. 7.07', 'Venta mayor de estupefacientes — Vender o llevar 26 a 45 unidades de cualquier sustancia. (Sanción económica fija.)', '12.000', '20'],
            ['Art. 7.08', 'Tráfico de drogas — Vender o llevar más de 46 unidades de cualquier sustancia. (Sanción económica fija.)', '20.000', '25'],
            ['Art. 7.09', 'Consumo de sustancias estupefacientes en vía pública — Conlleva retirada y sanción si sobrepasa la cantidad poseída.', '800', '0'],
          ]},
        ]
      },
      {
        id: 'capitulo-viii',
        title: 'Cap. VIII – Contra la Integridad Física Ciudadana',
        icon: '🗡️',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO VIII – DELITOS CONTRA LA INTEGRIDAD FÍSICA CIUDADANA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 8.01', 'Intento de secuestro a civil — No realizar con éxito la acción de retener u ocultar a un civil. Incluye: Huida y robo de vehículo.', '4.500', '7'],
            ['Art. 8.02', 'Secuestro a civil — Retener a una o varias personas contra su voluntad. Incluye: Huida y robo de vehículo.', '7.000', '9'],
            ['Art. 8.03', 'Retención ilegal — Encierra o detiene a otro, privándole de su libertad. Indemnización: 500$ cada 5 minutos.', '1.500', '5'],
            ['Art. 8.04', 'Delito de quebrantamiento de condena — Incumplimiento de penas de prisión, medidas de seguridad y cautelares (ej: orden de alejamiento).', '1.000', '10'],
            ['Art. 8.05', 'Intento de homicidio primer grado — Intentar matar a otra persona de manera imprudente.', '14.000', '20'],
            ['Art. 8.06', 'Intento de homicidio segundo grado — Intentar matar de manera no consumada. La víctima continúa con vida.', '10.000', '15'],
            ['Art. 8.07', 'Intento de homicidio de manera imprudente — Por imprudencia causar lesiones de gravedad con posibilidad de matar. Relacionado con vehículos a motor.', '4.000', '10'],
            ['Art. 8.08', 'Homicidio primer grado — Homicidio de una o varias personas de manera imprudente.', '17.000', '25'],
            ['Art. 8.09', 'Homicidio segundo grado — Homicidio de una o varias personas de manera no consumada.', '13.000', '20'],
            ['Art. 8.10', 'Homicidio tercer grado — Homicidio de una o varias personas de manera imprudente.', '10.000', '17'],
            ['Art. 8.11', 'Asesinato — Homicidio con premeditación, alevosía, ensañamiento, concurrencia de precio o promesa.', '25.000', '30'],
            ['Art. 8.12', 'Omisión de socorro — Observar que otra persona está en peligro y no auxiliar o solicitar ayuda.', '1.000', '5'],
            ['Art. 8.13', 'Coacción — Fuerza o violencia física o psíquica para obligar a decir o hacer algo contra su voluntad.', '3.500', '10'],
            ['Art. 8.14', 'Negligencia médica con resultados de lesiones — Sanitario que causa lesiones al paciente por falta de cuidado.', '2.000', '0'],
            ['Art. 8.15', 'Negligencia médica con resultados de muerte — Sanitario que causa la muerte al paciente por falta de cuidado.', '8.000', '10'],
          ]},
        ]
      },
      {
        id: 'capitulo-ix',
        title: 'Cap. IX – Documentos, Identificaciones y Licencias',
        icon: '🪪',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO IX – DELITOS EN DOCUMENTOS, IDENTIFICACIONES Y LICENCIA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 9.01', 'Delito de falsificación de documento — Falsear un documento con la intención de que aparente ser real.', '3.000', '8'],
            ['Art. 9.02', 'Posesión de documentación no renovada/válida — Poseer licencias o documentación no renovadas habiendo sido previamente avisado.', '1.000', '0'],
            ['Art. 9.03', 'Negación del agente a enseñar el número de placa — Agente que se niega a enseñar su placa tras intervención. (+ Indemnización de 1.500$ al ciudadano)', '1.000', '0'],
            ['Art. 9.04', 'Usurpación de funciones públicas — Ejercicio de actos propios de autoridad o funcionario, atribuyéndose carácter oficial sin condiciones para ello.', '4.000', '15'],
            ['Art. 9.05', 'Intrusismo — Ejercicio de actividad profesional sin título o autorización necesarios.', '2.000', '10'],
            ['Art. 9.06', 'Denuncia falsa/escasa o irrisoria — Denunciar a un agente con redacción escasa y motivo de poco peso o sin fundamento.', '1.000', '0'],
          ]},
        ]
      },
      {
        id: 'capitulo-x',
        title: 'Cap. X – Delitos de la Administración Pública',
        icon: '📋',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO X – DELITOS DE LA ADMINISTRACIÓN PÚBLICA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 10.01', 'Prevaricación de funcionario público — Dictar resolución arbitraria a sabiendas de su ilegalidad o nombrar sin requisitos legales.', '1.200', '10'],
            ['Art. 10.02', 'Ingesta de drogas o alcohol de servicio — Consumir sustancias estupefacientes o alcohol durante el servicio.', '1.200', '8'],
            ['Art. 10.03', 'Omisión del deber de perseguir delitos — Dejar intencionadamente de promover la persecución de delitos de los que se tenga noticia.', '3.000', '10'],
            ['Art. 10.04', 'Omisión de socorro por un funcionario público — Requerido a prestar auxilio por razón de cargo y abstenerse de prestarlo.', '25.000', '10'],
            ['Art. 10.05', 'Violación de secretos — Revelar secretos o informaciones de los que se tenga conocimiento por razón de cargo y que no deban divulgarse.', '2.500', '0'],
            ['Art. 10.06', 'Allanamiento de domicilio — Entrar contra la voluntad del titular en domicilio, despacho u oficina fuera de horas de apertura.', '3.500', '10'],
          ]},
        ]
      },
      {
        id: 'capitulo-xi',
        title: 'Cap. XI – Contra la Administración de Justicia',
        icon: '🔨',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO XI – DELITOS CONTRA LA ADMINISTRACIÓN DE JUSTICIA', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 11.01', 'Obstrucción a la justicia — Omitir presentarse en comisaría o colaborar con la policía cuando ha sido indicado previamente.', '700', '10'],
            ['Art. 11.02', 'Desacato a la autoridad — Hacer caso omiso a una orden directa de un agente de la autoridad.', '1.000', '0'],
            ['Art. 11.03', 'Huida de la justicia — Hacer caso omiso a indicaciones de agentes y proceder a persecución. Incluye: Robo de vehículo y delitos contra la seguridad vial.', '1.600', '7'],
            ['Art. 11.04', 'Agredir o amenazar a un funcionario público — Acción violenta con intención de causar un daño.', '1.500', '5'],
            ['Art. 11.05', 'Faltas de respeto a un funcionario público — Agredir verbalmente o menospreciar a un agente. Reincidencia: condena.', '750', '5'],
            ['Art. 11.06', 'Asalto/robo a un funcionario público — Amenazar a un funcionario para que entregue sus pertenencias.', '4.000', '15'],
            ['Art. 11.07', 'Violar un perímetro o cordón policial — Cruzar sin permiso un perímetro policial claramente señalizado.', '520', '0'],
            ['Art. 11.08', 'Intento de soborno a un funcionario público — Tratar de incentivar a la corrupción por medio de bienes o suma monetaria.', '2.500', '0'],
            ['Art. 11.09', 'Soborno a un funcionario público — Haber incentivado a la corrupción por medio de bienes o suma monetaria.', '4.000', '7'],
            ['Art. 11.10', 'Tomar, difamar o difundir grabaciones o fotografías de un funcionario público — Grabar o tomar foto/video sin consentimiento.', '4.000', '7'],
            ['Art. 11.11', 'Intento de secuestro a funcionario público — No realizar con éxito la acción de retener u ocultar a un funcionario.', '5.000', '15'],
            ['Art. 11.12', 'Secuestro a funcionario público — Retener a un funcionario contra su voluntad.', '10.000', '20'],
            ['Art. 11.13', 'Entrar en zonas de acceso a funcionarios en dependencias policiales — Acceder sin autorización a zonas limitadas y privadas de comisaría.', '1.200', '0'],
            ['Art. 11.14', 'Entrada no autorizada a instalaciones militares — Invasión de instalación militar a pie o en vehículo.', '10.000', '26'],
            ['Art. 11.15', 'Intento de homicidio de primer grado a un funcionario público — Intentar matar con alevosía.', '15.000', '25'],
            ['Art. 11.16', 'Intento de homicidio de segundo grado a un funcionario público — Intentar matar de manera no consumada. La víctima continúa con vida.', '11.000', '20'],
            ['Art. 11.17', 'Intento de homicidio de manera imprudente a un funcionario público — Por imprudencia grave causar lesiones con posibilidad de matar. Relacionado con vehículos.', '5.000', '15'],
            ['Art. 11.18', 'Homicidio en primer grado a un funcionario público — Con premeditación y alevosía.', '20.000', '30'],
            ['Art. 11.19', 'Homicidio en segundo grado a un funcionario público — De manera no consumada.', '16.000', '25'],
            ['Art. 11.20', 'Homicidio en tercer grado a un funcionario público — De manera imprudente.', '13.000', '22'],
          ]},
        ]
      },
      {
        id: 'capitulo-xii',
        title: 'Cap. XII – Recursos Naturales y Medio Ambiente',
        icon: '🌿',
        content: [
          { type: 'penal-table', chapterTitle: 'CAPÍTULO XII – DE LOS DELITOS CONTRA LOS RECURSOS NATURALES Y EL MEDIO AMBIENTE', headers: ['Artículo', 'Descripción', 'Importe ($)', 'Meses'], rows: [
            ['Art. 12.01', 'Asesinato o caza de especies protegidas y porte de materia prima (por unidad) — Atentar contra la vida de una especie protegida (orcas, ballenas, tortugas, tiburones, etc.). (+ Incautación del material)', '300', '0'],
            ['Art. 12.02', 'Contaminación del medioambiente — Arrojar residuos sólidos o peligrosos al dominio público no habilitado.', '5.000', '20'],
            ['Art. 12.03', 'Provocar incendio — Provocar un incendio que comporte peligro para la vida o integridad física de las personas o cause daños en bienes.', '1.000', '11'],
          ]},
        ]
      },
    ]
  }
];

export function getNormativaById(id: string): NormativaData | undefined {
  return normativas.find(n => n.id === id);
}

export function getAllNormativaIds(): string[] {
  return normativas.map(n => n.id);
}
