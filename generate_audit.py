import sys
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, CondPageBreak
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import hashlib

# ============================================================
# FONT REGISTRATION
# ============================================================
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'))
registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')

# ============================================================
# PALETTE (from cascade)
# ============================================================
PAGE_BG       = colors.HexColor('#f7f6f6')
SECTION_BG    = colors.HexColor('#f1f0ef')
CARD_BG       = colors.HexColor('#ecebe7')
TABLE_STRIPE  = colors.HexColor('#f0f0ed')
HEADER_FILL   = colors.HexColor('#625838')
COVER_BLOCK   = colors.HexColor('#5b5440')
BORDER        = colors.HexColor('#c8bfa6')
ICON          = colors.HexColor('#9b8542')
ACCENT        = colors.HexColor('#1b7896')
ACCENT_2      = colors.HexColor('#3fa93f')
TEXT_PRIMARY   = colors.HexColor('#262522')
TEXT_MUTED     = colors.HexColor('#87857d')
SEM_SUCCESS   = colors.HexColor('#3a8051')
SEM_WARNING   = colors.HexColor('#a1854d')
SEM_ERROR     = colors.HexColor('#8b4c46')
SEM_INFO      = colors.HexColor('#51789f')

# ============================================================
# STYLES
# ============================================================
PAGE_W, PAGE_H = A4
LEFT_M = 1.1 * inch
RIGHT_M = 1.1 * inch
TOP_M = 0.9 * inch
BOTTOM_M = 0.9 * inch
CONTENT_W = PAGE_W - LEFT_M - RIGHT_M

# Spanish body - Times New Roman, TA_JUSTIFY (predominantly Latin text)
body_style = ParagraphStyle(
    name='Body', fontName='LiberationSerif', fontSize=10.5, leading=17,
    alignment=TA_JUSTIFY, spaceAfter=6, spaceBefore=0,
    textColor=TEXT_PRIMARY
)
body_left = ParagraphStyle(
    name='BodyLeft', fontName='LiberationSerif', fontSize=10.5, leading=17,
    alignment=TA_LEFT, spaceAfter=6, spaceBefore=0,
    textColor=TEXT_PRIMARY
)

h1_style = ParagraphStyle(
    name='H1', fontName='LiberationSerif', fontSize=20, leading=28,
    alignment=TA_LEFT, spaceBefore=18, spaceAfter=10,
    textColor=ACCENT
)
h2_style = ParagraphStyle(
    name='H2', fontName='LiberationSerif', fontSize=15, leading=22,
    alignment=TA_LEFT, spaceBefore=14, spaceAfter=8,
    textColor=HEADER_FILL
)
h3_style = ParagraphStyle(
    name='H3', fontName='LiberationSerif', fontSize=12, leading=18,
    alignment=TA_LEFT, spaceBefore=10, spaceAfter=6,
    textColor=ICON
)

caption_style = ParagraphStyle(
    name='Caption', fontName='LiberationSerif', fontSize=9, leading=13,
    alignment=TA_CENTER, spaceBefore=3, spaceAfter=6,
    textColor=TEXT_MUTED
)

toc_h1_style = ParagraphStyle(
    name='TOCH1', fontName='LiberationSerif', fontSize=13, leftIndent=20,
    textColor=TEXT_PRIMARY, leading=22
)
toc_h2_style = ParagraphStyle(
    name='TOCH2', fontName='LiberationSerif', fontSize=11, leftIndent=40,
    textColor=TEXT_MUTED, leading=18
)

# Table styles
header_cell = ParagraphStyle(
    name='HeaderCell', fontName='LiberationSerif', fontSize=10,
    textColor=colors.white, alignment=TA_CENTER, leading=14
)
cell_style = ParagraphStyle(
    name='Cell', fontName='LiberationSerif', fontSize=9.5,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, leading=13, wordWrap='CJK'
)
cell_center = ParagraphStyle(
    name='CellCenter', fontName='LiberationSerif', fontSize=9.5,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER, leading=13
)

# Severity badge styles
sev_crit = ParagraphStyle(name='SevCrit', fontName='LiberationSerif', fontSize=9, textColor=colors.white, alignment=TA_CENTER, leading=13)
sev_high = ParagraphStyle(name='SevHigh', fontName='LiberationSerif', fontSize=9, textColor=colors.white, alignment=TA_CENTER, leading=13)
sev_med = ParagraphStyle(name='SevMed', fontName='LiberationSerif', fontSize=9, textColor=TEXT_PRIMARY, alignment=TA_CENTER, leading=13)
sev_low = ParagraphStyle(name='SevLow', fontName='LiberationSerif', fontSize=9, textColor=TEXT_PRIMARY, alignment=TA_CENTER, leading=13)

# ============================================================
# TOC DOC TEMPLATE
# ============================================================
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ============================================================
# HELPERS
# ============================================================
def heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/>%s' % (key, text), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def make_table(data, col_widths, has_header=True):
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
    ]
    if has_header:
        style_cmds.append(('BACKGROUND', (0,0), (-1,0), HEADER_FILL))
        style_cmds.append(('TEXTCOLOR', (0,0), (-1,0), colors.white))
        for i in range(1, len(data)):
            bg = colors.white if i % 2 == 1 else TABLE_STRIPE
            style_cmds.append(('BACKGROUND', (0,i), (-1,i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def sev_badge(level):
    """Return a colored Paragraph badge for severity."""
    if level == 'Critica':
        return Paragraph('<b>CRITICA</b>', sev_crit)
    elif level == 'Alta':
        return Paragraph('<b>ALTA</b>', sev_high)
    elif level == 'Media':
        return Paragraph('MEDIA', sev_med)
    else:
        return Paragraph('BAJA', sev_low)

def sev_color(level):
    if level == 'Critica': return SEM_ERROR
    if level == 'Alta': return SEM_WARNING
    if level == 'Media': return SEM_INFO
    return SEM_SUCCESS

def finding_table(findings):
    """Build a findings table with severity badges."""
    data = [[
        Paragraph('<b>ID</b>', header_cell),
        Paragraph('<b>Severidad</b>', header_cell),
        Paragraph('<b>Normativa</b>', header_cell),
        Paragraph('<b>Problema</b>', header_cell),
        Paragraph('<b>Detalle</b>', header_cell),
    ]]
    for f in findings:
        badge = sev_badge(f[1])
        data.append([
            Paragraph(f[0], cell_center),
            badge,
            Paragraph(f[2], cell_style),
            Paragraph(f[3], cell_style),
            Paragraph(f[4], cell_style),
        ])
    col_w = [0.06*CONTENT_W, 0.10*CONTENT_W, 0.16*CONTENT_W, 0.28*CONTENT_W, 0.40*CONTENT_W]
    t = make_table(data, col_w)
    # Color severity badges
    for i, f in enumerate(findings):
        row = i + 1
        c = sev_color(f[1])
        t.setStyle(TableStyle([('BACKGROUND', (1,row), (1,row), c)]))
    return t

# ============================================================
# DOCUMENT
# ============================================================
output_path = '/home/z/my-project/download/Auditoria_Normativas_Clandestino_RP.pdf'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = TocDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=LEFT_M, rightMargin=RIGHT_M,
    topMargin=TOP_M, bottomMargin=BOTTOM_M,
    title='Auditoria de Normativas - Clandestino RP',
    author='Z.ai',
    subject='Auditoria completa de las normativas del servidor Clandestino RP'
)

story = []

# ============================================================
# TOC
# ============================================================
story.append(Paragraph('<b>Indice de Contenidos</b>', h1_style))
story.append(Spacer(1, 12))

toc = TableOfContents()
toc.levelStyles = [toc_h1_style, toc_h2_style]
story.append(toc)
story.append(PageBreak())

# ============================================================
# 1. RESUMEN EJECUTIVO
# ============================================================
story.append(heading('1. Resumen Ejecutivo', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'El presente documento constituye la auditoria integral de las normativas del servidor de roleplay Clandestino V2. '
    'Se han analizado un total de cinco documentos PDF que abarcan la Normativa General, la Normativa de Comercios (en dos versiones), '
    'la Normativa de Ilicitos (integrada dentro de la "Copia de normativa comercios"), la Normativa de Staff y la Normativa de Streamers. '
    'El analisis ha detectado un total de 47 incidencias clasificadas en seis categorias: duplicidades, contradicciones, errores de redaccion, '
    'problemas de interpretacion, normas simplificables y ausencias criticas.',
    body_style
))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Las incidencias mas graves incluyen una contradiccion en el nombre del servidor (se menciona "Clandestino V2" en la Normativa General '
    'y "Spanish Gaming RP" en la de Streamers), una contradiccion sobre el numero maximo de civiles en actos ilicitos (3 segun la General '
    'vs. 4 para PDB segun Ilicitos), y errores tipograficos graves en la portada de la Normativa de Streamers que afectan la credibilidad '
    'institucional del documento. Ademas, se ha identificado que la Normativa de Comercios existe en dos versiones con contenido diferente, '
    'lo que genera confusion sobre cual es la version vigente.',
    body_style
))
story.append(Spacer(1, 6))

# Summary stats table
summary_data = [
    [Paragraph('<b>Categoria</b>', header_cell), Paragraph('<b>Incidencias</b>', header_cell), Paragraph('<b>Criticas</b>', header_cell), Paragraph('<b>Altas</b>', header_cell), Paragraph('<b>Medias</b>', header_cell), Paragraph('<b>Bajas</b>', header_cell)],
    [Paragraph('Duplicidades', cell_style), Paragraph('6', cell_center), Paragraph('1', cell_center), Paragraph('2', cell_center), Paragraph('2', cell_center), Paragraph('1', cell_center)],
    [Paragraph('Contradicciones', cell_style), Paragraph('8', cell_center), Paragraph('3', cell_center), Paragraph('3', cell_center), Paragraph('2', cell_center), Paragraph('0', cell_center)],
    [Paragraph('Errores de redaccion', cell_style), Paragraph('11', cell_center), Paragraph('1', cell_center), Paragraph('4', cell_center), Paragraph('4', cell_center), Paragraph('2', cell_center)],
    [Paragraph('Problemas de interpretacion', cell_style), Paragraph('9', cell_center), Paragraph('1', cell_center), Paragraph('3', cell_center), Paragraph('3', cell_center), Paragraph('2', cell_center)],
    [Paragraph('Normas simplificables', cell_style), Paragraph('7', cell_center), Paragraph('0', cell_center), Paragraph('2', cell_center), Paragraph('3', cell_center), Paragraph('2', cell_center)],
    [Paragraph('Ausencias criticas', cell_style), Paragraph('6', cell_center), Paragraph('2', cell_center), Paragraph('2', cell_center), Paragraph('1', cell_center), Paragraph('1', cell_center)],
    [Paragraph('<b>TOTAL</b>', cell_style), Paragraph('<b>47</b>', cell_center), Paragraph('<b>8</b>', cell_center), Paragraph('<b>16</b>', cell_center), Paragraph('<b>15</b>', cell_center), Paragraph('<b>8</b>', cell_center)],
]
cw = [0.30*CONTENT_W, 0.14*CONTENT_W, 0.14*CONTENT_W, 0.14*CONTENT_W, 0.14*CONTENT_W, 0.14*CONTENT_W]
t = make_table(summary_data, cw)
t.setStyle(TableStyle([('BACKGROUND', (0,7), (-1,7), CARD_BG)]))
story.append(Spacer(1, 18))
story.append(t)
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 1: Resumen de incidencias detectadas por categoria y severidad', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 2. DOCUMENTOS ANALIZADOS
# ============================================================
story.append(heading('2. Documentos Analizados', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Se han procesado un total de cinco archivos PDF procedentes del servidor Clandestino V2. A continuacion se detalla cada documento, '
    'su contenido principal y las observaciones generales de formato y estructura que se han identificado durante la lectura inicial.',
    body_style
))
story.append(Spacer(1, 6))

docs_data = [
    [Paragraph('<b>Documento</b>', header_cell), Paragraph('<b>Paginas</b>', header_cell), Paragraph('<b>Caracteres</b>', header_cell), Paragraph('<b>Contenido principal</b>', header_cell), Paragraph('<b>Observaciones</b>', header_cell)],
    [
        Paragraph('Normativa General Clandestino (2).pdf', cell_style),
        Paragraph('8', cell_center),
        Paragraph('12.399', cell_center),
        Paragraph('Definiciones de conceptos (MG, PG, DM, VDM, PK, CK, RK, AFK, IC, OOC, RdE), comandos (/me, /do, /entorno, etc.), sanciones, chat de voz, abuso de bugs', cell_style),
        Paragraph('Documento base. Buena estructura pero con secciones densas y mal separadas. La seccion de CK es excesivamente larga y confusa.', cell_style),
    ],
    [
        Paragraph('Normativa Comercios Clandestinos (1).pdf', cell_style),
        Paragraph('8', cell_center),
        Paragraph('5.987', cell_center),
        Paragraph('Regulacion de comercios, eventos, personal, sueldos, mecanica, supermercados, sanciones por strikes', cell_style),
        Paragraph('Version corta. No incluye normativa de ilicitos. Errores ortograficos ("a no se que" en vez de "a no ser que").', cell_style),
    ],
    [
        Paragraph('Copia de Normativa Comercios Clandestinos.pdf', cell_style),
        Paragraph('14', cell_center),
        Paragraph('15.945', cell_center),
        Paragraph('Incluye normativa de comercios COMPLETA mas normativa de ilicitos (bandas, PDB, robos, secuestros, drogas, vehiculos, tipos de CK)', cell_style),
        Paragraph('Version extendida. Contiene TODO el contenido de ilicitos. Confusion: cual es la version oficial?', cell_style),
    ],
    [
        Paragraph('Normativa Staff Clandestino (4).pdf', cell_style),
        Paragraph('8', cell_center),
        Paragraph('3.552', cell_center),
        Paragraph('Estructura del staff, permisos por rango, protocolos operativos, regimen disciplinario, apelaciones, plantillas', cell_style),
        Paragraph('Documento bien estructurado. Usa tabla de permisos clara. Falta mas detalle en protocolos especificos.', cell_style),
    ],
    [
        Paragraph('Normativa Streamer Clandetino (5).pdf', cell_style),
        Paragraph('5', cell_center),
        Paragraph('5.475', cell_center),
        Paragraph('Requisitos para streamers, sistema de strikes, infracciones tipificadas, periodo de espera para oposicion', cell_style),
        Paragraph('Errores tipograficos graves en portada. Nombre del servidor incorrecto ("Spanish Gaming RP").', cell_style),
    ],
]
cw2 = [0.18*CONTENT_W, 0.07*CONTENT_W, 0.08*CONTENT_W, 0.34*CONTENT_W, 0.33*CONTENT_W]
story.append(Spacer(1, 12))
story.append(make_table(docs_data, cw2))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 2: Documentos analizados con contenido y observaciones generales', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 3. DUPLICIDADES
# ============================================================
story.append(heading('3. Duplicidades Detectadas', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Se han identificado seis casos de duplicidad significativa entre los documentos analizados. Las duplicidades no solo generan confusion '
    'sobre cual es la version vigente de una norma, sino que tambien multiplican el trabajo de mantenimiento y aumentan el riesgo de que '
    'futuras actualizaciones se apliquen solo a una de las copias, creando inconsistencias. A continuacion se detallan las duplicidades '
    'encontradas, ordenadas por severidad.',
    body_style
))

story.append(heading('3.1. Duplicidad del documento de Comercios', h2_style, 1))
story.append(Paragraph(
    'Existen dos versiones del documento de comercios: "normativa comercios clandetinos (1).pdf" (8 paginas, 5.987 caracteres) y '
    '"Copia de normativa comercios clandetinos.pdf" (14 paginas, 15.945 caracteres). La segunda version incluye toda la normativa '
    'de ilicitos que no aparece en la primera. Esto genera una pregunta fundamental para cualquier usuario: cual de las dos versiones '
    'es la oficial? Si un usuario lee solo la version corta, desconocera completamente las reglas sobre bandas, robos, secuestros y '
    'vehiculos. Si lee la version larga, podria estar consultando una copia desactualizada. La solucion inmediata es consolidar ambas '
    'versiones en un unico documento oficial y eliminar la copia, estableciendo un mecanismo claro de control de versiones.',
    body_style
))

story.append(heading('3.2. Duplicidad del sistema de sanciones por strikes', h2_style, 1))
story.append(Paragraph(
    'El sistema de sanciones por strikes aparece descrito de forma diferente en tres normativas distintas. En la Normativa General, se '
    'establece un sistema de 3 strikes donde al tercer strike se aplican sanciones de 1, 3 o 7 dias sin acceso, seguidas de permaban. '
    'En la Normativa de Comercios, se describe un sistema donde 3 advertencias equivalen a 1 strike, y al tercer strike se retira el '
    'negocio automaticamente. En la Normativa de Streamers, se utiliza un sistema completamente diferente con cuatro niveles de gravedad '
    '(Menor, Leve, Grave, Muy Grave) cada uno con un numero maximo de strikes y sanciones temporales diferentes. Esta disparidad genera '
    'confusion sobre si el sistema de strikes es unico para todo el servidor o si cada normativa tiene su propio sistema independiente. '
    'La recomendacion es unificar el sistema base (3 strikes con escalado de sanciones) y permitir que cada normativa defina solo las '
    'consecuencias especificas de su ambito (retirada de negocio, retirada de rol de streamer, etc.) sin modificar la estructura del '
    'sistema de strikes en si.',
    body_style
))

story.append(heading('3.3. Duplicidad en la regla de VDM', h2_style, 1))
story.append(Paragraph(
    'La definicion de Vehicle Deathmatch aparece tanto en la Normativa General como en la seccion de vehiculos de la Normativa de Ilicitos. '
    'En la General se establece que el VDM esta "completamente prohibido, salvo que sea la unica forma de huida de un conflicto ya generado". '
    'En Ilicitos se repite esencialmente la misma regla pero con mayor detalle y un ejemplo practico. Si bien la repeticion con expansion '
    'puede ser util, deberia existir una referencia explicita desde la Normativa General hacia la seccion detallada de Ilicitos, en lugar '
    'de tener dos definiciones independientes que podrian divergir en futuras actualizaciones.',
    body_style
))

story.append(heading('3.4. Duplicidad en la regla de secuestros y extorsiones', h2_style, 1))
story.append(Paragraph(
    'La normativa sobre secuestros aparece parcialmente en la Normativa General (donde se menciona que un bombero o medico puede ser '
    'secuestrado y que esto se tratara como secuestro a un policia) y de forma extensa en la Normativa de Ilicitos (donde se detallan '
    'duraciones maximas, cantidades de dinero permitidas y reglas sobre rehenes). La mencion en la General deberia ser una referencia '
    'cruzada a la seccion completa de Ilicitos, no una regla independiente que podria entrar en conflicto.',
    body_style
))

story.append(heading('3.5. Duplicidad en la regla de items como moneda de cambio', h2_style, 1))
story.append(Paragraph(
    'La posibilidad de solicitar items del campo ilegal como moneda de cambio para liberar a un personaje secuestrado aparece literalmente '
    'con el mismo texto en la Normativa General (pagina 7) y en la Normativa de Ilicitos (pagina 7). La repeticion exacta del mismo parrafo '
    'en dos documentos diferentes es un claro indicador de copia y pegada sin estructura, lo que implica que cualquier futura modificacion '
    'tendria que aplicarse en ambos sitios de forma sincronizada, algo que en la practica rara vez ocurre.',
    body_style
))

story.append(heading('3.6. Duplicidad en la regla de ropa y bandanas', h2_style, 1))
story.append(Paragraph(
    'La Normativa General regula el uso de ropa en dos secciones distintas: primero enumera las prohibiciones generales de ropa (invisible, '
    'default, que tanquea, de facciones) y luego, en una seccion separada dentro de la misma pagina, anade las restricciones sobre bandanas, '
    'panuelos y chupas de motero exclusivas de bandas oficiales. Estas dos secciones deberian consolidarse en un unico apartado de '
    '"Vestimenta y apariencia" para evitar que un usuario tenga que buscar la informacion en dos lugares distintos del mismo documento.',
    body_style
))
story.append(Spacer(1, 12))

# Findings table - Duplicidades
dup_findings = [
    ['D-01', 'Critica', 'Comercios', 'Dos versiones del mismo documento con contenido diferente', 'La version corta (8p) carece de toda la normativa de ilicitos. Riesgo de que usuarios no conozcan reglas fundamentales.'],
    ['D-02', 'Alta', 'General / Comercios / Streamers', 'Sistema de strikes definido de tres formas distintas en tres documentos', 'Confusion sobre si es un sistema unico o independiente por normativa. Inconsistencia en las sanciones.'],
    ['D-03', 'Alta', 'General / Ilicitos', 'Regla de VDM definida en dos documentos sin referencia cruzada', 'Riesgo de divergencia en futuras actualizaciones. Los usuarios deben consultar dos fuentes.'],
    ['D-04', 'Media', 'General / Ilicitos', 'Reglas de secuestro duplicadas sin referencia cruzada', 'La mencion en General podria contradecir la seccion detallada en Ilicitos.'],
    ['D-05', 'Media', 'General / Ilicitos', 'Parrafo identico sobre items como moneda de cambio en dos documentos', 'Copia y pegada sin estructura. Modificaciones futuras requeriran actualizacion sincronizada.'],
    ['D-06', 'Baja', 'General', 'Reglas de ropa divididas en dos secciones del mismo documento', 'Inconveniencia menor: el usuario debe buscar en dos lugares.'],
]
story.append(finding_table(dup_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 3: Incidencias de duplicidad detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 4. CONTRADICCIONES
# ============================================================
story.append(heading('4. Contradicciones Detectadas', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Las contradicciones son las incidencias mas graves porque generan situaciones donde un usuario puede estar cumpliendo una norma '
    'mientras infringe otra simultaneamente. Se han detectado ocho contradicciones, tres de ellas criticas. A continuacion se detallan '
    'las mas significativas junto con su analisis y la recomendacion de resolucion.',
    body_style
))

story.append(heading('4.1. Nombre del servidor: Clandestino V2 vs Spanish Gaming RP', h2_style, 1))
story.append(Paragraph(
    'Esta es la contradiccion mas preocupante de toda la auditoria. La Normativa General menciona repetidamente "Clandestino V2" como '
    'nombre del servidor, incluyendo referencias especificas como "estar en streams de usuarios de Clandestino V2". Sin embargo, la '
    'Normativa de Streamers utiliza de forma consistente "Spanish Gaming RP" como nombre del servidor, incluyendo instrucciones para '
    'configurar el titulo de las transmisiones con ese nombre. Esta contradiccion sugiere una de tres posibilidades: (a) la Normativa '
    'de Streamers fue copiada de otro servidor sin adaptar el nombre, (b) el servidor cambio de nombre y solo se actualizo un documento, '
    'o (c) son normativas de servidores diferentes que se han mezclado por error. En cualquier caso, la resolucion es urgente porque '
    'afecta directamente a la identidad del proyecto y a la configuracion que los streamers deben usar en sus transmisiones.',
    body_style
))

story.append(heading('4.2. Numero maximo de civiles en actos ilicitos', h2_style, 1))
story.append(Paragraph(
    'La Normativa General establece en su seccion de puntos importantes: "Prohibido actuar mas de 3 PERSONAS en un acto ilegal siendo '
    'civil". Sin embargo, la Normativa de Ilicitos define las PDB (Pequena Delincuencia Organizada) con un maximo de 4 integrantes y '
    'permite que "pueden actuar hasta 4 personas en acto ilicitos". Un usuario que lea solo la Normativa General entendera que el limite '
    'es 3, mientras que uno que lea los Ilicitos creera que es 4 para las PDB. La solucion es armonizar ambas reglas: la Normativa General '
    'deberia especificar que el limite de 3 aplica para civiles sin organizacion, y que las PDB tienen un regimen especifico detallado '
    'en la Normativa de Ilicitos.',
    body_style
))

story.append(heading('4.3. Duracion de secuestros', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Ilicitos establece que "los roles de secuestro tendran un maximo de 30 minutos de duracion" pero inmediatamente '
    'anade que "podran alargarse si el rol lo permite y si el usuario secuestrado acepta por un MSG". Esto crea una contradiccion logica: '
    'si el maximo es de 30 minutos, no puede alargarse; si puede alargarse, entonces 30 minutos no es el maximo sino la duracion base. '
    'La regla deberia reformularse estableciendo una duracion estandar de 30 minutos con la posibilidad de extension mediante acuerdo '
    'explicito entre las partes, dejando claro que la extension es una excepcion y no la norma.',
    body_style
))

story.append(heading('4.4. VDM como unica forma de huida', h2_style, 1))
story.append(Paragraph(
    'La Normativa General indica que el VDM esta permitido "salvo que sea la unica forma de huida de un conflicto ya generado", mientras '
    'que la Normativa de Ilicitos lo permite "para salir de una situacion en la que se este en peligro" pero anade que "nunca con la '
    'intencion de atropellar a alguien con la finalidad de salvar a un tercero o por venganza". La primera redaccion sugiere que el VDM '
    'es aceptable para proteger la propia vida, la segunda lo limita exclusivamente a la huida personal y prohibe explicitamente usarlo '
    'para salvar a otros. Son dos criterios diferentes que podrian llevar a reportes contradictorios.',
    body_style
))

story.append(heading('4.5. Sistema de sanciones inconsistente', h2_style, 1))
story.append(Paragraph(
    'La Normativa General establece que al tercer strike se aplican sanciones de 1, 3 o 7 dias segun gravedad, seguidas de permaban '
    'si hay otra infraccion. La Normativa de Ilicitos establece un sistema diferente donde 3 sanciones leves equivalen a 1 grave y '
    '3 graves suponen el disband de la banda. La Normativa de Comercios tiene 3 advertencias = 1 strike y 3 strikes = retirada. '
    'La Normativa de Streamers tiene cuatro niveles con maximos de strikes diferentes por nivel. No existe una tabla unificada que '
    'relacione todos estos sistemas, lo que hace imposible para un usuario entender rapidamente las consecuencias de una infraccion.',
    body_style
))

story.append(heading('4.6. CK y transferencia de bienes', h2_style, 1))
story.append(Paragraph(
    'La Normativa General establece que "esta completamente prohibido transferir cualquier tipo de bienes, objetos y/o dinero de manera '
    'premeditada o posterior al CK". Sin embargo, la Normativa de Ilicitos permite que los miembros de banda con mas de 20k en multas '
    'tengan 24 horas para pagar el 100% antes de que se les aplique un CK federal. Esto implica que un personaje que va a recibir un CK '
    'podria, en teoria, usar esas 24 horas para transferir sus bienes antes de la ejecucion, lo cual contradice la prohibicion general. '
    'La normativa deberia aclarar explicitamente si la prohibicion de transferencia aplica tambien durante el periodo de gracia de 24 horas.',
    body_style
))

story.append(heading('4.7. Valoracion de vida: reportable o no', h2_style, 1))
story.append(Paragraph(
    'La Normativa General define la valoracion de vida indicando que "se puede no valorar la vida propia priorizando la interpretacion, '
    'ateniendose eso si a las consecuencias oportunas de dicho acto" y anade entre parentesis y en mayusculas "ESTO NO ES REPORTABLE, '
    'SI NO ES MOTIVO DE CK". La redaccion es ambigua y potencialmente contradictoria: si no es reportable, no deberia haber '
    'consecuencias; si hay consecuencias (como un CK), entonces si deberia poder reportarse la situacion que las origino. Ademas, '
    'la frase "si no es motivo de CK" puede interpretarse como "siempre que no sea motivo de CK" o como "si no, es motivo de CK", '
    'dos interpretaciones opuestas.',
    body_style
))

story.append(heading('4.8. Entorno premeditado vs no premeditado', h2_style, 1))
story.append(Paragraph(
    'La Normativa General indica que "los entornos deben ser enviados antes de la accion siempre y cuando sea premeditada", lo que '
    'implícitamente sugiere que los actos no premeditados no requieren entorno previo. Sin embargo, la Normativa de Ilicitos establece '
    'que "todos los actos delictivos tienen que tener obligatoriamente el entorno" sin distincion entre premeditados y no premeditados. '
    'Si un usuario realiza un acto delictivo no premeditado, la Normativa General no le exige entorno previo pero la de Ilicitos si. '
    'Nuevamente, un usuario que lea solo un documento actuara de forma diferente a uno que lea ambos.',
    body_style
))
story.append(Spacer(1, 12))

cont_findings = [
    ['C-01', 'Critica', 'General / Streamers', 'Nombre del servidor: Clandestino V2 vs Spanish Gaming RP', 'Posible copia de normativa de otro servidor. Afecta a identidad y configuracion de streamers.'],
    ['C-02', 'Critica', 'General / Ilicitos', 'Maximo de civiles en actos ilicitos: 3 vs 4 para PDB', 'Un usuario puede infrigir una norma creyendo cumplir la otra.'],
    ['C-03', 'Critica', 'Ilicitos', 'Duracion maxima de secuestros: 30 min vs alargable', 'Contradiccion logica interna: un maximo no puede ser extensible.'],
    ['C-04', 'Alta', 'General / Ilicitos', 'VDM para huida propia vs prohibicion de salvar a terceros', 'Dos criterios diferentes para la misma situacion.'],
    ['C-05', 'Alta', 'Multiple', 'Sistema de sanciones inconsistente entre documentos', 'Imposible entender consecuencias sin leer todas las normativas.'],
    ['C-06', 'Alta', 'General / Ilicitos', 'CK y transferencia de bienes durante periodo de gracia', 'Posible exploit: usar 24h para transferir antes de CK federal.'],
    ['C-07', 'Media', 'General', 'Valoracion de vida: no reportable pero con consecuencias', 'Redaccion ambigua con dos interpretaciones opuestas posibles.'],
    ['C-08', 'Media', 'General / Ilicitos', 'Entorno obligatorio para actos no premeditados', 'General no lo exige, Ilicitos si. Confusion sobre la regla aplicable.'],
]
story.append(finding_table(cont_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 4: Incidencias de contradiccion detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 5. ERRORES DE REDACCION
# ============================================================
story.append(heading('5. Errores de Redaccion', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Se han identificado once errores de redaccion que van desde simples erratas hasta parrafos enteros con estructura deficiente. '
    'Aunque los errores tipograficos pueden parecer menores, en un documento normativo afectan directamente a la credibilidad '
    'institucional y pueden generar interpretaciones erroneas. Los errores mas graves son los que aparecen en portadas, ya que son '
    'lo primero que ve un usuario y condicionan su percepcion de la calidad del documento completo.',
    body_style
))

story.append(heading('5.1. Errores criticos en portada de Streamers', h2_style, 1))
story.append(Paragraph(
    'La portada de la Normativa de Streamers contiene cuatro errores tipograficos graves en solo cuatro lineas: "encontrara la" '
    '(sin apóstrofo), "normativa destreamrs" (falta espacio, "de" y "streamers" mal escritos), "que deben cumplirtodos" (falta '
    'espacio, "cumplir" y "todos" pegados) y "los streamers" (sin punto final). Estos errores dan la impresion de un documento '
    'descuidado y poco profesional, lo cual es especialmente problematico porque la portada es la primera impresion que recibe '
    'cualquier usuario. En un contexto donde se exige a los streamers que aprueben un examen, la normativa que regula su actividad '
    'deberia ser impecable en su forma.',
    body_style
))

story.append(heading('5.2. Errores en Normativa de Comercios', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Comercios contiene varios errores significativos. El mas notable es "a no se que tenga un testaferro" donde '
    'deberia decir "a no ser que". Tambien se encuentra "solo esta permitido sacar para gastos personales hasta un maximo de '
    '10.000$ segun los gastos de empresa de la semana" donde la frase es confusa y deberia reformularse como: "Solo esta permitido '
    'extraer para gastos personales un maximo de 10.000$ semanales, deducidos los gastos de empresa". Ademas, "JEFE Y ENCARGADO '
    'no deben cometer actos ilegales ni ser civiles ilegales" es redundante: cometer actos ilegales y ser civil ilegal son conceptos '
    'diferentes que deberian distinguirse, o simplemente deberia decir "no pueden tener antecedentes ni realizar actividades ilicitas".',
    body_style
))

story.append(heading('5.3. Uso excesivo de mayusculas', h2_style, 1))
story.append(Paragraph(
    'Toda la normativa de Ilicitos hace un uso excesivo de mayusculas para enfasis, como "PROHIBIDA ALIANZA ENTRE BANDAS PARA IR A '
    'POR OTRAS", "NO SE PERMITE ROBOS A USUARIOS SIN ROL PREVIO", "SI UN CIVIL ES ABATIDO POR ARMA DE FUEGO...", entre otros. '
    'Este recurso tipografico, usado de forma tan frecuente, pierde su efectividad y transmite una sensacion de grito en lugar de '
    'enfasís normativo. Las normativas profesionales utilizan negrita o estructuras visuales (iconos, colores, tablas) para resaltar '
    'informacion critica, no mayusculas sostenidas. La recomendacion es reservar las mayusculas exclusivamente para siglas y nombres '
    'propios, y utilizar negrita o elementos visuales para el enfasis normativo.',
    body_style
))

story.append(heading('5.4. Seccion de CK en Normativa General', h2_style, 1))
story.append(Paragraph(
    'La seccion de Character Kill en la Normativa General es, con diferencia, la seccion mas larga y confusa de todo el corpus '
    'normativo. Ocupa casi dos paginas completas con un texto denso que mezcla definiciones, procedimientos, excepciones y '
    'advertencias en un unico bloque sin estructura visual. El parrafo principal contiene mas de 200 palabras sin ninguna pausa '
    'visual, lo que hace extremadamente dificil entender los diferentes escenarios: CK premeditado, CK no premeditado, luz verde '
    'de administracion, notificacion al usuario, y opciones alternativas. Esta seccion deberia reestructurarse completamente '
    'utilizando un formato visual con subsecciones claras, viñetas para cada escenario y una tabla de flujo para el proceso de '
    'solicitud de CK.',
    body_style
))

story.append(heading('5.5. Otros errores de redaccion', h2_style, 1))
story.append(Paragraph(
    'Se han detectado errores adicionales menores pero significativos: la mencion del "PKT" como concepto que "no existe en el '
    'servidor" pero que se explica de todas formas, generando confusion sobre por que se menciona algo que no existe; la frase '
    '"PEDIR EL ID SIEMPRE Y CUANDO EL ROL SER HAYA FINALIZADO" donde "ser" deberia ser "se" y el uso de mayusculas es excesivo; '
    'la inexistencia de una estructura de secciones numeradas en la Normativa General, que hace imposible referenciar una regla '
    'especifica de forma inequivoca; y la mezcla de formatos entre documentos, donde algunos usan viñetas, otros usan numeros y '
    'otros no tienen formato alguno.',
    body_style
))
story.append(Spacer(1, 12))

red_findings = [
    ['R-01', 'Critica', 'Streamers', 'Cuatro errores tipograficos en la portada del documento', 'Afecta credibilidad institucional. Primera impresion negativa para streamers.'],
    ['R-02', 'Alta', 'Comercios', '"a no se que" en vez de "a no ser que" - error gramatical', 'Cambia el significado de la frase. Puede generar interpretacion erronea.'],
    ['R-03', 'Alta', 'Comercios', 'Frase confusa sobre maximo de 10.000$ para gastos personales', 'No queda claro si es 10.000$ totales o 10.000$ adicionales a gastos de empresa.'],
    ['R-04', 'Alta', 'General', 'Seccion de CK excesivamente larga y sin estructura visual', 'Casi 200 palabras en un solo parrafo. Imposible entender los diferentes escenarios de CK.'],
    ['R-05', 'Alta', 'Ilicitos', 'Uso excesivo de mayusculas para enfasis en toda la normativa', 'Transmite sensacion de grito. Pierde efectividad.'],
    ['R-06', 'Media', 'General', 'Mencion del PKT que "no existe" pero se explica', 'Confusion: por que se menciona y sanciona algo que no existe?'],
    ['R-07', 'Media', 'General', '"el rol ser haya finalizado" - error gramatical ("se haya")', 'Error menor pero en una regla importante sobre uso de /pedirid.'],
    ['R-08', 'Media', 'General', 'Ausencia de numeracion de secciones', 'Imposible referenciar una regla especifica de forma inequivoca.'],
    ['R-09', 'Media', 'Comercios', '"JEFE Y ENCARGADO no deben cometer actos ilegales ni ser civiles ilegales" - redundante', 'Dos conceptos diferentes tratados como si fueran lo mismo.'],
    ['R-10', 'Baja', 'Multiple', 'Mezcla de formatos entre documentos (viñetas, numeros, sin formato)', 'Inconsistencia visual. Dificulta la lectura comparada entre normativas.'],
    ['R-11', 'Baja', 'General', '"ESTO NO ES REPORTABLE, SI NO ES MOTIVO DE CK" - redaccion ambigua', 'Mayusculas y ambiguedad: "si no" puede interpretarse de dos formas.'],
]
story.append(finding_table(red_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 5: Incidencias de redaccion detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 6. PROBLEMAS DE INTERPRETACION
# ============================================================
story.append(heading('6. Problemas de Interpretacion', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Los problemas de interpretacion son aquellos donde la redaccion, aunque gramaticalmente correcta, permite multiples lecturas '
    'o deja vacios que los usuarios deben rellenar con suposiciones. Estos problemas son especialmente peligrosos porque no son '
    'evidentes hasta que ocurre un conflicto en el servidor, momento en el que la falta de claridad genera reportes, discusiones '
    'y resentimiento entre jugadores y staff. Se han identificado nueve problemas de este tipo.',
    body_style
))

story.append(heading('6.1. Que es exactamente un PKT y por que se menciona?', h2_style, 1))
story.append(Paragraph(
    'La Normativa General menciona que "El PKT no existe en el servidor, por lo que no se puede hacer, unicamente se puede realizar '
    'PK y el afectado se acordara de todo o es CK aprobado por administracion. El hecho de realizar un PKT a alguien se considerara '
    'motivo para realizar una Re-Whitelist." Esta redaccion es profundamente confusa: se define un concepto diciendo que "no existe", '
    'luego se explica que no se puede hacer, y finalmente se establece una sancion para quien lo haga. Si no existe, no puede hacerse; '
    'si puede hacerse, entonces si existe. La realidad es que el PKT (Player Kill Temporal, donde el personaje pierde la memoria del '
    'evento) es un concepto que los jugadores conocen de otros servidores, y la norma quiere decir que en Clandestino V2 no se permite '
    'esa mecanica. La redaccion deberia ser mucho mas clara: "El PKT (Player Kill Temporal) no esta permitido en este servidor. Todo '
    'PK conserva la memoria de los eventos. Si un jugador intenta aplicar un PKT, se le sometera a Re-Whitelist."',
    body_style
))

story.append(heading('6.2. La regla de valoracion de vida', h2_style, 1))
story.append(Paragraph(
    'La definicion de valoracion de vida incluye la frase "ESTO NO ES REPORTABLE, SI NO ES MOTIVO DE CK" que, como se menciono en '
    'la seccion de contradicciones, es ambigua. Pero ademas, toda la definicion plantea un problema interpretativo mas profundo: '
    'se dice que "se puede no valorar la vida propia priorizando la interpretacion", lo que en la practica significa que un jugador '
    'puede actuar de forma temeraria si eso mejora su rol. Sin embargo, no se define que constituye "priorizar la interpretacion" '
    'ni donde esta el limite entre una decision de rol legitima y un simple desprecio por las consecuencias. Un ejemplo practico: '
    'si un civil desarmado se enfrenta a tres hombres armados para defender su tienda, es valoracion de vida legitima o es una '
    'infraccion encubierta? La normativa no ofrece criterios para distinguir.',
    body_style
))

story.append(heading('6.3. "Convenios" y "descuentos graduales"', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Comercios establece que los descuentos entre comercios "no podran pasar del 30% y tendran que ser graduales", '
    'debiendo "comenzar con el 5% y seguir progresivamente". Sin embargo, no se define la velocidad de progresion: si un comercio '
    'quiere llegar al 30%, cuanto tiempo debe esperar? Es 5% por semana? Por mes? Por wipe? Tampoco se especifica si el descuento '
    'se aplica por convenio individual (cada comercio con el suyo) o si es un descuento global (misma tasa para todos). Esta falta '
    'de precision puede generar conflictos entre comerciantes y con el staff de comercio.',
    body_style
))

story.append(heading('6.4. Tabla de robos por nivel de banda', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Ilicitos presenta una tabla detallada de robos permitidos por nivel de banda (del Nivel 1 al Nivel 4), pero no '
    'explica claramente como se sube de nivel. Se menciona brevemente que "la mafia decidira la subida de niveles dependiendo el '
    'progreso de la banda", pero no se definen criterios objetivos de progreso. Es por numero de miembros? Por actividad delictiva? '
    'Por tiempo de existencia? Por calidad de rol? Sin criterios claros, la decision queda completamente a discrecion de la mafia, '
    'lo que puede generar percepciones de favoritismo o arbitrariedad.',
    body_style
))

story.append(heading('6.5. Limite de participantes en roles ilegales con policia', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Ilicitos establece un protocolo complejo para roles fuera de lo establecido con la policica, requiriendo '
    'comunicacion entre el mando del operativo y la organizacion ilegal para determinar cuantos usuarios participan. Anade que '
    '"suman todas las personas, tanto informantes como usuarios, que participen activamente en el rol" y proporciona un ejemplo '
    'detallado. Sin embargo, la regla especifica "SOLO CONTRA LA POLICIA" en mayusculas, lo que genera la duda de si este protocolo '
    'aplica solo cuando el rol es estrictamente contra la policia o tambien cuando hay policia involucrada pero el objetivo principal '
    'es otro. Ademas, no se define que constituye "participar activamente": un miembro que hace guardia a dos calles de distancia '
    'participa activamente? Y uno que esta en un coche esperando como refuerzo?',
    body_style
))

story.append(heading('6.6. Resto de problemas de interpretacion', h2_style, 1))
story.append(Paragraph(
    'Se han identificado cuatro problemas adicionales de interpretacion: (1) La regla de "prohibido subir fotografias o videos IRL '
    'en redes sociales IC" no distingue entre contenido completamente ajeno al juego y contenido que, siendo real, se usa como '
    'recurso de rol (fotos de locaciones reales para representar lugares del juego). (2) La norma de que "un personaje ha sufrido '
    'un CK que no implique su muerte puede regresar en el mismo wipe" es confusa: si el CK no implica muerte, es realmente un CK? '
    'O es un sistema de "exilio" diferente que usa el nombre de CK por conveniencia? (3) La regla sobre grafitis con IA ("SON '
    'PERMITIDAS siempre y cuando tenga sentido y coherencia") y la prohibicion de "graffitis realistas" carecen de definicion '
    'de "sentido", "coherencia" y "realista", dejando la interpretacion completamente subjetiva. (4) La norma de que un civil '
    'abatido por arma de fuego ayudando a una banda recibe "CK DE INMEDIATO" no especifica si este CK requiere ticket previo o '
    'si es automatico, contradiciendo el proceso general de CK que requiere aprobacion de administracion.',
    body_style
))
story.append(Spacer(1, 12))

int_findings = [
    ['I-01', 'Critica', 'General', 'PKT: se menciona algo que "no existe" pero se sanciona', 'Definicion autocontradictoria. Necesita reformulacion completa.'],
    ['I-02', 'Alta', 'General', 'Valoracion de vida: sin criterios para distinguir decision legitima de infraccion', 'Cualquier accion temeraria puede justificarse como "priorizar la interpretacion".'],
    ['I-03', 'Alta', 'Comercios', 'Descuentos graduales sin velocidad de progresion definida', 'Imposible saber cuanto tiempo esperar para llegar al 30%.'],
    ['I-04', 'Alta', 'Ilicitos', 'Subida de nivel de banda sin criterios objetivos', 'Decision discrecional de la mafia puede percibirse como favoritismo.'],
    ['I-05', 'Media', 'Ilicitos', 'Protocolo de participantes: que es "participar activamente"?', 'Un guardia a distancia participa? Falta definicion.'],
    ['I-06', 'Media', 'General', 'CK sin muerte: es realmente un CK o un sistema de exilio?', 'Confusion terminologica entre muerte de personaje y salida del servidor.'],
    ['I-07', 'Media', 'General', 'Grafitis con IA: "sentido", "coherencia" y "realista" sin definir', 'Interpretacion completamente subjetiva.'],
    ['I-08', 'Baja', 'General', 'Fotos/videos IRL en redes IC: sin distincion de uso como recurso', 'Prohibicion demasiado amplia que podria limitar creatividad de rol.'],
    ['I-09', 'Baja', 'Ilicitos', 'CK automatico a civil que ayuda a banda: requiere ticket?', 'Contradice el proceso general de CK que requiere aprobacion.'],
]
story.append(finding_table(int_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 6: Incidencias de interpretacion detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 7. NORMAS SIMPLIFICABLES
# ============================================================
story.append(heading('7. Normas Simplificables', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Se han identificado siete secciones normativas que pueden simplificarse significativamente mediante reestructuracion visual, '
    'consolidacion de contenido o eliminacion de repeticiones. La simplificacion no implica perder informacion, sino presentarla '
    'de forma mas eficiente y comprensible para el usuario final.',
    body_style
))

story.append(heading('7.1. Tabla de robos por nivel de banda', h2_style, 1))
story.append(Paragraph(
    'La Normativa de Ilicitos presenta una tabla de robos por nivel de banda que ocupa casi dos paginas enteras. La estructura '
    'actual lista cada tipo de robo (pequeno, pequeno plus, mediano, mediano plus, grande, grande plus) con cuatro variantes de '
    'nivel, resultando en 24 combinaciones que el usuario debe memorizar. Esta informacion puede consolidarse en una unica tabla '
    'matricial donde las filas sean los tipos de robo y las columnas los niveles, reduciendo el espacio a un cuarto de pagina '
    'y facilitando la consulta rapida. El mismo principio aplica a la tabla de integrantes maximos en robos y a la tabla de '
    'robos civiles y PDB, que podrian unificarse en una sola tabla comparativa.',
    body_style
))

story.append(heading('7.2. Seccion completa de CK', h2_style, 1))
story.append(Paragraph(
    'Como se menciono en la seccion de errores de redaccion, la seccion de CK en la Normativa General es la mas larga y confusa '
    'de todo el corpus. Ademas de los problemas de redaccion, la seccion puede simplificarse estructurando la informacion en tres '
    'bloques claramente diferenciados: (1) Definicion y tipos de CK, (2) Proceso de solicitud y aprobacion, y (3) Restricciones '
    'post-CK. Cada bloque puede presentarse con viñetas y subsecciones visuales en lugar del actual bloque de texto continuo. '
    'El resultado seria una seccion que ocupa el mismo espacio pero que es tres veces mas facil de consultar y comprender.',
    body_style
))

story.append(heading('7.3. Sistema de comandos', h2_style, 1))
story.append(Paragraph(
    'La lista de comandos (/me, /do, /entorno, /auxilio, /forzar, /dado, /pedirid) podria presentarse como una tabla estructurada '
    'con columnas para comando, sintaxis, descripcion, ejemplo de uso correcto y ejemplo de uso incorrecto. Actualmente, cada '
    'comando se describe en un parrafo de texto continuo que mezcla la definicion con los ejemplos, lo que hace dificil encontrar '
    'rapidamente la informacion necesaria durante una partida. Una tabla permitiria la consulta instantanea.',
    body_style
))

story.append(heading('7.4. Resto de normas simplificables', h2_style, 1))
story.append(Paragraph(
    'Cuatro secciones adicionales pueden simplificarse: (1) Las reglas de drogas en Ilicitos mezclan prohibiciones generales con '
    'ejemplos especificos de entornos de guardacostas; estos deberian separarse en "reglas de venta" y "protocolo de entradas por mar". '
    '(2) Las reglas de vehiculos en Ilicitos repiten informacion sobre disparar desde vehiculos en tres viñetas diferentes; podrian '
    'consolidarse en una unica regla con sub-puntos. (3) La Normativa de Staff tiene una tabla de permisos clara que podria servir '
    'como modelo para las demas normativas, pero sus protocolos operativos (tickets, reportes) son descripciones textuales que '
    'beneficiarian de un formato de flujo o checklist. (4) La normativa de sueldos de comercios presenta las escalas salariales '
    'en listas de texto que podrian ser tablas comparativas entre los escalafones legal e ilegal.',
    body_style
))
story.append(Spacer(1, 12))

sim_findings = [
    ['S-01', 'Alta', 'Ilicitos', 'Tabla de robos por nivel: 2 paginas pueden ser 1/4 de pagina', 'Tabla matricial tipos x niveles = consulta instantanea.'],
    ['S-02', 'Alta', 'General', 'Seccion de CK: reestructurar en 3 bloques visuales', 'Mismo contenido, 3x mas facil de comprender.'],
    ['S-03', 'Media', 'General', 'Comandos: de parrafos a tabla estructurada', 'Consulta rapida durante partida.'],
    ['S-04', 'Media', 'Ilicitos', 'Reglas de drogas: separar venta de protocolo maritimo', 'Dos secciones claras en lugar de una mezclada.'],
    ['S-05', 'Media', 'Ilicitos', 'Reglas de vehiculos: consolidar 3 viñetas repetitivas', 'Una regla con sub-puntos en lugar de tres viñetas.'],
    ['S-06', 'Baja', 'Staff', 'Protocolos operativos: de texto a checklist/flujo', 'Facilita cumplimiento por parte del staff.'],
    ['S-07', 'Baja', 'Comercios', 'Escalas salariales: de lista a tabla comparativa', 'Comparacion inmediata legal vs ilegal.'],
]
story.append(finding_table(sim_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 7: Incidencias de simplificacion detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 8. AUSENCIAS CRITICAS
# ============================================================
story.append(heading('8. Ausencias Critas', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'Se han identificado seis ausencias significativas en el corpus normativo actual. Estas son normativas que no existen pero que '
    'son necesarias para el funcionamiento completo del servidor, ya sea porque se mencionan sin definirse o porque son estandares '
    'de la industria de servidores de roleplay que todo servidor competitivo deberia tener.',
    body_style
))

story.append(heading('8.1. Normativa de EMS/Bomberos', h2_style, 1))
story.append(Paragraph(
    'La Normativa General menciona que "un bombero o medico podra ser secuestrado mientras se encuentra de servicio, siempre que '
    'se cumpla con la normativa y este secuestro sera tratado como el secuestro a un policia." Esta mencion implica la existencia '
    'de una faccion de EMS/Bomberos con reglas especificas, pero no se ha proporcionado ninguna normativa dedicada a esta faccion. '
    'Los jugadores que deseen incorporarse a EMS necesitan conocer sus protocolos, limitaciones, jerarquia, reglas de intervencion '
    'y procedimientos de triaje. Sin una normativa especifica, cada miembro de EMS opera segun su criterio, generando inconsistencias '
    'que afectan la calidad del rol medico en todo el servidor.',
    body_style
))

story.append(heading('8.2. Normativa de Policia (LSPD/SAPD)', h2_style, 1))
story.append(Paragraph(
    'De forma similar a EMS, la Normativa de Comercios menciona "unicamente para LSPD y SAPD se podran aplicar convenios distintos" '
    'y la Normativa de Ilicitos hace multiples referencias a procedimientos policiales. Sin embargo, no existe una normativa dedicada '
    'a la policia que regule sus protocolos de actuacion, uso de la fuerza, procedimientos de arresto, cadena de custodia de pruebas, '
    'reglas de persecucion y limitaciones de accion. Esta ausencia es critica porque la policia es una de las facciones con mayor '
    'impacto en la experiencia de juego de todos los usuarios, tanto legales como ilegales.',
    body_style
))

story.append(heading('8.3. Codigo Penal', h2_style, 1))
story.append(Paragraph(
    'No existe un codigo penal formal que defina los delitos, sus penas y las multas asociadas. La Normativa de Ilicitos define '
    'tipos de robos y sus consecuencias operativas, pero no existe un documento que establezca, por ejemplo, que multa corresponde '
    'a un asalto, a un secuestro, a la posesion de drogas o a la conduccion temeraria. La unica referencia a multas es la mencion '
    'en Ilicitos de que los miembros de banda con mas de 20k en multas deben pagar en 24 horas o enfrentar CK federal, pero no se '
    'especifica como se calculan esas multas ni cuales son los montos para cada infraccion. Un codigo penal formal es indispensable '
    'para que tanto la policia como los ciudadanos conozcan las consecuencias exactas de cada accion delictiva.',
    body_style
))

story.append(heading('8.4. Normativa Aerea', h2_style, 1))
story.append(Paragraph(
    'El usuario menciono la "Normativa Aerea" como uno de los documentos que deberia existir, y efectivamente no se ha encontrado '
    'ningun documento que regule el uso de helicopteros, aviones y demas vehiculos aereos. La Normativa de Ilicitos incluye una '
    'breve seccion sobre "Negociaciones Helicoptero" pero no regula aspectos fundamentales como: donde pueden aterrizar los '
    'helicópteros, altitud minima de vuelo, zonas restringidas, requisitos de licencia de piloto, y reglas de uso en roles '
    'delictivos. Dado que los helicopteros tienen un impacto significativo en la jugabilidad (especialmente en persecuciones), '
    'esta normativa es necesaria para prevenir conflictos y asegurar un juego equilibrado.',
    body_style
))

story.append(heading('8.5. Glosario unificado de terminos', h2_style, 1))
story.append(Paragraph(
    'Las normativas utilizan numerosos acronimos y terminos especificos (MG, PG, DM, VDM, PK, CK, PKT, RK, AFK, IC, OOC, RdE, IDP, '
    'PDB, NPC, etc.) sin un glosario centralizado que los defina. Cada normativa define algunos terminos al inicio, pero no todos, '
    'y un usuario que lea la Normativa de Ilicitos sin haber leido antes la General no encontrara la definicion de PK, CK, VDM, IC '
    'u OOC. Un glosario unificado al inicio del corpus normativo (o como seccion de la web) resolveria este problema de forma '
    'permanente y serviria como referencia rapida para todos los usuarios.',
    body_style
))

story.append(heading('8.6. Sistema de control de versiones', h2_style, 1))
story.append(Paragraph(
    'Ninguna de las normativas analizadas (excepto la de Staff, que indica "Ultima actualizacion: 29/07/2025") incluye un sistema '
    'de control de versiones. No hay numeros de version, no hay historial de cambios, y no hay forma de saber si un documento ha '
    'sido modificado recientemente. Esto es especialmente problematico dado que existen dos versiones del documento de comercios '
    'con contenido diferente. Sin un sistema de versiones, es imposible para un usuario verificar que esta consultando la version '
    'mas reciente, y es imposible para el staff rastrear que cambios se han realizado y cuando. La implementacion de un sistema '
    'de versiones (con numero de version, fecha de actualizacion y resumen de cambios) es fundamental para la mantenibilidad a '
    'largo plazo del corpus normativo.',
    body_style
))
story.append(Spacer(1, 12))

aus_findings = [
    ['A-01', 'Critica', 'EMS/Bomberos', 'No existe normativa de EMS a pesar de mencionarse la faccion', 'Sin reglas, cada miembro opera a criterio propio. Inconsistencia de rol medico.'],
    ['A-02', 'Critica', 'LSPD/SAPD', 'No existe normativa de policia a pesar de multiples referencias', 'Faccion con mayor impacto sin reglas formales de actuacion.'],
    ['A-03', 'Alta', 'Codigo Penal', 'No existe codigo penal con delitos, penas y multas definidas', 'Imposible conocer consecuencias exactas de infracciones.'],
    ['A-04', 'Alta', 'Aerea', 'No existe normativa aerea para helicopteros y aviones', 'Solo una breve seccion sobre negociaciones con helicoptero.'],
    ['A-05', 'Media', 'Glosario', 'No existe glosario unificado de terminos y acronimos', 'Usuarios deben leer todas las normativas para entender la terminologia.'],
    ['A-06', 'Media', 'Versiones', 'No existe sistema de control de versiones', 'Imposible verificar si se consulta la version mas reciente.'],
]
story.append(finding_table(aus_findings))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 8: Ausencias criticas detectadas', caption_style))
story.append(Spacer(1, 18))

# ============================================================
# 9. MATRIZ DE REFERENCIA CRUZADA
# ============================================================
story.append(heading('9. Matriz de Referencia Cruzada', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'La siguiente matriz muestra las incidencias detectadas por documento, permitiendo identificar rapidamente cuales son los '
    'documentos con mayor cantidad de problemas y, por tanto, cuales requieren una revision mas urgente. Los numeros representan '
    'la cantidad de incidencias que afectan a cada documento, contando las incidencias que involucran multiples documentos en '
    'cada uno de los documentos afectados.',
    body_style
))
story.append(Spacer(1, 12))

cross_data = [
    [Paragraph('<b>Documento</b>', header_cell), Paragraph('<b>Dupl.</b>', header_cell), Paragraph('<b>Contrad.</b>', header_cell), Paragraph('<b>Redacc.</b>', header_cell), Paragraph('<b>Interp.</b>', header_cell), Paragraph('<b>Simpl.</b>', header_cell), Paragraph('<b>Ausenc.</b>', header_cell), Paragraph('<b>Total</b>', header_cell)],
    [Paragraph('Normativa General', cell_style), Paragraph('4', cell_center), Paragraph('5', cell_center), Paragraph('5', cell_center), Paragraph('5', cell_center), Paragraph('2', cell_center), Paragraph('2', cell_center), Paragraph('<b>23</b>', cell_center)],
    [Paragraph('Normativa Ilicitos', cell_style), Paragraph('3', cell_center), Paragraph('4', cell_center), Paragraph('1', cell_center), Paragraph('3', cell_center), Paragraph('3', cell_center), Paragraph('2', cell_center), Paragraph('<b>16</b>', cell_center)],
    [Paragraph('Normativa Comercios', cell_style), Paragraph('2', cell_center), Paragraph('2', cell_center), Paragraph('4', cell_center), Paragraph('1', cell_center), Paragraph('1', cell_center), Paragraph('0', cell_center), Paragraph('<b>10</b>', cell_center)],
    [Paragraph('Normativa Streamers', cell_style), Paragraph('0', cell_center), Paragraph('1', cell_center), Paragraph('1', cell_center), Paragraph('0', cell_center), Paragraph('0', cell_center), Paragraph('1', cell_center), Paragraph('<b>3</b>', cell_center)],
    [Paragraph('Normativa Staff', cell_style), Paragraph('0', cell_center), Paragraph('0', cell_center), Paragraph('1', cell_center), Paragraph('0', cell_center), Paragraph('1', cell_center), Paragraph('1', cell_center), Paragraph('<b>3</b>', cell_center)],
]
cw3 = [0.26*CONTENT_W, 0.10*CONTENT_W, 0.10*CONTENT_W, 0.10*CONTENT_W, 0.10*CONTENT_W, 0.10*CONTENT_W, 0.10*CONTENT_W, 0.14*CONTENT_W]
story.append(make_table(cross_data, cw3))
story.append(Spacer(1, 6))
story.append(Paragraph('Tabla 9: Matriz de referencia cruzada de incidencias por documento y categoria', caption_style))
story.append(Spacer(1, 12))
story.append(Paragraph(
    'Como se observa, la Normativa General es el documento con mayor numero de incidencias (23), lo cual es esperable dado que es '
    'el documento base que mas interactua con las demas normativas. La Normativa de Ilicitos es la segunda con mas problemas (16), '
    'seguida de la de Comercios (10). Las normativas de Streamers y Staff tienen menos incidencias pero ambas requieren correcciones '
    'especificas importantes (el nombre del servidor en Streamers y el sistema de versiones en Staff).',
    body_style
))
story.append(Spacer(1, 18))

# ============================================================
# 10. RECOMENDACIONES PRIORITIZADAS
# ============================================================
story.append(heading('10. Recomendaciones Prioritizadas', h1_style, 0))
story.append(Spacer(1, 8))
story.append(Paragraph(
    'A continuacion se presentan las recomendaciones ordenadas por prioridad de implementacion. Las recomendaciones de prioridad '
    'critica deben abordarse antes de cualquier otra accion, ya que afectan directamente a la coherencia del corpus normativo y a '
    'la experiencia de los usuarios.',
    body_style
))

story.append(heading('10.1. Prioridad Critica (implementar inmediatamente)', h2_style, 1))
story.append(Paragraph(
    '<b>1. Unificar el nombre del servidor.</b> Verificar si el nombre oficial es "Clandestino V2" o "Spanish Gaming RP" y '
    'actualizar todos los documentos para usar el mismo nombre de forma consistente. Si la Normativa de Streamers fue copiada de '
    'otro servidor, debe reescribirse completamente con el nombre correcto y las reglas especificas de Clandestino V2.',
    body_style
))
story.append(Paragraph(
    '<b>2. Eliminar la version duplicada de Comercios.</b> Consolidar ambas versiones en un unico documento oficial que incluya '
    'tanto la normativa de comercios como la de ilicitos (o separarlas en dos documentos independientes con referencias cruzadas '
    'claras). Eliminar cualquier copia y establecer un mecanismo de control de versiones.',
    body_style
))
story.append(Paragraph(
    '<b>3. Armonizar el limite de civiles en actos ilicitos.</b> Reescribir la regla de la Normativa General para especificar '
    'que el limite de 3 aplica a civiles sin organizacion, y que las PDB tienen un regimen especifico (maximo 4 integrantes) '
    'detallado en la Normativa de Ilicitos.',
    body_style
))
story.append(Paragraph(
    '<b>4. Crear las normativas faltantes.</b> Desarrollar la Normativa de EMS/Bomberos y la Normativa de Policia como documentos '
    'independientes con reglas completas de actuacion, jerarquia y protocolos.',
    body_style
))

story.append(heading('10.2. Prioridad Alta (implementar en la proxima semana)', h2_style, 1))
story.append(Paragraph(
    '<b>5. Unificar el sistema de sanciones.</b> Crear una tabla maestra de sanciones que defina el sistema base (strikes, dias, '
    'permaban) y las consecuencias especificas por ambito (retirada de negocio, disband de banda, retirada de rol de streamer). '
    'Todas las normativas deben referenciar esta tabla maestra en lugar de definir sus propios sistemas.',
    body_style
))
story.append(Paragraph(
    '<b>6. Corregir errores de redaccion.</b> Reescribir la portada de la Normativa de Streamers, corregir "a no se" por '
    '"a no ser" en Comercios, reformular la frase de gastos personales, y reestructurar la seccion de CK en la General.',
    body_style
))
story.append(Paragraph(
    '<b>7. Resolver contradicciones de VDM y secuestros.</b> Establecer una unica definicion de VDM (con detalle de cuando se '
    'permite para huida propia y cuando no) y reformular la regla de secuestros para distinguir entre duracion estandar y '
    'extension por acuerdo.',
    body_style
))
story.append(Paragraph(
    '<b>8. Desarrollar el Codigo Penal.</b> Crear un documento formal que defina los delitos, sus penas y las multas asociadas, '
    'con una tabla clara que cualquier usuario pueda consultar.',
    body_style
))

story.append(heading('10.3. Prioridad Media (implementar en el proximo mes)', h2_style, 1))
story.append(Paragraph(
    '<b>9. Crear el glosario unificado.</b> Recopilar todos los terminos y acronimos utilizados en las normativas y crear un '
    'glosario centralizado accesible desde cualquier documento.',
    body_style
))
story.append(Paragraph(
    '<b>10. Implementar control de versiones.</b> Anadir numero de version, fecha de actualizacion y resumen de cambios a '
    'cada documento normativo. Crear un registro centralizado de todas las modificaciones.',
    body_style
))
story.append(Paragraph(
    '<b>11. Simplificar las tablas de robos y comandos.</b> Reestructurar las tablas de robos por nivel de banda en formato '
    'matricial y convertir la lista de comandos en una tabla estructurada.',
    body_style
))
story.append(Paragraph(
    '<b>12. Eliminar mayusculas excesivas.</b> Revisar toda la Normativa de Ilicitos y reemplazar las mayusculas de enfasis '
    'por negrita o elementos visuales.',
    body_style
))

story.append(heading('10.4. Prioridad Baja (implementar progresivamente)', h2_style, 1))
story.append(Paragraph(
    '<b>13. Estandarizar el formato.</b> Unificar el uso de viñetas, numeros y secciones entre todos los documentos para que '
    'sigan la misma estructura visual.',
    body_style
))
story.append(Paragraph(
    '<b>14. Crear la Normativa Aerea.</b> Desarrollar reglas completas para el uso de helicopteros y aviones.',
    body_style
))
story.append(Paragraph(
    '<b>15. Revisar la regla de PKT.</b> Reformular completamente la mencion del PKT para eliminar la contradiccion logica.',
    body_style
))

# ============================================================
# BUILD
# ============================================================
doc.multiBuild(story)
print(f"PDF generado: {output_path}")
