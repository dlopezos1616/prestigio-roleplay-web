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
  type: 'definition' | 'allowed' | 'forbidden' | 'sanction' | 'example' | 'info' | 'warning' | 'table';
  title?: string;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface NormativaData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
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
  // CÓDIGO PENAL (basado en la normativa de ilícitos)
  // ============================================================
  {
    id: 'codigo-penal',
    title: 'Código Penal',
    shortTitle: 'Código Penal',
    description: 'Delitos, penas y multas del servidor Prestigio Roleplay.',
    icon: '⚖️',
    color: '#dc2626',
    sections: [
      {
        id: 'delitos-menores',
        title: 'Delitos Menores',
        icon: '📝',
        content: [
          { type: 'table', title: 'Delitos menores y sus penas', headers: ['Delito', 'Descripción', 'Pena'], rows: [
            ['Hurto menor', 'Robo de objetos de poco valor sin violencia', 'Multa + tiempo en commissaría'],
            ['Conducción temeraria', 'Conducir de forma peligrosa sin motivo de rol', 'Multa + retirada de licencia temporal'],
            ['Desacato a la autoridad', 'Falta de respeto o desobediencia a la policía', 'Multa + arresto breve'],
            ['Posesión de sustancias', 'Portar drogas en pequeñas cantidades', 'Multa + decomiso'],
            ['Disturbios', 'Alterar el orden público', 'Multa + arresto']
          ]},
        ]
      },
      {
        id: 'delitos-graves',
        title: 'Delitos Graves',
        icon: '⚠️',
        content: [
          { type: 'table', title: 'Delitos graves y sus penas', headers: ['Delito', 'Descripción', 'Pena'], rows: [
            ['Asalto a mano armada', 'Amenazar con arma para robar', 'Prisión federal + multa elevada'],
            ['Secuestro', 'Privar de libertad a otra persona', 'Prisión federal + multa'],
            ['Robo a establecimiento', 'Asalto a negocio (pequeño/mediano)', 'Prisión + multa según tipo'],
            ['Tenencia de armas ilegales', 'Portar armas sin licencia', 'Prisión + decomiso + multa'],
            ['Tráfico de drogas', 'Vender/distribuir sustancias ilegales', 'Prisión federal + multa'],
            ['Evasión de prisión', 'Escapar de custodia policial', 'Agravante: pena aumentada']
          ]},
        ]
      },
      {
        id: 'delitos-muy-graves',
        title: 'Delitos Muy Graves',
        icon: '🔴',
        content: [
          { type: 'table', title: 'Delitos muy graves', headers: ['Delito', 'Descripción', 'Pena'], rows: [
            ['Robo a banco', 'Asalto a entidades bancarias', 'Prisión federal extendida + CK potencial'],
            ['Secuestro de autoridad', 'Secuestrar a policía/EMS de servicio', 'Prisión federal + CK potencial'],
            ['Homicidio', 'Matar a otro personaje con rol válido', 'CK del agresor o prisión máxima'],
            ['Terrorismo', 'Ataques masivos contra la ciudad', 'CK + permaban si aplica'],
            ['Traición a banda', 'Según normativa de bandas', 'CK según decisión del líder']
          ]},
          { type: 'warning', title: 'Nota importante', text: 'Los delitos muy graves pueden derivar en CK del personaje. El CK por multas acumuladas (>20k) se aplica si no se paga en 24 horas.' }
        ]
      },
      {
        id: 'multas-ck',
        title: 'Sistema de Multas y CK',
        icon: '💰',
        content: [
          { type: 'info', title: 'Reglas', items: [
            'Las multas se acumulan por delitos cometidos',
            'Miembros de banda/camellos/civiles con más de 20.000$ en multas: 24h para pagar el 100%',
            'Si no se pagan: busca y captura para CK federal',
            'CK a policía: requiere motivos de peso + pruebas gráficas detalladas',
            'CK a miembros de otras bandas: motivos de peso + pruebas que pongan en peligro la continuidad',
            'CK al abandonar banda: decisión exclusiva del líder',
            'CK a líder de banda: 85% de miembros de acuerdo + aprobación de administración'
          ]},
        ]
      }
    ]
  }
];

export function getNormativaById(id: string): NormativaData | undefined {
  return normativas.find(n => n.id === id);
}

export function getAllNormativaIds(): string[] {
  return normativas.map(n => n.id);
}
